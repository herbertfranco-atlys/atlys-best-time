import { Card, Flag, Text } from '@/components';
import { countryByCode } from '@/data/countries';

type Pair = { a: string; b: string; blurb: string };

const PAIRS: Pair[] = [
  { a: 'JP', b: 'KR', blurb: 'Cherry blossoms vs autumn foliage' },
  { a: 'TH', b: 'VN', blurb: 'Beaches vs bays, month by month' },
  { a: 'IT', b: 'ES', blurb: 'Mediterranean summers compared' },
  { a: 'PT', b: 'GR', blurb: 'Atlantic coast vs Aegean isles' },
];

function Side({ code }: { code: string }) {
  const c = countryByCode(code);
  if (!c) return null;
  return (
    <div className="flex flex-1 flex-col items-center gap-1 py-1">
      <Flag code={c.code} alt={c.name} size={32} />
      <Text style="b1" weight="semibold" color="secondary" align="center">
        {c.name}
      </Text>
    </div>
  );
}

export function Comparisons() {
  return (
    <section id="comparisons" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-2">
        <Text style="t1-caps" weight="semibold" color="link" transform="uppercase">
          Head to head
        </Text>
        <Text style="h2" weight="bold" font="denton">
          Which one&rsquo;s for you?
        </Text>
        <Text style="h6" weight="medium" color="tertiary">
          Compare two destinations by season, crowds and cost.
        </Text>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {PAIRS.map((p) => (
          <a key={`${p.a}-${p.b}`} href="#" className="no-underline">
            <Card interactive className="h-full">
              <div className="flex items-center gap-2">
                <Side code={p.a} />
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(90deg, #b165fd, #5057ea)' }}
                >
                  VS
                </span>
                <Side code={p.b} />
              </div>
              <div className="mt-3 text-center">
                <Text style="b1" weight="medium" color="tertiary">
                  {p.blurb}
                </Text>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
