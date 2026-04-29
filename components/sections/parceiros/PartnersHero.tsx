'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, ShieldCheck } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { Stars } from '@/components/ui/Stars';
import { useMetalSpotlight } from '@/lib/useMetalSpotlight';

export function PartnersHero() {
  const t = useTranslations('pages.parceiros.hero');
  const headlineRef = useMetalSpotlight<HTMLSpanElement>();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="absolute inset-0 bg-hero-gradient" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <Stars count={90} seed={47} />
      <div aria-hidden className="absolute inset-0 bg-glow-tr" />
      <div aria-hidden className="absolute inset-0 bg-glow-bl" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] z-10"
        style={{
          background: `linear-gradient(to bottom,
            rgba(5, 8, 5, 0) 0%,
            rgba(5, 8, 5, 0.05) 18%,
            rgba(5, 8, 5, 0.18) 35%,
            rgba(5, 8, 5, 0.38) 52%,
            rgba(5, 8, 5, 0.62) 68%,
            rgba(5, 8, 5, 0.82) 82%,
            rgba(5, 8, 5, 0.95) 92%,
            rgba(5, 8, 5, 1) 100%
          )`,
        }}
      />

      <div className="relative z-20 mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionBadge variant="primary">{t('badge')}</SectionBadge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline mt-6 text-white"
            >
              {t('headlineLine1')}
              <br />
              <span ref={headlineRef} className="metal-text">
                {t('headlineLine2')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hero-subtitle mt-7 max-w-xl"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <a
                href="#partner-form"
                className="metal-cta inline-flex items-center justify-center gap-2 rounded-[16px] px-8 py-4 text-base font-bold"
              >
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#partner-offerings"
                className="metal-outline inline-flex items-center justify-center gap-2 rounded-[16px] px-8 py-4 text-base font-bold"
              >
                {t('ctaSecondary')}
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Right: partner stamp */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="metal-card relative w-full max-w-sm rounded-3xl p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-secondary/10 blur-3xl"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/[0.08] px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-secondary-light" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-secondary-light">
                    {t('partnerStamp')}
                  </span>
                </div>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    BingX
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                    Exchange
                  </span>
                </div>

                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  {t('partnerStampHint')}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-white/35 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  Mainnet · Solana · CNB
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
