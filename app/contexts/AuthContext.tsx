"use client";
import React, { useContext } from "react"
import { createContext } from "react"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";


export interface User {
    id: string;
    username: string;
    password: string;
    isAdmin: boolean;
    name?: string;
}

// todo: use hash table / map to query user emails
const RegisteredUsers: User[] = [
    {
        id: "0",
        username: "admin",
        password: "admin",
        isAdmin: true,
        name: "admin",
    },
    {
        id: "1",
        username: "user",
        password: "user",
        isAdmin: false,
    }
]

interface AuthContext {
    user: User | null | undefined;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    cookieLogin: () => boolean;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    login: () => false,
    logout: () => {},
    cookieLogin: () => false,
});

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        cookieLogin();
        console.log("user updated", user);
    }, [user]);

    const grantCookie = (userIndex: number) => {
        const mockToken = `mock-token-${Date.now()}`;
        document.cookie = `auth-token=${mockToken}; path=/; max-age=3600`;
        document.cookie = `id=${userIndex}; path=/; max-age=3600`;
        if(RegisteredUsers[userIndex].isAdmin) {
            document.cookie = `user-role=admin; path=/; max-age=3600`;
            router.push(searchParams.get("redirect") || "/");
        }
        else {
            document.cookie = `user-role=user; path=/; Expires=Sun, 15 Jul 2026 00:00:01 GMT;`;
            router.push(searchParams.get("redirect") || "/");
        }
    }


    const login = (username: string, password: string) => {
        for(let i = 0; i < RegisteredUsers.length; i++) {
            if(RegisteredUsers[i].username == username && RegisteredUsers[i].password == password) {
                const user = RegisteredUsers[i]
                setUser(user);
                grantCookie(i);
                console.log("current user", user);
                console.log("is user admin", user.isAdmin);
                return true;
            }
        }
        console.log("no user found");
        return false;
    }

    const getCookieAttribute = (attr: string): string | undefined => {
        return document.cookie
        .split("; ")
        .find((row) => row.startsWith(attr + "="))
            ?.split("=")[1];
    };

    const cookieLogin = () => {
        const isCookieActive = document.cookie
          .split("; ")
          .some((cookie) => cookie.startsWith("auth-token="));
        console.log("cookie active", isCookieActive); // true or false
        if(isCookieActive) {
            const userId = parseInt(getCookieAttribute("id")!)
            setUser(RegisteredUsers[userId]);
            return true;
        }
        else {
            console.log("cookie expired or inactive :(");
            logout();
            return false;
        }
    }

    const logout = () => {
        setUser(null);
        // invalidate cookies
        document.cookie = "auth-token=; path=/; max-age=0";
        document.cookie = "id=; path=/; max-age=0";
        document.cookie = `user-role=null; path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }


    return (
        <AuthContext.Provider value={{user, login, logout, cookieLogin}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
