import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/tools/vram-calc/index.html",
        destination: "/vram-calc.html",
      },
    ];
  },
};

export default nextConfig;
