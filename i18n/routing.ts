import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  // Auto-detect locale from the browser's Accept-Language header on first
  // visit. The NEXT_LOCALE cookie (set when the user switches manually via
  // LangSwitcher) takes precedence — so explicit choice always wins over
  // automatic detection. Default is `true`; setting it explicitly here so
  // future maintainers know it's intentional.
  localeDetection: true,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
