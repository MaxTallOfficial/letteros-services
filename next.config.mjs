/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' removed — API Routes require server runtime
  serverExternalPackages: ["better-sqlite3"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // html-minifier-terser uses clean-css which references Node.js 'fs' module.
      // These are never actually called in the browser (only source-map paths),
      // so we safely stub them out.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        url: false,
      };
    }
    return config;
  },
};

export default nextConfig;
