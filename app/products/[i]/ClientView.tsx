"use client";
import { useCart } from "@/app/contexts/CartContext";
import { Product } from "@/app/types";
import React from "react";
import { useContext, useState } from "react";
import Header from "@/app/components/Header";
import HeaderCartModal from "@/app/components/HeaderCartModal";

const ClientView = ({ ...product }: Product) => {
    const { storage, addItem, removeItem }= useCart();
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
    return (
        <>
        { isCartModalOpen ? <HeaderCartModal toggleCartModal={() => {setIsCartModalOpen(false)}} /> : false }
        <Header toggleCartModal={() => {setIsCartModalOpen(!isCartModalOpen)}}/>
        <section className="w-[85vw] mx-auto my-5 mt-[12vh]">
            <div className="flex flex-col w-full h-[55vh] md:h-[65vh] lg:h-[90vh]"> 
                <h1 className="text-6xl font-bold mb-5">{product.title}</h1>
                <img 
                src={product.images ? product.images[0] : "https://placehold.co/600x400"} 
                className="grow object-cover overflow-hidden"
                />
                <section className="h-fit text-5xl font-bold my-5 flex justify-between">
                    <h2>${product.price}</h2>
                    <div>
                        <button className="border border-white mx-5">Share</button>
                        <button 
                        className="border border-white"
                        onClick={(e) => {addItem(product)}}>Add to Cart</button>
                    </div>
                </section>
            </div>
            <h2 className="text-4xl font-bold my-5">Description</h2>
            <p className="text-3xl">{product.description}</p>
            <section>
                <h2 className="text-4xl font-bold my-5">Product Information</h2>
                <div className="grid grid-cols-2 text-3xl text-center">
                    <div className="h-full w-full border border-white font-bold">
                    Category
                    </div>
                    <div className="h-full w-full border border-white">
                    {product.category ? product.category.name : "none"}
                    </div>
                    <div className="h-full w-full border border-white font-bold">
                    Last Updated 
                    </div>
                    <div className="h-full w-full border border-white">
                    {product.updatedAt}
                    </div>
                </div>
            </section>
        </section>
        </>
    );
}

export default ClientView;
