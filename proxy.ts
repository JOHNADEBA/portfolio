import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "sl", "de"];
const defaultLocale = "en";

// Add paths that should not be redirected
const publicPaths = [
  "/images",
  "/fonts",
  "/_next",
  "/favicon.ico",
  "/dp.png",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for public assets
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Get preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  let locale = defaultLocale;

  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().split("-")[0])
      .find((lang) => locales.includes(lang));

    if (preferred) locale = preferred;
  }

  // Redirect to /{locale}{pathname}
  const url = new URL(`/${locale}${pathname}`, request.url);
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, images, etc.)
    "/((?!api|_next/static|_next/image|images|fonts|favicon.ico|.*\\.jpg|.*\\.png|.*\\.svg).*)",
  ],
};
