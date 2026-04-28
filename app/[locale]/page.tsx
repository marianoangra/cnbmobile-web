import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Community } from '@/components/sections/Community';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Hackathon } from '@/components/sections/Hackathon';
import { Token } from '@/components/sections/Token';
import { Founder } from '@/components/sections/Founder';
import { Waitlist } from '@/components/sections/Waitlist';
import { Faq } from '@/components/sections/Faq';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
