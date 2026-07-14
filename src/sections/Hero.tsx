import { Button, GuaranteeBadge, NationalitySelect, Text } from '@/components';
import { DESTINATIONS } from '@/data/destinations';

export type HeroProps = {
  nationality: string;
  onNationalityChange: (code: string) => void;
};

export function Hero({ nationality, onNationalityChange }: HeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 text-center md:pt-24">
      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted px-4 py-1.5">
        <Text style="t1-caps" weight="semibold" color="tertiary" transform="uppercase">
          Month-by-month travel guide · {DESTINATIONS.length} destinations
        </Text>
      </div>

      {/* Big headline with the inline, pre-selected nationality dropdown */}
      <h1
        className="mx-auto max-w-4xl font-sans font-bold text-black"
        style={{
          fontSize: 'clamp(34px, 6vw, 64px)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
        }}
      >
        Find the best time to visit anywhere as a{' '}
        <span className="inline-flex align-middle">
          <NationalitySelect value={nationality} onChange={onNationalityChange} size="hero" />
        </span>{' '}
        traveller
      </h1>

      <div className="mx-auto mt-6 max-w-2xl">
        <Text as="p" style="h6" weight="medium" color="tertiary" align="center">
          Weather, crowds, prices and festivals — decoded by season for every destination, tailored
          to where you hold your passport.
        </Text>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button as="a" href="#this-month" size="lg" color="black">
          Where to go this month
        </Button>
        <Button as="a" href="#all-destinations" variant="secondary" color="black" size="lg">
          Browse all destinations
        </Button>
      </div>

      <div className="mt-8 flex justify-center">
        <GuaranteeBadge compact />
      </div>
    </section>
  );
}
