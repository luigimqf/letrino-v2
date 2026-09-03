import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./shared/constants";
import { AUTH_COOKIE, GUEST_COOKIE, GUEST_COOKIE_OPTIONS } from "./shared/constants/cookies";
import { isGamemodePath } from "./shared/constants/modes";
import { createGuestCookie, readGuestCookie } from "./shared/lib/guest-session";

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

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = isGamemodePath(path)
    ? ({ path, whenAuthenticated: "next" } as const)
    : publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get(AUTH_COOKIE);

  let issuedGuest: string | null = null;

  if (!(await readGuestCookie(request.cookies.get(GUEST_COOKIE)?.value))) {
    issuedGuest = await createGuestCookie();
    request.cookies.set(GUEST_COOKIE, issuedGuest);
  }

  const response = isApiRoute(path)
    ? NextResponse.next({ request })
    : decideRoute(request, publicRoute, !!authToken);

  if (issuedGuest) {
    response.cookies.set({
      name: GUEST_COOKIE,
      value: issuedGuest,
      ...GUEST_COOKIE_OPTIONS,
    });
  }

  return response;
}

function isApiRoute(path: string): boolean {
  return path.startsWith("/api");
}

function decideRoute(
  request: NextRequest,
  publicRoute: { whenAuthenticated: "next" | "redirect" } | undefined,
  isAuthed: boolean,
): NextResponse {
  const next = () => NextResponse.next({ request });

  if (!isAuthed) return publicRoute ? next() : redirect(request, ROUTES.SIGN_IN);
  if (publicRoute?.whenAuthenticated === "redirect") return redirect(request, ROUTES.HOME);

  return next();
}

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;

  return NextResponse.redirect(url);
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     *
     * `api` fica de fora do lookahead de propósito: os route handlers também
     * precisam do cookie de convidado para repassá-lo ao backend.
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
