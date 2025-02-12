import UserModel from "@/db/models/UserModel";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await UserModel.register(body);
    return Response.json("Registered successfully", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.issues[0].message },
        { status: 400 }
      );
    }
    if ((error as Error).name === "error") {
      return Response.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
