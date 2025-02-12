import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { UserSecured } from "./db/models/UserModel";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
    const jwt = token?.value as string;

    const { payload } = await jose.jwtVerify<UserSecured>(jwt, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload._id.toString());
    requestHeaders.set("x-user-name", payload.name);
    requestHeaders.set("x-user-username", payload.username);
    requestHeaders.set("x-user-email", payload.email);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }
}
