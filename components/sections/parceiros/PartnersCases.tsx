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
  /**
   * Optional logo path under /public. If omitted, the card renders the
   * partner name in big metallic typography as a fallback.
   * Drop SVGs at e.g. public/partners/bingx.svg and set them here.
   */
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
};

const PARTNERS: Partner[] = [
  {
    key: 'bingx',
    url: process.env.NEXT_PUBLIC_BINGX_URL ?? 'https://bingx.com',
    // logo: '/partners/bingx.svg', logoWidth: 160, logoHeight: 40,
  },
  {
    key: 'okx',
    url: process.env.NEXT_PUBLIC_OKX_URL ?? 'https://okx.com',
    // logo: '/partners/okx.svg', logoWidth: 160, logoHeight: 40,
  },
  {
    key: 'kast',
    url: process.env.NEXT_PUBLIC_KAST_URL ?? '#',
    // logo: '/partners/kast.svg', logoWidth: 160, logoHeight: 40,
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
                className="metal-card group relative overflow-hidden rounded-3xl p-7 md:p-8 cursor-pointer flex flex-col"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-secondary/10 blur-3xl"
                />

                <div className="relative flex-1">
                  {/* Role chip */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/[0.08] px-3 py-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary-light" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-secondary-light">
                      {t(`items.${p.key}.role`)}
                    </span>
                  </div>

                  {/* Logo or text fallback */}
                  <div className="mt-6 flex h-14 items-center">
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt={t(`items.${p.key}.name`)}
                        width={p.logoWidth ?? 160}
                        height={p.logoHeight ?? 40}
                        className="object-contain object-left"
                        priority={false}
                      />
                    ) : (
                      <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        {t(`items.${p.key}.name`)}
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-sm text-white/60 leading-relaxed">
                    {t(`items.${p.key}.description`)}
                  </p>
                </div>

                {hasLink && (
                  <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary-light group-hover:text-secondary-light/80 transition-colors">
                    {t(`items.${p.key}.cta`)}
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
