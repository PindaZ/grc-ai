import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const { handlers, auth, signIn, signOut } = NextAuth({
    // adapter: PrismaAdapter(prisma), // Disabled for Mock MVP until DB migration is applied
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Mock auth for PoC - in real app query DB
                if (credentials.email === "demo@grc.ai" && credentials.password === "demo123") {
                    return {
                        id: "demo-user-id",
                        name: "John Dekker",
                        email: "demo@grc.ai",
                        role: "admin",
                        image: null
                    }
                }
                return null
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin", // Custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as string
            }
            return session
        },
    },
})
