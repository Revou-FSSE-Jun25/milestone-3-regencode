import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

// SSG by default when there is no data fetching, and no "use client";
const Page = () => {
    return (
        <>
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
        </header>
        <section className="w-[80%] h-[80vh] mx-auto">
            <h1 className="text-7xl my-5"> - Who are we? </h1>
            <p className="text-5xl mb-8">We are Revoshop, and we strive to provide the best possible service for our customers.</p>
            <h1 className="text-7xl my-5"> - What we do? </h1>
            <p className="text-5xl mb-8">We provide unique selections of products</p>
        </section>
        </>
    );
}

export default Page;
