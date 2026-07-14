// Card — static content container using the design-system card radius and a
// soft elevation. `interactive` adds a hover lift for clickable cards.

import type { CSSProperties, ReactNode } from 'react';

export type CardProps = {
  interactive?: boolean;
  padding?: number;
  radius?: number | string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Card({
  interactive = false,
  padding = 20,
  radius = 24,
  className,
  style,
  children,
}: CardProps) {
  return (
    <div
      className={['ds-card', className].filter(Boolean).join(' ')}
      style={{
        background: '#ffffff',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: radius,
        boxShadow: 'var(--shadow-card)',
        padding,
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        ...style,
      }}
      onMouseEnter={
        interactive
          ? (e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-pop)';
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? (e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
