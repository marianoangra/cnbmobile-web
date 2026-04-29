import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Community } from '@/components/sections/Community';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Hackathon } from '@/components/sections/Hackathon';
import { Token } from '@/components/sections/Token';
import { Founder } from '@/components/sections/Founder';
import { Waitlist } from '@/components/sections/Waitlist';
import { Faq } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';

type Props = { params: Promise<{ locale: string }> };

const LOCALE_TAG: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'meta' });
  const inLanguage = LOCALE_TAG[locale] ?? locale;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://cnbmobile.com/#organization',
        name: 'CNB Mobile',
        alternateName: 'Cripto no Bolso',
        url: 'https://cnbmobile.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://cnbmobile.com/icon.jpg',
          width: 1024,
          height: 1024,
        },
        sameAs: [
          'https://x.com/cnbmobile',
          'https://www.instagram.com/criptonobolso',
          'https://t.me/grupcriptocnb',
          'https://chat.whatsapp.com/GsIEmnUPKsn2W95HEjPwW8',
          'https://github.com/marianoangra/cnbapp',
        ],
        founder: {
          '@type': 'Person',
          name: 'Rafael Mariano',
          url: 'https://rafaelmariano.com.br',
          jobTitle: 'CEO & Founder',
        },
      },
      {
        '@type': 'MobileApplication',
        '@id': 'https://cnbmobile.com/#app',
        name: 'CNB Mobile',
        description: t('description'),
        operatingSystem: 'iOS, Android',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
        },
        author: { '@id': 'https://cnbmobile.com/#organization' },
        publisher: { '@id': 'https://cnbmobile.com/#organization' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://cnbmobile.com/#website',
        url: 'https://cnbmobile.com',
        name: 'CNB Mobile',
        description: t('description'),
        publisher: { '@id': 'https://cnbmobile.com/#organization' },
        inLanguage,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Features />
      <Community />
      <HowItWorks />
      <Hackathon />
      <Token />
      <Founder />
      <Waitlist />
      <Faq />
    </>
  );
}
