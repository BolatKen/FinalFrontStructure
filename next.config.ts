import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leka-beauty-backend-bucket.s3.eu-north-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  // Включаем статическую оптимизацию
  experimental: {
    optimizePackageImports: ["@/components", "@/lib"],
  },
};

export default nextConfig;
