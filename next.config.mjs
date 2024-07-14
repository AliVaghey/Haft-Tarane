/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    BACKEND_URL: "http://localhost:8000",
    // BACKEND_URL: "https://bibak-safar-laravel.chbk.run",
    // BACKEND_URL: "https://back.bibaksafar.com",
  },
};

export default nextConfig;
