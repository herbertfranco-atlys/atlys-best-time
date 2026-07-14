import { GuaranteeBadge, Text } from '@/components';
import { asset } from '@/lib/asset';

const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Explore', links: ['Destinations', 'Where to go this month', 'Comparisons'] },
  { title: 'By month', links: ['January', 'July', 'December'] },
  { title: 'Company', links: ['About', 'Methodology', 'Contact'] },
];

const SOCIALS = ['x-icon', 'discord-icon', 'github-icon'];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <img src={asset('atlys-logo.svg')} alt="Atlys" style={{ height: 27, width: 58 }} />
            <div className="max-w-xs">
              <Text style="b1" weight="medium" color="tertiary">
                A month-by-month travel seasonality guide, tailored to the passport you hold.
              </Text>
            </div>
            <GuaranteeBadge />
            <div className="mt-1 flex items-center gap-3">
              {SOCIALS.map((id) => (
                <a key={id} href="#" aria-label={id.replace('-icon', '')}>
                  <svg className="size-5 text-region-text" aria-hidden>
                    <use href={`${asset('icons.svg')}#${id}`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <Text style="t1-caps" weight="semibold" color="tertiary" transform="uppercase">
                {col.title}
              </Text>
              <ul className="flex list-none flex-col gap-2 p-0">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="no-underline">
                      <Text style="b1" weight="medium" color="secondary">
                        {l}
                      </Text>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6">
          <Text style="t1" weight="medium" color="tertiary">
            © {new Date().getFullYear()} Atlys. For illustration only.
          </Text>
        </div>
      </div>
    </footer>
  );
}
