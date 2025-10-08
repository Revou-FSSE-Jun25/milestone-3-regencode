import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRocket, fas } from '@fortawesome/free-solid-svg-icons'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Revoshop",
    description: "Revoshop is an online store that sells various items",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <header
                className="flex w-full items-center h-[10vh] border-b border-white place-content-between"
                >
                    <div className="flex h-full mx-auto text-5xl text-white items-center">
                        <FontAwesomeIcon icon={faRocket} className="h-[50%] mr-2" /> 
                        <h1>revoshop</h1>
                    </div>
                    <FontAwesomeIcon 
                    icon={faBars} 
                    className="h-[70%] aspect-square my-auto mr-1"
                    />
                </header>
                {children}
                <footer className="border-t border-white">
                    2025. Made by Thomas Gozalie.
                </footer>
            </body>
        </html>
    );
}
