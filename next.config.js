/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose", "mongodb"]
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    // Exclude server-side modules from client bundle
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      "net": false,
      "dns": false,
      "child_process": false,
      "tls": false,
    }
    return config
  }
}

module.exports = nextConfig