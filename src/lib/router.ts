// Minimal hash router — no dependency needed for two page types.
// Routes:  "#/" (or empty)  → home
//          "#/country/jp"   → country page for code "JP"

import { useEffect, useState } from 'react';

export type Route = { page: 'home' } | { page: 'country'; code: string };

export function parseHash(hash: string): Route {
  const m = hash.match(/^#\/country\/([A-Za-z]{2})\b/);
  if (m) return { page: 'country', code: m[1].toUpperCase() };
  return { page: 'home' };
}

export function countryPath(code: string): string {
  return `#/country/${code.toLowerCase()}`;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof location !== 'undefined' ? location.hash : ''),
  );

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
