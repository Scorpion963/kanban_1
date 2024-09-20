import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


const isProtectedRoute = createRouteMatcher(['/(.*)'])

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect()
  })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-pathname", req.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}