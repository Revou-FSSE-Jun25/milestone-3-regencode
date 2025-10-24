import '@testing-library/jest-dom'
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from "next/navigation";
import { Category, Product } from '@/app/types';
import { useContext } from 'react';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockAddItem = jest.fn();
jest.mock('../../app/contexts/CartContext', () => {
  const React = require('react');
  return {
    CartContext: React.createContext({
      storage: new Map(),
      addItem: (...args: any[]) => mockAddItem(...args),
      removeItem: jest.fn(),
    }),
  };
});

import ProductComponent from '@/app/components/ProductComponent'

describe("ProductComponent", () => {

    const mockCategory : Category = {
        creationAt: "321312",
        id: "1",
        image: "img1.jpg",
        name: "shirt",
        slug: "a",
        updatedAt: "aaa",

    }
    const mockProduct : Product = {
        id: "1",
        title: "Cool T-Shirt",
        images: ["image1.jpg", "image2.jpg"],
        price: 25,
        description: "A cool shirt",
        category: mockCategory,
        creationAt: "aaa",
        slug: "aaa",
        updatedAt: "aaa",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders product title, image, and price", () => {
        render(<ProductComponent {...mockProduct} />);

        // Check that title and price are displayed
        expect(screen.getByText(/cool t-shirt/i)).toBeInTheDocument();
        expect(screen.getByText(/\$25/)).toBeInTheDocument();

        // Image rendered with correct alt and src
        const img = screen.getByRole("img", { name: /cool t-shirt/i });
        expect(img).toHaveAttribute("src", "image1.jpg");
    });

    it("calls addItem when 'Add to cart' button is clicked", () => {
        render(<ProductComponent {...mockProduct} />);

        const addBtn = screen.getByRole("button", { name: /add-to-cart/i });
        fireEvent.click(addBtn);

        expect(mockAddItem).toHaveBeenCalledTimes(1);
        expect(mockAddItem).toHaveBeenCalledWith(expect.objectContaining({
            title: "Cool T-Shirt",
            price: 25,
        }));
    });

    it("navigates when 'Go to page' button is clicked", () => {
        render(<ProductComponent {...mockProduct} />);

        const goBtn = screen.getByRole("button", { name: /go to page/i });
        fireEvent.click(goBtn);

        expect(pushMock).toHaveBeenCalledWith("/products/1");
    });
});
