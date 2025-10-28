import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // If using custom image domains
  images: {
    domains: ["kyronixia.com"],
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
