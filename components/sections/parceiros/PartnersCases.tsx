'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { useMetalSpotlight } from '@/lib/useMetalSpotlight';

type Partner = {
  key: 'bingx' | 'okx' | 'kast';
  url: string;
  banner: string;
};

const PARTNERS: Partner[] = [
  {
    key: 'bingx',
    url: process.env.NEXT_PUBLIC_BINGX_URL ?? 'https://bingx.com',
    banner: '/partners/bingx.jpg',
  },
  {
    key: 'okx',
    url: process.env.NEXT_PUBLIC_OKX_URL ?? 'https://okx.com',
    banner: '/partners/okx.png',
  },
  {
    key: 'kast',
    url: process.env.NEXT_PUBLIC_KAST_URL ?? '#',
    banner: '/partners/kast.png',
  },
];

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

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PARTNERS.map((p, i) => {
            const hasLink = p.url !== '#';
            const Wrapper = hasLink ? motion.a : motion.div;
            const wrapperProps = hasLink
              ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Wrapper
                key={p.key}
                {...wrapperProps}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="metal-card group relative overflow-hidden rounded-3xl flex flex-col cursor-pointer"
              >
                {/* Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-deep">
                  <Image
                    src={p.banner}
                    alt={t(`items.${p.key}.name`)}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    priority={i === 0}
                  />
                  {/* Subtle gradient at the bottom for legibility transition */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-black/40"
                  />
                </div>

                {/* Body */}
                <div className="relative flex flex-1 flex-col p-6 md:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/[0.08] px-3 py-1.5 self-start">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary-light" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-secondary-light">
                      {t(`items.${p.key}.role`)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-white/65 leading-relaxed flex-1">
                    {t(`items.${p.key}.description`)}
                  </p>

                  {hasLink && (
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary-light group-hover:text-secondary-light/80 transition-colors">
                      {t(`items.${p.key}.cta`)}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
