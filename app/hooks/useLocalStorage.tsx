"use client";
import React, { useState, useEffect } from "react";
import { Product, CartProduct } from "../types";

export const useLocalStorage = () => {
    const [storage, _setStorage] = useState<Map<string, string>>(new Map());

    const getItemsFromStorage = () => {
        let newMap = new Map<string, string>();
        console.log(localStorage.length);
        if (typeof window == 'undefined' || !window.localStorage) {
            console.log("local storage not defined! cannot get items");
            return new Map();
        }
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)!
            const value = localStorage.getItem(key)!;
            newMap.set(key.toString(), value);
        }
        return newMap;
    }

    const addItem = (product: Product) => {
        const id = product.id.toString();
        _setStorage((prev) => {
            const newMap = new Map(prev)
            const existing = prev.get(id);
            if(existing) {
                const existingProduct = JSON.parse(existing);
                console.log("existing product added", existingProduct);
                existingProduct.quantity += 1;

                const updatedProduct = JSON.stringify(existingProduct);

                localStorage.setItem(id, updatedProduct);
                newMap.set(id, updatedProduct);
            }
            else {
                const newProduct = JSON.stringify({
                    product: product,
                    quantity: 1,
                })
                localStorage.setItem(id, newProduct);
                newMap.set(id, newProduct);
            }
            console.log("updated storage", newMap); 
            return newMap;
        });
    }

    const removeItem = (product: Product) => {
        const id = product.id.toString();
        _setStorage((prev) => {
            const existing = prev.get(id);
            if(existing) {
                const existingProduct = JSON.parse(existing);
                existingProduct.quantity -= 1;
                if(existingProduct.quantity <= 0) {
                    const filteredMap = new Map(Array.from(prev).filter(([key, value]) => key != id));
                    localStorage.removeItem(id);
                    return filteredMap;
                }
                else {
                    const newMap = new Map(prev);

                    newMap.set(id, JSON.stringify(existingProduct));
                    localStorage.setItem(id, JSON.stringify(existingProduct));
                    return newMap;
                }
            }
            else {
                console.error("Trying to removeItem() an undefined product");
            }
            return new Map();
        });
    }


    const setStorage = (map: Map<string, string>) => {
        for (const key of Array.from(localStorage) as string[]) {
            if (map.has(key)) continue;
            localStorage.removeItem(key);
        }
        const entriesArray = Array.from(map.entries());
        for(const [key, value] of entriesArray) {
            localStorage.setItem(key, value);
        }
        _setStorage(map)
    }

    useEffect(() => {
        setStorage(getItemsFromStorage())
    }, []);

    return { storage, addItem, removeItem };
}
