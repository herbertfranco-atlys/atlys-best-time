import { Hero } from '@/sections/Hero';
import { DestinationsThisMonth } from '@/sections/DestinationsThisMonth';
import { AllDestinations } from '@/sections/AllDestinations';
import { Comparisons } from '@/sections/Comparisons';

export type LandingPageProps = {
  nationality: string;
  onNationalityChange: (code: string) => void;
};

export function LandingPage({ nationality, onNationalityChange }: LandingPageProps) {
  return (
    <>
      <Hero nationality={nationality} onNationalityChange={onNationalityChange} />
      <DestinationsThisMonth />
      <AllDestinations />
      <Comparisons />
    </>
  );
}
