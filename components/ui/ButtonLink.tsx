import * as React from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg' | 'sm';

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-black hover:bg-[#d4ff6e] hover:shadow-glow-primary active:scale-[0.98]',
  outline:
    'bg-white/5 border border-white/10 text-white/90 hover:border-white/25 hover:bg-white/10',
  ghost:
    'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
};

const sizes: Record<Size, string> = {
  sm: 'rounded-[10px] px-4 py-2 text-sm',
  md: 'rounded-[14px] px-7 py-3.5 text-[15px]',
  lg: 'rounded-[16px] px-8 py-4 text-base',
};

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
