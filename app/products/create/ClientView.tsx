"use client"
import React, { useState } from "react";
import { Product } from "@/app/types";
import { useRouter } from "next/navigation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createProduct, CreateProductForm } from "@/app/utils";
import { useProductList } from "@/app/contexts/ProductListContext";


const ClientView = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [img, setImg] = useState("");
    const [desc, setDesc] = useState("");
    const { productList, addProduct, removeProduct, setProductList } = useProductList();


    const handleCreate = async (title: string, price: number, img: string, desc: string): Promise<Product> => {
        const productForm: CreateProductForm  = {
            title: title,
            price: price,
            description: desc,
            categoryId: 1,
            images: [img],
        }
        const res = await createProduct(productForm);
        console.log("create product response", res);
        return res;
    }
    const handleSubmit:  React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault(); // prevent page reload
        console.log("Form submitted!");
        const newProduct = await handleCreate(title, price, img, desc);
        if(newProduct.id) addProduct(newProduct);
    }
    return (
        <div className="flex flex-col h-[100vh] w-[80vw] mx-auto my-[15vh]">
            <section className="flex flex-row h-fit w-full justify-between text-3xl">
                <button onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button> 
                <h1 className="text-3xl text-center"> Create new product </h1>
                <div></div>
            </section>
            <form onSubmit={handleSubmit}
            className="flex flex-col h-full w-full text-3xl gap-7">
                <label className="flex flex-col"> 
                Title 
                <input 
                onChange={(e) => setTitle(e.target.value)}
                className="border border-white"
                />
                </label>

                <label className="flex flex-col"> 
                Price
                <input 
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="border border-white"
                />
                </label>

                <label className="flex flex-col"> 
                Img src 
                <input 
                onChange={(e) => setImg(e.target.value)}
                className="border border-white"
                />
                </label>


                <label className="flex flex-col"> 
                Description
                <textarea 
                onChange={(e) => setDesc(e.target.value)}
                className="border border-white h-[30vh] text-wrap"
                />
                </label>

                <input type="submit"
                className="border border-white w-fit mx-auto px-5"
                />

            </form>
        </div>
    );
}

export default ClientView;
