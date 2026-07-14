// Destination data for the landing page. Each destination carries a
// month-by-month rating (g = best window, o = shoulder / good-but-peak-priced,
// a = avoid) balancing three signals: weather, crowds, and price. Examples:
// Croatia Aug = avoid (peak crowds + prices), Iceland Jul–Aug = ok (great
// weather, peak prices), Caribbean Sep–Oct = avoid (hurricane season),
// Gulf states Jun–Sep = avoid (extreme heat). Static content — no backend.

import type { MonthSeason, Season } from '@/components';

export type DestinationTag = 'winter' | 'summer' | 'beach' | 'city' | 'nature' | 'culture';

export type Destination = {
  code: string;
  name: string;
  region: string;
  description: string;
  months: MonthSeason[];
  tags: DestinationTag[];
};

const M = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** Build a 12-month season row from a compact string of g/o/a chars. */
function months(pattern: string): MonthSeason[] {
  if (pattern.length !== 12) throw new Error(`bad month pattern: ${pattern}`);
  const map: Record<string, Season> = { g: 'good', o: 'ok', a: 'avoid' };
  return M.map((label, i) => ({ label, season: map[pattern[i]] ?? 'ok' }));
}

// Compact rows: [code, name, region, description, months JAN..DEC, tags]
type Row = [string, string, string, string, string, DestinationTag[]];

