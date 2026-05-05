import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'www.usejuicemobile.com' },
      { protocol: 'https', hostname: 'usejuicemobile.com' },
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
  async redirects() {
    return [
      // Alias domains → canonical usejuicemobile.com (preserve path).
      // Also requires each domain to be added to the Vercel project
      // and DNS pointed at Vercel.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value:
              '(www\\.)?(cnbmobile\\.(com|net|online|xyz|store|app)|cryptoinpocket\\.com)',
          },
        ],
        destination: 'https://www.usejuicemobile.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
