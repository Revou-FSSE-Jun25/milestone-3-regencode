import React from "react";
import { getProductById } from "@/app/utils";
import ClientView from "./ClientView";
import { CreateProductForm } from "@/app/utils";
import { createProduct } from "@/app/utils";
import { Product } from "@/app/types";


export default async function Page() {
    return (
        <>
            <ClientView />
        </>
    );

}
