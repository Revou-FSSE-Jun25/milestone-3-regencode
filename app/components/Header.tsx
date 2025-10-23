"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faCartPlus, faRocket, faPortrait } from '@fortawesome/free-solid-svg-icons'

const Header = ({ toggleCartModal } : { toggleCartModal?: () => void } ) => {
    const router = useRouter();
    return (
        <header
        className="flex fixed top-0 bg-black w-full items-center h-[10vh] border-b border-white place-content-between mt-0"
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
                className="flex h-full mx-auto text-white items-center"
                href={"/faq"} >
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-4xl"/>
                </Link>
            </div>
            {
                toggleCartModal == undefined ? null :
                <button
                className="h-full aspect-square"
                onClick={toggleCartModal}
                >
                    <FontAwesomeIcon 
                    icon={faCartPlus} 
                    className="text-3xl h-full aspect-square"
                    />
                </button>
            }
            <button onClick={() => router.push("/login/")}
            className="h-full aspect-square">
                <FontAwesomeIcon icon={faPortrait} className="text-3xl h-full aspect-square" />
            </button>
        </header>
    );
}

export default Header;
