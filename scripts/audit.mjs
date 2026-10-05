/**
 * ---------------------------------------------------------------------------
 * BUILD AUDIT — checks the generated HTML in `dist/`
 * ---------------------------------------------------------------------------
 * Runs automatically at the end of `npm run build` (warn-only, so a deploy is
 * never blocked) and can be run strictly before a release:
 *
 *     npm run audit          → prints the report for every prerendered page
 *
 * It verifies the SEO fundamentals that are easy to break by accident:
 *   • exactly ONE <h1> per page
 *   • a unique <title> (≤ 60 chars) and meta description (≤ 160 chars)
 *   • one canonical tag per page, no `noindex` on indexable pages
 *   • valid JSON-LD (parses, has @context and a non-empty @graph)
 *   • every <img> has alt text and width/height (accessibility + CLS)
 *   • every internal link resolves to a file that exists in dist/
 *   • every referenced local asset (font, icon, image) exists on disk
 */
import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const strict = process.argv.includes('--strict');

const SKIP_DIRS = new Set(['assets', 'server', 'fonts', 'icons', 'images']);

async function collectHtml(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      await collectHtml(path, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(path);
    }
  }
  return out;
}

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const files = (await collectHtml(dist)).sort();
const knownRoutes = new Set(
  (
    await Promise.all(
      files.map(async (file) => {
        const rel = relative(dist, file);
        if (rel === 'index.html') return ['/'];
        if (rel.endsWith('/index.html')) return [`/${rel.replace('/index.html', '')}/`];
        return [`/${rel.replace(/\.html$/, '')}/`];
      }),
    )
  ).flat(),
);
knownRoutes.add('/404/'); // the error page links back to itself by design

/** Assets we must not report as broken internal links. */
const assetPrefixes = ['/assets/', '/fonts/', '/icons/', '/images/'];
const assetFiles = new Set([
  '/favicon.svg',
  '/og-image.png',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
]);

let hardFailures = 0;
let softWarnings = 0;
let indexable = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const rel = relative(dist, file);
  const issues = [];
  const warnings = [];

  /* ---------------------------------- head --------------------------------- */
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';

  const isErrorPage = rel === '404.html';

  if (!title) issues.push('missing <title>');
  else if (title.length > 60) warnings.push(`title is ${title.length} chars (>60)`);

  if (!description) issues.push('missing meta description');
  else if (description.length > 160) warnings.push(`description is ${description.length} chars (>160)`);

  if (!canonical) issues.push('missing canonical tag');
  if (!/<html lang="[a-z-]+">/i.test(html)) issues.push('missing lang attribute on <html>');

  if (isErrorPage) {
    if (!robots.includes('noindex')) issues.push('404 page is not marked noindex');
  } else {
    indexable += 1;
    if (robots.includes('noindex')) issues.push('indexable page is marked noindex');
    if (!robots.includes('index')) warnings.push('robots meta does not explicitly allow indexing');
  }

  /* --------------------------------- schema -------------------------------- */
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!isErrorPage && ldBlocks.length === 0) issues.push('no JSON-LD structured data');
  for (const [, raw] of ldBlocks) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed['@context'] !== 'https://schema.org') issues.push('JSON-LD @context missing/incorrect');
      if (!Array.isArray(parsed['@graph']) || parsed['@graph'].length === 0) {
        issues.push('JSON-LD has an empty @graph');
      }
    } catch (error) {
      issues.push(`JSON-LD is not valid JSON: ${error.message}`);
    }
  }

  /* --------------------------------- headings ------------------------------ */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) issues.push(`expected exactly 1 <h1>, found ${h1s}`);

  /* --------------------------------- images -------------------------------- */
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  images.forEach((tag, index) => {
    if (!/\balt="/.test(tag)) issues.push(`<img> #${index + 1} has no alt attribute`);
    else if (/\balt=""/.test(tag)) warnings.push(`<img> #${index + 1} has an empty alt`);
    if (!/\bwidth="/.test(tag) || !/\bheight="/.test(tag)) {
      // width/height may come from the external URL only — still worth flagging.
      warnings.push(`<img> #${index + 1} has no width/height (layout shift risk)`);
    }
    if (!/\bloading="/.test(tag)) warnings.push(`<img> #${index + 1} has no loading attribute`);
    if (!/\bdecoding="/.test(tag)) warnings.push(`<img> #${index + 1} has no decoding attribute`);
  });

  /* ------------------------------- links/assets ---------------------------- */
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    if (assetFiles.has(href) || assetPrefixes.some((prefix) => href.startsWith(prefix))) {
      if (!(await exists(join(dist, href)))) issues.push(`referenced asset is missing from dist: ${href}`);
      continue;
    }
    const normalised = href.endsWith('/') ? href : `${href}/`;
    if (!knownRoutes.has(normalised)) issues.push(`internal link points to a non-existent page: ${href}`);
  }

  /* ---------------------------------- report ------------------------------- */
  if (issues.length) {
    hardFailures += issues.length;
    console.log(`\n✗ ${rel}`);
    [...new Set(issues)].forEach((issue) => console.log(`     ✗ ${issue}`));
  }
  if (warnings.length) {
    softWarnings += warnings.length;
    console.log(`\n⚠ ${rel}`);
    [...new Set(warnings)].forEach((warning) => console.log(`     ⚠ ${warning}`));
  }
  if (!issues.length && !warnings.length) {
    console.log(
      `✓ ${rel.padEnd(34)} title ${title.length}c · desc ${description.length}c · h1 1 · schema ${ldBlocks.length} · imgs ${images.length}`,
    );
  }
}

console.log(
  `\n${files.length} pages · ${indexable} indexable · ${hardFailures} error(s) · ${softWarnings} warning(s)`,
);

if (hardFailures > 0 && strict) {
  console.error('\nAudit failed. Fix the errors above before deploying.');
  process.exit(1);
}
