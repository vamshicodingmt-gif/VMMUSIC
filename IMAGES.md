# Adding photos to the VM Music Factory website

Everything visual is defined in **`src/data/images.js`**. There are
**20 gallery slots + 12 review-image slots + 3 section images** waiting. Until a
slot has a file or a link it renders as a neat labelled placeholder — the site
never substitutes a stock photo or a generated image.

---

## Option A — local files (recommended)

Best quality control, no third-party hosting, served from Vercel's CDN with
long-lived caching.

```bash
# 1. put the photo in public/images/  (max 2000 px on the long edge)
# 2. compress it — target 150–250 KB for a gallery photo
magick public/images/raw/vocal-booth.jpg \
       -resize '1600x1200^' -gravity center -extent 1600x1200 \
       -strip -quality 80 public/images/vocal-booth.jpg

#    (or use https://squoosh.app — export WebP at quality 80)
```

Then reference it in `src/data/images.js`:

```js
{
  id: 'g-01',
  src: '/images/vocal-booth.jpg',
  alt: 'Vocal recording booth with a condenser microphone at VM Music Factory, Bengaluru',
  caption: 'Vocal booth',
  width: 1600,       // ← the REAL pixel dimensions (prevents layout shift)
  height: 1200,
},
```

## Option B — paste the link you already have (Google photos)

```js
{
  id: 'g-01',
  src: 'https://lh3.googleusercontent.com/gps-cs-s/…=s1600',
  alt: 'Control room at VM Music Factory, Bengaluru',
  caption: 'Control room',
  width: 1600,
  height: 1200,
},
```

**Google URL tip:** the tail of the URL is the size suffix —
`=s1360-w1360-h1020-rw`. You can request smaller versions (`=s680-…`,
`=s1020-…`) and pass several of them as a `srcset` so phones download less data.
The About-us photo already does this; copy that pattern:

```js
srcSet: [
  'https://lh3.googleusercontent.com/…=s680-w680-h510-rw 680w',
  'https://lh3.googleusercontent.com/…=s1020-w1020-h765-rw 1020w',
  'https://lh3.googleusercontent.com/…=s1360-w1360-h1020-rw 1360w',
].join(', '),
sizes: '(max-width: 900px) 92vw, 46vw',
```

Google-hosted links can expire or be blocked by hot-link protection, so move the
final photos into `public/images/` before launch when you can.

---

## Slot map

| Slot | Key in `src/data/images.js` | Count | Used on |
| --- | --- | --- | --- |
| Hero background | `heroImage` | 1 | Home (top) — also becomes the About page banner |
| About-us photo (right of the text) | `aboutImage` | 1 | Home + About — **already filled with your Google image** |
| Inner page headers | `pageHeaderImage` | 1 | Optional |
| Gallery — Section 01 “Inside the Studio” | `gallerySections[0].images` | 10 | `/gallery` |
| Gallery — Section 02 “Sessions & Post-Production” | `gallerySections[1].images` | 10 | `/gallery` |
| Review images — block 1 | `reviewHighlightSlots` | 6 | `/reviews` |
| Review images — block 2 | `reviewMomentSlots` | 6 | `/reviews` |

Home also previews the first 8 gallery images, so anything you add to Section 01
appears on the homepage automatically.

---

## Rules for every image

| Field | Why it matters |
| --- | --- |
| `alt` | Accessibility **and** SEO. Describe the content in 8–14 words (“Vocal booth with a condenser mic…”), never “IMG_2043.jpg”. |
| `caption` | The small gold label on the tile, e.g. “Karaoke session”. |
| `width` / `height` | The real pixel size. This reserves the space before the bytes arrive — that is what keeps Core Web Vitals (CLS) in the green. |
| File name | Lowercase, hyphenated, descriptive: `control-room-mixing-desk.jpg`. |

### Compression checklist

* WebP or JPEG, quality 75–82 — visually identical, 40–70 % smaller.
* Gallery tile: 150–250 KB · full-width/hero: under 400 KB.
* Never upload a 5 MB phone photo straight from the camera roll — run it through
  [squoosh.app](https://squoosh.app) first.
* Strip EXIF metadata (`-strip` with ImageMagick) to remove location data.

```bash
# check what is currently shipped
du -h public/images/* | sort -h
```

---

## Review-image slots (no fake reviews!)

The two review blocks on `/reviews` are for **screenshots of the real Google
reviews** and **photos of the sessions those reviews are about**:

* `reviewHighlightSlots` → screenshots of the Google review cards
* `reviewMomentSlots` → session photos (dubbing day, song recording, karaoke)

Do not add invented reviews or generated “review cards”. Only real Google
reviews — the text in `src/data/reviews.js` is the verbatim source.
