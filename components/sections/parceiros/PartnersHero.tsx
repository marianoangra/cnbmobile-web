'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
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

          {/* Right: CNB token visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="metal-card relative w-full max-w-sm rounded-3xl p-8 overflow-hidden"
            >
              {/* Decorative glows */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-secondary/10 blur-3xl"
              />

              {/* Sci-fi corner brackets */}
              <div aria-hidden className="absolute top-3 left-3 h-3 w-3 border-l border-t border-secondary/40" />
              <div aria-hidden className="absolute top-3 right-3 h-3 w-3 border-r border-t border-secondary/40" />
              <div aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-l border-b border-secondary/40" />
              <div aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-r border-b border-secondary/40" />

              {/* Status pulse */}
              <div className="relative inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/[0.06] px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-green-400/90">
                  Mainnet Live
                </span>
              </div>

              {/* CNB hero text */}
              <div className="relative mt-7 text-center">
                <div className="metal-text text-[5.5rem] md:text-[6.5rem] font-black tracking-tighter leading-none">
                  CNB
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.32em] text-secondary-light">
                  DePIN · Solana
                </div>
              </div>

              {/* Stat chips */}
              <div className="relative mt-7 grid grid-cols-3 gap-2">
                <div className="metal-stat-card rounded-xl py-3 px-2 text-center">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    Supply
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    21B
                  </div>
                </div>
                <div className="metal-stat-card rounded-xl py-3 px-2 text-center">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    Token
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    SPL
                  </div>
                </div>
                <div className="metal-stat-card rounded-xl py-3 px-2 flex flex-col items-center justify-center">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    Brasil
                  </div>
                  <svg
                    width="18"
                    height="13"
                    viewBox="0 0 28 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                    className="mt-1.5"
                  >
                    <rect width="28" height="20" rx="2" fill="#009c3b" />
                    <polygon points="14,3 25,10 14,17 3,10" fill="#ffdf00" />
                    <circle cx="14" cy="10" r="3.4" fill="#002776" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
