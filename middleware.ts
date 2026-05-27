import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getPublicSupabaseConfig, isSupabaseConfigured } from "@/lib/env";
import { isEmailAllowedForInternal } from "@/lib/auth/internal-access";

const INTERNAL_PREFIX = "/internal";
const LOGIN_PATH = "/login";

function isInternalPath(pathname: string): boolean {
  return pathname === INTERNAL_PREFIX || pathname.startsWith(`${INTERNAL_PREFIX}/`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isInternalPath(pathname) && pathname !== LOGIN_PATH) {
    return NextResponse.next();
  }

  if (!isSupabaseConfigured()) {
    if (isInternalPath(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = LOGIN_PATH;
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const response = NextResponse.next({ request });
  const { url, anonKey } = getPublicSupabaseConfig();

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname === LOGIN_PATH) {
    if (user?.email && isEmailAllowedForInternal(user.email)) {
      const url = request.nextUrl.clone();
      url.pathname = INTERNAL_PREFIX;
      return NextResponse.redirect(url);
    }

    if (user?.email && !isEmailAllowedForInternal(user.email)) {
      await supabase.auth.signOut();
    }

    return response;
  }

  if (!user?.email) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (!isEmailAllowedForInternal(user.email)) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("error", "not_allowed");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/internal/:path*", "/login"],
};
