import { warn } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("url", request.url);

    
    
    //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/checkout/:path*', '/panel/:path*']
}
