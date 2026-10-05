/**
 * ---------------------------------------------------------------------------
 * IMAGE MANIFEST — 20 gallery slots + section imagery
 * ---------------------------------------------------------------------------
 * HOW TO ADD YOUR PHOTOS (nothing is invented here — empty slots render as
 * clearly-labelled placeholders until you paste a link):
 *
 *   OPTION A — recommended (fastest, Vercel-optimised, no third-party cookies):
 *     1. Download / export the photo at up to 2000px on the long edge.
 *     2. Compress it (see IMAGES.md → target 150–250 KB as .webp or .jpg).
 *     3. Drop it in `public/images/` and reference it as `/images/my-photo.jpg`.
 *        → `npm run build` copies it and Vercel serves it from the CDN.
 *
 *   OPTION B — paste a remote link (e.g. the Google image link you sent):
 *     `src: 'https://lh3.googleusercontent.com/...'`
 *     Google-hosted links work, but they can expire or be blocked by
 *     hot-link protection, so Option A is strongly preferred for the
 *     final production build.
 *
 * EVERY image needs a descriptive `alt` (good for accessibility AND SEO) and
 * a `caption` (shown subtly under the photo).
 *
 * Keep `width`/`height` accurate — real intrinsic dimensions prevent layout
 * shift (Core Web Vitals: CLS) and are what makes the site feel premium as it
 * loads. Only the ratio matters for the placeholder, but set the real numbers
 * once you swap in a photo.
 */

export const IMAGE_BASE = '/images';

/** 1 — Home hero background (also used on the About page header). */
export const heroImage = {
  /** Leave "" to use the built-in premium studio-gradient background. */
  src: '',
  alt: 'Recording session in progress at VM Music Factory studio, Bengaluru',
  caption: '',
  width: 1920,
  height: 1280,
};

/** 2 — About-us section image (as supplied by the studio). */
export const aboutImage = {
  src: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm15PcdqsQlbwEiLahcLYDDD14OkwEu2S7w1jUftkIMcXTHnF1ltgn5RP5_9c5k2hHVO4NZd1659PYifNw7zqIfQaL2e8ifxKBojqhPsDoyhAAkTBSgXennfm2AoplBiSBTq3cW4Q=s1360-w1360-h1020-rw',
  /** Smaller variants of the same Google image, used for responsive srcset. */
  srcSet: [
    'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm15PcdqsQlbwEiLahcLYDDD14OkwEu2S7w1jUftkIMcXTHnF1ltgn5RP5_9c5k2hHVO4NZd1659PYifNw7zqIfQaL2e8ifxKBojqhPsDoyhAAkTBSgXennfm2AoplBiSBTq3cW4Q=s680-w680-h510-rw 680w',
    'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm15PcdqsQlbwEiLahcLYDDD14OkwEu2S7w1jUftkIMcXTHnF1ltgn5RP5_9c5k2hHVO4NZd1659PYifNw7zqIfQaL2e8ifxKBojqhPsDoyhAAkTBSgXennfm2AoplBiSBTq3cW4Q=s1020-w1020-h765-rw 1020w',
    'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm15PcdqsQlbwEiLahcLYDDD14OkwEu2S7w1jUftkIMcXTHnF1ltgn5RP5_9c5k2hHVO4NZd1659PYifNw7zqIfQaL2e8ifxKBojqhPsDoyhAAkTBSgXennfm2AoplBiSBTq3cW4Q=s1360-w1360-h1020-rw 1360w',
  ].join(', '),
  sizes: '(max-width: 900px) 92vw, 46vw',
  alt: 'VM Music Factory music studio in Bengaluru, Karnataka',
  caption: 'VM Music Factory · Bengaluru, Karnataka',
  width: 1360,
  height: 1020,
};

/** 3 — Page-header background for the inner pages. */
export const pageHeaderImage = {
  src: '',
  alt: 'Microphone set up for a vocal recording at VM Music Factory',
  width: 1600,
  height: 900,
};

/**
 * 4 — GALLERY: 20 slots in two sections of ten.
 * Fill `src` (and ideally `alt`) for each slot. Slots left empty render as
 * tidy, labelled placeholders — never a stock photo and never a fake image.
 */
