import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductComponent from "../../app/components/ProductComponent";
import { Product } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCart } from "../../app/contexts/CartContext";
import { useAuth } from "../../app/contexts/AuthContext";
import { useProductList } from "../../app/contexts/ProductListContext";
import { deleteProduct } from "../../app/utils";

// ---- MOCKS ----
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const addItemMock = jest.fn();
jest.mock("../../app/contexts/CartContext", () => ({
  useCart: () => ({
    storage: new Map(),
    addItem: addItemMock,
    removeItem: jest.fn(),
  }),
}));

const removeProductMock = jest.fn();
jest.mock("../../app/contexts/ProductListContext", () => ({
  useProductList: () => ({
    productList: [],
    addProduct: jest.fn(),
    removeProduct: removeProductMock,
    setProductList: jest.fn(),
  }),
}));

jest.mock("../../app/utils", () => ({
  deleteProduct: jest.fn(),
}));

// Utility to mock Auth
const mockUseAuth = (user: any) => {
  (useAuth as jest.Mock).mockReturnValue({
    user,
    login: jest.fn(),
    logout: jest.fn(),
    cookieLogin: jest.fn(),
  });
};

jest.mock("../../app/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// ---- TESTS ----
describe("ProductComponent", () => {
  const baseProduct : Product = {
    id: "1",
    title: "Test Product",
    price: 100,
    images: ["test-image.jpg"],
    category: {
        creationAt: "32131",
        id: 21,
        image: "s.jpg",
        name: "a",
        slug: "a",
        updatedAt: "dasd",
    },
    creationAt: "32132",
    description: "a",
    updatedAt: "32123",
    slug: "e",

  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product title, price, and image", () => {
    mockUseAuth(null);
    render(<ProductComponent {...baseProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute("src", "test-image.jpg");
  });

  it("navigates to product page on 'Go to page' click", () => {
    mockUseAuth(null);
    render(<ProductComponent {...baseProduct} />);
    fireEvent.click(screen.getByText("Go to page"));
    expect(pushMock).toHaveBeenCalledWith("/products/1");
  });

  it("calls addItem when add-to-cart button is clicked", () => {
    mockUseAuth(null);
    render(<ProductComponent {...baseProduct} />);
    fireEvent.click(screen.getByLabelText("add-to-cart"));
    expect(addItemMock).toHaveBeenCalledWith(expect.objectContaining({ title: "Test Product", id: "1" }));
  });

  it("renders edit and delete buttons for admin user", () => {
    mockUseAuth({ isAdmin: true });
    render(<ProductComponent {...baseProduct} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(4); // Go, Cart, Edit, Delete
  });

  it("does not render edit/delete buttons for non-admin user", () => {
    mockUseAuth({ isAdmin: false });
    render(<ProductComponent {...baseProduct} />);
    expect(screen.queryByTestId("fa-edit")).not.toBeInTheDocument();
  });

  it("navigates to edit page when edit button is clicked (admin)", () => {
    mockUseAuth({ isAdmin: true });
    render(<ProductComponent {...baseProduct} />);
    const editButton = screen.getAllByRole("button").find((b) => b.innerHTML.includes("svg"));
    fireEvent.click(editButton!);
    expect(pushMock).toHaveBeenCalledWith("/products/1/edit");
  });

  it("calls deleteProduct and removeProduct when delete button is clicked (admin)", async () => {
    (deleteProduct as jest.Mock).mockResolvedValueOnce("deleted!");
    mockUseAuth({ isAdmin: true });
    render(<ProductComponent {...baseProduct} />);

    const buttons = screen.getAllByRole("button");
    const deleteButton = buttons[buttons.length - 1];
    fireEvent.click(deleteButton);

    expect(deleteProduct).toHaveBeenCalledWith("1");
    expect(removeProductMock).toHaveBeenCalledWith("1");
  });
});
