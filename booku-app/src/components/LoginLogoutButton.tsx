"use client";

import Link from "next/link";
import LogoutAction from "./LogoutAction";
import { useEffect, useState } from "react";
import CheckCookie from "./CheckCookie";

export default function LoginLogoutButton() {
  const [access_token, setAccessToken] = useState("");

  const checkCookies = async () => {
    const access_token = await CheckCookie();
    setAccessToken(access_token?.value || "");
  };

  const handleLogout = async () => {
    await LogoutAction();
    setAccessToken("");
  };

  useEffect(() => {
    checkCookies();
  }, [handleLogout]);

  return (
    <>
      {!access_token ? (
        <>
          <Link
            href="/login"
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-white text-gray-700 border border-gray-300 hover:border-gray-500 font-bold">
            Login
          </Link>
          <Link
            href="/register"
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-[#285EA8] text-white hover:bg-[#173C6A] font-bold">
            Register
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl bg-[#285EA8] text-white hover:bg-[#173C6A] font-bold">
            Logout
          </button>
        </>
      )}
    </>
  );
}
