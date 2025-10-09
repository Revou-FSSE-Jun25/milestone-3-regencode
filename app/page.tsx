import Image from "next/image";
import { Product } from "./types";
import ProductComponent from "./components/ProductComponent";
import { ClientView } from "./ClientView";
import { getProducts } from "./utils";

export default async function Home() {
    
    const carouselProducts = await getProducts(3, 10);
    const products = await getProducts(12, 1);

    console.log("product", products);
    return (
        <>
        <ClientView 
        products={products} 
        carouselProducts={carouselProducts}/>
        </>
    );
}
