import { site } from './site.js';
import { ROUTES } from './routes.js';

/**
 * ---------------------------------------------------------------------------
 * PER-PAGE SEO METADATA — the single source of truth
 * ---------------------------------------------------------------------------
 * Consumed by:
 *   • <Seo />                      → sets document.title + meta tags client-side
 *   • scripts/prerender.mjs        → bakes the tags into each static HTML file
 *   • scripts/generate-seo.mjs     → sitemap.xml + robots.txt
 *
 * Rules followed here: unique <title> (≈50–60 chars), unique meta description
 * (≈140–160 chars), one canonical per page, no noindex on real pages, and
 * clean, keyword-relevant URL slugs.
 */

export const SITE_URL = site.domain.replace(/\/+$/, '');

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean === '/' ? '/' : clean}`;
};

const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const pages = {
  [ROUTES.home]: {
    label: 'Home',
    title: 'VM Music Factory | Recording Studio in Bengaluru',
    description:
      'Recording studio in RR Nagar, Bengaluru for song recording, film dubbing, karaoke, mixing and mastering. Open 24 hours. Call or WhatsApp +91 95133 45544.',
    keywords:
      'recording studio in Bengaluru, music recording studio Bangalore, dubbing studio RR Nagar, karaoke studio Bengaluru, mixing and mastering studio Bangalore',
    ogImage: OG_IMAGE,
    changefreq: 'monthly',
    priority: 1.0,
    breadcrumbs: [],
  },
  [ROUTES.about]: {
    label: 'About Us',
    title: 'About VM Music Factory | Recording Studio, Bengaluru',
    description:
      'Meet VM Music Factory — a state-of-the-art recording studio in Bengaluru led by music director and producer Vivek. Recording, editing, mixing and mastering.',
    keywords:
      'about VM Music Factory, music director Bengaluru, sound engineer RR Nagar, recording studio Bengaluru',
    ogImage: OG_IMAGE,
    changefreq: 'yearly',
    priority: 0.8,
    breadcrumbs: [{ name: 'About Us', path: ROUTES.about }],
  },
  [ROUTES.services]: {
    label: 'Services',
    title: 'Recording, Dubbing & Karaoke Services in Bengaluru',
    description:
      'Song recording, film dubbing, karaoke sessions, background score, jingles, mixing and mastering — studio services at VM Music Factory, RR Nagar, Bengaluru.',
    keywords:
      'song recording services Bangalore, film dubbing studio Bengaluru, background score composer, mixing mastering Bangalore, jingle recording',
    ogImage: OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.9,
    breadcrumbs: [{ name: 'Services', path: ROUTES.services }],
  },
  [ROUTES.gallery]: {
    label: 'Gallery',
    title: 'Studio Gallery | VM Music Factory, Bengaluru',
    description:
      'Photos from VM Music Factory in RR Nagar, Bengaluru — the vocal booth, control room, live room, karaoke setup, recording sessions and dubbing days.',
    keywords:
      'recording studio photos Bangalore, studio gallery Bengaluru, vocal booth, control room, karaoke room photos',
    ogImage: OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.7,
    breadcrumbs: [{ name: 'Gallery', path: ROUTES.gallery }],
  },
  [ROUTES.reviews]: {
    label: 'Reviews',
    title: 'Client Reviews | VM Music Factory, Bengaluru',
    description:
      'Verified Google reviews for VM Music Factory, a recording and dubbing studio in RR Nagar, Bengaluru — rated 5.0 by musicians, film makers and voice artists.',
    keywords:
      'VM Music Factory reviews, recording studio reviews Bengaluru, Google reviews music studio Bangalore',
    ogImage: OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.8,
    breadcrumbs: [{ name: 'Reviews', path: ROUTES.reviews }],
  },
  [ROUTES.karaoke]: {
    label: 'Karaoke Studio',
    title: 'Karaoke Studio in Bengaluru | VM Music Factory',
    description:
      'Sing in a real studio: VM Music Factory offers karaoke sessions in RR Nagar, Bengaluru with studio microphones, acoustic rooms and an engineer on hand.',
    keywords:
      'karaoke studio Bengaluru, karaoke recording Bangalore, karaoke party RR Nagar, karaoke sessions near me',
    ogImage: OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumbs: [{ name: 'Karaoke Studio', path: ROUTES.karaoke }],
  },
  [ROUTES.contact]: {
    label: 'Contact',
    title: 'Contact & Location | VM Music Factory, Bengaluru',
    description:
      'Visit, call or WhatsApp VM Music Factory in RR Nagar, Bengaluru. Open 24 hours, all seven days. Phone and WhatsApp: +91 95133 45544. Directions on Google Maps.',
    keywords:
      'VM Music Factory contact, recording studio address Bengaluru, book studio session Bangalore, WhatsApp recording studio',
    ogImage: OG_IMAGE,
    changefreq: 'yearly',
    priority: 0.9,
    breadcrumbs: [{ name: 'Contact', path: ROUTES.contact }],
  },
  [ROUTES.privacy]: {
    label: 'Privacy Policy',
    title: 'Privacy Policy | VM Music Factory, Bengaluru',
    description:
      'How VM Music Factory collects, uses and protects the information you share when you call, WhatsApp, email or enquire through this website.',
    keywords: 'privacy policy, VM Music Factory',
    ogImage: OG_IMAGE,
    changefreq: 'yearly',
    priority: 0.3,
    breadcrumbs: [{ name: 'Privacy Policy', path: ROUTES.privacy }],
  },
  [ROUTES.terms]: {
    label: 'Terms & Conditions',
    title: 'Terms & Conditions | VM Music Factory, Bengaluru',
    description:
      'The terms that apply to studio bookings, session time, cancellations, recordings and use of the VM Music Factory website and online content.',
    keywords: 'terms and conditions, VM Music Factory',
    ogImage: OG_IMAGE,
    changefreq: 'yearly',
    priority: 0.3,
    breadcrumbs: [{ name: 'Terms & Conditions', path: ROUTES.terms }],
  },
};

/** Page key for a normalised path (falls back to the home page entry). */
export function getPageSeo(path = '/') {
  return pages[path] || pages[ROUTES.home];
}

/** Everything the sitemap needs, in priority order. */
export const sitemapEntries = Object.entries(pages).map(([path, meta]) => ({
  path,
  changefreq: meta.changefreq,
  priority: meta.priority,
}));

export default pages;
