import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";

const UNAUTHENTICATED_PATHS = ["/", "/login"];
const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";

export async function middleware(request: NextRequest) {
  try {
    const sessionCookie = await getSessionCookie(request);

    if (
      !sessionCookie &&
      !UNAUTHENTICATED_PATHS.includes(request.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }

    if (
      sessionCookie &&
      UNAUTHENTICATED_PATHS.includes(request.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
