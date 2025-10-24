"use client";
import React, { Context, useCallback } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { Product } from "./types";
import ProductComponent from "./components/ProductComponent";
import CarouselProductComponent from "./components/CarouselProductComponent";
import HeaderCartModal from "./components/HeaderCartModal";
import { useAuth } from "./contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useProductList } from "./contexts/ProductListContext";

export interface HomePageProps {
    products: Array<Product>,
    carouselProducts?: Array<Product>
}


export const ClientView : React.FC<HomePageProps> = ({ products, carouselProducts }: HomePageProps) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [carouselProduct, setCarouselProduct] = useState<Product>();
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
    const { user, login, logout, cookieLogin } = useAuth();
    const { productList, addProduct, removeProduct, setProductList } = useProductList();
    const [productListState, setProductListState] = useState<Product[]>([]);
    

    const router = useRouter()

    const handleCartOpen = () => {
        setIsCartModalOpen(!isCartModalOpen);    
        console.log("cart is open:", isCartModalOpen);
    }
    if(carouselProducts){
        useEffect(() => {
            const fixedIndex = carouselIndex % carouselProducts.length;
            setCarouselProduct(carouselProducts[fixedIndex]);
        }, [carouselIndex])
    }

    useEffect(() => {
        const newMap = new Map<string, Product>(productList);
        products.forEach((product) => {
            newMap.set(product.id, product);
        });
        setProductList(newMap);
    }, [])

    useEffect(() => {
        setProductListState(Array.from(productList.values()));
        console.log("product list", productList);
    }, [productList])

    return (
        <>
            <Header toggleCartModal={handleCartOpen} /> 
            { isCartModalOpen ? <HeaderCartModal toggleCartModal={() => {setIsCartModalOpen(false)}} /> : false }
            <section className="mt-[12vh] border border-white w-[70vw] min-w-[400px] h-[50vh] mx-auto my-5 overflow-hidden">
            { carouselProduct ? <CarouselProductComponent key={carouselProduct.id} {...carouselProduct} /> : false }
            </section>

            { user?.isAdmin && 
                <div className="flex flex-row w-[70vw] mx-auto my-3 text-3xl justify-between">
                    <h1> Product List </h1>
                    <button onClick={() => router.push("/products/create")}
                    className="border border-white">
                        Create new product...
                    </button>
                </div>
            }
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[70vw] min-w-[400px] mx-auto">
            {productListState.map((product) => (
              <ProductComponent key={product.id} {...product} />
            ))}
            </section>
        </>
    );
}

