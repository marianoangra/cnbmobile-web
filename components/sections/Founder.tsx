'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Globe, Instagram, Linkedin } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';

export function Founder() {
  const t = useTranslations('founder');

  return (
    <section id="founder" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02]">
              <Image
                src="/images/founder.jpg"
                alt={t('alt')}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[20px]"
              />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <SectionBadge variant="primary">{t('badge')}</SectionBadge>
            <h2 className="section-title mt-5 text-white">{t('name')}</h2>
            <p className="mt-3 text-base md:text-lg font-medium text-primary">
              {t('role')}
            </p>
            <div className="mt-7 space-y-5 text-base md:text-lg text-white/65 leading-relaxed">
              <p>{t('bio1')}</p>
              <p>{t('bio2')}</p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://rafaelmariano.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/85 hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-colors"
              >
                <Globe className="h-4 w-4" />
                rafaelmariano.com.br
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://instagram.com/rafaelmariano"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/85 hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @rafaelmariano
              </a>
              <a
                href="https://www.linkedin.com/in/palestranterafaelmariano"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/85 hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                palestranterafaelmariano
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
