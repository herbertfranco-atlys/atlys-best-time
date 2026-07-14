// Flag — renders a country's circular flag from the bundled circle-flags set
// (public/flags/<iso2>.svg). Falls back to a neutral globe glyph if an asset
// is missing so the UI never shows a broken image.

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { asset } from '@/lib/asset';

export type FlagProps = {
  /** ISO-3166 alpha-2 country code (case-insensitive), e.g. "IN". */
  code: string;
  /** Rendered diameter in px. Default 24. */
  size?: number;
  /** Accessible label. Defaults to empty (decorative). */
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export function Flag({ code, size = 24, alt = '', className, style }: FlagProps) {
  const [failed, setFailed] = useState(false);
  const dims: CSSProperties = { width: size, height: size, borderRadius: '50%' };

  if (failed) {
    return (
      <span
        aria-hidden={alt ? undefined : true}
        aria-label={alt || undefined}
        className={className}
        style={{
          ...dims,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface-muted)',
          fontSize: size * 0.6,
          lineHeight: 1,
          ...style,
        }}
      >
        🌐
      </span>
    );
  }

  return (
    <img
      src={asset(`flags/${code.toLowerCase()}.svg`)}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={className}
      style={{ ...dims, objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
