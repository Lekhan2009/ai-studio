
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose", "mongodb"]
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com']
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      "net": false,
      "dns": false,
      "child_process": false,
      "tls": false,
      "aws4": false,
      "aws-crt": false,
      "kerberos": false,
      "snappy": false,
      "mongodb-client-encryption": false,
      "@mongodb-js/zstd": false,
      "@aws-sdk/credential-providers": false,
      "gcp-metadata": false,
      "coffee-script": false
    }
    return config
  }
}

module.exports = nextConfig
