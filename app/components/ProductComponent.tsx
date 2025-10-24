"use client";
import React, { useState, useContext } from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useProductList } from "../contexts/ProductListContext";
import { deleteProduct } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ProductComponent: React.FC<Product> = ({title, images, price, ...props}: Product) => {
    const [imageIndex, setImageIndex] = useState(0);
    const router = useRouter();
    const { storage, addItem, removeItem } = useCart();
    const { user, login, logout, cookieLogin } = useAuth();
    const { productList, addProduct, removeProduct, setProductList } = useProductList();

    const handleDelete = async () => {
        const id = props.id;
        const res = await deleteProduct(id);
        removeProduct(id); 
        console.log(res);
        return res;
    }

    return (
        <div 
        className="w-full h-full aspect-square border border-white" 
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
                onClick={(e) => { console.log("go clicked"); router.push(`/products/${props.id}`) }}
                >
                    Go to page
                </button>
                <button
                aria-label="add-to-cart"
                className="h-full aspect-square border border-white rounded-xl"
                onClick={(e) => {
                    addItem({ title, images, price, ...props });
                }}
                >
                    <FontAwesomeIcon icon={faCartPlus} />
                </button>
                { user?.isAdmin && <button onClick={(e) => { router.push(`/products/${props.id}/edit`) }}
                    className="h-full aspect-square border border-white rounded-xl">
                        <FontAwesomeIcon icon={faEdit} />
                    </button> }

                { user?.isAdmin && <button onClick={handleDelete}
                    className="h-full aspect-square border border-white rounded-xl">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button> }
            </div>
        </div>
    );
}

export default ProductComponent;
