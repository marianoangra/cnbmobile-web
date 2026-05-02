'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { Stars } from '@/components/ui/Stars';
import { StoreButtons } from '@/components/ui/StoreButtons';
import { useMetalSpotlight } from '@/lib/useMetalSpotlight';

const POINTS_START = 159_580;
const POINTS_END = 180_400;
const COUNT_SECONDS = 5;
const PAUSE_SECONDS = 1.8;
const LIME = '#a8db3a';

export function Hero() {
  const t = useTranslations('hero');
  const headlineRef = useMetalSpotlight<HTMLSpanElement>();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Layered backgrounds */}
      <div aria-hidden className="absolute inset-0 bg-hero-gradient" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <Stars count={110} seed={73} />
      <div aria-hidden className="absolute inset-0 bg-glow-tr" />
      <div aria-hidden className="absolute inset-0 bg-glow-bl" />

      {/* Bottom fade — long multi-stop dissolve into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] z-10"
        style={{
          background: `linear-gradient(to bottom,
            rgba(4, 11, 26, 0) 0%,
            rgba(4, 11, 26, 0.05) 18%,
            rgba(4, 11, 26, 0.18) 35%,
            rgba(4, 11, 26, 0.38) 52%,
            rgba(4, 11, 26, 0.62) 68%,
            rgba(4, 11, 26, 0.82) 82%,
            rgba(4, 11, 26, 0.95) 92%,
            rgba(4, 11, 26, 1) 100%
          )`,
        }}
      />

      <div className="relative z-20 mx-auto max-w-[1080px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline text-white"
            >
              <span className="block whitespace-normal sm:whitespace-nowrap">
                {t('headlineLine1')}
              </span>
              <span ref={headlineRef} className="metal-text block whitespace-normal sm:whitespace-nowrap">
                {t('headlineLine2')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hero-subtitle mt-7 max-w-xl"
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.08rem)' }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <StoreButtons size="lg" />
            </motion.div>

          </div>

          {/* Right: phone with live mocked home screen — sized to fit
              the hero viewport without scroll (~30% smaller than default). */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhoneMockup
              src="/images/screen-home-real.png"
              alt="CNB Mobile app — Início"
              priority
              width={202}
              height={436}
            >
              <AnimatedPointsOverlay />
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}

// Overlay that masks the static "159.580" baked into screen-home-real.png and
// animates the points up to 180.400 in a loop. Position is calibrated visually
// against the screenshot inside a 202×436 phone-screen.
function AnimatedPointsOverlay() {
  const reduce = useReducedMotion();
  const points = useMotionValue(POINTS_START);

  useEffect(() => {
    if (reduce) {
      points.set(POINTS_END);
      return;
    }
    const c = animate(points, POINTS_END, {
      duration: COUNT_SECONDS,
      ease: 'easeOut',
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: PAUSE_SECONDS,
    });
    return () => c.stop();
  }, [points, reduce]);

  const text = useTransform(points, (v) =>
    Math.floor(v).toLocaleString('pt-BR')
  );

  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        top: '17%',
        left: '6.5%',
        // Solid backdrop matching the points-card gradient — masks the static
        // number painted into the underlying PNG.
        background: 'linear-gradient(180deg, #0e1a10 0%, #0a130c 100%)',
        padding: '2px 6px 3px 4px',
        borderRadius: 3,
      }}
    >
      <motion.span
        className="font-extrabold leading-none tracking-tight tabular-nums"
        style={{ color: LIME, fontSize: 26 }}
      >
        {text}
      </motion.span>
    </div>
  );
}
