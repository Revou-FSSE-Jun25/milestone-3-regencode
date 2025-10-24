"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";


const ClientView = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const { user, login, logout, cookieLogin } = useAuth();

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam === "admin-required") {
            setError("Admin access required");
        } else if (errorParam === "login-required") {
            setError("Please login");
        }
        const token = localStorage.getItem("auth-token");
        const savedRole = localStorage.getItem("user-role");
        if (token && savedRole) {
            const redirect =
                searchParams.get("redirect") ||
                (savedRole === "admin" ? "/admin" : "/");
            router.push(redirect);
        }
    }, [searchParams, router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        login(username, password) ?? setError("Invalid credentials");
    };


    return(
        <>
        <div className="w-[50%] h-[80vh] mx-auto my-[10vh] items-center border border-white mt-[15vh]">

            <button onClick={() => router.back()}
            className="flex flex-row h-1 aspect-square text-3xl ml-0">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div className="flex w-[50%] h-[80vh] flex-col mx-auto items-center gap-10">
                <div
                className="flex h-[15vh] mx-auto text-5xl text-white items-center">
                    <FontAwesomeIcon icon={faRocket} className="h-[50%] mr-2" /> 
                    <h1>revoshop</h1>
                </div>
                <h1 className="text-4xl"> Log in to your account </h1>

                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}
                className="flex flex-col gap-3">
                    <label className="text-3xl" htmlFor="credentials-username"> 
                        Username
                        <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        required
                        className="w-[30vw] h-12 border border-white text-xl px-2" />
                    </label>

                    <label className="text-3xl" htmlFor="credentials-password"> 
                        Password
                        <input 
                        type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        required
                        className="w-[30vw] h-12 border border-white text-xl px-2" />
                    </label>

                    <br />
                    <br />
                    <input className="w-fit h-12 border border-white text-xl px-8 mx-auto"
                    type="submit"
                    value={"Log in"}
                    />
                </form>
            </div>
        </div>
        </>
    );

}
export default ClientView;



