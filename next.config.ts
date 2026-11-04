import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep repository instructions maintained by the owner.
  agentRules: false,
  devIndicators: false,
  experimental: {
    // Cache restores can feed the Tailwind loader the previous stylesheet.
    // Keep production CSS fresh until https://github.com/vercel/next.js/issues/100326 is fixed.
    turbopackFileSystemCacheForBuild: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
