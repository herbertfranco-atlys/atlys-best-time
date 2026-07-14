// Country reference data for the nationality selector and destination lists.
// Flag images live in public/flags/<code>.svg (circle-flags set); the emoji
// helper remains for contexts without image support.

export type Country = {
  /** ISO-3166 alpha-2 code, uppercase (e.g. "IN"). */
  code: string;
  /** Display name. */
  name: string;
  /** Flag emoji, derived from `code`. */
  flag: string;
};

/** Turn an alpha-2 code into its flag emoji (🇮🇳 for "IN"). */
export function flagOf(code: string): string {
  const base = 0x1f1e6; // regional indicator "A"
  return code
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map((c) => String.fromCodePoint(base + c.charCodeAt(0) - 65))
    .join('');
}

const RAW: ReadonlyArray<[code: string, name: string]> = [
  ['AL', 'Albania'],
  ['AR', 'Argentina'],
  ['AM', 'Armenia'],
  ['AU', 'Australia'],
  ['AT', 'Austria'],
  ['AZ', 'Azerbaijan'],
  ['BS', 'Bahamas'],
  ['BH', 'Bahrain'],
  ['BD', 'Bangladesh'],
  ['BB', 'Barbados'],
  ['BE', 'Belgium'],
  ['BZ', 'Belize'],
  ['BO', 'Bolivia'],
  ['BA', 'Bosnia and Herzegovina'],
  ['BW', 'Botswana'],
  ['BR', 'Brazil'],
  ['BN', 'Brunei'],
  ['BG', 'Bulgaria'],
  ['KH', 'Cambodia'],
  ['CA', 'Canada'],
  ['CL', 'Chile'],
  ['CN', 'China'],
  ['CO', 'Colombia'],
  ['CR', 'Costa Rica'],
  ['HR', 'Croatia'],
  ['CU', 'Cuba'],
  ['CY', 'Cyprus'],
  ['CZ', 'Czechia'],
  ['DK', 'Denmark'],
  ['DO', 'Dominican Republic'],
  ['EC', 'Ecuador'],
  ['EG', 'Egypt'],
  ['SV', 'El Salvador'],
  ['EE', 'Estonia'],
  ['ET', 'Ethiopia'],
  ['FJ', 'Fiji'],
  ['FI', 'Finland'],
  ['FR', 'France'],
  ['GE', 'Georgia'],
  ['DE', 'Germany'],
  ['GH', 'Ghana'],
  ['GR', 'Greece'],
  ['GT', 'Guatemala'],
  ['HN', 'Honduras'],
  ['HK', 'Hong Kong'],
  ['HU', 'Hungary'],
  ['IS', 'Iceland'],
  ['IN', 'India'],
  ['ID', 'Indonesia'],
  ['IE', 'Ireland'],
  ['IL', 'Israel'],
  ['IT', 'Italy'],
  ['JM', 'Jamaica'],
  ['JP', 'Japan'],
  ['JO', 'Jordan'],
  ['KZ', 'Kazakhstan'],
  ['KE', 'Kenya'],
  ['KW', 'Kuwait'],
  ['LA', 'Laos'],
  ['LV', 'Latvia'],
  ['LB', 'Lebanon'],
  ['LT', 'Lithuania'],
  ['LU', 'Luxembourg'],
  ['MG', 'Madagascar'],
  ['MY', 'Malaysia'],
  ['MV', 'Maldives'],
  ['MT', 'Malta'],
  ['MU', 'Mauritius'],
  ['MX', 'Mexico'],
  ['MN', 'Mongolia'],
  ['ME', 'Montenegro'],
  ['MA', 'Morocco'],
  ['MM', 'Myanmar'],
  ['NA', 'Namibia'],
  ['NP', 'Nepal'],
  ['NL', 'Netherlands'],
  ['NZ', 'New Zealand'],
  ['NG', 'Nigeria'],
  ['NO', 'Norway'],
  ['OM', 'Oman'],
  ['PA', 'Panama'],
  ['PY', 'Paraguay'],
  ['PE', 'Peru'],
  ['PH', 'Philippines'],
  ['PL', 'Poland'],
  ['PT', 'Portugal'],
  ['QA', 'Qatar'],
  ['RO', 'Romania'],
  ['RU', 'Russia'],
  ['RW', 'Rwanda'],
  ['SA', 'Saudi Arabia'],
  ['SN', 'Senegal'],
  ['RS', 'Serbia'],
  ['SC', 'Seychelles'],
  ['SG', 'Singapore'],
  ['SK', 'Slovakia'],
  ['SI', 'Slovenia'],
  ['ZA', 'South Africa'],
  ['KR', 'South Korea'],
  ['ES', 'Spain'],
  ['LK', 'Sri Lanka'],
  ['SE', 'Sweden'],
  ['CH', 'Switzerland'],
  ['TW', 'Taiwan'],
  ['TZ', 'Tanzania'],
  ['TH', 'Thailand'],
  ['TN', 'Tunisia'],
  ['TR', 'Türkiye'],
  ['UG', 'Uganda'],
  ['UA', 'Ukraine'],
  ['AE', 'United Arab Emirates'],
  ['GB', 'United Kingdom'],
  ['US', 'United States'],
  ['UY', 'Uruguay'],
  ['UZ', 'Uzbekistan'],
  ['VN', 'Vietnam'],
  ['ZM', 'Zambia'],
  ['ZW', 'Zimbabwe'],
];

export const COUNTRIES: readonly Country[] = RAW.map(([code, name]) => ({
  code,
  name,
  flag: flagOf(code),
}));

const BY_CODE = new Map(COUNTRIES.map((c) => [c.code, c]));

/** Look up a country by code; returns undefined if unknown. */
export function countryByCode(code: string | undefined | null): Country | undefined {
  if (!code) return undefined;
  return BY_CODE.get(code.toUpperCase());
}
