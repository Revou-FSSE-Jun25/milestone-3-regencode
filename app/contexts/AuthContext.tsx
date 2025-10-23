"use client";
import React, { useContext } from "react"
import { createContext } from "react"
import { useState } from "react";
import { ReactNode } from "react";


export interface User {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean;
    name?: string;
}

// todo: use hash table / map to query user emails
const RegisteredUsers: User[] = [
    {
        id: "1",
        email: "admin",
        password: "admin",
        isAdmin: true,
        name: "admin",
    },
    {
        id: "2",
        email: "customer@email.com",
        password: "customer",
        isAdmin: false,
    }
]

interface AuthContext {
    user: User | null | undefined;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    login: () => false,
    logout: () => {},
});

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {
        for(let i = 0; i < RegisteredUsers.length; i++) {
            if(RegisteredUsers[i].email == email && RegisteredUsers[i].password == password) {
                setUser(RegisteredUsers[i]);
                return true;
            }
        }
        return false;
    }
    const logout = () => {
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
