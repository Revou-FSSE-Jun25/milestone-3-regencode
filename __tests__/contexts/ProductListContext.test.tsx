import React from "react";
import { renderHook, act } from "@testing-library/react";
import {
  ProductListProvider,
  useProductList,
} from "../../app/contexts/ProductListContext";
import { Product, Category } from "../../app/types";

// ---- Mock data ----
const category: Category = {
  id: 1,
  name: "Electronics",
  image: "cat.jpg",
  slug: "electronics",
  creationAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-02T00:00:00.000Z",
};

const product1: Product = {
  id: "1",
  title: "Laptop",
  description: "A high-end laptop",
  price: 1500,
  images: ["laptop.jpg"],
  slug: "laptop",
  category,
  creationAt: "2024-01-05T00:00:00.000Z",
  updatedAt: "2024-01-06T00:00:00.000Z",
};

const product2: Product = {
  id: "2",
  title: "Tablet",
  description: "A nice tablet",
  price: 800,
  images: ["tablet.jpg"],
  slug: "tablet",
  category,
  creationAt: "2024-02-05T00:00:00.000Z",
  updatedAt: "2024-02-06T00:00:00.000Z",
};

// ---- TESTS ----
describe("ProductListContext", () => {
  it("initializes with an empty product list", () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: ProductListProvider,
    });
    expect(result.current.productList.size).toBe(0);
  });

  it("adds a product correctly", () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: ProductListProvider,
    });

    act(() => {
      result.current.addProduct(product1);
    });

    expect(result.current.productList.size).toBe(1);
    expect(result.current.productList.get("1")).toEqual(product1);
  });

  it("adds multiple products correctly", () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: ProductListProvider,
    });

    act(() => {
      result.current.addProduct(product1);
      result.current.addProduct(product2);
    });

    expect(result.current.productList.size).toBe(2);
    expect(result.current.productList.get("2")!.title).toBe("Tablet");
  });

  it("removes a product correctly", () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: ProductListProvider,
    });

    act(() => {
      result.current.addProduct(product1);
      result.current.addProduct(product2);
      result.current.removeProduct("1");
    });

    expect(result.current.productList.size).toBe(1);
    expect(result.current.productList.has("1")).toBe(false);
  });

  it("setProductList replaces the entire map", () => {
    const { result } = renderHook(() => useProductList(), {
      wrapper: ProductListProvider,
    });

    const newMap = new Map<string, Product>([["2", product2]]);

    act(() => {
      result.current.setProductList(newMap);
    });

    expect(result.current.productList.size).toBe(1);
    expect(result.current.productList.get("2")!.title).toBe("Tablet");
  });
});
