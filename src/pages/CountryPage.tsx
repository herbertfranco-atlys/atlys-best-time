// Country detail page — layout modelled on atlys.com's visa pages: a dark
// hero band with a big white title, followed by clean white content sections
// (overview, best time, month-by-month table, why visit, FAQs) and a CTA card.
// SEO: keyword-targeted title/description, canonical + OG tags, and JSON-LD
// (FAQPage + TouristDestination) via useSeo.

import { Button, Flag, GuaranteeBadge, Text } from '@/components';
import { DESTINATIONS, type Destination } from '@/data/destinations';
import {
  bestMonths,
  cheapestMonths,
  faqs,
  metaDescription,
  monthDetails,
  pageCopy,
} from '@/lib/countryContent';
import { useSeo } from '@/lib/seo';
import { countryPath } from '@/lib/router';
import { VISA_OFFERS } from '@/data/visaOffers';
import { VisaOfferSection } from '@/sections/VisaOfferSection';
import { atlysVisaUrl } from '@/lib/atlysLinks';

const SEASON_STYLES: Record<string, string> = {
  good: 'bg-season-good-bg text-season-good-text',
  ok: 'bg-season-ok-bg text-season-ok-text',
  avoid: 'bg-season-avoid-bg text-season-avoid-text',
};

// Live site origin + base path (e.g. https://user.github.io/repo), resolved at
// runtime so canonical URLs are correct wherever the app is deployed.
const SITE =
  typeof location !== 'undefined'
    ? location.origin + import.meta.env.BASE_URL.replace(/\/$/, '')
    : '';

