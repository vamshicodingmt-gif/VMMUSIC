# Deploying VM Music Factory to Vercel

The site is a static React build. Vercel runs one command (`npm run build`) and
serves the `dist/` folder from its CDN. Nothing needs an API key, a database or
an environment variable.

---

## 1. Push to GitHub

```bash
git add .
git commit -m "VM Music Factory website"
git push origin main
```

## 2. Import the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Pick the repository (`VMMUSIC`).
3. Vercel detects **Vite** and reads `vercel.json`, which already sets:
   * Build command → `npm run build`
   * Output directory → `dist`
   * Install command → `npm install`
   * `cleanUrls` → `/about` (no `.html`, no trailing slash)
4. Press **Deploy**. The first build takes about a minute.

> `npm run build` runs four steps: copy fonts → write `robots.txt`/`sitemap.xml`
> → build the client bundle → prerender all 9 routes + `404.html` into `dist/`.

## 3. Add the custom domain (and enforce HTTPS)

1. **Project → Settings → Domains → Add**, enter your domain
   (e.g. `vmmusicfactory.com`).
2. Point DNS at Vercel:
   * apex domain → `A 76.76.21.21`
   * `www` → `CNAME cname.vercel-dns.com`
   (or just switch the domain's nameservers to Vercel's, and Vercel configures it
   for you).
3. In **Domains**, set the primary domain and choose **Redirect `www` → apex**
   (or the reverse) so there is only one canonical host.
4. TLS is issued automatically, and Vercel redirects all `http://` traffic to
   `https://`. `vercel.json` already sends:
   `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` —
   so browsers will only ever use HTTPS after the first visit.

## 4. Point the site at the real domain (important)

Canonical tags, Open Graph URLs, `sitemap.xml` and `robots.txt` are generated
from one value:

```js
// src/data/site.js
domain: 'https://vm-music-factory.vercel.app',   // ← change to your domain
```

Change it, then commit and push — Vercel redeploys and every canonical tag and
sitemap URL updates to match.

## 5. Google Search Console

1. Open [search.google.com/search-console](https://search.google.com/search-console)
   → **Add property** → *URL prefix* → your HTTPS domain.
2. Verify with the **HTML tag** method, copy the code, and uncomment this line in
   `index.html`:

   ```html
   <meta name="google-site-verification" content="YOUR_SEARCH_CONSOLE_CODE" />
   ```

3. Commit + push, then back in Search Console press **Verify**.
4. Submit the sitemap: **Sitemaps → Add a new sitemap → `sitemap.xml`**.
5. Use **URL Inspection** on `/` and `/about` → *Test live URL* to confirm the
   canonical, title and description are picked up correctly.

## 6. Google Business Profile (the studio listing)

This is what will win the local search traffic:

* Claim/verify the **VM Music Factory** listing, and set the website field to the
  new domain.
* Set the primary category to *Recording studio*; add *Karaoke*/
  *Music producer* as secondary categories.
* Add the phone number `+91 95133 45544` (call and WhatsApp) and the 24-hour
  opening hours — the same values that are in `hours.js`.
* Upload the same photos you add to the gallery here, so the listing and the
  website show the same studio.
* Paste the listing's **share link** into `site.google.mapsUrl` and
  `site.google.reviewsUrl` in `src/data/site.js` and push.

## 7. Optional: analytics that respects privacy

Vercel has first-party analytics built in (**Project → Analytics → Enable**),
which needs no script tag and no cookie banner. If you add Google Analytics
instead, note that the cookie/consent section of `src/pages/PrivacyPolicy.jsx`
and the "no tracking cookies" bullet must be updated at the same time.

## 8. After every content change

```bash
npm run build && npm run preview   # check it locally first
git add . && git commit -m "Update gallery photos"
git push                            # Vercel redeploys automatically
```

---

## Verifying the deployed site

Paste these into a browser (swap in your domain):

| Check | URL |
| --- | --- |
| Sitemap | `https://YOUR-DOMAIN/sitemap.xml` |
| Robots | `https://YOUR-DOMAIN/robots.txt` |
| OG card | `https://YOUR-DOMAIN/og-image.png` |
| HTTPS redirect | `http://YOUR-DOMAIN` → should land on `https://` |
| 404 handling | `https://YOUR-DOMAIN/nonsense-page` → styled 404, HTTP 404 status |
| Prerendered HTML | *View source* on any page — the content and the JSON-LD are in the HTML, not only after JavaScript runs |
| Rich results | [Rich Results Test](https://search.google.com/test/rich-results) → paste a page URL |
| Structured data | [Schema Markup Validator](https://validator.schema.org/) |
| Mobile + CWV | [PageSpeed Insights](https://pagespeed.web.dev/) on `/` and `/contact` |

### Local Lighthouse (optional)

```bash
npm run build && npm run preview
npx lighthouse http://localhost:4173 --view
```

Expect green Performance and SEO, and Accessibility 100 by default. The React
runtime (~68 KB gzip) and ~8 KB gzip of CSS are the entire JavaScript payload —
no analytics, no icon fonts, no UI framework.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| **Blank page or `404: NOT_FOUND`** on the deployment URL | The project was created while the repo was empty, so Vercel stored `Framework Preset: Other` and is publishing the wrong folder. Either set **Settings → Build & Development Settings → Output Directory** to `dist` and redeploy, or do nothing — `scripts/vercel-fallback.mjs` already copies the built site to every directory Vercel might publish, so the site loads regardless. Verify with `…/robots.txt`: if that loads but `/about` 404s, the output directory is the culprit. |
| `sh: 1: vite: not found` in the build log | The install skipped devDependencies. Already handled: `vite`/`@vitejs/plugin-react` are production dependencies and `vercel.json` sets `installCommand: "npm install --include=dev"`. |
| Node version error during install | **Settings → General → Node.js Version** → `22.x` (Vite 8 requires Node ≥ 20.19 / ≥ 22.12). |
| Vercel builds but shows an empty page | Check the build log ends with `[prerender] done`; if not, run `npm run build` locally and fix the reported error. |
| A route 404s on Vercel | Make sure the file exists in `dist/` (e.g. `dist/about/index.html`) and that `cleanUrls` is still `true`. |
| Canonical tags point at `*.vercel.app` | Update `site.domain` and redeploy. |
| Fonts look like Times New Roman | `public/fonts/*.woff2` was removed — run `npm run fonts` and rebuild. |
| Google Maps does not load | It is click-to-load on purpose; check the browser console for an ad-blocker blocking `google.com/maps`. |
