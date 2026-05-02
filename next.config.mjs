import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'usejuicemobile.com' },
      { protocol: 'https', hostname: 'cnbmobile.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Surface the static pitch deck under a friendlier URL.
        { source: '/demoday', destination: '/pitch.html' },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
