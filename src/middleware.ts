import NextAuth from "next-auth"
import { auth } from "@/auth"

export default auth((req) => {
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

    if (!req.auth && !isAuthPage) {
        const newUrl = new URL("/auth/signin", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
