import { Button, GuaranteeBadge, NationalitySelect, Text } from '@/components';
import { ATLYS_HOME } from '@/lib/atlysLinks';
import { asset } from '@/lib/asset';

const LINKS = ['Destinations', 'By Month', 'Comparisons', 'About'];

export type NavbarProps = {
  nationality: string;
  onNationalityChange: (code: string) => void;
};

export function Navbar({ nationality, onNationalityChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#/" className="flex items-center no-underline" aria-label="Atlys home">
          <img src={asset('atlys-logo.svg')} alt="Atlys" style={{ height: 27, width: 58 }} />
        </a>

        <ul className="hidden list-none items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l}>
              <a href="#" className="no-underline">
                <Text style="b1" weight="medium" color="secondary">
                  {l}
                </Text>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <span className="hidden lg:inline-flex">
            <GuaranteeBadge />
          </span>
          <NationalitySelect value={nationality} onChange={onNationalityChange} size="nav" />
          <Button as="a" href={ATLYS_HOME} target="_blank" rel="noreferrer" size="sm" color="black">
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}
