import React from "react";
import { getProductById } from "@/app/utils";
import ClientView from "./ClientView";

interface DynamicPageProps {
    params: Promise<{ i: string }>
}

export default async function Page({ params }: DynamicPageProps) {
    const resolvedParams = await params;
    console.log("resolved params", resolvedParams);
    const product = await getProductById(parseInt(resolvedParams.i))
    console.log("product", product);

    return (
        <>
        <ClientView {...product}/>
        </>
    );
}
