"use client"
import React from "react";
import { Product } from "@/app/types";
import { useRouter } from "next/navigation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateProduct, UpdateProductForm } from "@/app/utils";
import { useProductList } from "@/app/contexts/ProductListContext";
import { useState } from "react";

interface Props {
    id: number,
    product: Product,
}

const ClientView = ({ id, product }: Props) => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [desc, setDesc] = useState("");
    const { productList, addProduct, removeProduct, setProductList } = useProductList();


    const handleUpdate = async (title: string, price: number, desc: string): Promise<Product> => {
        const productForm: UpdateProductForm = {
            title: title,
            price: price,
            description: desc,
            categoryId: 1,
        }
        const res = await updateProduct(id, productForm);
        console.log("create product response", res);
        return res;
    }

    const handleSubmit:  React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault(); // prevent page reload
        console.log("Form submitted!");
        const newProduct = await handleUpdate(title, price, desc);
        if(newProduct.id) addProduct(newProduct);
        else console.log("new product may not have id", newProduct);
    }

    return (
        <div className="flex flex-col h-[100vh] w-[80vw] mx-auto my-[15vh]">
            <section className="flex flex-row h-fit w-full justify-between text-3xl">
                <button onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button> 
                <h1 className="text-3xl text-center"> Edit product id:{id}</h1>
                <div></div>
            </section>
            <form onSubmit={handleSubmit}
            className="flex flex-col h-full w-full text-3xl gap-7">
                <label className="flex flex-col"> 
                Title 
                <input className="border border-white"
                defaultValue={product.title ?? ""}
                onChange={(e) => setTitle(e.target.value)}
                />
                </label>


                <label className="flex flex-col"> 
                Price
                <input className="border border-white"
                defaultValue={product.price ?? ""}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                </label>

                <label className="flex flex-col"> 
                Description
                <textarea className="border border-white h-[30vh] text-wrap"
                defaultValue={product.description ?? ""}
                onChange={(e) => setDesc(e.target.value)}
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
