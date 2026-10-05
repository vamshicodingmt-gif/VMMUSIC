/**
 * ---------------------------------------------------------------------------
 * SMOKE TEST — proves the client-side React app actually works
 * ---------------------------------------------------------------------------
 * Run it with:
 *
 *     npm run build && npm run test:smoke
 *
 * What it checks, using the REAL prerendered HTML from `dist/`:
 *   1. Every route mounts (and hydrates) with no React errors and no
 *      hydration mismatches — i.e. client-side rendering and the prerendered
 *      markup agree on every page.
 *   2. Exactly one <h1> per page after rendering, plus a schema block.
 *   3. Client-side routing: clicking a nav link updates the URL, the page and
 *      the document title — no full reload.
 *   4. The browser back button restores the previous page.
 *   5. Hash deep links (`/services#film-dubbing`) land on the right element.
 *   6. An unknown URL renders the 404 page with `noindex, follow`.
 *
 * The only test dependency is jsdom (devDependency) — nothing here ships to
 * the browser.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

import { JSDOM } from 'jsdom';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const scratch = join(root, '.vmmf-smoke');
const bundle = join(root, 'node_modules', '.cache', 'vmmf-smoke', 'bundle.mjs');

const pages = [
  ['/', 'index.html'],
  ['/about', 'about/index.html'],
  ['/services', 'services/index.html'],
  ['/gallery', 'gallery/index.html'],
  ['/reviews', 'reviews/index.html'],
  ['/karaoke-studio-bengaluru', 'karaoke-studio-bengaluru/index.html'],
  ['/contact', 'contact/index.html'],
  ['/privacy-policy', 'privacy-policy/index.html'],
  ['/terms-and-conditions', 'terms-and-conditions/index.html'],
];

const SITE_ORIGIN = 'https://vm-music-factory.vercel.app';

const fail = (message) => {
  console.log(`\n✗ ${message}`);
  process.exitCode = 1;
};

/* -------------------------------------------------------------------------- */
/* 1. Build the client bundle                                                 */
/* -------------------------------------------------------------------------- */

await rm(scratch, { recursive: true, force: true });
await mkdir(scratch, { recursive: true });
await writeFile(
  join(scratch, 'entry.jsx'),
  `import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '../src/App.jsx';

export function mount(container) {
  const tree = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (container.firstElementChild !== null) {
    hydrateRoot(container, tree);
    return 'hydrated';
  }
  createRoot(container).render(tree);
  return 'mounted';
}
`,
  'utf8',
);

const build = spawnSync(
  process.execPath,
  [join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '--config', 'vite.smoke.config.js'],
  { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' },
);

if (build.status !== 0) {
  console.log(build.stdout);
  console.error(build.stderr);
  fail('could not bundle the app for testing');
  process.exit(1);
}

const { mount } = await import(pathToFileURL(bundle).href);

/* -------------------------------------------------------------------------- */
/* 2. Helpers                                                                 */
/* -------------------------------------------------------------------------- */

/** Creates a jsdom window over a prerendered page, with the browser APIs stubbed. */
function createWindow(html, url) {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true, runScripts: 'outside-only' });
  const { window } = dom;

  for (const key of [
    'window',
    'document',
    'HTMLElement',
    'Node',
    'Element',
    'Event',
    'MouseEvent',
    'PopStateEvent',
    'MutationObserver',
    'getComputedStyle',
  ]) {
    const value = window[key];
    if (value === undefined) continue;
    try {
      globalThis[key] = value;
    } catch {
      Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    }
  }

  try {
    globalThis.navigator = window.navigator;
  } catch {
    Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
  }

  globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
  window.matchMedia = () => ({
    matches: false,
    media: '',
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  globalThis.matchMedia = window.matchMedia;
  window.scrollTo = () => {};

  const Observer = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe(element) {
      this.callback([{ isIntersecting: true, target: element }], this);
    }
    unobserve() {}
    disconnect() {}
  };
  window.IntersectionObserver = Observer;
  globalThis.IntersectionObserver = Observer;

  return { dom, window };
}

const settle = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));

/* -------------------------------------------------------------------------- */
/* 3. Hydration on every prerendered route                                    */
/* -------------------------------------------------------------------------- */

console.log('▸ Hydration + client rendering');

const results = [];