export function CountryPage({ code }: { code: string }) {
  const d: Destination | undefined = DESTINATIONS.find((x) => x.code === code);

  // Always call the hook (Rules of Hooks); feed it safe values when no match.
  const faqList = d ? faqs(d) : [];
  useSeo({
    title: d
      ? `Best Time to Visit ${d.name} (2026): Weather, Crowds & Costs | Atlys`
      : 'Destination not found | Atlys',
    description: d ? metaDescription(d) : 'Explore the best time to visit destinations worldwide.',
    canonical: d ? `${SITE}${countryPath(d.code).replace('#', '')}` : `${SITE}/`,
    jsonLd: d
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqList.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: d.name,
            description: metaDescription(d),
            touristType: d.tags,
          },
        ]
      : undefined,
  });

  if (!d) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Text style="h3" weight="bold">
          Destination not found
        </Text>
        <div className="mt-6">
          <Button as="a" href="#/" color="black">
            Back to all destinations
          </Button>
        </div>
      </section>
    );
  }

  const details = monthDetails(d);
  const copy = pageCopy(d);
  const offer = VISA_OFFERS[d.code];

  return (
    <>
      {/* Dark hero band (atlys.com visa-page style) */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-10">
          <a href="#/" className="text-sm font-medium text-white/60 no-underline hover:text-white">
            ← All destinations
          </a>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <Flag code={d.code} size={72} alt="" />
              <div>
                <h1
                  className="font-sans font-semibold text-white"
                  style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}
                >
                  Best Time to Visit {d.name}
                </h1>
                <p className="mt-2 text-white/60" style={{ fontSize: 16, margin: '8px 0 0' }}>
                  {d.region} · {d.description}
                </p>
              </div>
            </div>
            <div className="shrink-0 rounded-2xl bg-white/10 p-5">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between gap-8">
                  <span className="text-white/60">Best months</span>
                  <span className="font-semibold">{bestMonths(d)}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-white/60">Cheapest</span>
                  <span className="font-semibold">{cheapestMonths(d)}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-white/60">Region</span>
                  <span className="font-semibold">{d.region}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa offer module (per-country + per-nationality; example data) */}
      {offer && <VisaOfferSection offer={offer} applyUrl={atlysVisaUrl(d.code, d.name)} />}

      <div className="mx-auto max-w-6xl px-6">
        {/* Overview — SEO intro paragraph */}
        <section className="max-w-3xl py-12">
          <Text as="p" style="h6" weight="medium" color="secondary">
            {copy.intro}
          </Text>
        </section>

        {/* Best time to visit — the primary-keyword section */}
        <section className="border-t border-border-subtle py-12">
          <Text style="h4" weight="semibold" as="h2">
            When is the best time to visit {d.name}?
          </Text>
          <div className="mt-4 flex max-w-3xl flex-col gap-4">
            <Text as="p" style="h7" weight="medium" color="secondary">
              {copy.bestTime}
            </Text>
            <Text as="p" style="h7" weight="medium" color="secondary">
              {copy.budget}
            </Text>
          </div>
        </section>

        {/* Month-by-month table */}
        <section className="border-t border-border-subtle py-12">
          <Text style="h4" weight="semibold" as="h2">
            {d.name} weather, crowds and cost by month
          </Text>
          <div className="mt-2">
            <Text style="b1" weight="medium" color="tertiary">
              Green is the sweet spot — the best weather with manageable crowds and prices.
            </Text>
          </div>

          <div className="mt-6 overflow-x-auto rounded-card border border-border-subtle">
            <table className="w-full border-collapse font-sans text-sm" style={{ minWidth: 640 }}>
              <thead>
                <tr className="bg-surface-muted text-left">
                  <th className="px-5 py-3 font-semibold">Month</th>
                  <th className="px-5 py-3 font-semibold">Season</th>
                  <th className="px-5 py-3 font-semibold">Weather</th>
                  <th className="px-5 py-3 font-semibold">Crowds</th>
                  <th className="px-5 py-3 font-semibold">Cost</th>
                  <th className="hidden px-5 py-3 font-semibold lg:table-cell">Tip</th>
                </tr>
              </thead>
              <tbody>
                {details.map((m) => (
                  <tr key={m.month} className="border-t border-border-subtle">
                    <td className="px-5 py-3 font-semibold">{m.month}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${SEASON_STYLES[m.season]}`}
                      >
                        {m.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">{m.weather}</td>
                    <td className="px-5 py-3">{m.crowds}</td>
                    <td className="px-5 py-3 font-semibold">{m.cost}</td>
                    <td className="hidden px-5 py-3 text-card-muted lg:table-cell">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why visit */}
        <section className="border-t border-border-subtle py-12">
          <Text style="h4" weight="semibold" as="h2">
            Why visit {d.name}
          </Text>
          <ul className="mt-6 flex list-none flex-col gap-4 p-0">
            {copy.highlights.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: 'linear-gradient(90deg, #b165fd, #5057ea)', fontSize: 11 }}
                >
                  ✓
                </span>
                <Text style="h7" weight="medium" color="secondary">
                  {b}
                </Text>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQs — accordion like atlys.com */}
        <section className="border-t border-border-subtle py-12">
          <Text style="h4" weight="semibold" as="h2">
            {d.name} travel FAQs
          </Text>
          <div className="mt-6 flex flex-col gap-3">
            {faqList.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border-subtle bg-white px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-sans text-[15px] font-semibold">
                  {f.q}
                </summary>
                <p className="mt-3 font-sans text-sm leading-relaxed text-card-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 rounded-card border border-border-subtle bg-surface-muted p-8 text-center md:p-12">
          <Text style="h4" weight="semibold" as="h2">
            Ready for {d.name}?
          </Text>
          <div className="mx-auto mt-2 max-w-xl">
            <Text style="h7" weight="medium" color="tertiary">
              Check visa requirements for your passport and get your visa before you fly.
            </Text>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <Button
              as="a"
              href={atlysVisaUrl(d.code, d.name)}
              target="_blank"
              rel="noreferrer"
              color="black"
              size="lg"
            >
              Apply for your {d.name} visa
            </Button>
            <GuaranteeBadge compact />
          </div>
        </section>
      </div>
    </>
  );
}
