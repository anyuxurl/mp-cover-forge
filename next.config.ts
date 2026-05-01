import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js stops detecting an outer lockfile.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
