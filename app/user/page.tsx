"use client";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import { useRouter } from "next/navigation";


const Page = () => {

    const { user, login, logout, cookieLogin } = useAuth();
    const router = useRouter();
    console.log("user", user);
    
    const showPurchaseHistory = () => {
        console.error("Not implemented error");
    }

    const handleLogout = () => {
        router.push("/");
        logout();
    }

    return (
        <>
            <Header />
            <div className="mt-[12vh]">
                <h1 className="text-3xl">Hello, {user?.username!}!</h1>
                <button onClick={showPurchaseHistory}
                className="text-3xl p-3 border border-white">View purchase history...</button>

                <button onClick={handleLogout}
                className="text-3xl p-3 border border-white">Log out</button>
            </div>
        </>
    );
}

export default Page;
