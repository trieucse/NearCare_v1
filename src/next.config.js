/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONTRACT_NAME: process.env.CONTRACT_NAME,
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
};

module.exports = nextConfig;
