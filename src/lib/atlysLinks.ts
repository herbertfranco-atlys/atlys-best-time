// Builds links to the real atlys.com visa application pages.
// URL pattern (verified against the live site): https://www.atlys.com/visa/<slug>-visa
// where <slug> is the lowercased, hyphenated country name — plus a handful of
// marketing slugs that differ from the country name (also verified live):
//   AE → dubai, US → usa, GB → uk, TR → turkey, CZ → czech-republic, SA → saudi

const SLUG_OVERRIDES: Record<string, string> = {
  AE: 'dubai',
  US: 'usa',
  GB: 'uk',
  TR: 'turkey',
  CZ: 'czech-republic',
  SA: 'saudi',
  BN: 'brunei-darussalam',
};

// Countries with no dedicated visa page on atlys.com (verified 404) — send
// users to the visa catalog instead of a dead link.
const NO_PAGE = new Set(['AM']);

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics (Türkiye → Turkiye)
    .toLowerCase()
    .replace(/[^a-z\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Application page on atlys.com for a destination, e.g. …/visa/indonesia-visa */
export function atlysVisaUrl(code: string, name: string): string {
  const upper = code.toUpperCase();
  if (NO_PAGE.has(upper)) return 'https://www.atlys.com/visa';
  const slug = SLUG_OVERRIDES[upper] ?? slugify(name);
  return `https://www.atlys.com/visa/${slug}-visa`;
}

export const ATLYS_HOME = 'https://www.atlys.com/';
