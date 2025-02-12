"use server";

import ProtectedComponent from "@/components/ProtectedComponent";
import { WishlistWithBook } from "@/db/models/WishlistModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import WishlistCard from "@/components/WishlistCard";
import LoginLogoutButton from "@/components/LoginLogoutButton";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "http://localhost:3000";

export default async function Wishlist() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");

  if (!access_token) redirect("/login");

  const resp = await fetch(`${BASE_URL}/api/wishlist`, {
    headers: {
      Cookie: `access_token=${access_token?.value}`,
    },
  });

  if (!resp.ok) {
    return <div>Failed to fetch data</div>;
  }

  const data: WishlistWithBook[] = await resp.json();
  const books = data.map((book) => book.book);

  return (
    <ProtectedComponent>
      <div className="min-h-screen">
        <header className="flex flex-col gap-4 mb-6 p-2 sm:p-4 sticky top-0 bg-white z-50 border-b">
          <div className="flex justify-between items-center gap-4 max-w-7xl mx-auto w-full">
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="Bookstore Logo"
                width={50}
                height={50}
                priority
                className="w-32 sm:w-auto"
              />
            </Link>
            <Link
              href="/books"
              className="w-full max-w-2xl mx-auto px-2 sm:px-0">
              <input
                type="search"
                placeholder="Search for books..."
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-3xl border border-gray-300 focus:outline-none focus:border-gray-500"
              />
            </Link>
            <div className="flex gap-2 sm:gap-4">
              <Link
                href="/wishlist"
                className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-white text-gray-700 font-bold">
                Wishlist
              </Link>
              <LoginLogoutButton />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-2 sm:p-4">
          <h1 className="text-2xl font-bold mb-6">Books</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {books?.map((book) => (
              <WishlistCard key={book.slug} book={book} />
            ))}
          </div>
        </div>{" "}
      </div>
    </ProtectedComponent>
  );
}
