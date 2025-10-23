"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Page = () => {
    const { storage, addItem, removeItem } = useCart();
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect(() => {
        let cost = 0;
        Array.from(storage!.entries()).map(([id, cartProduct]) => {
            const productObject = JSON.parse(cartProduct);
            cost += (productObject.product.price*productObject.quantity); 
        });
        setTotalCost(cost);
    }, [storage])

    const router = useRouter();
    return (
        <>
        <Header />
        <section className="mt-[10vh] h-[100vh]">
            <div className="h-[70%] aspect-[4/5] border border-white mx-auto my-[10%]">
                <div className="flex flex-row justify-between">
                    <button onClick={() => router.back()}
                    className="w-[10%] aspect-square"> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                    <h1 className="text-center mt-2 text-2xl"> Order Summary </h1>
                    <div className="w-[10%] aspect-square"></div>
                </div> 
                <hr />
                <div className="grid grid-cols-10 gap-4 justify-between h-[40%] overflow-y-auto p-4">
                    <div className="col-span-1 h-5">Qty.</div>
                    <div className="col-span-6 h-5">Product Name</div>
                    <div className="col-span-3 h-5 text-right">Price</div>
                    { storage && storage.size > 0 ? (
                        Array.from(storage!.entries()).map(([id, cartProduct]) => {
                        const productObject = JSON.parse(cartProduct);
                        return (
                        <div className="contents" key={id}>
                            <div className="col-span-1 h-5">{productObject.quantity}x</div>
                            <div className="col-span-6 h-5 truncate">{productObject.product.title}</div>
                            <div className="col-span-3 h-5 text-right">${productObject.product.price * productObject.quantity}</div>
                        </div>
                        )
                    })
                    ) : ( <div className="col-span-10 w-full h-full text-2xl justify-center text-center"
                            > No items in cart yet! </div>) 
                    }
                </div>
                <hr />
                <div className="grid grid-cols-10 gap-4 justify-between p-4">
                    <div className="col-span-7 text-right">Total:</div>
                    <div className="col-span-3 text-right">${totalCost}</div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Page;
