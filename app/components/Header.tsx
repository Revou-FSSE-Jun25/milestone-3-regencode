"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartPlus, faRocket } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import { cartContext } from "../ClientView";

const Header = ({ toggleCartModal } : { toggleCartModal: () => void } ) => {
    const { cartItems, addCartItems, removeCartItems } = useContext(cartContext);
    return (
        <header
        className="flex bg-black w-full items-center h-[10vh] border-b border-white place-content-between"
        >
            <Link 
            className="flex h-full mx-auto text-5xl text-white items-center"
            href={"/"} >
                <FontAwesomeIcon icon={faRocket} className="h-[50%] mr-2" /> 
                <h1>revoshop</h1>
            </Link>
            <div
            className="h-[60%] aspect-square my-auto mx-3"
            >
            <Link 
            className="flex h-full mx-auto text-5xl text-white items-center"
            href={"/faq"} >
                <h2>FAQ</h2>
            </Link>
            </div>
            <div
            className="h-[60%] aspect-square my-auto mx-3"
            onClick={toggleCartModal}
            >
                <FontAwesomeIcon 
                icon={faCartPlus} 
                style={{ width: "100%", height: "100%"}}
                />
            </div>
        </header>
    );
}

export default Header;
