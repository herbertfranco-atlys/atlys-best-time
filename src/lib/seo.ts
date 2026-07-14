// Client-side SEO helper for the SPA: sets the document title, meta
// description, canonical + Open Graph/Twitter tags, and injects JSON-LD
// structured data. All nodes it creates are tagged data-seo so they can be
// cleaned up when navigating away. (A prerender/SSR step would bake these in
// for crawlers; this keeps the tags correct for client navigation and for
// crawlers that execute JS.)

import { useEffect } from 'react';

export type JsonLd = Record<string, unknown>;

export type SeoMeta = {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: JsonLd[];
};

function upsertTag(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    el.setAttribute('data-seo', '');
    document.head.appendChild(el);
  }
  apply(el);
}

function meta(attr: 'name' | 'property', key: string, content: string) {
  upsertTag(
    `meta[${attr}="${key}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute(attr, key);
      return m;
    },
    (el) => el.setAttribute('content', content),
  );
}

export function useSeo({ title, description, canonical, jsonLd }: SeoMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    meta('name', 'description', description);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:type', 'article');
    meta('name', 'twitter:card', 'summary_large_image');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    if (canonical) {
      meta('property', 'og:url', canonical);
      upsertTag(
        'link[rel="canonical"]',
        () => {
          const l = document.createElement('link');
          l.setAttribute('rel', 'canonical');
          return l;
        },
        (el) => el.setAttribute('href', canonical),
      );
    }

    // JSON-LD: remove any previously injected blocks, then add fresh ones.
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    (jsonLd ?? []).forEach((block) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-jsonld', '');
      s.textContent = JSON.stringify(block);
      document.head.appendChild(s);
    });

    return () => {
      document.title = prevTitle;
      document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    };
  }, [title, description, canonical, jsonLd]);
}
