// Visa offer module — replica of the offer section on atlys.com visa pages:
// left column with product facts (icon chips + label/value rows) and a
// guaranteed-delivery timeline; right column with a sticky price card
// (visa-type select, fee breakdown, Start Application CTA) and a
// "Have Queries?" WhatsApp row.

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { VisaOffer } from '@/data/visaOffers';

const BRAND = 'var(--color-brand-blue)';

function formatMoney(currency: string, n: number): string {
  return `${currency} ${n.toLocaleString('en-US')}`;
}

function ordinal(day: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  return `${day}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

/** "14 Jul 2026 at 07:40 PM" */
function longDate(dt: Date): string {
  const date = dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = dt
    .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    .toUpperCase();
  return `${date} at ${time}`;
}

/** "14th Jul, 07:40 pm" */
function shortDate(dt: Date): string {
  const mon = dt.toLocaleDateString('en-GB', { month: 'short' });
  const time = dt
    .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    .toLowerCase();
  return `${ordinal(dt.getDate())} ${mon}, ${time}`;
}

/** Section heading with the short brand underline bar. */
function UnderlinedHeading({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className="m-0 font-sans text-[26px] font-bold text-black" style={{ letterSpacing: '-0.02em' }}>
        {children}
      </h2>
      <div className="mt-2 h-[3px] w-16 rounded-full" style={{ background: BRAND }} />
    </div>
  );
}

/** Pale icon chip + "Label:" + underlined value. */
function FactRow({ chipBg, icon, label, value }: { chipBg: string; icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="flex size-12 shrink-0 items-center justify-center rounded-xl"
        style={{ background: chipBg }}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-sans text-sm text-[#6b7280]">{label}:</span>
        <span className="font-sans text-[15px] font-semibold text-black underline">{value}</span>
      </span>
    </div>
  );
}

export function VisaOfferSection({ offer, applyUrl }: { offer: VisaOffer; applyUrl: string }) {
  const [optionIdx, setOptionIdx] = useState(0);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const option = offer.options[optionIdx];
  const total = option.governmentFee + option.processingFee;
  const guaranteedAt = new Date(Date.now() + offer.guaranteeHours * 3_600_000);

  return (
    <section className="border-b border-border-subtle bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_360px]">
        {/* ——— Left: product facts + guaranteed timeline ——— */}
        <div>
          <UnderlinedHeading>{offer.product} Information</UnderlinedHeading>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
            <FactRow chipBg="#eef0fe" icon={<PhoneIcon />} label="Type" value={offer.type} />
            <FactRow chipBg="#e8f1fe" icon={<CalendarIcon />} label="Length of Stay" value={offer.lengthOfStay} />
            <FactRow chipBg="#e6f6ec" icon={<TimerIcon />} label="Validity" value={offer.validity} />
            <FactRow chipBg="#eef0fe" icon={<EntryIcon />} label="Entry" value={offer.entry} />
          </div>

          <div className="mt-10 flex items-center gap-3">
            <span className="flex size-5 items-center justify-center rounded-full" style={{ background: 'rgba(80,87,234,0.15)' }}>
              <span className="block size-2.5 rounded-full" style={{ background: BRAND }} />
            </span>
            <UnderlinedHeading>Get a Guaranteed {offer.product} on</UnderlinedHeading>
          </div>

          <div className="relative mt-6 pl-8">
            {/* timeline spine */}
            <div className="absolute left-[9px] top-0 h-full w-px bg-border-subtle" />
            <div
              className="relative max-w-lg rounded-2xl border bg-white px-6 py-5"
              style={{ borderColor: 'rgba(80,87,234,0.25)', boxShadow: '0 8px 24px rgba(80,87,234,0.08)' }}
            >
              <span className="absolute -top-2 left-8 h-4 w-8 rounded-full bg-surface-grey" />
              <div className="flex items-center gap-3">
                <ShieldCheckIcon />
                <span className="font-sans text-[19px] font-bold text-black">{longDate(guaranteedAt)}</span>
              </div>
              <button
                type="button"
                onClick={() => setTimelineOpen((o) => !o)}
                className="mt-2 flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 font-sans text-[15px] font-medium"
                style={{ color: BRAND }}
              >
                <EyeIcon /> View Timeline <Chevron open={timelineOpen} />
              </button>
              {timelineOpen && (
                <ol className="m-0 mt-4 flex list-none flex-col gap-2 border-t border-border-subtle p-0 pt-4 font-sans text-sm text-[#6b7280]">
                  <li>1. Apply today — takes about 10 minutes</li>
                  <li>2. We verify and submit your application</li>
                  <li>3. {offer.product} delivered by {longDate(guaranteedAt)}</li>
                </ol>
              )}
            </div>
          </div>
        </div>

        {/* ——— Right: sticky price card ——— */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-surface-grey p-2 pt-0">
            <div className="flex items-center gap-3 px-4 py-3">
              <ShieldCheckIcon small />
              <span className="h-5 w-px bg-border-subtle" />
              <span className="font-sans text-[15px] font-bold" style={{ color: '#123c53' }}>
                Visa Guaranteed on {shortDate(guaranteedAt)}
              </span>
            </div>

            <div className="rounded-[20px] border border-border-subtle bg-white p-5">
              <label className="font-sans text-sm text-[#6b7280]" htmlFor="visa-type">
                Visa Type
              </label>
              <div className="relative mt-1 border-b border-border-subtle pb-3">
                <select
                  id="visa-type"
                  value={optionIdx}
                  onChange={(e) => setOptionIdx(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none border-none bg-transparent p-0 font-sans text-[19px] font-bold text-black outline-none"
                >
                  {offer.options.map((o, i) => (
                    <option key={o.label} value={i}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-0 top-1.5" style={{ color: BRAND }}>
                  <Chevron open={false} />
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 font-sans text-[15px] font-semibold text-black">
                    <BankIcon /> Government Fees
                  </span>
                  <span className="font-sans text-[15px] font-bold text-black">
                    {formatMoney(offer.currency, option.governmentFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 font-sans text-[15px] font-semibold text-black">
                    <ShieldCheckIcon small solid /> Processing Fee
                  </span>
                  <span className="font-sans text-[15px] font-bold text-black">
                    {formatMoney(offer.currency, option.processingFee)}
                  </span>
                </div>
                <div className="border-t border-border-subtle" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 font-sans text-base font-bold text-black">
                    <ReceiptIcon /> Total Amount
                  </span>
                  <span className="font-sans text-base font-bold text-black">
                    {formatMoney(offer.currency, total)}
                  </span>
                </div>
              </div>

              <a
                href={applyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex h-11 items-center justify-center rounded-xl font-sans text-base font-medium text-white no-underline"
                style={{ background: BRAND }}
              >
                Start Application
              </a>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between px-2">
            <div className="flex flex-col">
              <span className="font-sans text-base font-bold text-black">Have Queries?</span>
              <span className="font-sans text-sm text-[#6b7280]">Documents, process, price, etc.</span>
            </div>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex size-11 items-center justify-center rounded-full border-2"
              style={{ borderColor: '#25D366' }}
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Icons (inline, brand-toned) ——— */

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke={BRAND} strokeWidth="1.8" />
      <path d="M10.5 18.5h3" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="#2f7cf6" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M8 2.8v4M16 2.8v4" stroke="#2f7cf6" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="7" y="12.5" width="3" height="3" rx="0.8" fill="#2f7cf6" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="13.5" r="7.5" stroke="#2ea44f" strokeWidth="1.8" />
      <path d="M12 10v3.8l2.4 1.6M9.8 2.5h4.4M12 2.5V5" stroke="#2ea44f" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EntryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" stroke={BRAND} strokeWidth="1.8" />
      <rect x="8.5" y="7.5" width="7" height="9" rx="1" fill={BRAND} />
    </svg>
  );
}

function ShieldCheckIcon({ small = false, solid = false }: { small?: boolean; solid?: boolean }) {
  const s = small ? 18 : 24;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.5 4.5 5v7c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V5L12 2.5Z"
        fill={solid || !small ? BRAND : '#123c53'}
      />
      <path d="m8.6 12 2.3 2.3 4.6-4.6" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ transition: 'transform 150ms ease', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 9.5 12 4l9 5.5M4.5 10v8M9 10v8M15 10v8M19.5 10v8M2.5 20.5h19" stroke="#101010" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 3h14v18l-2.3-1.5L14.4 21l-2.4-1.5L9.6 21l-2.3-1.5L5 21V3Z" stroke="#101010" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 8h7M8.5 12h7" stroke="#101010" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.3 12.6L3.5 20.5l4.5-1.2A8.4 8.4 0 1 0 12 3.5Z"
        stroke="#25D366"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.4c-.3 0-.8.1-.8 1 0 1.7 1.4 3.6 3.3 4.8 1.6 1 2.6 1 3.1.8.4-.2.9-.7.9-1.2 0-.3-1-.9-1.4-1-.3-.1-.5 0-.7.3-.1.2-.4.5-.6.4-.9-.3-2.1-1.4-2.4-2.2-.1-.2.1-.4.3-.6.2-.2.4-.4.3-.7-.1-.3-.6-1.4-.8-1.5l-.2-.1Z"
        fill="#25D366"
      />
    </svg>
  );
}
