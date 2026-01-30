import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./shared/constants";

const publicRoutes = [
  { path: ROUTES.HOME, whenAuthenticated: "next" },
  { path: ROUTES.CALLBACK_SIGN_IN, whenAuthenticated: "redirect" },
  { path: ROUTES.CALLBACK_SIGN_UP, whenAuthenticated: "next" },
  { path: ROUTES.SIGN_UP, whenAuthenticated: "redirect" },
  { path: ROUTES.SIGN_IN, whenAuthenticated: "redirect" },
  { path: ROUTES.REFRESH_PASSWORD, whenAuthenticated: "redirect" },
  { path: ROUTES.FORGOT_PASSWORD, whenAuthenticated: "redirect" },
  { path: ROUTES.WORD_NOT_FOUND, whenAuthenticated: "next" },
  { path: ROUTES.LEADERBOARD, whenAuthenticated: "next" },
  { path: ROUTES.TUTORIAL, whenAuthenticated: "next" },
] as const;

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.SIGN_IN;

    return NextResponse.redirect(url);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
