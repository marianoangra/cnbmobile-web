import { cn } from '@/lib/cn';

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary';
}

export function SectionBadge({ children, className, variant = 'default' }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        variant === 'primary'
          ? 'bg-primary/10 border border-primary/30 text-primary'
          : 'bg-white/[0.03] border border-white/[0.08] text-white/60',
        'section-badge font-mono',
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', variant === 'primary' ? 'bg-primary' : 'bg-white/50')} />
      {children}
    </div>
  );
}
