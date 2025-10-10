import { Url } from "next/dist/shared/lib/router/router"

export interface Category {
    creationAt: string,
    id: number | string | undefined,
    image: string,
    name: string,
    slug: string,
    updatedAt: string,
}

export interface Product {
    category: Category,
    creationAt: string,
    description: string
    id: number | string,
    images: Array<string>, 
    price: number,
    slug: string,
    title: string,
    updatedAt: string, 
}
