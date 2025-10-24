import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClientView, HomePageProps } from "../app/ClientView";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/contexts/AuthContext";
import { useProductList } from "../app/contexts/ProductListContext";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("../contexts/ProductListContext", () => ({
  useProductList: jest.fn(),
}));
jest.mock("../components/Header", () => () => <div data-testid="header" />);
jest.mock("../components/HeaderCartModal", () => (props: any) => (
  <div data-testid="header-cart-modal" onClick={props.toggleCartModal}>
    Cart Modal
  </div>
));
jest.mock("../components/ProductComponent", () => (props: any) => (
  <div data-testid="product">{props.title}</div>
));
jest.mock("../components/CarouselProductComponent", () => (props: any) => (
  <div data-testid="carousel-product">{props.title}</div>
));

describe("ClientView Component", () => {
  const mockPush = jest.fn();
  const mockAddProduct = jest.fn();
  const mockRemoveProduct = jest.fn();
  const mockSetProductList = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({
      user: { isAdmin: true },
      login: jest.fn(),
      logout: jest.fn(),
      cookieLogin: jest.fn(),
    });
    (useProductList as jest.Mock).mockReturnValue({
      productList: new Map(),
      addProduct: mockAddProduct,
      removeProduct: mockRemoveProduct,
      setProductList: mockSetProductList,
    });
    jest.clearAllMocks();
  });

  const sampleProducts: HomePageProps = {
    products: [
      {
        id: "1",
        title: "Sample Product 1",
        price: 100,
        description: "Description",
        category: {
          creationAt: "",
          id: 1,
          image: "",
          name: "Category",
          slug: "cat",
          updatedAt: "",
        },
        creationAt: "",
        images: [],
        slug: "sample-product-1",
        updatedAt: "",
      },
    ],
    carouselProducts: [
      {
        id: "2",
        title: "Carousel Product",
        price: 200,
        description: "Desc",
        category: {
          creationAt: "",
          id: 1,
          image: "",
          name: "Category",
          slug: "cat",
          updatedAt: "",
        },
        creationAt: "",
        images: [],
        slug: "carousel-product",
        updatedAt: "",
      },
    ],
  };

  it("renders header and product list correctly", () => {
    render(<ClientView {...sampleProducts} />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Product List")).toBeInTheDocument();
    expect(screen.getByTestId("product")).toHaveTextContent("Sample Product 1");
  });

  it("renders carousel product when available", () => {
    render(<ClientView {...sampleProducts} />);
    expect(screen.getByTestId("carousel-product")).toHaveTextContent("Carousel Product");
  });

  it("shows cart modal when toggled", () => {
    render(<ClientView {...sampleProducts} />);

    // open cart modal
    const header = screen.getByTestId("header");
    fireEvent.click(header);

    // after clicking, modal should appear
    expect(screen.queryByTestId("header-cart-modal")).toBeInTheDocument();
  });

  it("navigates to create page when admin clicks the button", () => {
    render(<ClientView {...sampleProducts} />);

    const button = screen.getByText("Create new product...");
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith("/products/create");
  });
});
