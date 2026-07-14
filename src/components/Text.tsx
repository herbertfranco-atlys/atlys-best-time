// Text — the foundational typography primitive, mirroring the Atlys design
// system type scale, weights, and semantic color tokens. Sizing/line-height
// come from the `.ds-*` classes in index.css (responsive); family, weight,
// color, and letter-spacing are resolved here from props.

import type { CSSProperties, ElementType, ReactNode } from 'react';

export type TextStyle =
  | 'd1'
  | 'd2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'b1'
  | 'b2'
  | 't1'
  | 't1-caps'
  | 't2'
  | 't2-caps'
  | 'c-h';

export type TextFont = 'inter' | 'denton';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColorToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'link'
  | 'error'
  | 'success'
  | 'inherit';

export type TextProps = {
  style?: TextStyle;
  font?: TextFont;
  weight?: TextWeight;
  color?: TextColorToken | (string & {});
  as?: ElementType;
  align?: 'left' | 'center' | 'right';
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  truncate?: boolean;
  maxLines?: number;
  className?: string;
  children: ReactNode;
};

const WEIGHT: Record<TextWeight, number> = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const COLOR_TOKENS: Record<TextColorToken, string> = {
  primary: '#101010',
  secondary: '#2e2e2e',
  tertiary: '#8b8b8b',
  disabled: '#b8b8b8',
  inverse: '#ffffff',
  link: 'var(--color-brand-blue)',
  error: 'var(--color-season-avoid-text)',
  success: 'var(--color-season-good-text)',
  inherit: 'inherit',
};

// Denton is not bundled in this repo — fall back to a serif stack so the hero
// still reads as a display face. Swap in a Denton @font-face to go brand-exact.
const FONT_STACK: Record<TextFont, string> = {
  inter: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
  denton: "'Denton', 'Playfair Display', Georgia, serif",
};

const DISPLAY_STYLES = new Set<TextStyle>(['d1', 'd2', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']);

function letterSpacing(styleName: TextStyle, font: TextFont, weight: TextWeight): string {
  if (DISPLAY_STYLES.has(styleName)) return font === 'denton' ? '0' : '-0.04em';
  if (styleName === 'b1' || styleName === 'b2') {
    return weight === 'bold' || weight === 'semibold' ? '-0.01em' : '-0.02em';
  }
  switch (styleName) {
    case 't1':
      return '-0.01em';
    case 't1-caps':
    case 't2-caps':
      return '0.08em';
    case 'c-h':
      return '0.04em';
    default:
      return '0';
  }
}

const DEFAULT_TAG: Partial<Record<TextStyle, ElementType>> = {
  d1: 'h1',
  d2: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'h6',
};

export function Text({
  style: styleName = 'b1',
  font = 'inter',
  weight = 'medium',
  color = 'primary',
  as,
  align,
  transform,
  truncate = false,
  maxLines,
  className,
  children,
}: TextProps) {
  const Tag = (as ?? DEFAULT_TAG[styleName] ?? 'span') as ElementType;
  const resolvedColor = color in COLOR_TOKENS ? COLOR_TOKENS[color as TextColorToken] : color;

  const css: CSSProperties = {
    margin: 0,
    fontFamily: FONT_STACK[font],
    fontWeight: WEIGHT[weight],
    color: resolvedColor,
    letterSpacing: letterSpacing(styleName, font, weight),
    textAlign: align,
    textTransform: transform,
  };

  if (maxLines) {
    css.display = '-webkit-box';
    css.WebkitLineClamp = maxLines;
    css.WebkitBoxOrient = 'vertical';
    css.overflow = 'hidden';
  } else if (truncate) {
    css.overflow = 'hidden';
    css.textOverflow = 'ellipsis';
    css.whiteSpace = 'nowrap';
  }

  const cls = ['ds-' + styleName, className].filter(Boolean).join(' ');

  return (
    <Tag className={cls} style={css}>
      {children}
    </Tag>
  );
}
