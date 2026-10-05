import { useEffect } from 'react';
import { getPageSeo, absoluteUrl, SITE_URL } from '../data/seo.js';
import { site } from '../data/site.js';
import { useRouter } from '../router.jsx';

/**
 * Client-side head management.
 *
 * Because every route is prerendered at build time, the correct tags are
 * already in the static HTML. <Seo /> keeps them correct while the visitor
 * navigates the SPA (title, description, canonical, Open Graph, robots).
 *
 * No third-party dependency — one small effect per route change.
 */

function upsertMeta(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export default function Seo({ path, title, description, keywords, ogImage, noindex = false }) {
  const { path: routerPath } = useRouter();
  const current = path || routerPath;
  const seo = getPageSeo(current);

  const finalTitle = title || seo.title;
  const finalDescription = description || seo.description;
  const finalKeywords = keywords || seo.keywords || site.focusKeywords.join(', ');
  const finalImage = ogImage || seo.ogImage;
  const canonical = absoluteUrl(current);

  useEffect(() => {
    document.title = finalTitle;

    upsertMeta('name', 'description', finalDescription);
    upsertMeta('name', 'keywords', finalKeywords);
    upsertMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    upsertMeta('name', 'author', site.name);

    upsertMeta('property', 'og:type', current === '/' ? 'website' : 'article');
    upsertMeta('property', 'og:title', finalTitle);
    upsertMeta('property', 'og:description', finalDescription);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', finalImage);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('property', 'og:locale', 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', finalTitle);
    upsertMeta('name', 'twitter:description', finalDescription);
    upsertMeta('name', 'twitter:image', finalImage);

    upsertLink('canonical', canonical);
  }, [finalTitle, finalDescription, finalKeywords, finalImage, canonical, noindex, current]);

  // Renders nothing: the tags live in <head>.
  return null;
}

export { SITE_URL };
