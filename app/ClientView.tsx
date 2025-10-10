"use client";
import React, { Context, useCallback } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { Product } from "./types";
import ProductComponent from "./components/ProductComponent";
import HeaderCartModal from "./components/HeaderCartModal";

export interface HomePageProps {
    products: Array<Product>,
    carouselProducts?: Array<Product>
}

export interface CartContextType {
  cartItems: Map<number, number>;
  addCartItems: (product: Product) => void;
  removeCartItems: (target: Product) => void;
};

export const cartContext = createContext<CartContextType>({
  cartItems: new Map<number, number>(),
  addCartItems: () => {},
  removeCartItems: () => {},
});

export const ClientView : React.FC<HomePageProps> = ({ products, carouselProducts }: HomePageProps) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [carouselProduct, setCarouselProduct] = useState<Product>();
    const [cartItems, setCartItems] = useState<Map<number, number>>(new Map());
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

    const handleCartOpen = () => {
        console.log("cart is open:", isCartModalOpen);
        console.log("cart", cartItems); 
        setIsCartModalOpen(!isCartModalOpen);    
    }

    const addCartItems = (newProduct : Product) => {
        setCartItems(prev => {
            const newMap = new Map(prev);
            const id = parseInt(String(newProduct.id))
            if(newMap.has(id)) {
                newMap.set(id, newMap.get(id)! + 1);
            }
            else {
                newMap.set(id, 1);
            }
            return newMap;
        });
        console.log("cart", cartItems);
    }
    const removeCartItems = (target : Product) => {
        setCartItems(prev => {
            const newMap = new Map(prev);
            const id = parseInt(String(target.id))
            if(newMap.has(id)) {
                newMap.set(id, newMap.get(id)! - 1);
            }
            else {
                console.error("Cannot remove non existing product from cart!", target);
                return newMap;
            }
            if(newMap.get(id)! <= 0) {
                newMap.delete(id)
            }
            return newMap;
        });
        console.log("cart", cartItems);
    }

    if(carouselProducts){
        useEffect(() => {
            const fixedIndex = carouselIndex % carouselProducts.length;
            setCarouselProduct(carouselProducts[fixedIndex]);
        }, [carouselIndex])
    }
    return (
        <cartContext.Provider
        value={{ cartItems, addCartItems, removeCartItems }}
        >
            <Header toggleCartModal={handleCartOpen} /> 
            { isCartModalOpen ? <HeaderCartModal /> : false }
            <section className="border border-white w-[70vw] min-w-[400px] h-[50vh] mx-auto my-5 overflow-hidden">
            { carouselProduct ? <ProductComponent key={carouselProduct.id} {...carouselProduct} /> : false }
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[70vw] min-w-[400px] mx-auto">
            {products.map((prop: Product) => (
                <ProductComponent key={prop.id} {...prop} />
            ))}
            </section>
        </cartContext.Provider>
    );
}

