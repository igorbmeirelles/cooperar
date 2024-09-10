/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
        basePath: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tvtropes.org",
        port: "",
        pathname: "/pmwiki/pub/images/",
      },
    ],
  },
};

export default nextConfig;
