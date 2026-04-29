'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, Mail, X as XIcon } from 'lucide-react';
import { SectionBadge } from '@/components/ui/SectionBadge';
import { insertPartnerLead } from '@/lib/firebase';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useMetalSpotlight } from '@/lib/useMetalSpotlight';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEGMENT_KEYS = [
  'exchange',
  'fintech',
  'energy',
  'mobility',
  'cpg',
  'web3',
  'other',
] as const;

const PARTNERSHIP_KEYS = [
  'missions',
  'banners',
  'cashback',
  'geo',
  'loyalty',
  'irl',
  'explore',
] as const;

const BUDGET_KEYS = [
  'under5',
  '5to25',
  '25to100',
  'over100',
  'tbd',
] as const;

export function PartnersForm() {
  const t = useTranslations('pages.parceiros.form');
  const tContact = useTranslations('pages.parceiros.contact');
  const locale = useLocale();
  const titleRef = useMetalSpotlight<HTMLHeadingElement>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [segment, setSegment] = useState('');
  const [partnership, setPartnership] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!name.trim() || !email.trim() || !company.trim()) {
      setStatus('error');
      setErrorMsg(t('errorRequired'));
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setErrorMsg(t('errorEmail'));
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const result = await insertPartnerLead({
      name,
      email,
      company,
      role: role || undefined,
      segment: segment || undefined,
      partnershipType: partnership || undefined,
      budget: budget || undefined,
      message: message || undefined,
      locale,
      source: 'website-partner',
    });

    if (result.ok) {
      setStatus('success');
      trackEvent('partner_lead_submitted', {
        locale,
        segment: segment || 'unspecified',
        partnership: partnership || 'unspecified',
        budget: budget || 'unspecified',
      });
    } else {
      setStatus('error');
      setErrorMsg(t('errorGeneric'));
      trackEvent('partner_lead_failed', { locale, error: result.error });
    }
  }

  const inputCls =
    'w-full rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-60';

  const isLocked = status === 'submitting' || status === 'success';

  return (
    <section id="partner-form" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <SectionBadge>{t('badge')}</SectionBadge>
          <h2 ref={titleRef} className="section-title mt-5 metal-text">
            {t('title')}
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-base md:text-lg text-white/55 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="metal-card mt-12 rounded-3xl p-6 md:p-8"
        >
          {/* Row 1: name + email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t('fields.name.label')} required>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLocked}
                placeholder={t('fields.name.placeholder')}
                className={inputCls}
                autoComplete="name"
              />
            </Field>

            <Field label={t('fields.email.label')} required>
              <input
                type="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked}
                placeholder={t('fields.email.placeholder')}
                className={inputCls}
                autoComplete="email"
              />
            </Field>
          </div>

          {/* Row 2: company + role */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t('fields.company.label')} required>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isLocked}
                placeholder={t('fields.company.placeholder')}
                className={inputCls}
                autoComplete="organization"
              />
            </Field>

            <Field label={t('fields.role.label')}>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isLocked}
                placeholder={t('fields.role.placeholder')}
                className={inputCls}
                autoComplete="organization-title"
              />
            </Field>
          </div>

          {/* Row 3: segment + partnership */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t('fields.segment.label')}>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                disabled={isLocked}
                className={cn(inputCls, 'cursor-pointer')}
              >
                <option value="">{t('fields.segment.placeholder')}</option>
                {SEGMENT_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {t(`fields.segment.options.${k}`)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t('fields.partnership.label')}>
              <select
                value={partnership}
                onChange={(e) => setPartnership(e.target.value)}
                disabled={isLocked}
                className={cn(inputCls, 'cursor-pointer')}
              >
                <option value="">{t('fields.partnership.placeholder')}</option>
                {PARTNERSHIP_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {t(`fields.partnership.options.${k}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Row 4: budget */}
          <div className="mt-4">
            <Field label={t('fields.budget.label')}>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={isLocked}
                className={cn(inputCls, 'cursor-pointer')}
              >
                <option value="">{t('fields.budget.placeholder')}</option>
                {BUDGET_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {t(`fields.budget.options.${k}`)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Row 5: message */}
          <div className="mt-4">
            <Field label={t('fields.message.label')}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLocked}
                placeholder={t('fields.message.placeholder')}
                rows={4}
                className={cn(inputCls, 'resize-y min-h-[100px]')}
              />
            </Field>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLocked}
            className={cn(
              'mt-6 w-full inline-flex items-center justify-center gap-2 rounded-[16px] px-8 py-4 text-base font-bold',
              status === 'success' ? 'metal-cta-champagne' : 'metal-cta',
              'disabled:opacity-70 disabled:cursor-not-allowed'
            )}
          >
            {status === 'success' ? (
              <>
                <Check className="h-4 w-4" />
                {t('success')}
              </>
            ) : status === 'submitting' ? (
              t('submitting')
            ) : (
              <>
                {t('submit')}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {status === 'error' && (
            <p
              role="alert"
              className="mt-4 inline-flex items-center gap-2 text-sm text-red-300/90"
            >
              <AlertCircle className="h-4 w-4" />
              {errorMsg}
            </p>
          )}
        </motion.form>

        {/* Direct contact strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
            {tContact('label')}
          </div>
          <a
            href={`mailto:${tContact('email')}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-secondary-light transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            {tContact('email')}
          </a>
          <a
            href={`https://x.com/${tContact('x').replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-secondary-light transition-colors"
          >
            <XIcon className="h-3.5 w-3.5" />
            {tContact('x')}
          </a>
        </div>
        <p className="mt-3 text-center text-xs text-white/35">
          {tContact('note')}
        </p>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2">
        {label}
        {required && <span className="text-secondary-light ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
