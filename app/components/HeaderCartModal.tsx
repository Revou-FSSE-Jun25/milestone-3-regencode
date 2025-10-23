"use client";
import React, { useContext, useState, useEffect} from "react";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { faPlus, faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface CartModalProps {
    toggleCartModal: () => void;
}

const HeaderCartModal = ({ toggleCartModal }: CartModalProps) => {
    const { storage, addItem, removeItem } = useCart();
    const [totalCost, setTotalCost] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        let cost = 0;
        Array.from(storage!.entries()).map(([id, cartProduct]) => {
            const productObject = JSON.parse(cartProduct);
            cost += (productObject.product.price*productObject.quantity); 
        });
        setTotalCost(cost);
    }, [storage])

    return (
        <div className="fixed top-0 z-10 h-[100vh] w-[100vw] text-white bg-black/60">
            <section className="flex flex-col w-[80vw] min-w-[400px] bg-black mx-auto my-[10vh] border border-white z-10">
            <div className="flex flex-row w-full justify-between">
                <h1 className="text-2xl text-center"> Your cart </h1>
                <button onClick={toggleCartModal}
                className="aspect-square">
                    <FontAwesomeIcon icon={faX} />
                </button>
            </div>
            <section className="h-[70vh] overflow-auto">
            { storage && storage.size > 0 ? (
                Array.from(storage!.entries()).map(([id, cartProduct]) => {
                const productObject = JSON.parse(cartProduct);
                return (
                <div key={id}
                className="flex flex-row w-[90%] mx-auto my-2 border border-white">
                    <img src={productObject?.product?.images ?? "unknown"} className="w-[15%] min-w-[150px] aspect-square" />
                    <div className="w-[50%] mx-auto align-middle">
                        <h1 className="text-3xl"
                        >{productObject?.product?.title ?? "Unknown product" } </h1>
                        <h1>Price: ${productObject?.product.price ?? 0}/item</h1>
                    </div>
                    <div className="flex flex-row w-[20%] text-xl items-center">
                        <button onClick={() => addItem(JSON.parse(cartProduct).product)}
                        className="border border-white aspect-square rounded-l-xl"> 
                        <FontAwesomeIcon icon={faPlus} /> 
                        </button>
                        <div className="w-[20%] border border-white text-center">{productObject?.quantity ?? 0}</div>
                        <button onClick={() => removeItem(JSON.parse(cartProduct).product)}
                        className="border border-white aspect-square rounded-r-xl"> 
                        <FontAwesomeIcon icon={faMinus} /> 
                        </button>
                    </div>
                </div>
                )
            })
            ) : ( <div className="w-full h-full text-2xl justify-center text-center"
                    > No items in cart yet! </div>) 
            }

            </section>
            <div className="flex flex-row justify-between h-[5vh] w-[90%] mx-auto text-2xl items-center">
                <h1> Total price: ${totalCost} </h1>
                <button onClick={() => router.push("/checkout/")}
                className="border border-white p-1 px-3"
                > Proceed to payment </button>
            </div>
            </section>
        </div>
    );
}

export default HeaderCartModal;
