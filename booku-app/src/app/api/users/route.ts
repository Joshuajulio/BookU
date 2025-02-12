import UserModel from "@/db/models/UserModel";

export async function GET() {
  const users = await UserModel.findAll();
  return Response.json(users);
}
