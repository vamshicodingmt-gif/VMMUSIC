/**
 * Route definitions — intentionally JSX-free so build scripts (sitemap,
 * prerender) can import them in plain Node before Vite runs.
 * `src/router.jsx` re-exports these for components.
 */

/** Every URL on the site. */
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  gallery: '/gallery',
  reviews: '/reviews',
  contact: '/contact',
  karaoke: '/karaoke-studio-bengaluru',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
};

/** Order of the main navigation (desktop + mobile drawer). */
export const NAV_ITEMS = [
  { label: 'Home', to: ROUTES.home },
  { label: 'About Us', to: ROUTES.about },
  { label: 'Services', to: ROUTES.services },
  { label: 'Gallery', to: ROUTES.gallery },
  { label: 'Reviews', to: ROUTES.reviews },
  { label: 'Contact', to: ROUTES.contact },
];

/** Routes that appear in sitemap.xml (404 is excluded on purpose). */
export const INDEXABLE_ROUTES = Object.values(ROUTES);

export default ROUTES;
