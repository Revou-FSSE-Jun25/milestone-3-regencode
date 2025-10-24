import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../app/utils";
import { Product } from "../app/types";

global.fetch = jest.fn();

describe("utils API functions", () => {
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    price: 100,
    description: "A sample product",
    category: {
      creationAt: "2025-01-01",
      id: 1,
      image: "image.jpg",
      name: "Test Category",
      slug: "test-category",
      updatedAt: "2025-01-01",
    },
    creationAt: "2025-01-01",
    images: ["img1.jpg"],
    slug: "test-product",
    updatedAt: "2025-01-01",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- getProducts ---
  it("fetches products successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockProduct],
    });

    const result = await getProducts(5, 0);

    expect(fetch).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products?offset=0&limit=5",
      { cache: "force-cache" }
    );
    expect(result).toEqual([mockProduct]);
  });

  it("logs error when getProducts fetch fails", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await getProducts(5);
    expect(consoleSpy).toHaveBeenCalledWith("error", expect.any(Error));

    consoleSpy.mockRestore();
  });

  // --- getProductById ---
  it("fetches single product successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    const result = await getProductById(1);

    expect(fetch).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products/1",
      { cache: "force-cache" }
    );
    expect(result).toEqual(mockProduct);
  });

  it("logs error when getProductById fails", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    await getProductById(999);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  // --- createProduct ---
  it("creates a product successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    const result = await createProduct({
      title: "New Product",
      price: 200,
      description: "Test description",
      categoryId: 1,
      images: ["new.jpg"],
    });

    expect(fetch).toHaveBeenCalledWith("/api/products", expect.any(Object));
    expect(result).toEqual(mockProduct);
  });

  it("throws error when createProduct fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      createProduct({
        title: "Bad Product",
        price: 0,
        description: "desc",
        categoryId: 1,
        images: [],
      })
    ).rejects.toThrow("Failed to create product");
  });

  // --- updateProduct ---
  it("updates a product successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    });

    const result = await updateProduct(1, { price: 250 });
    expect(fetch).toHaveBeenCalledWith(
      "/api/products/1",
      expect.objectContaining({
        method: "PUT",
      })
    );
    expect(result).toEqual(mockProduct);
  });

  it("throws error when updateProduct fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(updateProduct(1, { title: "Broken" })).rejects.toThrow(
      "Failed to update product"
    );
  });

  // --- deleteProduct ---
  it("deletes a product successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await deleteProduct("1");
    expect(fetch).toHaveBeenCalledWith("/api/products/1", { method: "DELETE" });
    expect(result).toEqual({ success: true });
  });

  it("throws error when deleteProduct fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(deleteProduct("404")).rejects.toThrow("Failed to delete product");
  });
});
