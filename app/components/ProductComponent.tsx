"use client";
import React, { useState, useContext } from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CartContext } from "../contexts/CartContext";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

/*
export interface Product {
    category: Category,
    creationAt: Date,
    description: string
    id: number | string,
    images: Array<Url>, 
    price: number,
    slug: string,
    title: string,
    updatedAt: Date
}
*/

const ProductComponent: React.FC<Product> = ({title, images, price, ...props}: Product) => {
    const [imageIndex, setImageIndex] = useState(0);
    const router = useRouter();
    const { storage, addItem, removeItem } = useContext(CartContext);

    return (
        <div 
        className="w-full aspect-square border border-white" 
        >
            <img
            src={images[imageIndex]}
            alt={title}
            className="w-full h-[70%] object-cover"
            />
            <div className="flex w-[90%] mx-auto justify-between">
                <strong className="text-xl">{title}</strong>
                <p className="text-xl">${price}</p>
            </div>
            <div className="flex h-[10%] gap-5 fit ml-[5%] mr-0">
                <button
                className="h-full aspect-[25/10] border border-white rounded-xl"
                onClick={(e) => {
                    addItem({ title, images, price, ...props });
                }}
                >
                    Add to cart...
                </button>
                <button
                className="h-full aspect-[25/10] border border-white rounded-xl"
                onClick={(e) => { console.log("go clicked"); router.push(`/products/${props.id}`) }}
                >
                    Go to page
                </button>
            </div>
        </div>
    );
}

export default ProductComponent;
