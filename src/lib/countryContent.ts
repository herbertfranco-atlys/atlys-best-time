// Derives readable country-page content from the destination dataset.
// Every label follows one simple model: the "good" months are the sweet spot
// (great weather, busier and pricier), shoulder months trade some weather for
// lower costs and thinner crowds, and off-season months are the cheapest and
// quietest. One exception: European summer hotspots where we marked Jun–Aug
// "avoid" BECAUSE of peak crowds/prices — those are labelled accordingly.

import type { Destination } from '@/data/destinations';
import type { Season } from '@/components';
import { getCountryCopy, type CountryCopy } from '@/data/countryCopy';

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type MonthDetail = {
  month: string;
  short: string;
  season: Season;
  /** Human label for the season pill: Best / Shoulder / Off-season / Peak. */
  label: string;
  weather: string;
  crowds: 'Low' | 'Moderate' | 'High' | 'Very high';
  cost: '$' | '$$' | '$$$' | '$$$$';
  note?: string;
};

/** True when an "avoid" rating means peak-season overload, not bad weather. */
function isPeakOverload(d: Destination, i: number): boolean {
  const summerMonth = i >= 5 && i <= 7; // Jun–Aug
  const summerHotspot =
    (d.tags.includes('summer') || d.tags.includes('beach')) && d.region === 'Europe';
  return summerMonth && summerHotspot && d.months[i].season === 'avoid';
}

export function monthDetails(d: Destination): MonthDetail[] {
  return d.months.map((m, i) => {
    const base = { month: MONTH_NAMES[i], short: m.label, season: m.season };
    if (m.season === 'good') {
      return {
        ...base,
        label: 'Best',
        weather: 'Excellent',
        crowds: 'High',
        cost: '$$$',
        note: 'Sweet spot — book ahead',
      } as MonthDetail;
    }
    if (m.season === 'ok') {
      return {
        ...base,
        label: 'Shoulder',
        weather: 'Mixed',
        crowds: 'Moderate',
        cost: '$$',
        note: 'Shoulder season — good value',
      } as MonthDetail;
    }
    if (isPeakOverload(d, i)) {
      return {
        ...base,
        label: 'Peak',
        weather: 'Hot',
        crowds: 'Very high',
        cost: '$$$$',
        note: 'Peak crowds & prices — go in shoulder months instead',
      } as MonthDetail;
    }
    return {
      ...base,
      label: 'Off-season',
      weather: 'Poor',
      crowds: 'Low',
      cost: '$',
      note: 'Off-season — cheapest, but expect weather trade-offs',
    } as MonthDetail;
  });
}

function monthRange(names: string[]): string {
  return names.length === 0 ? '—' : names.map((n) => n.slice(0, 3)).join(', ');
}

export function bestMonths(d: Destination): string {
  return monthRange(MONTH_NAMES.filter((_, i) => d.months[i].season === 'good'));
}

export function cheapestMonths(d: Destination): string {
  const off = MONTH_NAMES.filter((_, i) => d.months[i].season === 'avoid' && !isPeakOverload(d, i));
  if (off.length > 0) return monthRange(off);
  return monthRange(MONTH_NAMES.filter((_, i) => d.months[i].season === 'ok'));
}

export function quietestMonths(d: Destination): string {
  return cheapestMonths(d);
}

const TAG_BULLETS: Record<string, (d: Destination) => string> = {
  beach: (d) => `Coastline worth planning around — ${d.name}'s beaches are at their best in the green months above.`,
  city: () => `City life that rewards a long weekend — food, neighborhoods and nightlife on foot.`,
  culture: () => `Layers of history and living culture, from landmarks to local markets.`,
  nature: () => `Big outdoors — national parks, trails and landscapes you plan a trip around.`,
  winter: (d) => `A strong winter pick: think ${d.region === 'Middle East' || d.region === 'Africa' ? 'warm sun while home is cold' : 'snow season done properly'}.`,
  summer: () => `Made for summer itineraries — long days and high season energy.`,
};

export function whyVisit(d: Destination): string[] {
  const bullets = [
    `${d.description}. That's the one-line pitch — here's the longer case.`,
    ...d.tags.map((t) => TAG_BULLETS[t]?.(d)).filter((b): b is string => Boolean(b)),
  ];
  return bullets.slice(0, 4);
}

/**
 * Page copy for a destination: hand-written editorial when available (see
 * countryCopy.ts), otherwise SEO-friendly generated prose derived from the
 * seasonality data. Keeps all ~118 pages populated and keyword-targeted.
 */
export function pageCopy(d: Destination): CountryCopy {
  const hand = getCountryCopy(d.code);
  if (hand) return hand;

  const best = bestMonths(d);
  const cheap = cheapestMonths(d);
  return {
    metaDescription:
      `The best time to visit ${d.name} is ${best}. Compare ${d.name}'s weather, crowds ` +
      `and costs month by month, and find the cheapest time to go.`,
    intro:
      `Wondering about the best time to visit ${d.name}? This ${d.region} destination — ` +
      `${d.description} — rewards good timing: the right month shapes the weather, ` +
      `the crowds and the cost of your trip. Here's ${d.name} month by month, so you can plan ` +
      `around both your calendar and your budget.`,
    bestTime:
      `The best time to visit ${d.name} is ${best} — the months that balance the finest weather ` +
      `with manageable crowds. These are the peak-season windows, so book flights and stays early ` +
      `for the best choice.`,
    budget:
      `The cheapest and quietest time to visit ${d.name} is ${cheap}, when prices ease and ` +
      `crowds thin out in exchange for some weather trade-offs. Check the month-by-month table ` +
      `above to weigh cost against conditions.`,
    highlights: whyVisit(d),
  };
}

export function metaDescription(d: Destination): string {
  return pageCopy(d).metaDescription;
}

export type Faq = { q: string; a: string };

export function faqs(d: Destination): Faq[] {
  return [
    {
      q: `When is the best time to visit ${d.name}?`,
      a: `The sweet spot is ${bestMonths(d)} — the months balancing good weather with manageable crowds and prices.`,
    },
    {
      q: `When is ${d.name} cheapest?`,
      a: `${cheapestMonths(d)}. Flights and stays drop outside the peak window; expect some weather trade-offs.`,
    },
    {
      q: `When is ${d.name} most crowded?`,
      a: `Crowds peak in the high-season months marked "High" or "Very high" in the table above. Book stays early or aim for shoulder months.`,
    },
    {
      q: `Do I need a visa for ${d.name}?`,
      a: `It depends on your passport. Atlys checks requirements for your nationality and gets your visa on time, guaranteed.`,
    },
  ];
}
