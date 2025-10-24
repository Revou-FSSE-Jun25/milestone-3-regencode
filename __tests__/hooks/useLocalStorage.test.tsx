import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../app/hooks/useLocalStorage"; // adjust path if needed
import { Product, Category } from "../../app/types";

describe("useLocalStorage hook", () => {
  // ---- Example category & product ----
  const category: Category = {
    id: 1,
    name: "Electronics",
    image: "cat-image.jpg",
    slug: "electronics",
    creationAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  };

  const product: Product = {
    id: "1",
    title: "Smartphone X",
    description: "A cool phone",
    price: 899,
    images: ["phone.jpg"],
    slug: "smartphone-x",
    category,
    creationAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-06T00:00:00.000Z",
  };

  // ---- Mock localStorage ----
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      key: jest.fn((i) => Object.keys(store)[i] || null),
      get length() {
        return Object.keys(store).length;
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  // ---- TESTS ----

  it("initializes with items from localStorage", () => {
    localStorageMock.setItem("1", JSON.stringify({ product, quantity: 2 }));

    const { result } = renderHook(() => useLocalStorage());
    const stored = result.current.storage.get("1");

    expect(stored).toBe(JSON.stringify({ product, quantity: 2 }));
  });

  it("adds a new product to localStorage and state", () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.addItem(product);
    });

    const storedValue = localStorageMock.getItem("1");
    expect(storedValue).toBeTruthy();

    const parsed = JSON.parse(storedValue!);
    expect(parsed.product.title).toBe("Smartphone X");
    expect(parsed.quantity).toBe(1);
    expect(result.current.storage.get("1")).toEqual(storedValue);
  });

  it("increments quantity if same product added again", () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.addItem(product);
      result.current.addItem(product);
    });

    const parsed = JSON.parse(localStorageMock.getItem("1")!);
    expect(parsed.quantity).toBe(2);
  });

  it("decrements quantity when removeItem is called", () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.addItem(product);
      result.current.addItem(product);
      result.current.removeItem(product);
    });

    const parsed = JSON.parse(localStorageMock.getItem("1")!);
    expect(parsed.quantity).toBe(1);
  });

  it("removes product completely when quantity drops to 0", () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.addItem(product);
      result.current.removeItem(product);
    });

    expect(localStorageMock.getItem("1")).toBeNull();
    expect(result.current.storage.has("1")).toBe(false);
  });

  it("handles removeItem() on undefined product gracefully", () => {
    const { result } = renderHook(() => useLocalStorage());
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    act(() => {
      result.current.removeItem(product);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Trying to removeItem() an undefined product"
    );
    consoleSpy.mockRestore();
  });
});