for (const [route, file] of pages) {
  const html = await readFile(join(dist, file), 'utf8');
  const { dom, window } = createWindow(html, `${SITE_ORIGIN}${route}`);

  const messages = [];
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = (...args) => messages.push(`ERROR ${args.join(' ')}`);
  console.warn = (...args) => messages.push(`WARN ${args.join(' ')}`);

  let mode = 'unknown';
  try {
    mode = mount(window.document.getElementById('root'));
    await settle();
  } catch (error) {
    messages.push(`THREW ${error.message}`);
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
  }

  const hydration = messages.filter((m) =>
    /hydrat|did not match|server rendered|Minified React error/i.test(m),
  );
  const errors = messages.filter(
    (m) => /^(THREW|ERROR)/.test(m) && !/Not implemented/i.test(m),
  );

  const h1 = window.document.querySelectorAll('h1').length;
  const schema = window.document.querySelectorAll('script[type="application/ld+json"]').length;
  const internalLinks = window.document.querySelectorAll('a[href^="/"]').length;
  const ok = hydration.length === 0 && errors.length === 0 && h1 === 1 && schema >= 1;

  results.push({ ok, mode });
  console.log(
    `${ok ? '  ✓' : '  ✗'} ${route.padEnd(28)} ${mode.padEnd(9)} h1=${h1} schema=${schema} links=${internalLinks}`,
  );

  if (!ok) {
    [...new Set([...hydration, ...errors])].slice(0, 5).forEach((m) => console.log(`       ${m.slice(0, 200)}`));
    fail(`${route} did not render cleanly`);
  }

  window.close();
  dom.window.close();
}

/* -------------------------------------------------------------------------- */
/* 4. Client-side navigation, history and the 404 route                       */
/* -------------------------------------------------------------------------- */

console.log('\n▸ Client-side routing');

const homeHtml = await readFile(join(dist, 'index.html'), 'utf8');
const { dom, window } = createWindow(homeHtml, `${SITE_ORIGIN}/`);

const navMessages = [];
const originalError = console.error;
console.error = (...args) => navMessages.push(args.join(' '));

mount(window.document.getElementById('root'));
await settle();

const clickLink = async (label) => {
  const link = [...window.document.querySelectorAll('a')].find(
    (a) => a.getAttribute('href') === label.href,
  );
  if (!link) throw new Error(`link to ${label.href} not found`);
  link.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
  await settle();
};

const check = (name, condition, detail) => {
  console.log(`  ${condition ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!condition) fail(`${name} failed`);
};

// Click "About Us" in the header
await clickLink({ href: '/about' });
check('nav click updates the URL', window.location.pathname === '/about', window.location.pathname);
check(
  'the About page renders without a reload',
  window.document.querySelector('h1')?.textContent === 'The studio behind the sound',
  window.document.querySelector('h1')?.textContent,
);
check(
  'the document title follows the route',
  window.document.title.startsWith('About VM Music Factory'),
  window.document.title,
);
check(
  'the canonical tag follows the route',
  window.document.querySelector('link[rel="canonical"]')?.href === `${SITE_ORIGIN}/about`,
);

// Click "Reviews" in the footer
await clickLink({ href: '/reviews' });
check(
  'all 20 reviews render on the reviews page',
  window.document.querySelectorAll('.review-card').length === 20,
  `${window.document.querySelectorAll('.review-card').length} cards`,
);

// Browser back button
window.history.back();
await settle();
check('the back button restores the previous page', window.location.pathname === '/about', window.location.pathname);

// Hash deep link
window.history.pushState({}, '', '/services#film-dubbing');
window.dispatchEvent(new window.PopStateEvent('popstate', { state: {} }));
await settle();
check(
  'hash deep links resolve to their section',
  Boolean(window.document.getElementById('film-dubbing')) &&
    window.document.querySelector('h1')?.textContent === 'Studio services in Bengaluru',
);

// Unknown route
window.history.pushState({}, '', '/this-page-does-not-exist');
window.dispatchEvent(new window.PopStateEvent('popstate', { state: {} }));
await settle();
check(
  'unknown URLs render the 404 page marked noindex',
  /moved off the console/.test(window.document.querySelector('h1')?.textContent ?? '') &&
    window.document.querySelector('meta[name="robots"]')?.content.includes('noindex') === true,
);

console.error = originalError;

const relevant = navMessages.filter((m) => !/Not implemented/i.test(m));
if (relevant.length) {
  console.log(`\n⚠ React reported ${relevant.length} message(s):`);
  [...new Set(relevant)].slice(0, 5).forEach((m) => console.log(`   ${m.slice(0, 200)}`));
  fail('React reported errors during navigation');
}

await rm(scratch, { recursive: true, force: true });

console.log(
  process.exitCode
    ? '\n✗ Smoke test failed'
    : '\n✓ Smoke test passed — hydration, client-side routing and the 404 route all behave correctly',
);
