'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { useMetalSpotlight } from '@/lib/useMetalSpotlight';

const BINGX_URL = process.env.NEXT_PUBLIC_BINGX_URL ?? 'https://bingx.com';

export function PartnersCases() {
  const t = useTranslations('pages.parceiros.cases');
  const titleRef = useMetalSpotlight<HTMLHeadingElement>();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="max-w-2xl">
          <SectionBadge>{t('badge')}</SectionBadge>
          <h2 ref={titleRef} className="section-title mt-5 metal-text">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/55 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured: BingX */}
          <motion.a
            href={BINGX_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="metal-card group lg:col-span-2 relative overflow-hidden rounded-3xl p-8 md:p-10 cursor-pointer"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/[0.08] px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary-light" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-secondary-light">
                  {t('bingx.role')}
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3 flex-wrap">
                <span className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                  {t('bingx.name')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                  Exchange · Global
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed">
                {t('bingx.description')}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary-light group-hover:text-secondary-light/80 transition-colors">
                {t('bingx.cta')}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </motion.a>

          {/* Soon slot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="metal-stat-card rounded-3xl p-7 md:p-8 border-dashed"
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
              {t('soon.title')}
            </div>
            <div className="mt-6 flex items-center justify-center h-24">
              <div
                aria-hidden
                className="flex items-center gap-2 text-white/25"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </div>
            </div>
            <p className="mt-2 text-xs text-white/50 leading-relaxed">
              {t('soon.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
