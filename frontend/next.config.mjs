/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'rickandmortyapi.com',
      'localhost',
      'seu-dominio-de-api.com',
      '127.0.0.1'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  // Configuração para PWA
  experimental: {
    pwa: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
