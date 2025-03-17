import type { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    },
  );

  const pathname = request.nextUrl.pathname;

  // Redirect authenticated users away from public routes
  if (session && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (
    !session &&
    (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard", "/dashboard/:path*"], // Apply middleware to specific routes
};
