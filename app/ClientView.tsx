"use client";
import React, { Context, useCallback } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { Product } from "./types";
import ProductComponent from "./components/ProductComponent";
import CarouselProductComponent from "./components/CarouselProductComponent";
import HeaderCartModal from "./components/HeaderCartModal";

export interface HomePageProps {
    products: Array<Product>,
    carouselProducts?: Array<Product>
}


export const ClientView : React.FC<HomePageProps> = ({ products, carouselProducts }: HomePageProps) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [carouselProduct, setCarouselProduct] = useState<Product>();
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);


    const handleCartOpen = () => {
        console.log("cart is open:", isCartModalOpen);
        setIsCartModalOpen(!isCartModalOpen);    
    }
    if(carouselProducts){
        useEffect(() => {
            const fixedIndex = carouselIndex % carouselProducts.length;
            setCarouselProduct(carouselProducts[fixedIndex]);
        }, [carouselIndex])
    }
    return (
        <>
            <Header toggleCartModal={handleCartOpen} /> 
            { isCartModalOpen ? <HeaderCartModal toggleCartModal={() => {setIsCartModalOpen(false)}} /> : false }
            <section className="mt-[12vh] border border-white w-[70vw] min-w-[400px] h-[50vh] mx-auto my-5 overflow-hidden">
            { carouselProduct ? <CarouselProductComponent key={carouselProduct.id} {...carouselProduct} /> : false }
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[70vw] min-w-[400px] mx-auto">
            {products.map((prop: Product) => (
                <ProductComponent key={prop.id} {...prop} />
            ))}
            </section>
        </>
    );
}

