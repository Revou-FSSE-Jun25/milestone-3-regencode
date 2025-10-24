import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl; 
    console.log("middleware", request.url);

    // define public routes
    const publicRoutes = ["/login", "/", "/faq"];

    // check if the route is public
    if (publicRoutes.includes(pathname)) {
        console.log("public routes");
        return NextResponse.next();
    }

    // this is protected by cookies
    const token = request.cookies.get("auth-token")?.value;
    const userRole = request.cookies.get("user-role")?.value;

    if (!token) {
       const loginUrl = new URL("/login", request.url);
       loginUrl.searchParams.set("redirect", pathname);
       return NextResponse.redirect(loginUrl);
    }
    if (pathname.startsWith("/login")) {
        return NextResponse.redirect("/");
    }

    //if have token but not have the user role cannot enter
    if (pathname.startsWith("/admin") && userRole !== "admin") {
        const accessDeniedURL = new URL("/login", request.url);
        accessDeniedURL.searchParams.set("error", "harus admin bos");

        return NextResponse.redirect(accessDeniedURL);
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        /*
            * Match all request paths except for the ones starting with:
            * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - public folder
        */
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};
