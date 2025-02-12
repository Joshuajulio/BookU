"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  revalidatePath("/");
  redirect("/");
}
