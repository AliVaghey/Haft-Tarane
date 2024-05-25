/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // output: "standalone",
  images: {
    unoptimized: true,
  },
  env: {
    // BACKEND_URL: "http://localhost:8000",
    BACKEND_URL: "https://bibak-safar-laravel.chbk.run",
  },
};

export default nextConfig;
