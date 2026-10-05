/**
 * ---------------------------------------------------------------------------
 * VM MUSIC FACTORY — SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * This is the ONLY file most edits need to happen in.
 * Everything else (header, footer, schema markup, sitemap, robots.txt,
 * WhatsApp links, call links) reads from here.
 *
 * OPEN ITEMS MARKED "TODO" — replace the placeholder values below:
 *   1. domain            → your live domain (used for canonical tags + sitemap)
 *   2. address.streetAddress / postalCode → exact studio address
 *   3. google.mapsUrl / reviewsUrl → your Google Maps listing link
 *   4. social.*          → Instagram / YouTube / Facebook (leave "" to hide)
 */

/** Phone number used for BOTH "Call us" and "WhatsApp us". */
export const phone = {
  /** Displayed across the site. */
  display: '+91 95133 45544',
  /** E.164 format, used by tel: links. */
  tel: '+919513345544',
  /** Digits only, used by wa.me links (no +, no spaces). */
  whatsapp: '919513345544',
};

export const site = {
  name: 'VM Music Factory',
  /** Short legal / brand name used in schema markup. */
  legalName: 'VM Music Factory',
  tagline: 'Recording Studio in Bengaluru',
  shortDescription:
    'Professional music recording, film dubbing, karaoke, mixing and mastering studio in Bengaluru, Karnataka.',
  /** TODO: replace with your live domain (no trailing slash). */
  domain: 'https://vm-music-factory.vercel.app',
  /**
   * TODO: the year the studio opened. Left blank on purpose — an empty value
   * omits `foundingDate` from the schema markup instead of publishing a guess.
   * (The oldest Google review is around seven years old.)
   */
  foundedYear: '',
  founder: {
    name: 'Vivek',
    role: 'Founder, Music Director & Sound Engineer',
  },
  /** Studio location. Reviews and the Google listing place the studio in RR Nagar, Bengaluru. */
  address: {
    /** TODO: add the building / street line shown on your Google listing. */
    streetAddress: '',
    locality: 'RR Nagar',
    city: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '',
    country: 'India',
    countryCode: 'IN',
  },
  /** Coordinates are optional — leave "" to omit geo data from schema markup. */
  geo: {
    latitude: '',
    longitude: '',
  },
  google: {
    /**
     * TODO: paste the Google Maps listing URL you have (the "Share → Copy link" one).
     * The value below is a safe Google Maps *search* deep link for the studio and
     * always resolves — replace it with your exact listing link.
     */
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=VM%20Music%20Factory%20recording%20studio%20Bengaluru',
    /** TODO: paste the reviews link of your Google Business Profile if it differs. */
    reviewsUrl:
      'https://www.google.com/maps/search/?api=1&query=VM%20Music%20Factory%20recording%20studio%20Bengaluru',
    /** Used for the lazy-loaded map embed (no API key required). */
    embedQuery: 'VM Music Factory recording studio Bengaluru',
  },
  social: {
    /** Leave "" to hide the link in the footer. */
    instagram: '',
    youtube: '',
    facebook: '',
  },
  /** Core services — shown on the home page and referenced by schema markup. */
  focusKeywords: [
    'recording studio in Bengaluru',
    'music recording studio Bangalore',
    'dubbing studio RR Nagar',
    'karaoke studio Bengaluru',
    'mixing and mastering studio Bangalore',
    'background score music production',
  ],
  /** WhatsApp prefilled message so enquiries arrive with context. */
  whatsappMessage:
    'Hello VM Music Factory! I would like to know more about your recording studio and book a studio session.',
};

/** Convenience links built from the config above. */
export const links = {
  call: `tel:${phone.tel}`,
  whatsapp: `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`,
  whatsappPlain: `https://wa.me/${phone.whatsapp}`,
  maps: site.google.mapsUrl,
  reviews: site.google.reviewsUrl,
};

export const fullAddress = [
  site.address.streetAddress,
  site.address.locality,
  site.address.city,
  site.address.region,
  site.address.postalCode,
]
  .filter(Boolean)
  .join(', ');

export default site;
