import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'example.com',
      'leka-beauty-backend-bucket.s3.eu-north-1.amazonaws.com'
    ], // сюда добавь нужные домены
  },
};

export default nextConfig;
