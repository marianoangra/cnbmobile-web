import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { PostHogProvider } from '@/components/PostHogProvider';
import { PostHogPageView } from '@/components/PostHogPageView';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cnbmobile.com'),
  icons: {
    icon: [
      { url: '/icon.jpg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/apple-icon.jpg', type: 'image/jpeg' },
    ],
    shortcut: '/icon.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
