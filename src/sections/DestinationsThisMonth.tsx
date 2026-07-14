import { CountryCard, Flag, Text } from '@/components';
import { FEATURED } from '@/data/destinations';
import { countryPath } from '@/lib/router';

const MONTH = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date());

export function DestinationsThisMonth() {
  return (
    <section id="this-month" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-2">
        <Text style="t1-caps" weight="semibold" color="link" transform="uppercase">
          Right now
        </Text>
        <Text style="h2" weight="bold" font="denton">
          Where to go in {MONTH}
        </Text>
        <Text style="h6" weight="medium" color="tertiary">
          Six destinations at their seasonal best this month.
        </Text>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {FEATURED.map((d) => (
          <CountryCard
            key={d.code}
            name={d.name}
            flag={<Flag code={d.code} size={32} alt={d.name} />}
            region={d.region}
            description={d.description}
            months={d.months}
            actionLabel="View guide"
            href={countryPath(d.code)}
            className="w-full"
          />
        ))}
      </div>
    </section>
  );
}
