'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Wallet, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { cn } from '@/lib/cn';

export function Nav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navItems = [
    { href: '#features', label: t('features') },
    { href: '#how-it-works', label: t('howItWorks') },
    { href: '/token', label: t('token') },
    { href: '/hackathon', label: t('hackathon') },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bg-deep/85 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-8">
          <Link href="/" aria-label="CNB Mobile">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  label={item.label}
                  isHash={item.href.startsWith('#')}
                />
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              disabled
              title={t('comingSoon')}
              aria-label={t('connectWallet')}
              className="metal-outline inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-sm cursor-not-allowed opacity-65"
            >
              <Wallet className="h-4 w-4" />
              <span>{t('connectWallet')}</span>
              <span className="ml-1 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
                {t('comingSoon')}
              </span>
            </button>
            <LangSwitcher />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:bg-white/[0.04]"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 top-[60px] z-40 bg-bg-deep/98 backdrop-blur-md md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto max-w-[1280px] px-5 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.href.startsWith('#') ? (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-base text-white/85 hover:bg-white/[0.04]"
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-base text-white/85 hover:bg-white/[0.04]"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="mt-6 flex items-center">
              <LangSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({
  href,
  label,
  isHash,
}: {
  href: string;
  label: string;
  isHash: boolean;
}) {
  const className =
    'nav-link relative rounded-lg px-3 py-2 text-sm text-white/65 hover:text-white transition-colors';
  const inner = (
    <span className="relative inline-block">
      {label}
      <span aria-hidden className="nav-link-trail" />
    </span>
  );

  if (isHash) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

