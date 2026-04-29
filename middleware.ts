import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Runs on every request to a non-static, non-API path. Responsible for:
//   1. Reading the NEXT_LOCALE cookie (set when user switches manually).
//   2. Falling back to the Accept-Language header for first-time visitors.
//   3. 307-redirecting to /en or /es when needed (PT renders at /).
// Locale-specific routing config lives in i18n/routing.ts.
export default createMiddleware(routing);

export const config = {
  // Match all paths except API, _next, _vercel, and static files (anything
  // with a dot in the last segment, e.g. /favicon.ico, /robots.txt).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
