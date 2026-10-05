import { site, fullAddress, phone, links } from './site.js';
import { openingHoursSpecification } from './hours.js';
import { reviews, reviewsMeta } from './reviews.js';
import { services } from './content.js';
import { allGalleryImages, aboutImage } from './images.js';
import { SITE_URL, absoluteUrl } from './seo.js';
import { ROUTES } from '../router.jsx';

/**
 * ---------------------------------------------------------------------------
 * SCHEMA MARKUP (JSON-LD)
 * ---------------------------------------------------------------------------
 * Structured data so Google can build a rich result for the studio: name,
 * phone, 24-hour opening times, address, rating and services.
 *
 * Only facts that are true and visible on the page are marked up. The review
 * markup uses the real Google reviews in `src/data/reviews.js`.
 */

const STUDIO_ID = `${SITE_URL}/#studio`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const sameAs = Object.values(site.social).filter(Boolean);

/** The studio itself — used on every page as the site's identity node. */
export function localBusinessSchema({ withReviews = false } = {}) {
  const schema = {
    '@type': 'LocalBusiness',
    additionalType: 'https://en.wikipedia.org/wiki/Recording_studio',
    '@id': STUDIO_ID,
    name: site.name,
    alternateName: 'VM Music Factory Studio',
    description: site.shortDescription,
    url: `${SITE_URL}/`,
    telephone: phone.tel,
    image: aboutImage.src,
    logo: `${SITE_URL}/favicon.svg`,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      ...(site.address.streetAddress ? { streetAddress: site.address.streetAddress } : {}),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
      addressCountry: site.address.countryCode,
    },
    areaServed: [
      { '@type': 'City', name: 'Bengaluru' },
      { '@type': 'State', name: 'Karnataka' },
      { '@type': 'Country', name: 'India' },
    ],
    openingHoursSpecification,
    hasMap: site.google.mapsUrl,
    founder: {
      '@type': 'Person',
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
    ...(site.foundedYear ? { foundingDate: site.foundedYear } : {}),
    knowsAbout: [
      'Music recording',
      'Film dubbing',
      'Background score',
      'Mixing and mastering',
      'Karaoke',
      'Voice-over recording',
    ],
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.geo.latitude && site.geo.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
        }
      : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Studio services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  if (withReviews) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewsMeta.averageRating,
      bestRating: 5,
      worstRating: 1,
      // Only reviews that are actually published on this site are counted.
      reviewCount: reviews.length,
      ratingCount: reviews.length,
    };
    schema.review = reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      datePublished: review.relativeDate,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      publisher: { '@type': 'Organization', name: 'Google' },
    }));
  }

  return schema;
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: site.name,
    inLanguage: 'en-IN',
    description: site.shortDescription,
    publisher: { '@id': STUDIO_ID },
  };
}

export function breadcrumbSchema(path, label) {
  const items = [
    { name: 'Home', item: `${SITE_URL}/` },
    ...(path === ROUTES.home ? [] : [{ name: label || 'Page', item: absoluteUrl(path) }]),
  ];

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Gallery page schema — only images that actually exist are listed. */
export function imageGallerySchema() {
  const images = allGalleryImages.filter((image) => image.src);
  return {
    '@type': 'ImageGallery',
    name: 'VM Music Factory studio gallery',
    url: absoluteUrl(ROUTES.gallery),
    numberOfItems: allGalleryImages.length,
    ...(images.length
      ? {
          image: images.map((image) => ({
            '@type': 'ImageObject',
            contentUrl: image.src.startsWith('http') ? image.src : `${SITE_URL}${image.src}`,
            caption: image.caption || image.alt,
            ...(image.width ? { width: image.width } : {}),
            ...(image.height ? { height: image.height } : {}),
          })),
        }
      : {}),
  };
}

export function aboutPageSchema() {
  return {
    '@type': 'AboutPage',
    url: absoluteUrl(ROUTES.about),
    name: 'About VM Music Factory',
    description:
      'The story, people and approach behind VM Music Factory, a professional recording studio in Bengaluru, Karnataka.',
    mainEntity: { '@id': STUDIO_ID },
  };
}

export function contactPageSchema() {
  return {
    '@type': 'ContactPage',
    url: absoluteUrl(ROUTES.contact),
    name: 'Contact VM Music Factory',
    description: `Contact and location details for VM Music Factory, ${fullAddress}. Phone and WhatsApp: ${phone.display}.`,
    mainEntity: { '@id': STUDIO_ID },
  };
}

export function reviewPageSchema() {
  return {
    '@type': 'CollectionPage',
    url: absoluteUrl(ROUTES.reviews),
    name: 'Client reviews — VM Music Factory',
    description: `${reviews.length} verified Google reviews for VM Music Factory, a recording studio in Bengaluru.`,
    mainEntity: localBusinessSchema({ withReviews: true }),
    isPartOf: { '@id': WEBSITE_ID },
    sameAs: links.reviews,
  };
}

export function servicePageSchema() {
  return {
    '@type': 'CollectionPage',
    url: absoluteUrl(ROUTES.services),
    name: 'Studio services — VM Music Factory',
    description:
      'Recording, dubbing, karaoke, background score, jingle production, mixing and mastering services in Bengaluru.',
    mainEntity: localBusinessSchema(),
  };
}

/**
 * Wraps any number of schema nodes in a single `@graph` document.
 * `@graph` keeps everything connected to one studio entity instead of
 * repeating duplicate LocalBusiness nodes across pages.
 */
export function buildGraph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

export default { localBusinessSchema, websiteSchema, breadcrumbSchema, buildGraph };
