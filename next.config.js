/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: "mongodb://127.0.0.1:27017/userBDstore",
  },
};

module.exports = nextConfig;
