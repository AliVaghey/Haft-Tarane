import { NextResponse } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-us", "en", "fa-ir", "fa"];

function getLocale(request) {
  const negotiatorHeader = {};
  request.headers.forEach((value, key) => (negotiatorHeader[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeader }).languages();

  const defaultLocale = "fa-ir";
  const locale = match(languages, locales, defaultLocale);

  return locale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);

  return NextResponse.redirect(
    new URL(
      // `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      `/${"fa"}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url,
    ),
  );
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
