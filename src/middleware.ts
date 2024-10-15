import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // if (aMiddlewareUtility.isInSafeRouteWithoutAuthentication(request))
  //   return NextResponse.redirect(new URL("/login", request.url));

  // if (aMiddlewareUtility.isLoginPathWithAuthentication(request))
  //   return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next({
    headers: aMiddlewareUtility.getCustomHeaders(request),
  });
}

const aMiddlewareUtility = {
  getCustomHeaders: (request: NextRequest) => {
    var header = new Headers(request.headers);

    header.set("x-current-path", request.nextUrl.pathname);

    return header;
  },
  isLoginPathWithAuthentication: (request: NextRequest) => {
    const hasAuthCookie = (request: NextRequest) => {
      return !!request.cookies.get("auth");
    };

    return hasAuthCookie(request) && isLoginPage(request);
  },
  isAuthenticated: (request: NextRequest) => {
    return !!request.cookies.get("auth");
  },
  isInSafeRouteWithoutAuthentication: (request: NextRequest) => {
    return !request.cookies.get("auth") && !isLoginPage(request);
  },
};

function isLoginPage(request: NextRequest) {
  return request.nextUrl.pathname.includes("/login");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