export const gallerySections = [
  {
    id: 'inside-the-studio',
    eyebrow: 'Section 01',
    title: 'Inside the Studio',
    description:
      'The rooms where the work happens — vocal booth, live room, control room and the gear that carries a session.',
    images: [
      {
        id: 'g-01',
        src: '',
        alt: 'Vocal recording booth at VM Music Factory, Bengaluru',
        caption: 'Vocal booth',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-02',
        src: '',
        alt: 'Mixing console and outboard gear in the VM Music Factory control room',
        caption: 'Control room',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-03',
        src: '',
        alt: 'Acoustic treatment inside the live recording room',
        caption: 'Live room',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-04',
        src: '',
        alt: 'Studio monitors and near-field monitoring position',
        caption: 'Monitoring',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-05',
        src: '',
        alt: 'Condenser microphone on a shock mount ready for a session',
        caption: 'Microphone locker',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-06',
        src: '',
        alt: 'Piano and keyboard corner at VM Music Factory',
        caption: 'Keys',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-07',
        src: '',
        alt: 'Composer desk with MIDI controller for background score work',
        caption: 'Composer desk',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-08',
        src: '',
        alt: 'Headphones and session notes on the studio console',
        caption: 'Session prep',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-09',
        src: '',
        alt: 'Studio entrance and signage of VM Music Factory in Bengaluru',
        caption: 'The entrance',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-10',
        src: '',
        alt: 'Recording equipment rack with preamps and interfaces',
        caption: 'Gear rack',
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    id: 'sessions-and-post',
    eyebrow: 'Section 02',
    title: 'Sessions & Post-Production',
    description:
      'Dubbing days, song recordings, karaoke evenings and late-night mix revisions — moments from the floor.',
    images: [
      {
        id: 'g-11',
        src: '',
        alt: 'Singer recording vocals during a song session',
        caption: 'Song recording',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-12',
        src: '',
        alt: 'Voice artist dubbing dialogue for a film in the studio',
        caption: 'Film dubbing',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-13',
        src: '',
        alt: 'Karaoke session with a group at VM Music Factory',
        caption: 'Karaoke session',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-14',
        src: '',
        alt: 'Music director directing a recording session at the console',
        caption: 'Direction',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-15',
        src: '',
        alt: 'Musicians tracking live instruments together',
        caption: 'Live tracking',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-16',
        src: '',
        alt: 'Mixing session on the desk during post-production',
        caption: 'Mixing',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-17',
        src: '',
        alt: 'Mastering chain being driven during finalisation',
        caption: 'Mastering',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-18',
        src: '',
        alt: 'Background score being programmed for a film sequence',
        caption: 'Background score',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-19',
        src: '',
        alt: 'Team listening back to a rough mix in the studio',
        caption: 'Listening back',
        width: 1600,
        height: 1200,
      },
      {
        id: 'g-20',
        src: '',
        alt: 'Client and engineer celebrating the final master at VM Music Factory',
        caption: 'Wrap-up',
        width: 1600,
        height: 1200,
      },
    ],
  },
];

/** Flattened list — handy for schema markup and sitemap-image generation. */
export const allGalleryImages = gallerySections.flatMap((section) => section.images);

/**
 * 5 — REVIEW IMAGE SLOTS (two blocks).
 * Drop screenshots of the Google reviews, or photos from sessions that the
 * reviews refer to. Anything left empty stays a labelled placeholder.
 */
export const reviewHighlightSlots = [
  {
    id: 'r-01',
    src: '',
    alt: 'Google review screenshot from a VM Music Factory client',
    caption: 'Google review screenshot',
  },
  {
    id: 'r-02',
    src: '',
    alt: 'Google review screenshot from a VM Music Factory client',
    caption: 'Google review screenshot',
  },
  {
    id: 'r-03',
    src: '',
    alt: 'Google review screenshot from a VM Music Factory client',
    caption: 'Google review screenshot',
  },
  {
    id: 'r-04',
    src: '',
    alt: 'Google review screenshot from a VM Music Factory client',
    caption: 'Google review screenshot',
  },
  {
    id: 'r-05',
    src: '',
    alt: 'Google review screenshot praising the recording rooms at VM Music Factory',
    caption: 'Google review screenshot',
  },
  {
    id: 'r-06',
    src: '',
    alt: 'Google review screenshot from a singer who recorded at VM Music Factory',
    caption: 'Google review screenshot',
  },
];

export const reviewMomentSlots = [
  {
    id: 'rm-01',
    src: '',
    alt: 'Photo from a dubbing session that clients reviewed',
    caption: 'Dubbing session',
  },
  {
    id: 'rm-02',
    src: '',
    alt: 'Photo from a song recording session that clients reviewed',
    caption: 'Song recording',
  },
  {
    id: 'rm-03',
    src: '',
    alt: 'Photo from a karaoke evening at the studio',
    caption: 'Karaoke evening',
  },
  {
    id: 'rm-04',
    src: '',
    alt: 'Photo of the studio team with clients after a session',
    caption: 'With clients',
  },
  {
    id: 'rm-05',
    src: '',
    alt: 'Photo from a background score session in the control room',
    caption: 'Scoring session',
  },
  {
    id: 'rm-06',
    src: '',
    alt: 'Photo from a mixing session at VM Music Factory',
    caption: 'Mixing session',
  },
];

export default {
  heroImage,
  aboutImage,
  pageHeaderImage,
  gallerySections,
  reviewHighlightSlots,
  reviewMomentSlots,
};
