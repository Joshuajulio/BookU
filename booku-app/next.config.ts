import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gramedia.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
