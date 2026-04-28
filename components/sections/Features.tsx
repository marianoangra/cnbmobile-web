'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Shield, Trophy, Coins, Users, Cpu, type LucideIcon } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';

const ITEMS: Array<{ key: string; icon: LucideIcon }> = [
  { key: 'charging', icon: Zap },
  { key: 'proof', icon: Shield },
  { key: 'ranking', icon: Trophy },
  { key: 'token', icon: Coins },
  { key: 'referral', icon: Users },
  { key: 'depin', icon: Cpu },
];

export function Features() {
  const t = useTranslations('features');

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="max-w-2xl">
          <SectionBadge>{t('badge')}</SectionBadge>
          <h2 className="section-title mt-5 text-white">{t('title')}</h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/55 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-card-gradient border border-border-glow/40 rounded-3xl p-7 transition-all duration-300 hover:border-primary/45 hover:-translate-y-1"
              >
                {/* Icon tile */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/[0.08] border border-primary/20 text-primary mb-5 transition-colors group-hover:bg-primary/[0.14] group-hover:border-primary/40">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                  {t(`items.${item.key}.description`)}
                </p>
                {/* Decorative corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
