import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountryCard, type MonthSeason } from './CountryCard';
import brazilFlag from './brazil-flag.svg';

const brazilMonths: MonthSeason[] = [
  { label: 'JAN', season: 'good' },
  { label: 'FEV', season: 'good' },
  { label: 'MAR', season: 'good' },
  { label: 'APR', season: 'good' },
  { label: 'MAY', season: 'good' },
  { label: 'JUN', season: 'ok' },
  { label: 'JUL', season: 'ok' },
  { label: 'AUG', season: 'avoid' },
  { label: 'SEP', season: 'ok' },
  { label: 'OCT', season: 'good' },
  { label: 'NOV', season: 'good' },
  { label: 'DEC', season: 'good' },
];

const BrazilFlagImg = () => (
  <img src={brazilFlag} alt="" className="size-full object-cover" />
);

const meta = {
  title: 'Components/CountryCard',
  component: CountryCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    flag: { control: false },
    onAction: { action: 'action clicked' },
  },
  args: {
    name: 'Brazil',
    region: 'South America',
    description: 'Full of energy, diverse places',
    months: brazilMonths,
    actionLabel: 'Apply for your visa',
    href: '#',
    flag: <BrazilFlagImg />,
  },
} satisfies Meta<typeof CountryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The full card exactly as designed in Figma. */
export const Default: Story = {};

/** Country with an emoji flag instead of an image asset. */
export const EmojiFlag: Story = {
  args: {
    name: 'Japan',
    region: 'Asia',
    description: 'Ancient temples, neon cities',
    flag: <span>🗾</span>,
    months: [
      { label: 'JAN', season: 'ok' },
      { label: 'FEB', season: 'ok' },
      { label: 'MAR', season: 'good' },
      { label: 'APR', season: 'good' },
      { label: 'MAY', season: 'good' },
      { label: 'JUN', season: 'avoid' },
      { label: 'JUL', season: 'avoid' },
      { label: 'AUG', season: 'avoid' },
      { label: 'SEP', season: 'ok' },
      { label: 'OCT', season: 'good' },
      { label: 'NOV', season: 'good' },
      { label: 'DEC', season: 'ok' },
    ],
  },
};

/** Minimal card: name and tagline only, no region, months, or CTA. */
export const Minimal: Story = {
  args: {
    region: undefined,
    months: undefined,
    actionLabel: undefined,
    flag: <BrazilFlagImg />,
  },
};

/** Long names truncate so the layout stays intact. */
export const LongName: Story = {
  args: {
    name: 'The Federative Republic of Brazil',
    region: 'South America',
  },
};

/** CTA as a button (no href) — the action is logged to the Actions panel. */
export const ButtonAction: Story = {
  args: {
    href: undefined,
  },
};
