import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {  CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

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
            <AuthProvider>
                <CartProvider>
                    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                        {children}
                        <footer className="border-t border-white">
                            2025. Made by Thomas Gozalie.
                        </footer>
                    </body>
                </CartProvider>
            </AuthProvider>
        </html>
    );
}
