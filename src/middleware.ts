import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  if (hasAuthCookie(request) && isLoginPage(request))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

const hasAuthCookie = (request: NextRequest) => {
  return !!request.cookies.get("auth");
};

const isLoginPage = (request: NextRequest) => {
  console.log(request.url);
  return request.url.includes("/login");
};
