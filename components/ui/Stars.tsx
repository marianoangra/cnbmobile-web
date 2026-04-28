'use client';

import { useMemo, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Mulberry32 - small PRNG with fixed seed for SSR/CSR parity.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface StarsProps {
  count?: number;
  seed?: number;
  className?: string;
  satellites?: boolean;
}

type Tier = 'dim' | 'normal' | 'bright';

const TINTS = {
  white: '#ffffff',
  warm: '#fff1d8',
  cool: '#dce6ff',
} as const;

export function Stars({
  count = 100,
  seed = 42,
  className,
  satellites = true,
}: StarsProps) {
  const reduce = useReducedMotion();

  const stars = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }).map((_, i) => {
      const top = rnd() * 100;
      const left = rnd() * 100;
      // Bias toward small stars — most are tiny, only a few are bright.
      const sizeBias = Math.pow(rnd(), 2.4);
      const size = 0.7 + sizeBias * 3.0;
      const tier: Tier =
        size > 2.4 ? 'bright' : size > 1.4 ? 'normal' : 'dim';

      const tintRoll = rnd();
      const tintKey: keyof typeof TINTS =
        tintRoll < 0.08 ? 'warm' : tintRoll < 0.15 ? 'cool' : 'white';

      const baseOpacity =
        tier === 'dim'
          ? 0.18 + rnd() * 0.3
          : tier === 'normal'
            ? 0.45 + rnd() * 0.4
            : 0.7 + rnd() * 0.3;

      const twinkleRoll = rnd();
      const shouldTwinkle =
        (tier === 'dim' && twinkleRoll < 0.25) ||
        (tier === 'normal' && twinkleRoll < 0.55) ||
        (tier === 'bright' && twinkleRoll < 0.7);
      const twinkleAmp =
        tier === 'bright' ? 0.35 : tier === 'normal' ? 0.22 : 0.12;
      const twinklePeriod = 1.8 + rnd() * 4;
      const twinkleDelay = rnd() * 5;

      return {
        id: i,
        top,
        left,
        size,
        tier,
        color: TINTS[tintKey],
        baseOpacity,
        shouldTwinkle,
        twinkleAmp,
        twinklePeriod,
        twinkleDelay,
      };
    });
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {stars.map((s) => {
        const glow =
          s.tier === 'bright'
            ? `0 0 3px ${s.color}cc, 0 0 7px rgba(200, 220, 255, 0.45)`
            : s.tier === 'normal'
              ? `0 0 2px ${s.color}99`
              : undefined;
        const style: CSSProperties = {
          top: `${s.top}%`,
          left: `${s.left}%`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          background: s.color,
          boxShadow: glow,
        };
        const cls = `absolute rounded-full${s.tier === 'bright' ? ' star-bright' : ''}`;
        if (s.shouldTwinkle && !reduce) {
          return (
            <motion.span
              key={s.id}
              className={cls}
              style={style}
              animate={{
                opacity: [
                  s.baseOpacity,
                  Math.min(1, s.baseOpacity + s.twinkleAmp),
                  Math.max(0.06, s.baseOpacity - s.twinkleAmp * 0.5),
                  s.baseOpacity,
                ],
              }}
              transition={{
                duration: s.twinklePeriod,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: s.twinkleDelay,
              }}
            />
          );
        }
        return (
          <span
            key={s.id}
            className={cls}
            style={{ ...style, opacity: s.baseOpacity }}
          />
        );
      })}

      {satellites && !reduce && (
        <>
          <span aria-hidden className="satellite satellite-1" />
          <span aria-hidden className="satellite satellite-2" />
          <div aria-hidden className="starlink-train">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
