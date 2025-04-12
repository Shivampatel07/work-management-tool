import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // distDir: 'dist'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
        search: '',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
