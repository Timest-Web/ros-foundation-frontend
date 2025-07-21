import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Check if the user is trying to access a protected admin route
    if (pathname.startsWith("/ros/admin") && token?.role !== "admin") {
      // If not an admin, redirect them to a generic error page or their own login
      return NextResponse.redirect(new URL("/ros/beneficiary/signin", req.url));
    }
    
    // Check for beneficiary routes
    if (pathname.startsWith("/ros/beneficiary") && token?.role !== "beneficiary") {
      return NextResponse.redirect(new URL("/ros/admin/signin", req.url));
    }

    // Check for children routes
    if (pathname.startsWith("/ros/children") && token?.role !== "children") {
      return NextResponse.redirect(new URL("/ros/admin/signin", req.url));
    }

    // If all checks pass, allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      // This callback is used to decide if the middleware should run.
      // If `authorized` returns `true`, the middleware is executed.
      // If it returns `false`, the user is redirected to the sign-in page.
      authorized: ({ token }) => !!token, // !!token ensures the user is logged in
    },
  }
);

// This configures the middleware to run ONLY on the specified paths.
export const config = {
  matcher: [
    "/ros/admin/:path*",
    "/ros/beneficiary/:path*",
    "/ros/children/:path*",
  ],
};