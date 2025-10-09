import { Product } from "./types"

export const getProducts = async (limit: number, offset: number = 0): Promise<Array<Product>> => {
    return fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`, {
        cache: 'force-cache'
    })
    .then(
        (res) => res.json(),
        (e) => console.error("error", e)
    )
    .then(
        (json) => json,
        (e) => console.error("error", e)
    )
}


export const getProductById = async (id: number): Promise<Product> => {
    return fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        cache: 'force-cache'
    })
    .then(
        (res) => res.json(),
        (e) => console.error("error", e)
    )
    .then(
        (json) => json,
        (e) => console.error("error", e)
    )
}

