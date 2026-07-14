import { useMemo, useState } from 'react';
import { Button, CountryCard, Flag, SearchInput, Text } from '@/components';
import { DESTINATIONS, type DestinationTag } from '@/data/destinations';
import { countryPath } from '@/lib/router';

const PAGE_SIZE = 12;

const FILTERS: { value: DestinationTag | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'winter', label: 'Winter' },
  { value: 'summer', label: 'Summer' },
  { value: 'beach', label: 'Beach' },
  { value: 'city', label: 'City breaks' },
  { value: 'nature', label: 'Nature' },
  { value: 'culture', label: 'Culture' },
];

export function AllDestinations() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<DestinationTag | 'all'>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  // DESTINATIONS is already alphabetical; narrow by tag, then by name.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESTINATIONS.filter(
      (d) =>
        (filter === 'all' || d.tags.includes(filter)) &&
        (!q || d.name.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  const shown = results.slice(0, visible);
  const hasMore = results.length > visible;

  function changeFilter(value: DestinationTag | 'all') {
    setFilter(value);
    setVisible(PAGE_SIZE);
  }

  function changeQuery(value: string) {
    setQuery(value);
    setVisible(PAGE_SIZE);
  }

  return (
    <section id="all-destinations" className="bg-surface-muted py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <Text style="t1-caps" weight="semibold" color="link" transform="uppercase">
              Directory
            </Text>
            <Text style="h2" weight="bold" font="denton">
              All destinations
            </Text>
            <Text style="h6" weight="medium" color="tertiary">
              {DESTINATIONS.length} countries, A to Z. Search or filter by travel style.
            </Text>
          </div>
          <div className="w-full md:w-80">
            <SearchInput
              placeholder="Search countries…"
              value={query}
              onChange={changeQuery}
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => changeFilter(f.value)}
                className="cursor-pointer rounded-xl border px-4 py-2 font-sans text-sm font-semibold transition-colors"
                style={{
                  borderColor: active ? '#000000' : 'var(--color-border-subtle)',
                  background: active ? '#000000' : '#ffffff',
                  color: active ? '#ffffff' : '#2e2e2e',
                  letterSpacing: '-0.01em',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {results.length === 0 ? (
          <div className="rounded-card border border-border-subtle bg-white p-10 text-center">
            <Text style="h6" weight="medium" color="tertiary">
              No destinations match{query.trim() ? ` “${query.trim()}”` : ' this filter'}.
            </Text>
          </div>
        ) : (
          <>
            <div className="grid gap-5 lg:grid-cols-2">
              {shown.map((d) => (
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

            <div className="mt-8 flex flex-col items-center gap-2">
              <Text style="b1" weight="medium" color="tertiary">
                Showing {shown.length} of {results.length}
              </Text>
              {hasMore && (
                <Button
                  variant="secondary"
                  color="black"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  See more destinations
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
