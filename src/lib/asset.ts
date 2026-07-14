// Resolves a public-directory asset path against Vite's base URL so links work
// both in dev (base "/") and under a GitHub Pages project subpath ("/repo/").
// import.meta.env.BASE_URL always ends with a slash.
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}
