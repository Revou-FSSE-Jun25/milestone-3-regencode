import { Url } from "next/dist/shared/lib/router/router"

export interface Category {
    creationAt: string,
    id: number | string,
    image: string,
    name: string,
    slug: string,
    updatedAt: string,
}

export interface Product {
    category: Category,
    creationAt: string,
    description: string
    id: string,
    images: Array<string>, 
    price: number,
    slug: string,
    title: string,
    updatedAt: string, 
}

export interface CartProduct {
    product: Product,
    quantity: number
}
