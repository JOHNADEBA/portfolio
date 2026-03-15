import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'], // prevents webpack from trying to bundle them incorrectly
  outputFileTracingIncludes: {
    '/api/download-cv': ['./node_modules/@sparticuz/chromium/bin/**'], // ensures binaries are traced/included
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "linkedin.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  turbopack: {},

  // Webpack configuration for Puppeteer
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "puppeteer-core"];
    }
    return config;
  },
};

export default nextConfig;
