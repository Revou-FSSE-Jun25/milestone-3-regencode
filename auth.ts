import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

interface User {
    id: string,
    email: string,
    password: string,
    name?: string
}

const mapDB = new Map<string, User>();
mapDB.set("admin", {
    id: "1",
    email: "admin",
    password: "admin",
});

mapDB.set("user@email.com", {
    id: "2",
    email: "user@email.com",
    password: "user",
});

const getUserFromDB = (email: string, password: string): User | null => {

    const existingUser = mapDB.get(email);
    if(existingUser && existingUser.password === password) {
        return existingUser;
    }
    return null;
}

export const auth = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        const user = getUserFromDB(credentials.email, credentials.password);
        if(!user) {
            throw new Error("Invalid credentials.");
        }
        return user; 
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});
