"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "http://localhost:3000";

export default function Register() {
  const [userInput, setUserInput] = useState({
    name: "Joshua",
    username: "joshua",
    email: "joshua@mail.com",
    password: "joshua",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-12 flex max-w-7xl w-full min-h-[600px]">
        <div className="flex-1 pr-8 border-r">
          <div className="flex flex-col items-center">
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="BookU Logo"
                width={200}
                height={200}
                className="h-32 w-auto mb-8"
              />
            </Link>
            <Image
              src="/focused-tiny-people-reading-books_74855-5836.avif"
              alt="Login Illustration"
              width={500}
              height={500}
              className="w-full max-w-md"
            />
          </div>
        </div>
        <div className="flex-1 pl-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Register for BookU
          </h2>
          <form className="space-y-4 " onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userInput.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-base font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={userInput.username}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={userInput.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={userInput.password}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="w-full py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-center block">
              Register
            </button>
          </form>
          <div className="text-center text-lg mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500">
              Login here
            </Link>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}
