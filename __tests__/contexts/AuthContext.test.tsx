import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../app/contexts/AuthContext";

// ---- Mock next/navigation ----
const pushMock = jest.fn();
const searchParamsMock = {
  get: jest.fn().mockReturnValue(null),
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => searchParamsMock,
}));

// ---- Utilities ----
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

// ---- TEST SUITE ----
describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset cookies
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "",
    });
  });

  it("initially has null user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.user).toBeNull();
  });

  it("logs in admin user correctly and sets cookies", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      const success = result.current.login("admin", "admin");
      expect(success).toBe(true);
    });

    // user object is set
    expect(result.current.user?.username).toBe("admin");
    expect(result.current.user?.isAdmin).toBe(true);

    // cookies are set
    expect(getCookie("auth-token")).toContain("mock-token-");
    expect(getCookie("id")).toBe("0");
    expect(getCookie("user-role")).toBe("admin");

    // router redirect called
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("logs in normal user and sets user-role=user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      const success = result.current.login("user", "user");
      expect(success).toBe(true);
    });

    expect(result.current.user?.username).toBe("user");
    expect(result.current.user?.isAdmin).toBe(false);
    expect(getCookie("user-role")).toBe("user");
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("fails login with invalid credentials", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      const success = result.current.login("wrong", "credentials");
      expect(success).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(document.cookie).toBe("");
  });

  it("cookieLogin restores user from cookies", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    // simulate cookies from a previous session
    document.cookie = "auth-token=mock-token; path=/;";
    document.cookie = "id=1; path=/;";
    document.cookie = "user-role=user; path=/;";

    act(() => {
      const restored = result.current.cookieLogin();
      expect(restored).toBe(true);
    });

    expect(result.current.user?.username).toBe("user");
  });

  it("cookieLogin logs out if no valid cookie", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    document.cookie = ""; // no cookies

    act(() => {
      const restored = result.current.cookieLogin();
      expect(restored).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(getCookie("auth-token")).toBeNull();
  });

  it("logout clears cookies and resets user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    // simulate logged in
    act(() => {
      result.current.login("admin", "admin");
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(getCookie("auth-token")).toBeNull();
    expect(getCookie("id")).toBeNull();
    expect(getCookie("user-role")).toBeNull();
  });
});
