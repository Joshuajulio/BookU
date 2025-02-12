import UserModel from "@/db/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = await UserModel.login(body);
    const response = NextResponse.json({ token });
    response.cookies.set("token", token);
    return response;
  } catch {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
