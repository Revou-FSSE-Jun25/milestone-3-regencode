"use client"
import React, { ReactNode } from "react";
import { Product, CartProduct } from "../types";
import { useState, useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface ProductListContextType {
    productList: Map<string, Product>;
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    setProductList: (newList: Map<string, Product>) => void;
};

export const ProductListContext = createContext<ProductListContextType>({
    productList: new Map(),
    addProduct: () => {},
    removeProduct: () => {},
    setProductList: () => {}
});

export const ProductListProvider = ({ children }: { children: ReactNode }) => {
    const [productList, setProductList] = useState<Map<string, Product>>(new Map());
    const addProduct = (product: Product) => {
        setProductList((prev: Map<string, Product>) => {
            const newMap = new Map(prev); // clone to trigger React update
            newMap.set(product.id, product);
            return newMap;
        });
    };

  // Remove a product
  const removeProduct = (productId: string) => {
    setProductList((prev: Map<string, Product>) => {
      const newMap = new Map(prev); // clone
      newMap.delete(productId);
      return newMap;
    });
  };
    return (
        <ProductListContext.Provider 
        value={{ productList, addProduct, removeProduct, setProductList }}
        >
            {children}
        </ProductListContext.Provider>
    );
}

export const useProductList = () => useContext(ProductListContext);

