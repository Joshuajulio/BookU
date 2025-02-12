"use server";

import { cookies } from "next/headers";

export default async function CheckCookie() {
  "use server";
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  return access_token;
}
