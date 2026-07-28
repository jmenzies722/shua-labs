import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Gate for /dashboard.
 *
 * Fails CLOSED. If DASHBOARD_USER / DASHBOARD_PASSWORD are not set, the route 404s rather than
 * serving revenue figures to the internet. A misconfiguration must never be the permissive case —
 * that is the whole lesson from the privacy guard, applied to HTTP.
 *
 * Basic auth is deliberate: no session, no database, no login page to get wrong. One reader,
 * over TLS, on a route nobody links to.
 */
export function middleware(request: NextRequest) {
  const user = process.env.DASHBOARD_USER;
  const password = process.env.DASHBOARD_PASSWORD;

  // Not configured → behave as if the route does not exist.
  if (!user || !password) {
    return new NextResponse(null, { status: 404 });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = "";
    }
    const separator = decoded.indexOf(":");
    if (separator !== -1) {
      const suppliedUser = decoded.slice(0, separator);
      const suppliedPassword = decoded.slice(separator + 1);
      if (safeEqual(suppliedUser, user) && safeEqual(suppliedPassword, password)) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Shua Labs", charset="UTF-8"' },
  });
}

/** Constant-time-ish comparison. Not a threat model that warrants more, but free to do right. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