const ROWS: Row[] = [
  ['AL', 'Albania', 'Europe', 'Riviera beaches without the crowds', 'aaooggooggoa', ['beach', 'summer', 'nature']],
  ['AR', 'Argentina', 'South America', 'Patagonia, tango and steak', 'oggooaaaoggo', ['nature', 'city', 'summer']],
  ['AM', 'Armenia', 'Caucasus', 'Monasteries and highland roads', 'aaogggooggoa', ['culture', 'nature']],
  ['AU', 'Australia', 'Oceania', 'Reefs, outback and surf', 'oogggoooggga', ['beach', 'nature', 'summer']],
  ['AT', 'Austria', 'Europe', 'Alps, opera and cafés', 'ggoogggggoog', ['winter', 'city', 'culture']],
  ['AZ', 'Azerbaijan', 'Caucasus', 'Flame towers and mud volcanoes', 'aaogggooggoa', ['city', 'culture']],
  ['BS', 'Bahamas', 'Caribbean', 'Pink sand and clear flats', 'ggggoooaaaog', ['beach', 'winter']],
  ['BH', 'Bahrain', 'Middle East', 'Pearling towns and souqs', 'gggoaaaaaogg', ['city', 'winter']],
  ['BD', 'Bangladesh', 'Asia', 'Rivers, mangroves and tea', 'ggoaaaaaoogg', ['nature', 'culture', 'winter']],
  ['BB', 'Barbados', 'Caribbean', 'Rum, reefs and cricket', 'ggggooooaaog', ['beach', 'winter']],
  ['BE', 'Belgium', 'Europe', 'Squares, beer and chocolate', 'aaoogggggooo', ['city', 'culture']],
  ['BZ', 'Belize', 'Central America', 'Reef diving and Maya ruins', 'gggggoooaaog', ['beach', 'nature']],
  ['BO', 'Bolivia', 'South America', 'Salt flats and high deserts', 'oaooggggggoo', ['nature']],
  ['BA', 'Bosnia and Herzegovina', 'Europe', 'Ottoman bridges and rivers', 'aaoggggoggoa', ['culture', 'nature']],
  ['BW', 'Botswana', 'Africa', 'Okavango safaris at dawn', 'ooooggggggoo', ['nature']],
  ['BR', 'Brazil', 'South America', 'Full of energy, diverse places', 'oogggooogggo', ['beach', 'summer', 'nature']],
  ['BN', 'Brunei', 'Asia', 'Water villages and rainforest', 'ogggoooooooo', ['nature', 'culture']],
  ['BG', 'Bulgaria', 'Europe', 'Black Sea and mountain monasteries', 'aaogggooggoa', ['culture', 'beach', 'winter']],
  ['KH', 'Cambodia', 'Asia', 'Angkor temples at sunrise', 'ggoaaaoooogg', ['culture', 'winter']],
  ['CA', 'Canada', 'North America', 'Lakes, peaks and maple', 'ooooggggggoo', ['winter', 'nature']],
  ['CL', 'Chile', 'South America', 'Deserts, glaciers and wine', 'ggooaaaaoggg', ['nature', 'summer']],
  ['CN', 'China', 'Asia', 'Walls, wonders and megacities', 'oogggoaaggoo', ['city', 'culture']],
  ['CO', 'Colombia', 'South America', 'Coffee, coast and color', 'gggoooggooog', ['beach', 'culture', 'nature']],
  ['CR', 'Costa Rica', 'Central America', 'Cloud forests and two coasts', 'ggggooooaaog', ['nature', 'beach']],
  ['HR', 'Croatia', 'Europe', 'Walled towns and clear coves', 'aoogggoaggoa', ['beach', 'summer', 'culture']],
  ['CU', 'Cuba', 'Caribbean', 'Classic cars and casas', 'ggggoaooaagg', ['beach', 'culture', 'winter']],
  ['CY', 'Cyprus', 'Europe', 'Ruins and warm sea into autumn', 'ooggggoogggo', ['beach', 'summer', 'culture']],
  ['CZ', 'Czechia', 'Europe', 'Spires, bridges and lagers', 'aaogggggggog', ['city', 'culture', 'winter']],
  ['DK', 'Denmark', 'Europe', 'Design, harbors and hygge', 'aaoogggggoao', ['city', 'culture']],
  ['DO', 'Dominican Republic', 'Caribbean', 'All-inclusive coasts and merengue', 'ggggoooaaaog', ['beach', 'winter']],
  ['EC', 'Ecuador', 'South America', 'Andes, Amazon and Galápagos', 'oooooggggooo', ['nature']],
  ['EG', 'Egypt', 'Africa', 'Pyramids, Nile and dunes', 'gggoaaaaoggg', ['culture', 'winter']],
  ['SV', 'El Salvador', 'Central America', 'Surf breaks and volcano hikes', 'ggggooooaogg', ['beach', 'nature']],
  ['EE', 'Estonia', 'Europe', 'Medieval lanes and islands', 'aaoogggggoao', ['city', 'culture']],
  ['ET', 'Ethiopia', 'Africa', 'Rock churches and highlands', 'gggooaaaoggg', ['culture', 'nature']],
  ['FJ', 'Fiji', 'Oceania', 'Soft coral reefs and kava', 'oaaoggggggoo', ['beach', 'nature']],
  ['FI', 'Finland', 'Europe', 'Lakes, saunas and auroras', 'gggooggggoog', ['winter', 'nature']],
  ['FR', 'France', 'Europe', 'Wine, art and riviera', 'ooogggoaggoo', ['city', 'culture', 'beach']],
  ['GE', 'Georgia', 'Caucasus', 'Mountains, wine and old towns', 'aaogggooggoa', ['nature', 'culture']],
  ['DE', 'Germany', 'Europe', 'Castles, forests and markets', 'aaoggggggoog', ['city', 'culture', 'winter']],
  ['GH', 'Ghana', 'Africa', 'Forts, beaches and highlife', 'ggooaaoooogg', ['culture', 'beach']],
  ['GR', 'Greece', 'Europe', 'Islands, ruins and blue seas', 'ooogggooggoo', ['beach', 'summer', 'culture']],
  ['GT', 'Guatemala', 'Central America', 'Volcano lakes and markets', 'ggggoaooaogg', ['culture', 'nature']],
  ['HN', 'Honduras', 'Central America', 'Bay Islands diving on a budget', 'ggggooooaaog', ['beach', 'nature']],
  ['HK', 'Hong Kong', 'Asia', 'Skyline, dim sum and trails', 'ggoooaaaoggg', ['city', 'culture']],
  ['HU', 'Hungary', 'Europe', 'Baths, ruin bars and the Danube', 'aaogggooggog', ['city', 'culture']],
  ['IS', 'Iceland', 'Europe', 'Glaciers, geysers and auroras', 'ooooggooggoo', ['winter', 'nature']],
  ['IN', 'India', 'Asia', 'Forts, spice and Himalayas', 'gggoaaaaoggg', ['culture', 'winter', 'nature']],
  ['ID', 'Indonesia', 'Asia', 'Islands, temples and reefs', 'aaogggooggoo', ['beach', 'nature', 'summer']],
  ['IE', 'Ireland', 'Europe', 'Cliffs, pubs and green hills', 'aooggggogoao', ['nature', 'culture']],
  ['IL', 'Israel', 'Middle East', 'Old cities and new coastlines', 'oogggoaaoggo', ['culture', 'beach']],
  ['IT', 'Italy', 'Europe', 'Coastlines, cities and cuisine', 'ooogggoagggo', ['city', 'culture', 'beach']],
  ['JM', 'Jamaica', 'Caribbean', 'Reggae, jerk and waterfalls', 'ggggoooaaaog', ['beach', 'winter']],
  ['JP', 'Japan', 'Asia', 'Temples, food and neon cities', 'oogggoaaoggo', ['city', 'culture', 'winter']],
  ['JO', 'Jordan', 'Middle East', 'Petra, wadis and the Dead Sea', 'oogggoaaoggo', ['culture', 'nature']],
  ['KZ', 'Kazakhstan', 'Central Asia', 'Steppe, canyons and new cities', 'aaogggooggoa', ['nature', 'city']],
  ['KE', 'Kenya', 'Africa', 'The Great Migration up close', 'ggoaaoggggoo', ['nature', 'summer']],
  ['KW', 'Kuwait', 'Middle East', 'Corniche views and diwaniyas', 'gggoaaaaaogg', ['city', 'winter']],
  ['LA', 'Laos', 'Asia', 'Slow boats and waterfalls', 'ggoaaaoooggg', ['nature', 'culture', 'winter']],
  ['LV', 'Latvia', 'Europe', 'Art nouveau and pine coasts', 'aaoogggggoao', ['city', 'culture']],
  ['LB', 'Lebanon', 'Middle East', 'Ski mornings, beach afternoons', 'ooggggooggoo', ['city', 'culture', 'beach']],
  ['LT', 'Lithuania', 'Europe', 'Baroque old towns and dunes', 'aaoogggggoao', ['city', 'culture']],
  ['LU', 'Luxembourg', 'Europe', 'Casemates and castle valleys', 'aaoogggggooo', ['city', 'culture']],
  ['MG', 'Madagascar', 'Africa', 'Baobabs and lemurs', 'aaagggggggoo', ['nature']],
  ['MY', 'Malaysia', 'Asia', 'Rainforest, towers and food', 'oggoogggooao', ['beach', 'city', 'nature']],
  ['MV', 'Maldives', 'Asia', 'Overwater villas and manta rays', 'ogggoaaaaooo', ['beach', 'winter']],
  ['MT', 'Malta', 'Europe', 'Honey-stone cities and blue sea', 'ooogggoogggo', ['culture', 'beach', 'summer']],
  ['MU', 'Mauritius', 'Africa', 'Lagoons and mountain trails', 'oaaogggggggo', ['beach', 'nature']],
  ['MX', 'Mexico', 'North America', 'Ruins, cenotes and coast', 'gggoooooaogg', ['beach', 'culture', 'winter']],
  ['MN', 'Mongolia', 'Asia', 'Gers, steppe and eagle hunters', 'aaaoogggooaa', ['nature']],
  ['ME', 'Montenegro', 'Europe', 'Fjord-like bays and peaks', 'aoogggoaggoa', ['beach', 'nature', 'summer']],
  ['MA', 'Morocco', 'Africa', 'Medinas, dunes and mountains', 'oogggoaogggo', ['culture', 'nature']],
  ['MM', 'Myanmar', 'Asia', 'Temple plains and river life', 'ggoaaaaooggg', ['culture', 'winter']],
  ['NA', 'Namibia', 'Africa', 'Dunes, canyons and stars', 'ooooggggggoo', ['nature']],
  ['NP', 'Nepal', 'Asia', 'Everest views and prayer flags', 'oogggaaaoggo', ['nature', 'culture']],
  ['NL', 'Netherlands', 'Europe', 'Canals, bikes and tulips', 'aaoggggggoao', ['city', 'culture']],
  ['NZ', 'New Zealand', 'Oceania', 'Fjords, ferns and adventure', 'ogggoaaaoggo', ['nature', 'summer']],
  ['NG', 'Nigeria', 'Africa', 'Lagos energy and green hills', 'ggooaaaooogg', ['city', 'culture']],
  ['NO', 'Norway', 'Europe', 'Fjords, trolls and midnight sun', 'ggoooggggoog', ['winter', 'nature']],
  ['OM', 'Oman', 'Middle East', 'Wadis, forts and frankincense', 'gggoaaoooggg', ['nature', 'culture', 'winter']],
  ['PA', 'Panama', 'Central America', 'Canal views and island chains', 'ggggooooaaog', ['beach', 'city']],
  ['PY', 'Paraguay', 'South America', 'River ports and quiet missions', 'aaoggggggoaa', ['culture']],
  ['PE', 'Peru', 'South America', 'Machu Picchu and the Andes', 'oaogggogggoo', ['nature', 'culture']],
  ['PH', 'Philippines', 'Asia', 'Lagoons, terraces and reefs', 'ggggoaaaaogg', ['beach', 'nature', 'summer']],
  ['PL', 'Poland', 'Europe', 'Old towns and pierogi', 'aaoggggggooo', ['city', 'culture']],
  ['PT', 'Portugal', 'Europe', 'Cliffs, surf and pastéis', 'oogggggogggo', ['beach', 'city', 'summer']],
  ['QA', 'Qatar', 'Middle East', 'Museums, souqs and skyline', 'gggoaaaaaogg', ['city', 'winter']],
  ['RO', 'Romania', 'Europe', 'Castles and the Carpathians', 'aaogggooggoa', ['nature', 'culture']],
  ['RU', 'Russia', 'Eurasia', 'Palaces, steppe and rail', 'aaoogggggoaa', ['city', 'culture']],
  ['RW', 'Rwanda', 'Africa', 'Gorilla treks in the mist', 'ogoaaggggoao', ['nature']],
  ['SA', 'Saudi Arabia', 'Middle East', 'AlUla, Red Sea and dunes', 'gggoaaaaoggg', ['culture', 'winter']],
  ['SN', 'Senegal', 'Africa', 'Pink lakes and island history', 'gggggoaaaogg', ['beach', 'culture']],
  ['RS', 'Serbia', 'Europe', 'Fortresses and festival nights', 'aaogggooggoa', ['city', 'culture']],
  ['SC', 'Seychelles', 'Africa', 'Granite coves and giant palms', 'oooggooooggo', ['beach', 'nature']],
  ['SG', 'Singapore', 'Asia', 'Gardens, hawkers and skyline', 'ogggoooooooo', ['city', 'culture']],
  ['SK', 'Slovakia', 'Europe', 'Tatra trails and castles', 'aaoggggggooo', ['nature', 'culture', 'winter']],
  ['SI', 'Slovenia', 'Europe', 'Alpine lakes and karst caves', 'aaoogggoggoa', ['nature', 'city']],
  ['ZA', 'South Africa', 'Africa', 'Safaris, capes and vineyards', 'ggoooggggogg', ['nature', 'beach', 'summer']],
  ['KR', 'South Korea', 'Asia', 'Palaces, K-food and peaks', 'oogggoaaggoo', ['city', 'culture']],
  ['ES', 'Spain', 'Europe', 'Sun, tapas and festivals', 'ooggggooggoo', ['beach', 'city', 'summer']],
  ['LK', 'Sri Lanka', 'Asia', 'Tea hills, trains and surf', 'gggooooooaog', ['beach', 'nature']],
  ['SE', 'Sweden', 'Europe', 'Archipelagos and design', 'oooogggggoag', ['city', 'nature', 'winter']],
  ['CH', 'Switzerland', 'Europe', 'Trains, peaks and lakes', 'ggoooggggoag', ['winter', 'nature']],
  ['TW', 'Taiwan', 'Asia', 'Night markets and gorges', 'ogggoaaaoggo', ['city', 'nature']],
  ['TZ', 'Tanzania', 'Africa', 'Serengeti and spice islands', 'ggoaagggggoo', ['nature', 'beach']],
  ['TH', 'Thailand', 'Asia', 'Beaches, street food and temples', 'ggoooaaaoogg', ['beach', 'culture', 'winter']],
  ['TN', 'Tunisia', 'Africa', 'Medinas and Saharan forts', 'oogggoaagggo', ['culture', 'beach']],
  ['TR', 'Türkiye', 'Eurasia', 'Bazaars, coast and history', 'ooggggaaggoo', ['culture', 'beach', 'summer']],
  ['UG', 'Uganda', 'Africa', 'Gorillas and the Nile source', 'ogoaaggggoao', ['nature']],
  ['UA', 'Ukraine', 'Europe', 'Golden domes and steppe', 'aaoggggggooa', ['city', 'culture']],
  ['AE', 'United Arab Emirates', 'Middle East', 'Desert, souks and skyscrapers', 'gggoaaaaaogg', ['city', 'winter']],
  ['GB', 'United Kingdom', 'Europe', 'History, pubs and hills', 'aooggggogoao', ['city', 'culture']],
  ['US', 'United States', 'North America', 'Parks, cities and road trips', 'ooggggooggoo', ['city', 'nature']],
  ['UY', 'Uruguay', 'South America', 'Beach towns and slow rhythms', 'ogggoaaaoggo', ['beach', 'summer']],
  ['UZ', 'Uzbekistan', 'Central Asia', 'Silk Road blue-tiled cities', 'aogggoaaggoa', ['culture']],
  ['VN', 'Vietnam', 'Asia', 'Karst bays and old quarters', 'ggggoooooggg', ['beach', 'culture', 'nature']],
  ['ZM', 'Zambia', 'Africa', 'Vic Falls and walking safaris', 'ogggggggooao', ['nature']],
  ['ZW', 'Zimbabwe', 'Africa', 'Falls, ruins and big five', 'ogggggggooao', ['nature']],
];

