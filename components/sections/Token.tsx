'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { ButtonLink } from '@/components/ui/ButtonLink';

// PLACEHOLDER — substituir por endereço real da mint quando disponível.
const MINT_ADDRESS = process.env.NEXT_PUBLIC_CNB_MINT_ADDRESS ?? '';

export function Token() {
  const t = useTranslations('token');
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!MINT_ADDRESS) return;
    navigator.clipboard.writeText(MINT_ADDRESS);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="token" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionBadge>{t('badge')}</SectionBadge>
            <h2 className="section-title mt-5 text-white">{t('title')}</h2>
            <p className="mt-5 text-base md:text-lg text-white/55 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-border-glow/40 bg-card-gradient p-7 md:p-9"
            >
              {/* Mint */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {t('mintAddress')}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <code className="flex-1 truncate rounded-xl border border-white/[0.06] bg-bg-deep/60 px-4 py-3 font-mono text-xs md:text-sm text-primary/90">
                    {MINT_ADDRESS || t('mintPlaceholder')}
                  </code>
                  {MINT_ADDRESS && (
                    <button
                      onClick={copy}
                      aria-label="Copy mint address"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <dl className="mt-7 grid grid-cols-3 gap-3">
                {(['supply', 'holders', 'network'] as const).map((k) => (
                  <div key={k} className="rounded-2xl border border-white/[0.06] bg-bg-deep/40 p-4">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {t(`stats.${k}`)}
                    </dt>
                    <dd className="mt-1.5 text-base md:text-lg font-semibold text-white truncate">
                      {t(`stats.${k}Value`)}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Links */}
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink
                  href={
                    MINT_ADDRESS
                      ? `https://solscan.io/token/${MINT_ADDRESS}`
                      : 'https://solscan.io'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  {t('links.solscan')}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </ButtonLink>
                <ButtonLink
                  href={
                    MINT_ADDRESS
                      ? `https://jup.ag/swap/SOL-${MINT_ADDRESS}`
                      : 'https://jup.ag'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  {t('links.jupiter')}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </ButtonLink>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
