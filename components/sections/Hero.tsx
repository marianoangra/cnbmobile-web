'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { Stars } from '@/components/ui/Stars';
import { StoreButtons } from '@/components/ui/StoreButtons';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Layered backgrounds */}
      <div aria-hidden className="absolute inset-0 bg-hero-gradient" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <Stars count={110} seed={73} />
      <div aria-hidden className="absolute inset-0 bg-glow-tr" />
      <div aria-hidden className="absolute inset-0 bg-glow-bl" />

      <div className="relative z-20 mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
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
              <span className="text-primary">{t('headlineLine2')}</span>
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
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <StoreButtons size="lg" />
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex items-center gap-6 text-xs uppercase tracking-wider text-white/35 font-mono"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {t('statsLive')}
              </span>
              <span className="hidden sm:inline-block h-px w-8 bg-white/10" />
              <span>{t('statsToken')}</span>
              <span className="hidden sm:inline-block h-px w-8 bg-white/10" />
              <span>{t('statsBeta')}</span>
            </motion.div>
          </div>

          {/* Right: phone */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhoneMockup
              src="/images/screen-home.png"
              alt="CNB Mobile app — Início"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
