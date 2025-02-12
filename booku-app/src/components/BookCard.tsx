"use client";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";

interface Book {
  _id: ObjectId;
  slug: string;
  image: string;
  title: string;
  author: string;
  final_price: number;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      key={book.slug}
      className="block min-w-[220px]">
      <div className="border rounded-lg p-2 sm:p-4 hover:shadow-lg transition-shadow h-full relative">
        <WishlistButton book={book} />
        <div className="relative h-[280px] mt-0 mb-2 sm:mb-4">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-contain rounded"
          />
        </div>
        <div className="h-[60px]">
          <h3 className="font-semibold text-sm sm:text-lg mb-1 line-clamp-2">
            {book.title}
          </h3>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-1">
          {book.author}
        </p>
        <p className="text-blue-600 font-bold text-sm sm:text-base">
          Rp. {book.final_price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}
