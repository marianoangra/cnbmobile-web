import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { PartnersTrust } from '@/components/sections/PartnersTrust';
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
        '@id': 'https://usejuicemobile.com/#organization',
        name: 'CNB Mobile',
        alternateName: 'Cripto no Bolso',
        url: 'https://usejuicemobile.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://usejuicemobile.com/icon.jpg',
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
        '@id': 'https://usejuicemobile.com/#app',
        name: 'CNB Mobile',
        description: t('description'),
        operatingSystem: 'iOS, Android',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
        },
        author: { '@id': 'https://usejuicemobile.com/#organization' },
        publisher: { '@id': 'https://usejuicemobile.com/#organization' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://usejuicemobile.com/#website',
        url: 'https://usejuicemobile.com',
        name: 'CNB Mobile',
        description: t('description'),
        publisher: { '@id': 'https://usejuicemobile.com/#organization' },
        inLanguage,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <PartnersTrust />
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
