// Hand-written, SEO-focused editorial copy for high-traffic destinations.
// Each entry targets the "best time to visit <country>" query family and its
// long-tail variants (cheapest time, weather by month, when to avoid crowds).
// Countries without an entry fall back to the generated copy in
// countryContent.ts. Statements here are kept consistent with the month
// ratings in destinations.ts.

export type CountryCopy = {
  /** ~150-char meta description for search snippets. */
  metaDescription: string;
  /** Keyword-rich opening paragraph shown as the page overview. */
  intro: string;
  /** The money paragraph answering "when is the best time to visit". */
  bestTime: string;
  /** Cost and crowd guidance — cheapest and quietest windows. */
  budget: string;
  /** Editorial "why visit" points. */
  highlights: string[];
};

export const COUNTRY_COPY: Record<string, CountryCopy> = {
  JP: {
    metaDescription:
      'The best time to visit Japan is spring (March–May) for cherry blossoms and autumn (October–November) for fall colour. See Japan weather, crowds and costs by month.',
    intro:
      "Deciding on the best time to visit Japan comes down to two headline seasons: cherry-blossom spring and fiery-red autumn. Both deliver mild weather and postcard scenery, but they are also the busiest and most expensive months, so timing your trip well is the difference between a magical visit and a crowded, pricey one.",
    bestTime:
      'The best time to visit Japan is late March to May, when sakura sweeps north across the country, and October to November, when the maples turn and temperatures are crisp and clear. These shoulder seasons offer the finest weather of the year — plan around them and book accommodation early.',
    budget:
      "Japan is cheapest and quietest in the off-season: January–February (outside the ski resorts) and the rainy weeks of June. Summer is hot, humid and pricey around the Obon holidays, so travellers on a budget should aim for winter city breaks or early June.",
    highlights: [
      'Cherry blossom season transforms parks, castles and riverbanks into pink canopies for roughly two weeks each spring.',
      'World-class food at every price point, from Michelin sushi counters to ¥400 bowls of ramen.',
      'Effortless bullet-train travel links Tokyo, Kyoto and the countryside in hours.',
      'Autumn foliage (kōyō) rivals the blossoms, with temples framed in crimson and gold.',
    ],
  },
  TH: {
    metaDescription:
      'The best time to visit Thailand is the cool, dry season from November to February — sunny beaches, low humidity. See Thailand weather, crowds and prices by month.',
    intro:
      'Thailand runs on a tropical monsoon calendar, so the best time to visit Thailand is all about dodging the rains and the heat. Get the timing right and you get golden beaches, temple-hopping in comfortable weather, and the country at its most photogenic.',
    bestTime:
      'The best time to visit Thailand is November to February, the cool, dry season, when Bangkok, Chiang Mai and the islands enjoy sunshine and low humidity. This is peak season for good reason — expect the finest weather but the highest prices and busiest beaches.',
    budget:
      'For the lowest prices, travel in the green (low) season from June to October, when rains are usually short afternoon downpours and resorts slash rates. March to May is cheap too but punishingly hot.',
    highlights: [
      'Some of the world’s best beaches and islands, from Phuket to the Andaman coast.',
      'Legendary street food and night markets in every city.',
      'Gilded temples and the Grand Palace in Bangkok.',
      'Excellent value — your money goes far on food, stays and transport.',
    ],
  },
  ID: {
    metaDescription:
      'The best time to visit Indonesia and Bali is the dry season, April to October. Compare Bali weather, crowds and costs month by month before you book.',
    intro:
      'Whether you are chasing Bali’s beaches, Java’s volcanoes or Komodo’s dragons, the best time to visit Indonesia is governed by the dry season. The archipelago straddles the equator, so it is warm year-round — what changes is the rain.',
    bestTime:
      'The best time to visit Indonesia is April to October, the dry season, with the sweet spots in April–June and September–October when you get sunshine without the July–August peak-season crowds and prices in Bali.',
    budget:
      'The wet season (November–March) is the cheapest time to visit, with lower rates and thinner crowds between tropical downpours. Book Bali well ahead for July, August and the Christmas/New Year peak.',
    highlights: [
      'Bali’s temples, rice terraces and surf breaks in one compact island.',
      'World-class diving and snorkelling across Komodo, the Gili Islands and Raja Ampat.',
      'Sunrise treks up active volcanoes like Bromo and Ijen.',
      'Rich culture and ceremony, especially in Ubud and across Java.',
    ],
  },
  IN: {
    metaDescription:
      'The best time to visit India is October to March, when the weather is cool and dry across most of the country. See India’s weather, crowds and costs by month.',
    intro:
      'India is a subcontinent of climates, but for most itineraries — Golden Triangle, Rajasthan, Kerala, Goa — the best time to visit India is the cool, dry winter. Time it right and you sidestep both the searing pre-monsoon heat and the summer rains.',
    bestTime:
      'The best time to visit India is October to March, when clear skies and comfortable temperatures make sightseeing, forts and beaches a pleasure. December and January are peak season in Rajasthan and Goa, so book ahead.',
    budget:
      'The cheapest time to visit is the monsoon and shoulder months (April–September), when heat and rain keep crowds and prices down — ideal for the Himalayan foothills, which are at their best in summer.',
    highlights: [
      'Iconic monuments from the Taj Mahal to Jaipur’s palaces and forts.',
      'Extraordinary regional cuisines that change every few hundred kilometres.',
      'Himalayan hill stations and backwater cruises in Kerala.',
      'Vibrant festivals like Diwali and Holi that light up the calendar.',
    ],
  },
  IT: {
    metaDescription:
      'The best time to visit Italy is spring (April–June) and autumn (September–November) — warm days, fewer crowds. See Italy weather, crowds and prices by month.',
    intro:
      'From the canals of Venice to the Amalfi Coast, the best time to visit Italy is the shoulder seasons, when the weather is warm, the light is golden and the summer crush has eased. Italy in high summer is glorious but hot and crowded.',
    bestTime:
      'The best time to visit Italy is April to June and September to November, when you get mild, sunny weather ideal for cities, coast and countryside without the August peak. September is especially good — warm seas, harvest season and thinner crowds.',
    budget:
      'Italy is cheapest in winter (excluding the Christmas and ski periods) and early spring, when city hotels drop their rates. Avoid August, when prices peak and many businesses close for the Italian holidays.',
    highlights: [
      'Unmatched art and history in Rome, Florence and Venice.',
      'Regional food and wine that defines Italian cuisine worldwide.',
      'Dramatic coastlines from Cinque Terre to the Amalfi Coast.',
      'Hill towns and vineyards across Tuscany and Umbria.',
    ],
  },
  ES: {
    metaDescription:
      'The best time to visit Spain is spring (March–June) and early autumn (September–October). Compare Spain’s weather, crowds and costs month by month.',
    intro:
      'Spain rewards travellers nearly year-round, but the best time to visit Spain is spring and early autumn, when Madrid, Barcelona, Andalusia and the coast bask in warm sunshine without the extreme summer heat of the interior.',
    bestTime:
      'The best time to visit Spain is March to June and September to October, offering warm, comfortable weather for city sightseeing, beaches and festivals. Southern cities like Seville and Córdoba are best enjoyed in spring before the summer furnace arrives.',
    budget:
      'The cheapest, quietest months are winter (November–February), when city breaks are excellent value. High summer brings peak coastal prices and crowds, especially in August.',
    highlights: [
      'Gaudí’s Barcelona and the Moorish palaces of Andalusia.',
      'Tapas culture, festivals and legendary nightlife.',
      'Mediterranean and Atlantic beaches plus the Balearic Islands.',
      'World-class art museums in Madrid and Bilbao.',
    ],
  },
  FR: {
    metaDescription:
      'The best time to visit France is late spring (April–June) and early autumn (September–October). See France weather, crowds and prices by month.',
    intro:
      'Paris, Provence, the Riviera, the Alps — France packs in wildly different trips, but the best time to visit France for most is the shoulder seasons, when the weather is kind and the summer crowds have thinned.',
    bestTime:
      'The best time to visit France is April to June and September to October, with mild, pleasant weather perfect for Paris, the châteaux of the Loire and the lavender of Provence. September brings the wine harvest and warm Mediterranean seas.',
    budget:
      'France is cheapest in late autumn and winter outside the ski season and holidays. August sees Parisians leave town and Riviera prices peak — plan city trips around it.',
    highlights: [
      'Paris: museums, cafés and landmarks that never lose their pull.',
      'Provence and the Côte d’Azur in full summer bloom.',
      'World-renowned wine regions from Bordeaux to Burgundy.',
      'Alpine skiing in winter and hiking in summer.',
    ],
  },
  GR: {
    metaDescription:
      'The best time to visit Greece is late spring (April–June) and September, for warm seas and fewer crowds. See Greece weather, crowds and costs by month.',
    intro:
      'For the islands, Athens and the ancient sites, the best time to visit Greece is the shoulder seasons, when the Aegean is warm, the light is legendary and the summer crowds on Santorini and Mykonos have not yet peaked.',
    bestTime:
      'The best time to visit Greece is April to June and September to October, with sunny, warm weather ideal for island-hopping, beaches and archaeology. September is a favourite — the sea is at its warmest after a summer of heating up.',
    budget:
      'The cheapest time to visit is late autumn to early spring, though many island businesses close over winter. July and August are peak — expect the highest ferry, hotel and flight prices.',
    highlights: [
      'Whitewashed island villages and caldera sunsets on Santorini.',
      'Ancient wonders from the Acropolis to Delphi.',
      'Some of the Mediterranean’s clearest, warmest waters.',
      'Relaxed tavernas and island-hopping by ferry.',
    ],
  },
  PT: {
    metaDescription:
      'The best time to visit Portugal is spring through early autumn (March–November). Compare Lisbon, Porto and Algarve weather, crowds and prices by month.',
    intro:
      'With one of Europe’s mildest climates, Portugal enjoys a long travel season. The best time to visit Portugal stretches from spring to autumn, covering Lisbon’s hills, Porto’s riverfront and the Algarve’s beaches.',
    bestTime:
      'The best time to visit Portugal is March to November, with the sweet spots in spring and September–October when the weather is warm, the Atlantic is swimmable and the summer beach crowds have eased.',
    budget:
      'Winter is the cheapest and quietest time, and Lisbon and Porto stay pleasantly mild. July and August bring peak Algarve prices, so shoulder months offer the best value for a beach trip.',
    highlights: [
      'Lisbon and Porto: tiled facades, viewpoints and pastéis de nata.',
      'The Algarve’s dramatic cliffs, coves and beaches.',
      'Port and Douro Valley wine country.',
      'Excellent value compared with much of Western Europe.',
    ],
  },
  TR: {
    metaDescription:
      'The best time to visit Turkey is spring (April–June) and autumn (September–October). See Istanbul, Cappadocia and coast weather, crowds and costs by month.',
    intro:
      'Straddling Europe and Asia, Türkiye offers Istanbul’s bazaars, Cappadocia’s balloons and a stunning Mediterranean coast. The best time to visit Turkey is spring and autumn, when the whole country is comfortably warm.',
    bestTime:
      'The best time to visit Turkey is April to June and September to October, ideal for Istanbul sightseeing, Cappadocia’s hot-air balloons and coastal resorts before or after the intense summer heat and crowds.',
    budget:
      'The cheapest months are winter (outside Istanbul city breaks and ski season), while July and August bring peak coastal prices. Shoulder seasons balance value, weather and crowds best.',
    highlights: [
      'Istanbul’s mosques, palaces and Grand Bazaar across two continents.',
      'Cappadocia’s fairy chimneys and sunrise balloon flights.',
      'Turquoise-coast beaches and Roman ruins like Ephesus.',
      'Legendary Turkish hospitality and cuisine.',
    ],
  },
  VN: {
    metaDescription:
      'The best time to visit Vietnam is roughly November to April for dry weather in most regions. See Vietnam’s weather, crowds and prices by month.',
    intro:
      'Vietnam stretches over 1,600 km, so its weather varies dramatically north to south. Broadly, the best time to visit Vietnam is the drier winter-to-spring window, when Hanoi, Ha Long Bay, Hoi An and Ho Chi Minh City are at their most reliable.',
    bestTime:
      'The best time to visit Vietnam is November to April, when most of the country is dry and pleasant. Spring (February–April) is a sweet spot nationwide before the summer heat and rains build.',
    budget:
      'The cheapest, quietest months fall in the summer wet season (May–September), when downpours are frequent but often brief. Prices peak around Tet (Lunar New Year), so plan around late January/February.',
    highlights: [
      'Cruising the limestone karsts of Ha Long Bay.',
      'Lantern-lit old town of Hoi An and imperial Hue.',
      'Some of Asia’s best and cheapest street food.',
      'Motorbike routes through terraced northern highlands.',
    ],
  },
  AE: {
    metaDescription:
      'The best time to visit Dubai and the UAE is winter, November to March, with warm sun and blue skies. See UAE weather, crowds and costs by month.',
    intro:
      'The UAE — Dubai and Abu Dhabi — is a year-round city-break and beach destination, but the desert climate makes timing crucial. The best time to visit the UAE is the cooler winter months, when the heat is comfortable rather than brutal.',
    bestTime:
      'The best time to visit the UAE is November to March, when warm, sunny days are perfect for beaches, desert safaris and rooftop dining. This is peak season, so expect the highest hotel prices around the winter holidays.',
    budget:
      'Summer (June–September) is fiercely hot but the cheapest time to visit, with deep hotel discounts and indoor attractions running full blast. Shoulder months (April, October) balance heat and value.',
    highlights: [
      'Record-breaking skylines, from the Burj Khalifa to Museum of the Future.',
      'Desert safaris, dune bashing and Bedouin-style camps.',
      'Warm winter beaches and world-class resorts.',
      'Duty-free shopping and a global dining scene.',
    ],
  },
  MV: {
    metaDescription:
      'The best time to visit the Maldives is the dry season, December to April, for sunshine and calm seas. See Maldives weather, crowds and prices by month.',
    intro:
      'The Maldives is a bucket-list beach and diving destination where the best time to visit hinges on the two monsoons. Get the dry season and you get glassy lagoons, endless sun and superb underwater visibility.',
    bestTime:
      'The best time to visit the Maldives is December to April, the dry northeast-monsoon season, with sunshine, low humidity and calm, clear seas ideal for snorkelling and diving. This is peak season and prices climb around the winter holidays.',
    budget:
      'The wet season (May–November) is the cheapest time to visit, with lower resort rates and dramatic manta and whale-shark encounters, in exchange for occasional storms.',
    highlights: [
      'Overwater villas above turquoise lagoons.',
      'World-class diving and snorkelling with mantas and reef sharks.',
      'Some of the planet’s most beautiful beaches.',
      'Total seclusion on private-island resorts.',
    ],
  },
  MX: {
    metaDescription:
      'The best time to visit Mexico is the dry season, November to April, for sunny beaches and comfortable sightseeing. See Mexico weather, crowds and costs by month.',
    intro:
      'From Cancún’s beaches to Mexico City’s museums and the Yucatán’s cenotes, the best time to visit Mexico is the dry season, when sunshine is reliable and humidity is low across most of the country.',
    bestTime:
      'The best time to visit Mexico is November to April, with warm, dry weather ideal for the Riviera Maya, colonial cities and archaeological sites. December to March is peak season on the Caribbean coast, so book ahead.',
    budget:
      'The cheapest months fall in the summer-to-autumn wet and hurricane season (June–October), when prices drop but Caribbean storms are possible. Shoulder months like November and April offer strong value.',
    highlights: [
      'Maya and Aztec ruins from Chichén Itzá to Teotihuacán.',
      'Caribbean beaches, cenotes and reefs along the Riviera Maya.',
      'Mexico City’s food scene, museums and neighbourhoods.',
      'Colourful colonial towns like Oaxaca and San Miguel de Allende.',
    ],
  },
  BR: {
    metaDescription:
      'The best time to visit Brazil is the drier, cooler months — roughly May to October — though Carnival lights up February. See Brazil weather and costs by month.',
    intro:
      'Brazil spans beaches, the Amazon and vast wetlands, so the best time to visit Brazil depends on your route. Broadly, the drier, milder months suit sightseeing and wildlife, while February brings the world’s biggest party.',
    bestTime:
      'The best time to visit Brazil is generally May to October (autumn to spring), with drier, cooler weather ideal for Rio, Iguaçu Falls and Pantanal wildlife. For Carnival and peak beach heat, come in February — but expect peak prices.',
    budget:
      'The cheapest, quietest window is the shoulder months outside Carnival and the December–January summer holidays. Book far ahead if you travel during Carnival.',
    highlights: [
      'Rio de Janeiro’s beaches, Christ the Redeemer and Sugarloaf.',
      'The thundering Iguaçu Falls on the Argentine border.',
      'Wildlife safaris in the Pantanal wetlands.',
      'Carnival — the planet’s most famous street festival.',
    ],
  },
  CH: {
    metaDescription:
      'The best time to visit Switzerland is summer (June–September) for hiking and winter (December–March) for skiing. See Swiss weather, crowds and costs by month.',
    intro:
      'Switzerland is a true two-season destination, and the best time to visit Switzerland depends entirely on whether you want alpine hiking or world-class skiing. Both seasons deliver those impossibly scenic mountains, lakes and trains.',
    bestTime:
      'The best time to visit Switzerland is June to September for hiking, lake swims and clear mountain views, and December to March for skiing and snow-sure resorts. The shoulder months between can be quiet, wet and with some lifts closed.',
    budget:
      'Switzerland is expensive year-round, but the cheapest, quietest windows are the shoulder seasons (late spring and autumn). Peak prices hit in the ski high season and mid-summer.',
    highlights: [
      'Iconic peaks like the Matterhorn, Eiger and Jungfrau.',
      'Scenic rail journeys including the Glacier and Bernina Express.',
      'Pristine lakes at Geneva, Lucerne and Interlaken.',
      'Charming cities and lakeside towns.',
    ],
  },
  IS: {
    metaDescription:
      'The best time to visit Iceland is summer (June–August) for the midnight sun and winter for the Northern Lights. See Iceland weather, crowds and costs by month.',
    intro:
      'Iceland offers two completely different trips. The best time to visit Iceland is summer for round-the-clock daylight and open highland roads, or winter for the Northern Lights and ice caves — your choice defines the itinerary.',
    bestTime:
      'The best time to visit Iceland is June to August, when the midnight sun opens up the Ring Road, highlands and puffin colonies. For auroras, visit September to March, accepting shorter days and colder weather.',
    budget:
      'Iceland is pricey, but the cheapest, quietest months are the shoulder weeks of May and September–October, which still offer long days and a chance of the Northern Lights late in the season.',
    highlights: [
      'The Golden Circle: geysers, waterfalls and rift valleys.',
      'Northern Lights on clear winter nights.',
      'Glacier hikes, ice caves and black-sand beaches.',
      'Geothermal spas like the Blue Lagoon.',
    ],
  },
  ZA: {
    metaDescription:
      'The best time to visit South Africa is the dry winter (May–September) for safaris and summer for Cape Town beaches. See weather, crowds and costs by month.',
    intro:
      'South Africa combines big-five safaris with cosmopolitan Cape Town and the Winelands, and the best time to visit South Africa depends on the mix. Safari and beach seasons sit at opposite ends of the calendar.',
    bestTime:
      'The best time to visit South Africa is May to September, the dry winter, when sparse vegetation and thirsty animals make Kruger safaris superb. For Cape Town’s beaches and wine country, come in the warm, dry summer (November–March).',
    budget:
      'The cheapest, quietest months are the autumn and spring shoulders. Peak prices hit Cape Town over the December–January holidays, so book coastal stays far ahead.',
    highlights: [
      'Big-five safaris in Kruger and private reserves.',
      'Table Mountain and Cape Town’s dramatic coastline.',
      'The Cape Winelands around Stellenbosch and Franschhoek.',
      'The scenic Garden Route drive.',
    ],
  },
  KE: {
    metaDescription:
      'The best time to visit Kenya is the dry seasons — the Great Migration peaks July–October. See Kenya safari weather, crowds and costs by month.',
    intro:
      'Kenya is the home of the classic safari, and the best time to visit Kenya is built around the dry seasons and the Great Migration, when the Masai Mara delivers some of the planet’s finest wildlife viewing.',
    bestTime:
      'The best time to visit Kenya is July to October, when the Great Migration reaches the Masai Mara and dry conditions concentrate wildlife around water. January to February is another excellent dry, sunny window with fewer crowds.',
    budget:
      'The cheapest time to visit is the long rains (April–May), when many camps drop rates or close. The migration months are peak season — book premium camps far ahead.',
    highlights: [
      'The Great Migration and big-cat sightings in the Masai Mara.',
      'Amboseli’s elephants framed by Mount Kilimanjaro.',
      'Diani’s Indian Ocean beaches to pair with a safari.',
      'Rich Maasai culture and community conservancies.',
    ],
  },
  PE: {
    metaDescription:
      'The best time to visit Peru is the dry season, May to September, for Machu Picchu and the Andes. See Peru weather, crowds and costs by month.',
    intro:
      'Machu Picchu, the Sacred Valley and the Amazon make Peru a bucket-list trip, and the best time to visit Peru is the Andean dry season, when trails are clear and the ruins are at their most magical.',
    bestTime:
      'The best time to visit Peru is May to September, the dry season, with sunny days ideal for Machu Picchu, the Inca Trail and Cusco. Note the Inca Trail closes each February for maintenance, so plan around it.',
    budget:
      'The cheapest, quietest months are the rainy shoulder weeks (October–April, excluding holidays), when prices ease but afternoon showers are common. June to August is peak — book Machu Picchu and the Inca Trail months ahead.',
    highlights: [
      'Machu Picchu at sunrise, the icon of South America.',
      'The Sacred Valley and Inca capital of Cusco.',
      'Amazon rainforest lodges and wildlife.',
      'Rainbow Mountain and Andean trekking.',
    ],
  },
  EG: {
    metaDescription:
      'The best time to visit Egypt is October to April, when the desert heat eases for the pyramids and Nile cruises. See Egypt weather, crowds and costs by month.',
    intro:
      'From the Pyramids of Giza to Nile cruises and Red Sea reefs, the best time to visit Egypt is the cooler winter half of the year, when sightseeing in the desert climate is comfortable rather than sweltering.',
    bestTime:
      'The best time to visit Egypt is October to April, with warm, dry, comfortable days ideal for the pyramids, Luxor’s temples and Nile cruises. December to February is peak season and the most pleasant weather.',
    budget:
      'The cheapest months are the scorching summer (June–August), when inland heat is intense but Red Sea resorts stay busy and prices on Nile cruises soften. Spring and autumn balance heat and value well.',
    highlights: [
      'The Pyramids of Giza and the Grand Egyptian Museum.',
      'Luxor’s temples and the Valley of the Kings.',
      'Nile cruises between Luxor and Aswan.',
      'Red Sea diving and snorkelling.',
    ],
  },
  MA: {
    metaDescription:
      'The best time to visit Morocco is spring (March–May) and autumn (September–November). See Marrakech, Sahara and coast weather, crowds and costs by month.',
    intro:
      'Marrakech’s souks, the Sahara and the Atlas Mountains make Morocco endlessly varied, and the best time to visit Morocco is spring and autumn, when the whole country is comfortably warm and the desert is bearable.',
    bestTime:
      'The best time to visit Morocco is March to May and September to November, with mild, sunny weather ideal for medinas, mountain trekking and desert nights. These shoulder seasons avoid the summer inland heat.',
    budget:
      'The cheapest, quietest months are the summer (hot inland) and mid-winter. Spring and autumn are peak for Marrakech and the desert, so book riads ahead.',
    highlights: [
      'Marrakech’s medina, souks and Jemaa el-Fnaa square.',
      'Sahara dunes and nights under the stars at Merzouga.',
      'The Atlas Mountains and Berber villages.',
      'Blue-washed Chefchaouen and coastal Essaouira.',
    ],
  },
};

export function getCountryCopy(code: string): CountryCopy | undefined {
  return COUNTRY_COPY[code.toUpperCase()];
}
