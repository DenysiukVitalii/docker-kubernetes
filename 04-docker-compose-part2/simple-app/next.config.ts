import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/healthz",
        destination: "/api/healthz",
      },
    ];
  },
};

export default nextConfig;
