import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // If using custom image domains
  images: {
    // Or use remotePatterns for Next.js 13+
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
