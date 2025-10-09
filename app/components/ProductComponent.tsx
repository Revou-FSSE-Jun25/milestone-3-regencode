"use client";
import React, { useState, useContext } from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cartContext } from "../ClientView";
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

    let cartItems = useContext(cartContext);

    return (
        <div 
        className="w-full h-full border border-white" 
        onClick={() => {router.push(`/products/${props.id}`)}}>
            <img
            src={images[imageIndex]}
            alt={title}
            className="w-full h-[70%] object-cover"
            />
            <div className="flex w-[90%] mx-auto justify-between">
                <strong className="text-2xl">{title}</strong>
                <p className="text-2xl">${price}</p>
            </div>
            <button
            className="h-[10%] aspect-[20/4] bg-green-800"
            onClick={() => {cartItems.push({title, images, price, ...props})}}
            >
                Add to cart...
            </button>
        </div>
    );
}

export default ProductComponent;
