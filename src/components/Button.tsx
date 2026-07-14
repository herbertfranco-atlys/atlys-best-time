// Button — primary interactive component, styled to the Atlys design system.
// variant × color × size, optional icons, full-width, and anchor rendering.

import type { CSSProperties, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonColor = 'brand-blue' | 'black' | 'white' | 'red';
export type ButtonSize = 'sm' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
};

type ButtonAsButton = CommonProps & {
  as?: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

type ButtonAsAnchor = CommonProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

type Palette = { bg: string; fg: string; border: string };

const COLOR: Record<ButtonColor, string> = {
  'brand-blue': 'var(--color-brand-blue)',
  black: '#101010',
  white: '#ffffff',
  red: 'var(--color-season-avoid-text)',
};

function palette(variant: ButtonVariant, color: ButtonColor): Palette {
  const c = COLOR[color];
  if (variant === 'primary') {
    return { bg: c, fg: color === 'white' ? '#101010' : '#ffffff', border: c };
  }
  if (variant === 'secondary') {
    return { bg: 'transparent', fg: c, border: c };
  }
  // tertiary — text-only
  return { bg: 'transparent', fg: c, border: 'transparent' };
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    color = 'brand-blue',
    size = 'lg',
    fullWidth = false,
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    children,
  } = props;

  const p = palette(variant, color);
  const isDisabled = disabled || loading;

  const style: CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: size === 'lg' ? 48 : 40,
    padding: size === 'lg' ? '0 24px' : '0 16px',
    borderRadius: 'var(--radius-btn)',
    border: `1.5px solid ${p.border}`,
    background: p.bg,
    color: p.fg,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: size === 'lg' ? 15 : 14,
    letterSpacing: '-0.01em',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'filter 120ms ease, background 120ms ease',
    userSelect: 'none',
  };

  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      {children ? <span>{children}</span> : null}
      {!loading ? rightIcon : null}
    </>
  );

  const hoverHandlers = isDisabled
    ? {}
    : {
        onMouseEnter: (e: { currentTarget: HTMLElement }) => {
          e.currentTarget.style.filter = 'brightness(0.94)';
          if (variant !== 'primary') e.currentTarget.style.background = 'rgba(80,87,234,0.06)';
        },
        onMouseLeave: (e: { currentTarget: HTMLElement }) => {
          e.currentTarget.style.filter = 'none';
          if (variant !== 'primary') e.currentTarget.style.background = 'transparent';
        },
      };

  const cls = ['ds-button', className].filter(Boolean).join(' ');

  if (props.as === 'a') {
    return (
      <a
        className={cls}
        style={style}
        href={isDisabled ? undefined : props.href}
        target={props.target}
        rel={props.rel}
        aria-disabled={isDisabled || undefined}
        aria-label={props['aria-label']}
        {...hoverHandlers}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cls}
      style={style}
      type={props.type ?? 'button'}
      disabled={isDisabled}
      onClick={props.onClick}
      aria-label={props['aria-label']}
      {...hoverHandlers}
    >
      {content}
    </button>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      style={{
        width: 16,
        height: 16,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'ds-spin 0.7s linear infinite',
      }}
    />
  );
}
