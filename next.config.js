/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
