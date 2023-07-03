/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["image.tmdb.org"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "image.tmdb.org",
          port: "",
          pathname: "/**/*",
        },
      ],
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;
  