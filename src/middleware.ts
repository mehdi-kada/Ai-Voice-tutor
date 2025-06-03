import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes if you have any (e.g., landing page, sign-in, sign-up)
// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/sign-in(.*)',
//   '/sign-up(.*)',
//   // Add any other public routes here
// ]);

export default clerkMiddleware((auth, req) => {
  // If you have public routes, you can protect all other routes like this:
  // if (!isPublicRoute(req)) {
  //   auth().protect();
  // }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes, these are often handled separately or explicitly protected)
     * - trpc (tRPC routes, if you use them)
     * Match all paths that don't contain a dot (likely regular pages)
     * and all paths that end with common page extensions.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|trpc|.*\\..*).*)', // Matches pages without extensions
    '/(api|trpc)(.*)', // Ensure API routes are matched if you intend to protect them
    // Add specific page routes if the general matcher is too broad or too narrow
    // For example, if '/companions' is a page:
    '/companions/:path*',
  ],
};