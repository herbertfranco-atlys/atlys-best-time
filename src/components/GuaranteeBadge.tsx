// GuaranteeBadge — Atlys's "Visas On Time Guaranteed" certification mark,
// replicated from atlys.com: a dashed circle holding a gradient shield-check,
// next to a two-line semibold label.

export type GuaranteeBadgeProps = {
  /** Render the label in one line (used in tight spots like the navbar). */
  compact?: boolean;
};

export function GuaranteeBadge({ compact = false }: GuaranteeBadgeProps) {
  return (
    <a
      href="https://www.atlys.com/on-time-guaranteed"
      target="_blank"
      rel="noreferrer"
      aria-label="On Time Guaranteed"
      className="inline-flex items-center gap-2 no-underline"
    >
      <span
        className="flex items-center justify-center rounded-full border border-dashed"
        style={{ width: 36, height: 36, borderColor: '#a8a8a8', paddingTop: 2, paddingLeft: 2 }}
      >
        <ShieldCheck />
      </span>
      <span
        className="font-sans font-semibold text-black underline"
        style={{ fontSize: 13, lineHeight: '18px', letterSpacing: '-0.13px' }}
      >
        Visas On Time{compact ? ' ' : <br />}Guaranteed
      </span>
    </a>
  );
}

function ShieldCheck() {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden>
      <path
        d="M10.9091 0H1.36364C0.613636 0 0.00681817 0.613636 0.00681817 1.36364L0 10.1795C0 10.65 0.238636 11.0659 0.6 11.3114L5.2285 14.3951C5.77826 14.7614 6.49433 14.7612 7.04388 14.3946L11.6659 11.3114C12.0273 11.0659 12.2659 10.65 12.2659 10.1795L12.2727 1.36364C12.2727 0.613636 11.6591 0 10.9091 0ZM4.77273 10.2273L1.36364 6.81818L2.325 5.85682L4.77273 8.29773L9.94773 3.12273L10.9091 4.09091L4.77273 10.2273Z"
        fill="url(#gb-shield)"
      />
      <defs>
        <linearGradient id="gb-shield" x1="-5.31818" y1="-2.04545" x2="18.4091" y2="23.7273" gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" stopColor="#959595" />
        </linearGradient>
      </defs>
    </svg>
  );
}
