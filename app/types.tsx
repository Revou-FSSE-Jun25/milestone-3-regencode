import { Url } from "next/dist/shared/lib/router/router"

export interface Category {
    creationAt: Date,
    id: number | string | undefined,
    image: string,
    name: string,
    slug: string,
    updatedAt: string | Date,
}

export interface Product {
    category: Category,
    creationAt: Date,
    description: string
    id: number | string,
    images: Array<string>, 
    price: number,
    slug: string,
    title: string,
    updatedAt: string | Date, 
}
