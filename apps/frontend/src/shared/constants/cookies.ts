export const AUTH_COOKIE = "token";
export const REFRESH_COOKIE = "refresh-token";
export const GUEST_COOKIE = "guest_session";

export const GUEST_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
} as const;
