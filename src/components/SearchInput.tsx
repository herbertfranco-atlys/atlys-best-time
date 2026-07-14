// SearchInput — pill-shaped search field with a leading search icon.
// No label/underline (distinct from FormField); the container shows a focused
// border via :focus-within.

import type { CSSProperties } from 'react';

export type SearchInputProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
};

export function SearchInput({
  value,
  defaultValue,
  placeholder = 'Search…',
  disabled = false,
  autoFocus = false,
  onChange,
  className,
  style,
}: SearchInputProps) {
  return (
    <div
      className={['ds-search', className].filter(Boolean).join(' ')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 48,
        padding: '0 18px',
        borderRadius: 'var(--radius-btn)',
        border: '1.5px solid var(--color-border-subtle)',
        background: disabled ? 'var(--color-surface-muted)' : '#ffffff',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      <SearchIcon />
      <input
        type="search"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          letterSpacing: '-0.01em',
          color: '#101010',
        }}
      />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="#8b8b8b" strokeWidth="2" />
      <path d="m20 20-3.2-3.2" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
