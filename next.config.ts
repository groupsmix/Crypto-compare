import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for @opennextjs/cloudflare deployment
  // See: https://opennext.js.org/cloudflare
  output: "standalone",
};

export default nextConfig;
