import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClientView from "../../app/login/ClientView";

// ---- Mocks ----

// Mock router
const pushMock = jest.fn();
const backMock = jest.fn();

// Mock useRouter and useSearchParams
const searchParamsMock = {
  get: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    back: backMock,
  }),
  useSearchParams: () => searchParamsMock,
}));

// Mock AuthContext
const loginMock = jest.fn();
const logoutMock = jest.fn();
const cookieLoginMock = jest.fn();

jest.mock("../../app/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    login: loginMock,
    logout: logoutMock,
    cookieLogin: cookieLoginMock,
  }),
}));

// ---- Tests ----
describe("ClientView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders login form correctly", () => {
    render(<ClientView />);
    expect(screen.getByText(/Log in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("displays 'Admin access required' if URL has error=admin-required", () => {
    searchParamsMock.get.mockImplementation((key) =>
      key === "error" ? "admin-required" : null
    );
    render(<ClientView />);
    expect(screen.getByText("Admin access required")).toBeInTheDocument();
  });

  it("displays 'Please login' if URL has error=login-required", () => {
    searchParamsMock.get.mockImplementation((key) =>
      key === "error" ? "login-required" : null
    );
    render(<ClientView />);
    expect(screen.getByText("Please login")).toBeInTheDocument();
  });

  it("redirects to /admin when localStorage has admin token", () => {
    searchParamsMock.get.mockReturnValue(null);
    localStorage.setItem("auth-token", "mocktoken");
    localStorage.setItem("user-role", "admin");

    render(<ClientView />);
    expect(pushMock).toHaveBeenCalledWith("/admin");
  });

  it("redirects to / for normal user token", () => {
    searchParamsMock.get.mockReturnValue(null);
    localStorage.setItem("auth-token", "mocktoken");
    localStorage.setItem("user-role", "user");

    render(<ClientView />);
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("redirects to custom path if redirect query exists", () => {
    searchParamsMock.get.mockImplementation((key) =>
      key === "redirect" ? "/special" : null
    );
    localStorage.setItem("auth-token", "mocktoken");
    localStorage.setItem("user-role", "user");

    render(<ClientView />);
    expect(pushMock).toHaveBeenCalledWith("/special");
  });

  it("handles user typing and form submit", () => {
    render(<ClientView />);

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByDisplayValue(/Log in/i);

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.click(submitButton);

    expect(loginMock).toHaveBeenCalledWith("admin", "admin");
  });

  it("calls router.back() when back button is clicked", () => {
    render(<ClientView />);
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(backMock).toHaveBeenCalled();
  });
});
