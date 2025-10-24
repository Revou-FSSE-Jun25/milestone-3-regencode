"use client"
import React, { ReactNode } from "react";
import { Product, CartProduct } from "../types";
import { useState, useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface CartContextType {
  storage: Map<string, string> | undefined;
  addItem: (product: Product) => void;
  removeItem: (target: Product) => void;
};

export const CartContext = createContext<CartContextType>({
  storage: new Map<string, string>(),
  addItem: () => {},
  removeItem: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { storage, addItem, removeItem } = useLocalStorage();

    return (
        <CartContext.Provider 
        value={{ storage, addItem, removeItem }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);

