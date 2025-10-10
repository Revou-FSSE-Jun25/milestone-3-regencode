"use client";
import React, { useContext } from "react";
import { cartContext } from "../ClientView";
import { Product } from "../types";


const HeaderCartModal = () => {
    const { cartItems, addCartItems, removeCartItems } = useContext(cartContext);
    return (
        <div className="fixed z-10 bg-white/30 h-[100vh] w-[100vw] text-white">
        { [...cartItems.entries()].map(([id, quantity]) => (
            <div key={id}>
                <h1>{id} : {quantity}</h1>
            </div>
        )) }
        </div>
    );
}

export default HeaderCartModal;
