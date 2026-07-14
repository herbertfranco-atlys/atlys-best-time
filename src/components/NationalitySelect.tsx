// NationalitySelect — the hero's nationality dropdown. The trigger shows the
// selected country's flag + name + chevron; the panel holds a SearchInput and
// a scrollable, filtered list. Closes on outside click, Escape, and select.
// Controlled via `value` (ISO code) / `onChange`.

import { useEffect, useMemo, useRef, useState } from 'react';
import { COUNTRIES, countryByCode } from '@/data/countries';
import { SearchInput } from '@/components/SearchInput';
import { Flag } from '@/components/Flag';

export type NationalitySelectProps = {
  value: string;
  onChange: (code: string) => void;
  /**
   * Visual size of the trigger. `hero` is oversized for the headline;
   * `nav` is a bare circular flag button (atlys.com navbar style).
   */
  size?: 'default' | 'hero' | 'nav';
};

export function NationalitySelect({ value, onChange, size = 'default' }: NationalitySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = countryByCode(value) ?? COUNTRIES[0];
  const isHero = size === 'hero';
  const isNav = size === 'nav';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Reset the query whenever the panel opens.
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  function choose(code: string) {
    onChange(code);
    setOpen(false);
  }

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        // Optical centering within the display-size headline line box.
        transform: isHero ? 'translateY(-0.08em)' : undefined,
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      {isNav ? (
        // atlys.com navbar style: a bare circular flag with a 2px border that
        // turns brand-blue on hover.
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Nationality: ${selected.name}`}
          onClick={() => setOpen((o) => !o)}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#101010')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            padding: 0,
            borderRadius: '50%',
            border: '2px solid #101010',
            background: 'transparent',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'border-color 120ms ease',
          }}
        >
          <Flag code={selected.code} alt="" size={24} />
        </button>
      ) : (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: isHero ? '0.18em' : 8,
            padding: isHero ? '0.04em 0.28em 0.04em 0.2em' : '6px 14px',
            borderRadius: 'var(--radius-pill)',
            border: `2px solid var(--color-brand-blue)`,
            background: 'rgba(80,87,234,0.06)',
            color: 'var(--color-brand-blue)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontSize: isHero ? 'inherit' : 15,
            maxWidth: '100%',
          }}
        >
          <Flag
            code={selected.code}
            alt={selected.name}
            style={isHero ? { width: '0.82em', height: '0.82em' } : { width: 22, height: 22 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>{selected.name}</span>
          <Chevron open={open} big={isHero} />
        </button>
      )}

      {open ? (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            // The nav trigger sits at the right edge of the viewport, so the
            // panel anchors right there; everywhere else it anchors left.
            left: isNav ? 'auto' : 0,
            right: isNav ? 0 : 'auto',
            zIndex: 50,
            width: 340,
            maxWidth: '90vw',
            background: '#ffffff',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 20,
            boxShadow: 'var(--shadow-pop)',
            padding: 12,
          }}
        >
          <SearchInput
            autoFocus
            placeholder="Search nationality…"
            value={query}
            onChange={setQuery}
            style={{ height: 44 }}
          />
          <ul
            style={{
              listStyle: 'none',
              margin: '10px 0 0',
              padding: 0,
              maxHeight: 280,
              overflowY: 'auto',
            }}
          >
            {filtered.length === 0 ? (
              <li
                style={{
                  padding: '12px 12px',
                  color: '#8b8b8b',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                }}
              >
                No matches
              </li>
            ) : (
              filtered.map((c) => {
                const isSelected = c.code === selected.code;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => choose(c.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 12px',
                        border: 'none',
                        borderRadius: 12,
                        background: isSelected ? 'rgba(80,87,234,0.08)' : 'transparent',
                        color: '#101010',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 15,
                        fontWeight: isSelected ? 600 : 500,
                        letterSpacing: '-0.01em',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'var(--color-surface-muted)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Flag code={c.code} alt={c.name} size={24} />
                      <span style={{ flex: 1 }}>{c.name}</span>
                      {isSelected ? <Check /> : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ open, big }: { open: boolean; big: boolean }) {
  const s = big ? '0.5em' : 18;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ transition: 'transform 160ms ease', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m5 12 4.5 4.5L19 7"
        stroke="var(--color-brand-blue)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
