"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = ["/banner1.avif", "/banner2.avif", "/banner3.avif"];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[1920px] mx-auto rounded-lg overflow-hidden">
      <div className="flex animate-scroll">
        <div className="flex-none w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`Advertisement Banner ${currentIndex + 1}`}
            width={1920}
            height={960}
            className="w-full h-[400px] object-cover"
            priority
          />
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 text-2xl rounded-r">
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 text-2xl rounded-l">
        →
      </button>
    </div>
  );
}
