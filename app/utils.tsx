import { Product } from "./types"


export interface CreateProductForm {
  title: string;
  price: number;
  description: string
  categoryId: number
  images: string[];
}

export interface UpdateProductForm {
  title?: string;
  price?: number;
  description?: string
  categoryId?: number
  images?: string[];
}


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

export const createProduct = async (product: CreateProductForm): Promise<Product> => {
    const response = await fetch('/api/products', {
        method: 'POST',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error('Failed to create product');
    }

    return response.json();
};

export const updateProduct = async (id: number, updatedAttributes: UpdateProductForm): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(updatedAttributes)
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
}

export const deleteProduct = async (id: string) => {
    const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return response.json();
}
