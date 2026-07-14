import type { ReactNode } from 'react';

/** Seasonality rating for a month — drives the pill color. */
export type Season = 'good' | 'ok' | 'avoid';

export interface MonthSeason {
  /** Short month label, e.g. "JAN". */
  label: string;
  /** Rating that colors the pill (green / amber / red). */
  season: Season;
}

export interface CountryCardProps {
  /** Country / destination name. */
  name: string;
  /** Leading visual rendered in a 32px slot (flag image, SVG, or emoji). */
  flag?: ReactNode;
  /** Region shown as a pill on the right, e.g. "South America". */
  region?: string;
  /** Short tagline under the name. */
  description?: string;
  /** Month-by-month ratings shown as a color-coded row. */
  months?: MonthSeason[];
  /** Call-to-action label. The CTA is hidden when omitted. */
  actionLabel?: string;
  /** If set, the CTA renders as a link to this URL. */
  href?: string;
  /** CTA click handler (renders a button when no `href` is given). */
  onAction?: () => void;
  /** Extra classes merged onto the card root. */
  className?: string;
}

const seasonStyles: Record<Season, string> = {
  good: 'bg-season-good-bg text-season-good-text',
  ok: 'bg-season-ok-bg text-season-ok-text',
  avoid: 'bg-season-avoid-bg text-season-avoid-text',
};

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.333 8h9.334M9 4.333 12.667 8 9 11.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CountryCard({
  name,
  flag,
  region,
  description,
  months,
  actionLabel,
  href,
  onAction,
  className,
}: CountryCardProps) {
  const cardClass = [
    'w-[515px] max-w-full overflow-hidden rounded-card border border-border-subtle bg-white p-6 font-sans',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass} data-node-id="17:3839">
      {/* Header: flag + name on the left, region pill on the right */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {flag != null && (
            <span className="inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-[28px] leading-none">
              {flag}
            </span>
          )}
          <h3 className="truncate text-[24px] font-semibold leading-7 text-card-title">
            {name}
          </h3>
        </div>
        {region && (
          <span className="shrink-0 rounded-full bg-region-bg px-2 py-2 text-xs font-medium leading-none text-region-text">
            {region}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm leading-[1.3] text-card-muted">{description}</p>
      )}

      {months && months.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-0.5">
          {months.map((month, i) => (
            <span
              key={`${month.label}-${i}`}
              className={`rounded-full px-1.5 py-1.5 text-xs font-medium leading-none ${seasonStyles[month.season]}`}
            >
              {month.label}
            </span>
          ))}
        </div>
      )}

      {actionLabel &&
        (href ? (
          <a
            href={href}
            onClick={onAction}
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-hover"
          >
            {actionLabel}
            <ArrowRight />
          </a>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-hover"
          >
            {actionLabel}
            <ArrowRight />
          </button>
        ))}
    </div>
  );
}

export default CountryCard;
