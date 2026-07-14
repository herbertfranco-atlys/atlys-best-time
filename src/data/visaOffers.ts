// Visa product offers shown on country pages — mirrors the offer module on
// atlys.com visa pages. Fees and terms are per-country AND per-nationality,
// so this ships with a single worked example (Indonesia e-VOA for travellers
// applying from Thailand, THB pricing) until it is wired to the real API.

export type VisaOption = {
  /** Dropdown label, e.g. "30 Day Stay". */
  label: string;
  governmentFee: number;
  processingFee: number;
};

export type VisaOffer = {
  /** Product name used in headings, e.g. "e-VOA". */
  product: string;
  type: string;
  lengthOfStay: string;
  validity: string;
  entry: string;
  /** ISO currency code shown before amounts, e.g. "THB". */
  currency: string;
  options: VisaOption[];
  /** Hours from "now" until the guaranteed visa delivery time. */
  guaranteeHours: number;
};

export const VISA_OFFERS: Record<string, VisaOffer> = {
  ID: {
    product: 'e-VOA',
    type: 'e-VOA',
    lengthOfStay: '30 days',
    validity: '90 days',
    entry: 'Single',
    currency: 'THB',
    options: [{ label: '30 Day Stay', governmentFee: 990, processingFee: 502 }],
    guaranteeHours: 6,
  },
};
