import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  
  // 1. Define my real domain 
  // Do not include https://, just the domain name.
  const correctDomain = "krishnaadhikari.com"; 

  // 2. Check if the user is on the wrong domain 
  // We exclude 'localhost' so it still works on my computer.
  if (
    hostname && 
    !hostname.includes(correctDomain) && 
    !hostname.includes("localhost")
  ) {
    // 3. Redirect them to the correct domain
    const url = new URL(request.nextUrl.pathname, `https://${correctDomain}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run this on actual pages, not on static files like images
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};