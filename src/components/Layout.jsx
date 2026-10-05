import { useEffect } from 'react';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';
import { ContactFab } from './ContactActions.jsx';
import { useRouter } from '../router.jsx';
import { prefersReducedMotion } from '../utils/motion.js';

/**
 * Page shell: sticky header, main landmark, footer, floating call/WhatsApp
 * buttons — plus the one shared IntersectionObserver that fades sections in.
 *
 * The observer is intentionally cheap (fires once per element, then unobserves)
 * and is skipped entirely when the visitor prefers reduced motion.
 */
export default function Layout({ children }) {
  const { path } = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('js')) root.classList.add('js');

    const targets = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
    if (!targets.length) return undefined;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <ContactFab />
    </>
  );
}
