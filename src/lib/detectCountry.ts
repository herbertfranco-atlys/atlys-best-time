// Offline best-effort detection of the visitor's country, used to pre-select
// the hero's nationality dropdown. No network calls, no permission prompts —
// we read only what the browser already exposes:
//   1. the region subtag of navigator.language (e.g. "en-IN" -> "IN")
//   2. a fallback map from IANA timezone -> country
// and fall back to a sensible default when nothing matches.

import { countryByCode } from '@/data/countries';

const DEFAULT_CODE = 'IN';

// Minimal timezone -> country map covering common zones. Not exhaustive; it is
// only a fallback for when the locale carries no region subtag.
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Asia/Dubai': 'AE',
  'Asia/Singapore': 'SG',
  'Asia/Hong_Kong': 'HK',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Bangkok': 'TH',
  'Asia/Jakarta': 'ID',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Manila': 'PH',
  'Asia/Ho_Chi_Minh': 'VN',
  'Asia/Colombo': 'LK',
  'Asia/Jerusalem': 'IL',
  'Asia/Riyadh': 'SA',
  'Asia/Qatar': 'QA',
  'Asia/Istanbul': 'TR',
  'Europe/Istanbul': 'TR',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES',
  'Europe/Rome': 'IT',
  'Europe/Lisbon': 'PT',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/Vienna': 'AT',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK',
  'Europe/Helsinki': 'FI',
  'Europe/Warsaw': 'PL',
  'Europe/Prague': 'CZ',
  'Europe/Budapest': 'HU',
  'Europe/Bucharest': 'RO',
  'Europe/Athens': 'GR',
  'Europe/Moscow': 'RU',
  'Atlantic/Reykjavik': 'IS',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Santiago': 'CL',
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
  'Africa/Cairo': 'EG',
  'Africa/Nairobi': 'KE',
  'Africa/Casablanca': 'MA',
  'Africa/Johannesburg': 'ZA',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Pacific/Auckland': 'NZ',
};

function regionFromLocale(): string | undefined {
  if (typeof navigator === 'undefined') return undefined;
  const lang = navigator.language;
  if (!lang) return undefined;
  try {
    const region = new Intl.Locale(lang).region;
    if (region) return region.toUpperCase();
  } catch {
    // Older engines: fall back to parsing "xx-YY".
  }
  const parts = lang.split('-');
  const last = parts.length > 1 ? parts[parts.length - 1] : undefined;
  return last && /^[A-Za-z]{2}$/.test(last) ? last.toUpperCase() : undefined;
}

function regionFromTimezone(): string | undefined {
  if (typeof Intl === 'undefined' || !Intl.DateTimeFormat) return undefined;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz ? TIMEZONE_TO_COUNTRY[tz] : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Best-effort country code for the current visitor. Only returns a code that
 * exists in our country list; otherwise the default (`"IN"`).
 */
export function detectCountryCode(): string {
  const candidates = [regionFromLocale(), regionFromTimezone()];
  for (const code of candidates) {
    if (code && countryByCode(code)) return code;
  }
  return DEFAULT_CODE;
}
