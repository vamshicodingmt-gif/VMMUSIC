/**
 * Small, safe helpers around motion preferences and scrolling.
 *
 * Every call is defensive: `matchMedia`, `scrollTo` and `scrollIntoView` are
 * guarded so the app keeps working in environments that do not implement them
 * (some embedded webviews, older browsers, headless tests) instead of throwing
 * inside an effect and taking the whole page down.
 */

/** True only when the visitor has asked for reduced motion. */
export function prefersReducedMotion() {
  try {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;
  } catch {
    return false;
  }
}

/** Scrolls the window to the top, ignoring hosts that do not implement it. */
export function scrollToTop() {
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  } catch {
    try {
      window.scrollTo(0, 0);
    } catch {
      /* not supported — nothing to do */
    }
  }
}

/** Scrolls an element into view when the API exists. Returns true on success. */
export function scrollToElement(element) {
  if (!element || typeof element.scrollIntoView !== 'function') return false;
  try {
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
    return true;
  } catch {
    return false;
  }
}
