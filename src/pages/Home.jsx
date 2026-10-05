import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import {
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
  faqSchema,
  imageGallerySchema,
} from '../data/schema.js';
import { site, phone, links } from '../data/site.js';
import { reviews } from '../data/reviews.js';
import { services, features, process, faqs, aboutIntro, sectionCopy } from '../data/content.js';
import { aboutImage, gallerySections, allGalleryImages } from '../data/images.js';
import Media from '../components/Media.jsx';
import {
  featureIcons,
  Hero,
  SectionHead,
  StatsBand,
  ServiceList,
  FeatureGrid,
  ProcessSteps,
  CtaPanel,
  GoogleReviewCard,
  TrustBand,
} from '../components/Blocks.jsx';
import ReviewsSection from '../components/Reviews.jsx';
import { GalleryGrid } from '../components/Gallery.jsx';
import Accordion from '../components/Accordion.jsx';
import { MapEmbed } from '../components/Contact.jsx';
import { AddressCard, HoursCard, ContactCard } from '../components/Blocks.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';

export default function Home() {
  const previewImages = allGalleryImages.slice(0, 8);

  return (
    <>
      <Seo path={ROUTES.home} />
      <JsonLd
        id="schema-home"
        nodes={[
          localBusinessSchema({ withReviews: true }),
          websiteSchema(),
          breadcrumbSchema(ROUTES.home, 'Home'),
          faqSchema(faqs),
          imageGallerySchema(),
        ]}
      />

      <Hero />
      <TrustBand />

      {/* ------------------------------ about teaser ----------------------------- */}
      <section className="section">
        <div className="container split split--media-right">
          <div className="split-body">
            <SectionHead
              eyebrow="About the studio"
              title="A studio built for artists, not just for sessions"
              lede={aboutIntro[0]}
            />
            <p>
              Sessions are led by a working music director and sound engineer, and the studio handles
              everything from the first scratch vocal to the final master — recording, editing,
              mixing and mastering in the same room.
            </p>
            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <Link className="btn btn--ghost" to={ROUTES.about}>
                <span>More about us</span>
                <ArrowRightIcon size={17} />
              </Link>
              <Link className="link-arrow" to={ROUTES.contact} style={{ alignSelf: 'center' }}>
                Book a session <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
          <div className="split-media">
            <Media
              src={aboutImage.src}
              srcSet={aboutImage.srcSet}
              sizes={aboutImage.sizes}
              alt={aboutImage.alt}
              width={aboutImage.width}
              height={aboutImage.height}
              ratio="4x3"
              caption={aboutImage.caption}
              priority
              placeholderLabel="About-us photo"
              placeholderHint="Studio photo coming soon — the layout is already in place."
            />
          </div>
        </div>
      </section>

      {/* -------------------------------- stats --------------------------------- */}
      <section className="section section--tight">
        <div className="container">
          <StatsBand />
        </div>
      </section>

      {/* ------------------------------- services ------------------------------- */}
      <section className="section section--surface" id="services">
        <div className="container">
          <SectionHead
            eyebrow={sectionCopy.services.eyebrow}
            title={sectionCopy.services.title}
            lede={sectionCopy.services.lede}
          />
          <ServiceList services={services.slice(0, 6)} />
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to={ROUTES.services}>
              <span>All studio services</span>
              <ArrowRightIcon size={17} />
            </Link>
            <a className="btn btn--ghost" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              <span>Ask about your project</span>
            </a>
          </div>
        </div>
      </section>

      {/* ----------------------------- why choose us ---------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why artists choose VM"
            title="Twenty-four hours a day, one roof, one team"
            lede="Reviews from film makers, singers and first-time visitors keep coming back to the same things: the acoustic rooms, the calm, and a sound engineer who works with you rather than around you."
          />
          <FeatureGrid features={features} icons={featureIcons} />
        </div>
      </section>

      {/* -------------------------------- process ------------------------------- */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="From first message to final master"
            lede="Four steps, no guesswork. Most sessions are confirmed the same day over WhatsApp."
          />
          <ProcessSteps steps={process} />
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to={ROUTES.contact}>
              <span>Start your project</span>
              <ArrowRightIcon size={17} />
            </Link>
            <a className="btn btn--ghost" href={links.call}>
              Call {phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------- gallery ------------------------------- */}
      <section className="section" id="gallery-preview">
        <div className="container">
          <SectionHead
            eyebrow="Gallery"
            title="Take a look inside"
            lede={`Photos of the vocal booth, control room and live room are added as the studio supplies them — ${gallerySections.reduce((total, section) => total + section.images.length, 0)} slots in total across two gallery sections.`}
          />
          <GalleryGrid images={previewImages} idPrefix="home-gallery" />
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--ghost" to={ROUTES.gallery}>
              <span>Open the full gallery</span>
              <ArrowRightIcon size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------- reviews ------------------------------- */}
      <section className="section section--surface" id="reviews-preview">
        <div className="container">
          <SectionHead
            eyebrow={sectionCopy.reviews.eyebrow}
            title="Rated 5.0 by the people who record here"
            lede="Real reviews from the studio's Google listing — reproduced word for word, with the exact star rating each client gave."
            center
          />
          <ReviewsSection limit={6} />
          <div className="btn-row" style={{ marginTop: '2rem', justifyContent: 'center' }}>
            <Link className="btn btn--primary" to={ROUTES.reviews}>
              <span>Read all {reviews.length} reviews</span>
              <ArrowRightIcon size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------- FAQ -------------------------------- */}
      <section className="section" id="faq">
        <div className="container">
          <div className="split split--media-right" style={{ alignItems: 'start' }}>
            <div className="split-body">
              <SectionHead
                eyebrow="Good to know"
                title="Frequently asked questions"
                lede="Still unsure about something? WhatsApp us — you will usually hear back within minutes."
              />
              <GoogleReviewCard compact />
            </div>
            <div className="split-media" style={{ width: '100%' }}>
              <Accordion items={faqs} idPrefix="home-faq" />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------- contact ------------------------------- */}
      <section className="section section--raised" id="contact">
        <div className="container">
          <SectionHead
            eyebrow="Visit or call"
            title="Find the studio in RR Nagar, Bengaluru"
            lede="One number for calls and WhatsApp, open 24 hours, all seven days. Share your idea and we will tell you exactly what a session needs."
          />
          <div className="contact-grid" style={{ marginBottom: '1.5rem' }}>
            <ContactCard />
            <AddressCard />
            <HoursCard compact />
          </div>
          <MapEmbed />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaPanel />
        </div>
      </section>
    </>
  );
}
