'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { MockedHomeScreen } from '@/components/ui/MockedHomeScreen';
import { Stars } from '@/components/ui/Stars';
import { StoreButtons } from '@/components/ui/StoreButtons';
import { useMetalSpotlight } from '@/lib/useMetalSpotlight';

export function Hero() {
  const t = useTranslations('hero');
  const headlineRef = useMetalSpotlight<HTMLSpanElement>();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Layered backgrounds */}
      <div aria-hidden className="absolute inset-0 bg-hero-gradient" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <Stars count={110} seed={73} />
      <div aria-hidden className="absolute inset-0 bg-glow-tr" />
      <div aria-hidden className="absolute inset-0 bg-glow-bl" />

      {/* Bottom fade — long multi-stop dissolve into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] z-10"
        style={{
          background: `linear-gradient(to bottom,
            rgba(4, 11, 26, 0) 0%,
            rgba(4, 11, 26, 0.05) 18%,
            rgba(4, 11, 26, 0.18) 35%,
            rgba(4, 11, 26, 0.38) 52%,
            rgba(4, 11, 26, 0.62) 68%,
            rgba(4, 11, 26, 0.82) 82%,
            rgba(4, 11, 26, 0.95) 92%,
            rgba(4, 11, 26, 1) 100%
          )`,
        }}
      />

      <div className="relative z-20 mx-auto max-w-[1080px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline text-white"
            >
              <span className="block whitespace-normal sm:whitespace-nowrap">
                {t('headlineLine1')}
              </span>
              <span ref={headlineRef} className="metal-text block whitespace-normal sm:whitespace-nowrap">
                {t('headlineLine2')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hero-subtitle mt-7 max-w-xl"
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.08rem)' }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <StoreButtons size="lg" />
            </motion.div>

          </div>

          {/* Right: phone with live mocked home screen — sized to fit
              the hero viewport without scroll (~30% smaller than default). */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhoneMockup alt="CNB Mobile app — Início" priority width={202} height={436}>
              <MockedHomeScreen />
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