/** All destinations, alphabetical by name. */
export const DESTINATIONS: Destination[] = ROWS.map(
  ([code, name, region, description, pattern, tags]) => ({
    code,
    name,
    region,
    description,
    months: months(pattern),
    tags,
  }),
).sort((a, b) => a.name.localeCompare(b.name));

// Popular destinations in rough priority order — used to curate the featured
// strip. Only those rated "good" in the current month are shown.
const POPULAR = [
  'GR', 'PT', 'ID', 'JP', 'TH', 'IT', 'ES', 'FR', 'TR', 'VN', 'CH', 'IS',
  'NO', 'KE', 'GE', 'ZA', 'PE', 'MX', 'BR', 'AU', 'NZ', 'HR', 'MV', 'AE',
];

const monthIndex = new Date().getMonth();

/** Six destinations at their best in the current month. */
export const FEATURED: Destination[] = (() => {
  const isGood = (d: Destination) => d.months[monthIndex].season === 'good';
  const picks = POPULAR.map((code) => DESTINATIONS.find((d) => d.code === code)!).filter(isGood);
  // Top up from the full list if the popular set is thin this month.
  for (const d of DESTINATIONS) {
    if (picks.length >= 6) break;
    if (isGood(d) && !picks.includes(d)) picks.push(d);
  }
  return picks.slice(0, 6);
})();
