import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = getSessionCookie(request);

    // Redirect unauthenticated users away from dashboard
    if (
      !sessionCookie &&
      (pathname.startsWith("/dashboard") || pathname.startsWith("/dashboard/"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect authenticated users away from login/root only if they're specifically on those paths
    if (sessionCookie && (pathname === "/" || pathname === "/login")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/dashboard", "/dashboard/:path*"],
};
