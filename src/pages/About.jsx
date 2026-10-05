import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Media from '../components/Media.jsx';
import { ReviewCard } from '../components/Reviews.jsx';
import { MapEmbed } from '../components/Contact.jsx';
import {
  featureIcons,
  PageHead,
  SectionHead,
  MediaSplit,
  FeatureGrid,
  HoursCard,
  AddressCard,
  CtaPanel,
  Checklist,
} from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { aboutIntro, aboutSupporting, features, services } from '../data/content.js';
import { reviews } from '../data/reviews.js';
import { aboutImage } from '../data/images.js';
import { site } from '../data/site.js';
import { localBusinessSchema, aboutPageSchema, breadcrumbSchema } from '../data/schema.js';
import { ArrowRightIcon } from '../components/Icons.jsx';

export default function About() {
  const highlight = reviews.slice(0, 3);

  return (
    <>
      <Seo path={ROUTES.about} />
      <JsonLd
        id="schema-about"
        nodes={[
          aboutPageSchema(),
          localBusinessSchema(),
          breadcrumbSchema(ROUTES.about, 'About Us'),
        ]}
      />

      <PageHead
        breadcrumbs={<Breadcrumbs path={ROUTES.about} />}
        eyebrow="About us"
        title="The studio behind the sound"
        lede={`${site.name} is a state-of-the-art recording studio in ${site.address.locality}, ${site.address.city} — open 24 hours, seven days a week, for songs, film work and everything in between.`}
      />

      {/* ------------------------- studio introduction ------------------------- */}
      <section className="section">
        <div className="container">
          <MediaSplit image={aboutImage} mediaSide="right" priority>
            <p className="eyebrow">Welcome to the studio</p>

            {/* ⚠️ Verbatim studio copy — supplied by VM Music Factory */}
            {aboutIntro.map((paragraph) => (
              <p className="lede" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}

            <p
              className="text-gold"
              style={{
                marginTop: '1.25rem',
                fontSize: 'var(--step--1)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              — {site.founder.name} · {site.founder.role}
            </p>

            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <Link className="btn btn--primary" to={ROUTES.contact}>
                <span>Book a session</span>
                <ArrowRightIcon size={17} />
              </Link>
              <Link className="btn btn--ghost" to={ROUTES.gallery}>
                <span>See the studio</span>
              </Link>
            </div>
          </MediaSplit>
        </div>
      </section>

      {/* --------------------------- what we offer ---------------------------- */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Full-service music production, from first take to release"
            lede={aboutSupporting[0]}
          />
          <Checklist
            items={services.map((service) => service.title)}
          />
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to={ROUTES.services}>
              <span>Explore services in detail</span>
              <ArrowRightIcon size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------- timings & place -------------------------- */}
      <section className="section" id="timings">
        <div className="container">
          <SectionHead
            eyebrow="Timings & location"
            title="Open 24 hours, every single day"
            lede="The studio listing says it best: Monday through Sunday, VM Music Factory is open 24 hours. If inspiration strikes at 3 a.m., the console is ready."
          />
          <div className="contact-grid" style={{ marginBottom: '1.5rem' }}>
            <HoursCard />
            <AddressCard />
            <div className="contact-card">
              <h3 style={{ marginBottom: 0 }}>Studio vibe</h3>
              <p style={{ margin: 0 }}>
                {aboutSupporting[1]}
              </p>
            </div>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* ---------------------------- why choose us --------------------------- */}
      <section className="section section--raised">
        <div className="container">
          <SectionHead
            eyebrow="Why artists keep coming back"
            title="Comfort, acoustics and a music director on your side"
            lede="Clients mention the acoustic room, the peace of mind to work comfortably, and an engineer who is cooperative and professional. That is the standard every session is held to."
          />
          <FeatureGrid features={features} icons={featureIcons} />
        </div>
      </section>

      {/* -------------------------------- reviews ----------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="In their words"
            title="Three of the reviews that mean the most"
            lede="Published verbatim from the studio's Google listing — with the star rating each client gave."
          />
          <div className="reviews-grid">
            {highlight.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to={ROUTES.reviews}>
              <span>Read all {reviews.length} reviews</span>
              <ArrowRightIcon size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <CtaPanel
            eyebrow="Work with us"
            title="Let's create something amazing together"
            text="Whether it is a single song, a full film soundtrack or your first karaoke evening, the studio is open and the engineer is in."
          />
        </div>
      </section>

    </>
  );
}
