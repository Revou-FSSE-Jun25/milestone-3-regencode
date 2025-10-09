"use client";
import React, { Context } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { Product } from "./types";
import ProductComponent from "./components/ProductComponent";
import HeaderCartModal from "./components/HeaderCartModal";

export interface HomePageProps {
    products: Array<Product>,
    carouselProducts?: Array<Product>
}

export const cartContext = createContext<Array<Product>>([]);

export const ClientView : React.FC<HomePageProps> = ({ products, carouselProducts }: HomePageProps) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [carouselProduct, setCarouselProduct] = useState<Product>();
    const [cartItems, setCartItems] = useState<Array<Product>>([]);

    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

    const toggleCartModal = () => {
        setIsCartModalOpen(!isCartModalOpen);
    }

    if(carouselProducts){
        useEffect(() => {
            const fixedIndex = carouselIndex % carouselProducts.length;
            setCarouselProduct(carouselProducts[fixedIndex]);
        }, [carouselIndex])
    }
    return (
        <cartContext.Provider
        value={ cartItems }
        >
            <Header toggleCartModal={toggleCartModal}/>
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

