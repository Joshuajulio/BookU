import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");

  if (!access_token) return redirect("/login");
  return children;
}
