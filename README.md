# Atlys — Best Time to Visit

A month-by-month travel-seasonality guide, Atlys-branded. Pick your nationality,
see where to go this month, browse 118 destinations, and open a detailed guide
for each country (weather, crowds and cost by month) that links straight to the
matching visa application on [atlys.com](https://www.atlys.com).

Built with **React 19 + TypeScript + Vite + Tailwind v4**.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run lint       # oxlint
npm run storybook  # component library
```

## Deploy (GitHub Pages)

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
every push to `main` builds the site and publishes it to GitHub Pages. The
workflow sets Vite's `base` to `/<repo-name>/` so assets resolve under the
project subpath; all public assets are referenced through
[`src/lib/asset.ts`](src/lib/asset.ts) so they work both locally and on Pages.

One-time setup after the first push: in the repo, go to
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

The app uses hash-based routing (`/#/country/jp`), so deep links work on Pages
with no server rewrites.

## Notes

- Flag icons are the open-source [circle-flags](https://github.com/HatScripts/circle-flags) set (`public/flags/`).
- Seasonality, cost and crowd levels are an editorial model for demonstration,
  not a live pricing feed.
- The Indonesia page includes an example visa-offer module; fees are per-country
  and per-nationality, so it ships as a single worked example.
