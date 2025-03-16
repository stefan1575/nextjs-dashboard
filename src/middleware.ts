import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = getSessionCookie(request);

    const isPublicRoute = ["/", "/login"].includes(pathname);

    // Redirect unauthenticated users away from protected routes
    if (!sessionCookie && !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect authenticated users away public routes
    if (sessionCookie && isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/",
    "/login",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
