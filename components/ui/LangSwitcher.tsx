'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

const LANGS = [
  { code: 'pt', label: 'PT', flag: '🇧🇷', name: 'Português' },
  { code: 'en', label: 'EN', flag: '🇺🇸', name: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
] as const;

interface LangSwitcherProps {
  variant?: 'header' | 'footer';
}

export function LangSwitcher({ variant = 'header' }: LangSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  function changeLocale(code: 'pt' | 'en' | 'es') {
    setOpen(false);
    router.replace(pathname, { locale: code });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors',
          variant === 'header'
            ? 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]'
            : 'bg-transparent hover:bg-white/[0.04]'
        )}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-medium text-white/80">{current.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-white/50" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c1410]/95 backdrop-blur-md py-1 shadow-2xl"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                onClick={() => changeLocale(l.code)}
                role="option"
                aria-selected={l.code === locale}
                className={cn(
                  'flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors',
                  l.code === locale
                    ? 'text-primary bg-primary/[0.06]'
                    : 'text-white/80 hover:bg-white/[0.04]'
                )}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span>{l.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
