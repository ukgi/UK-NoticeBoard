import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/register")) {
    if (request.cookies.has("visited") === false) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: true,
        httpOnly: true,
      });
      return response;
    }
  } else {
    const response = NextResponse.next();
    response.cookies.delete("visited");
    return response;
  }
  return NextResponse.next();
}
