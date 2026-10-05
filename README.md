# VM Music Factory — website

Official website for **VM Music Factory**, a recording studio in RR Nagar,
Bengaluru, Karnataka — song recording, film dubbing, karaoke, background score,
mixing and mastering. Open 24 hours, seven days a week.
Phone & WhatsApp: **+91 95133 45544**.

Built with **React 19 + Vite 8**, fully **client-side rendered** (`npm run dev`
serves the SPA), and **prerendered to static HTML at build time** so the
deployed site has crawlable HTML, correct per-page meta tags and fast Core Web
Vitals. Deploys to **Vercel** with zero configuration.

---

## Quick start

```bash
npm install       # also copies the self-hosted fonts into public/fonts
npm run dev       # http://localhost:5173
npm run build     # → dist/  (client bundle + prerendered HTML for every route)
npm run preview   # http://localhost:4173  (serves the real production output)
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server (client-side rendering, hot reload) |
| `npm run build` | Fonts → SEO files → client build → SSR bundle → prerender |
| `npm run preview` | Serves `dist/` exactly as production will |
| `npm run seo` | Regenerates `public/robots.txt` + `public/sitemap.xml` only |
| `npm run fonts` | Re-copies the four self-hosted font files |
| `npm run audit` | Audits the built HTML (titles, canonicals, h1s, alt text, schema, links) |
| `npm run test:smoke` | Hydrates every page in jsdom and tests client-side routing |

---

## Pages

| URL | Page | Notes |
| --- | --- | --- |
| `/` | Home | Hero, about teaser, services, process, gallery preview, 6 reviews, FAQ, map, contact |
| `/about` | About Us | Verbatim studio introduction, timings, location, reviews |
| `/services` | Services | All 8 studio services + process + FAQs |
| `/gallery` | Gallery | **Two sections × 10 slots = 20 images** |
| `/reviews` | Reviews | **All 20 Google reviews** + two blocks of review-image slots (6 + 6) |
| `/karaoke-studio-bengaluru` | Karaoke Studio | Dedicated landing page for karaoke keyword search |
| `/contact` | Contact | Call, WhatsApp, address, hours, lazy map, enquiry form |
| `/privacy-policy` | Privacy Policy | Real policy matching how the site behaves |
| `/terms-and-conditions` | Terms & Conditions | Studio booking terms |

Slugs are lowercase, hyphenated and keyword-relevant — no IDs, no file
extensions, no trailing slashes (`cleanUrls: true` on Vercel).

---

## Editing content

Almost everything lives in **`src/data/`**:

| File | Contents |
| --- | --- |
| `site.js` | Studio name, **phone number**, address, Google Maps/review links, socials, WhatsApp message |
| `hours.js` | Opening hours (Open 24 hours, Mon–Sun) |
| `reviews.js` | The 20 real Google reviews, verbatim, with their actual star ratings |
| `images.js` | Hero, About photo, gallery slots (20) and review-image slots (12) |
| `content.js` | Services, features, process steps, FAQs, page copy |
| `seo.js` | Per-page title, meta description, keywords, Open Graph image, sitemap priority |
| `schema.js` | JSON-LD structured data (LocalBusiness, reviews, FAQ, breadcrumbs, gallery) |
| `routes.js` | Route list + navigation |

### Things to replace before launch (marked `TODO` in `site.js`)

1. **`site.domain`** → your live domain. It drives canonical tags, Open Graph
   URLs, `sitemap.xml` and `robots.txt`.
2. **`site.google.mapsUrl` / `reviewsUrl`** → the exact Google Maps listing link
   you were going to send (currently a safe Google Maps search deep link).
3. **`site.address.streetAddress` / `postalCode`** → the street line from the
   Google listing (the locality `RR Nagar, Bengaluru, Karnataka` is in place).
4. **`site.social.*`** → Instagram / YouTube / Facebook (leave `""` to hide).
5. **`site.foundedYear`** → left blank on purpose so no unverified date is
   published in the schema markup.
6. **`index.html`** → uncomment the `google-site-verification` meta tag once you
   have the Search Console code.

### Adding the photos

See **[IMAGES.md](IMAGES.md)** and `public/images/README.md`. In short: drop
compressed files in `public/images/` (or paste Google image links) and add them
to `src/data/images.js` with a real `alt`, `caption`, `width` and `height`.

### Adding or editing reviews

Only real reviews. Copy the reviewer's name, badge line, relative date, exact
star rating and the text **word for word** into `src/data/reviews.js`. The star
row, the aggregate rating in the schema markup and the "N real reviews" counter
all follow that file automatically.

---

## Deploying to Vercel

1. Push this repository to GitHub (branch `main`).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel reads `vercel.json`: `npm run build`, output `dist/`, framework Vite —
   **no further settings required**.
4. **If the deployed page is blank or shows `404: NOT_FOUND`** (this happens when
   a project was created while the repo was still empty, so Vercel saved
   `Framework Preset: Other` and publishes the repo root instead of `dist/`),
   either set **Settings → Build & Development Settings → Output Directory** to
   `dist`, or simply leave it — `scripts/vercel-fallback.mjs` runs inside every
   Vercel build and copies the finished site to every directory Vercel might be
   publishing, so the site loads either way.
5. Add your custom domain in *Project → Settings → Domains*. Vercel issues the
   TLS certificate automatically and redirects HTTP → HTTPS. Then update
   `site.domain` in `src/data/site.js` and redeploy so the canonical tags,
   sitemap and OG URLs match the live domain.

Full walkthrough, plus the Search Console / Analytics steps:
**[DEPLOY.md](DEPLOY.md)**.

---

## What this build already covers (SEO & quality checklist)

**Titles & descriptions** — unique `<title>` (44–54 chars) and unique meta
description (138–159 chars) per page, written for search intent.
**Canonical tags** — one per page, always the clean absolute URL.
**No noindex** on real pages: the homepage, About, Services, Gallery, Reviews,
Karaoke, Contact, Privacy and Terms are all `index, follow` with
`max-image-preview:large`. Only the 404 page is `noindex, follow` — and it is
excluded from the sitemap, which is exactly how it should be.
**sitemap.xml** — every indexable URL with `lastmod`, `changefreq` and priority,
generated at build time.
**robots.txt** — allows crawling, points at the sitemap, disallows only `/404.html`.
**Header hierarchy** — exactly **one `<h1>` per page**, then a clean
`h2 → h3` structure (verified by an automated audit of the built HTML).
**Alt text** — every `<img>` has a descriptive `alt`; decorative icons are
`aria-hidden`.
**URL slugs** — clean, lowercase, hyphenated, keyword-relevant.
**Internal links** — global header/footer navigation, service cross-links,
breadcrumbs on every inner page, contextual links between pages.
**Schema markup** — `LocalBusiness` (+ address, geo, telephone, 24/7 opening
hours, services catalogue), `WebSite`, `BreadcrumbList`, `FAQPage`,
`ImageGallery`, `Service`, and `Review`/`AggregateRating` using the real Google
reviews.
**Core Web Vitals** — prerendered HTML (no JS needed for content), 178 KB of
self-hosted variable fonts with `preload`, no third-party font requests, every
image dimension declared (no layout shift), `loading="lazy"` below the fold,
zero render-blocking third-party scripts, Google Maps deferred until clicked.
**Mobile responsiveness** — mobile-first CSS, fluid `clamp()` type scale, 50 px
tap targets, sticky call/WhatsApp buttons, a scroll-locked navigation drawer.
**HTTPS** — HSTS (`max-age=63072000; includeSubDomains; preload`) plus
`nosniff`, `Referrer-Policy`, `Permissions-Policy` and `X-Frame-Options`
headers in `vercel.json`; Vercel enforces HTTPS for the domain.
**Broken links** — no dead links: every internal link resolves to a prerendered
route, and the audit script (`scripts/` + `DEPLOY.md`) confirms it.

---

## Accessibility

Skip link, visible focus rings, ARIA labels on every icon-only control,
keyboard-operable gallery lightbox (Esc / ← / →), `aria-current` on the active
nav item, `prefers-reduced-motion` support, and content that stays visible with
JavaScript disabled.

---

## Project structure

```
├── index.html                 # HTML shell (+ SEO markers used by the prerenderer)
├── vite.config.js             # client build
├── vite.ssr.config.js         # build-time server bundle (prerendering only)
├── vercel.json                # build settings, caching, security headers
├── public/                    # favicon, icons, og-image, fonts, robots, sitemap, images/
├── scripts/
│   ├── generate-seo.mjs       # robots.txt + sitemap.xml
│   ├── prerender.mjs          # per-route HTML + head tags → dist/
│   └── sync-fonts.mjs         # copies the 4 self-hosted font files
└── src/
    ├── main.jsx               # hydrate in production, mount in dev
    ├── entry-server.jsx       # used only by scripts/prerender.mjs
    ├── router.jsx             # tiny History-API client router
    ├── data/                  # ← all content, SEO and schema live here
    ├── components/            # header, footer, gallery, reviews, media, icons…
    ├── pages/                 # one file per route
    └── styles/                # design tokens, layout, components, pages
```

---

© VM Music Factory, Bengaluru. Photography and reviews belong to their
respective owners.
