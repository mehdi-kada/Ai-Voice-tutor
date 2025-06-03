import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // Replace with the actual Clerk image hostname if different
        port: "",
        pathname: "/**", // Allows any path under this hostname
      },
      // You can add other remote patterns here if needed
    ],
  },
  /* other config options here */
};

export default nextConfig;
