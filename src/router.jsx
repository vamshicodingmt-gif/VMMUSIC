import { ROUTES } from './data/routes.js';
import { scrollToElement, scrollToTop } from './utils/motion.js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * ---------------------------------------------------------------------------
 * TINY CLIENT-SIDE ROUTER
 * ---------------------------------------------------------------------------
 * The site is 100% client-side rendered (React + Vite), and every route is
 * ALSO prerendered to static HTML at build time — so crawlers and first paint
 * never wait for JavaScript, and Core Web Vitals stay strong.
 *
 * This router gives real URLs (History API), back/forward support, deep links
 * (Vercel rewrites/static files) and clean slugs — `/about`, `/gallery`,
 * `/reviews`, `/contact` — with no hash fragments.
 */

export { ROUTES, NAV_ITEMS } from './data/routes.js';

/**
 * Normalises a pathname so `/About/`, `/about.html` and `/ABOUT` are all
 * treated as the single clean URL `/about` — no duplicate content, ever.
 */
export function normalisePath(path) {
  if (!path) return ROUTES.home;
  let clean = String(path).split('?')[0].split('#')[0];
  try {
    clean = decodeURIComponent(clean);
  } catch {
    /* keep the raw value when it cannot be decoded */
  }
  if (!clean.startsWith('/')) clean = `/${clean}`;
  clean = clean.replace(/\/+index\.html?$/i, '/').replace(/\.html?$/i, '');
  clean = clean.replace(/\/{2,}/g, '/');
  if (clean.length > 1) clean = clean.replace(/\/+$/, '');
  return clean === '' ? ROUTES.home : clean.toLowerCase() === '/' ? '/' : clean.toLowerCase();
}

const RouterContext = createContext({
  path: ROUTES.home,
  fullPath: ROUTES.home,
  navigate: () => {},
});

export function RouterProvider({ initialPath, children }) {
  const [fullPath, setFullPath] = useState(() => {
    if (initialPath) return initialPath;
    if (typeof window === 'undefined') return ROUTES.home;
    return `${window.location.pathname}${window.location.search}`;
  });

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (typeof window === 'undefined' || !to) return;
    const target = to.startsWith('/') ? to : `/${to}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (target === current) return;

    try {
      if (replace) window.history.replaceState({ vmmf: true }, '', target);
      else window.history.pushState({ vmmf: true }, '', target);
    } catch {
      window.location.assign(target);
      return;
    }
    setFullPath(target);
  }, []);

  useEffect(() => {
    const onPopState = () => setFullPath(`${window.location.pathname}${window.location.search}`);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll behaviour: top on route change, smooth-scroll for in-page anchors.
  useEffect(() => {
    const hash = fullPath.includes('#') ? fullPath.slice(fullPath.indexOf('#')) : '';
    if (hash && hash.length > 1) {
      const el = document.getElementById(hash.slice(1));
      if (el && scrollToElement(el)) return;
    }
    scrollToTop();
  }, [fullPath]);

  const value = useMemo(
    () => ({
      path: normalisePath(fullPath),
      fullPath,
      navigate,
    }),
    [fullPath, navigate],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

/** Drop-in replacement for <a> that routes client-side (still a real href). */
export function Link({ to, children, onClick, replace = false, ...rest }) {
  const { navigate } = useRouter();

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Respect new-tab / download / external / modified clicks.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === '_blank' ||
      rest.download
    ) {
      return;
    }
    if (!to || to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) return;
    event.preventDefault();
    navigate(to, { replace });
  };

  const isHashLink = typeof to === 'string' && to.startsWith('#');

  return (
    <a href={isHashLink ? to : to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export default RouterProvider;
