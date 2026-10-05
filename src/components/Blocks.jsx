import { Link, ROUTES } from '../router.jsx';
import { site, phone, links, fullAddress } from '../data/site.js';
import { hours, hoursSummary } from '../data/hours.js';
import { reviewsMeta, reviews } from '../data/reviews.js';
import { heroImage } from '../data/images.js';
import Stars from './Stars.jsx';
import {
  AwardIcon,
  DiscIcon,
  MicIcon,
  MusicIcon,
  UsersIcon,
  SlidersIcon,
  HeadphonesIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  GoogleIcon,
  ExternalLinkIcon,
} from './Icons.jsx';
import { WhatsAppButton, CallButton, DirectionsButton } from './ContactActions.jsx';
import Media from './Media.jsx';

/* ----------------------------- section heading ---------------------------- */

export function SectionHead({ eyebrow, title, lede, center = false, as = 'h2', children }) {
  const Heading = as;
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''}`.trim()}>
      {eyebrow && <p className={`eyebrow ${center ? 'eyebrow--center' : ''}`.trim()}>{eyebrow}</p>}
      <Heading>{title}</Heading>
      {lede && <p className="lede" style={{ marginTop: '1rem' }}>{lede}</p>}
      {children}
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

export function Hero() {
  const hasPhoto = Boolean(heroImage.src);

  return (
    <section
      className={`hero ${hasPhoto ? 'hero--has-photo' : ''}`.trim()}
      style={hasPhoto ? { '--hero-image': `url("${heroImage.src}")` } : undefined}
      aria-label="Introduction"
    >
      <div className="container hero-inner">
        <p className="eyebrow">Recording Studio · RR Nagar, Bengaluru</p>

        {/* The single H1 of the home page */}
        <h1>
          Recording studio in Bengaluru
          <span className="accent">where music magic happens.</span>
        </h1>

        <p className="hero-lede">
          Song recording, film dubbing, karaoke, background score, mixing and mastering — a
          state-of-the-art studio in Bengaluru, Karnataka, open 24 hours, seven days a week.
        </p>

        <div className="hero-actions">
          <WhatsAppButton label="WhatsApp us" />
          <CallButton label="Call us" variant="primary" />
          <Link className="btn btn--ghost" to={ROUTES.gallery}>
            <span>View the studio</span>
            <ArrowRightIcon size={17} />
          </Link>
        </div>

        <ul className="hero-meta">
          <li>
            <PhoneIcon size={16} /> {phone.display}
          </li>
          <li>
            <MapPinIcon size={16} /> RR Nagar, Bengaluru
          </li>
          <li>
            <ClockIcon size={16} /> Open 24 hours
          </li>
          <li>
            <StarIcon size={16} /> {reviewsMeta.averageRating.toFixed(1)} on Google
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- page header ------------------------------ */

export function PageHead({ eyebrow, title, lede, breadcrumbs, actions = true }) {
  return (
    <section className="page-head">
      <div className="container">
        {breadcrumbs}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {actions && (
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <WhatsAppButton label="WhatsApp us" />
            <CallButton label="Call us" variant="ghost" />
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- stats ---------------------------------- */

export function StatsBand() {
  const stats = [
    { value: reviewsMeta.averageRating.toFixed(1), label: 'Google rating' },
    { value: `${reviews.length}`, label: 'Reviews published' },
    { value: '24×7', label: 'Studio open' },
    { value: '1', label: 'Roof, start to master' },
  ];

  return (
    <div className="stats">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- cards ---------------------------------- */

export function HoursCard({ compact = false }) {
  return (
    <div className="contact-card">
      <h3 style={{ marginBottom: 0 }}>
        <ClockIcon size={18} /> Opening hours
      </h3>
      <ul className="info-list">
        {hours.map((entry) => (
          <li key={entry.day} style={{ justifyContent: 'space-between' }}>
            <span>{entry.day}</span>
            <strong style={{ color: 'var(--gold)' }}>{entry.time}</strong>
          </li>
        ))}
      </ul>
      {!compact && (
        <p className="form-note" style={{ margin: 0 }}>
          {hoursSummary}. Late-night and early-morning sessions are available — tell us your
          preferred slot on WhatsApp and we will confirm availability.
        </p>
      )}
    </div>
  );
}

export function AddressCard({ showButtons = true }) {
  return (
    <div className="contact-card">
      <h3 style={{ marginBottom: 0 }}>
        <MapPinIcon size={18} /> Studio location
      </h3>
      <address>
        <strong style={{ display: 'block', color: 'var(--text)', fontStyle: 'normal' }}>
          {site.name}
        </strong>
        {site.address.streetAddress && <span>{site.address.streetAddress}</span>}
        <span>
          {site.address.locality}, {site.address.city}
        </span>
        <span>
          {site.address.region}
          {site.address.postalCode ? ` ${site.address.postalCode}` : ''}, {site.address.country}
        </span>
      </address>
      <p className="form-note" style={{ margin: 0 }}>
        Located in {site.address.locality}, {site.address.city} — open the map for turn-by-turn
        directions, or call us and we will guide you in.
      </p>
      {showButtons && (
        <div className="btn-row">
          <DirectionsButton label="Open in Google Maps" />
          <CallButton label="Call for directions" variant="ghost" size={16} />
        </div>
      )}
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="contact-card">
      <h3 style={{ marginBottom: 0 }}>
        <PhoneIcon size={18} /> Call or WhatsApp
      </h3>
      <a className="contact-phone" href={links.call}>
        {phone.display}
      </a>
      <p className="form-note" style={{ margin: 0 }}>
        One number for both — call during a session and you will get a call back, or send a
        WhatsApp message any time of the day.
      </p>
      <div className="btn-row">
        <WhatsAppButton label="WhatsApp us" />
        <CallButton label="Call us" variant="ghost" />
      </div>
    </div>
  );
}

/* ------------------------------- service list ----------------------------- */

export function ServiceList({ services, linksToServicePage = true }) {
  const iconFor = {
    mic: '🎙️',
    sliders: '🎚️',
    music: '🎵',
    disc: '💿',
    sparkles: '✨',
    headphones: '🎧',
    award: '🏆',
  };

  return (
    <ol className="service-list">
      {services.map((service) => (
        <li className="service-item" key={service.id} id={service.id}>
          <h3>
            <span aria-hidden="true" style={{ marginRight: '0.45rem' }}>
              {iconFor[service.icon] || '🎵'}
            </span>
            {service.title}
          </h3>
          <p>{service.description}</p>
          {service.bullets && (
            <ul className="bullet-grid" style={{ marginTop: '0.6rem', gap: '0.35rem 1.2rem' }}>
              {service.bullets.map((bullet) => (
                <li key={bullet} style={{ fontSize: 'var(--step--1)' }}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          {linksToServicePage && (
            <p style={{ marginTop: '0.85rem' }}>
              <Link className="link-arrow" to={`${ROUTES.contact}#enquiry`}>
                Plan this session <ArrowRightIcon size={16} />
              </Link>
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------- process -------------------------------- */

export function ProcessSteps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((step) => (
        <li className="step" key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------ feature grid ------------------------------ */

export function FeatureGrid({ features, icons }) {
  return (
    <div className="grid grid--3">
      {features.map((feature) => {
        const Icon = icons?.[feature.icon];
        return (
          <article className="card card--hover" key={feature.title}>
            {Icon && (
              <span className="card-icon">
                <Icon size={22} />
              </span>
            )}
            <h3>{feature.title}</h3>
            <p>{feature.description || feature.text}</p>
          </article>
        );
      })}
    </div>
  );
}

/* ------------------------ shared icon map for cards ----------------------- */

export const featureIcons = {
  clock: ClockIcon,
  mic: MicIcon,
  music: MusicIcon,
  'map-pin': MapPinIcon,
  sliders: SlidersIcon,
  headphones: HeadphonesIcon,
  users: UsersIcon,
  award: AwardIcon,
  disc: DiscIcon,
};

/* ------------------------------- CTA panel -------------------------------- */

export function CtaPanel({
  eyebrow = 'Book the studio',
  title = 'Ready to record? We are open right now.',
  text = 'Tell us what you want to make — a song, a dubbing date, a karaoke evening or a full background score — and we will plan the session around you.',
  primary = true,
}) {
  return (
    <div className="cta-panel reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="btn-row">
        {primary && <WhatsAppButton label="WhatsApp us" />}
        <CallButton label={`Call ${phone.display}`} variant={primary ? 'ghost' : 'primary'} />
        <DirectionsButton label="Get directions" variant="ghost" />
      </div>
    </div>
  );
}

/* --------------------------- Google review panel -------------------------- */

export function GoogleReviewCard({ compact = false }) {
  return (
    <a
      className="card card--hover"
      href={links.reviews}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <span className="card-icon">
        <GoogleIcon size={22} />
      </span>
      <h3>{compact ? 'Read us on Google' : 'Read every review on Google'}</h3>
      <p>
        {reviewsMeta.averageRating.toFixed(1)} rating from {reviews.length} published reviews for{' '}
        {site.name}, {site.address.locality}, {site.address.city}.
      </p>
      <p style={{ marginTop: '0.85rem' }}>
        <span className="link-arrow">
          Open the Google listing <ExternalLinkIcon size={15} />
        </span>
      </p>
    </a>
  );
}

/* ------------------------------- split media ------------------------------ */

export function MediaSplit({ image, children, mediaSide = 'right', ratio = '4x3', priority = false }) {
  return (
    <div className={`split split--media-${mediaSide}`}>
      <div className="split-body">{children}</div>
      <div className="split-media">
        <Media
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes || '(max-width: 900px) 92vw, 46vw'}
          alt={image.alt}
          width={image.width}
          height={image.height}
          ratio={ratio}
          caption={image.caption}
          priority={priority}
          placeholderLabel="About-us photo"
          placeholderHint="Paste the studio photo link in src/data/images.js → aboutImage"
        />
      </div>
    </div>
  );
}

/* ------------------------------ misc helpers ------------------------------ */

export function Checklist({ items }) {
  return (
    <ul className="bullet-grid">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function GoogleStars({ rating = 5, label }) {
  return <Stars rating={rating} label={label} />;
}

export function TrustBand() {
  const items = [
    { icon: CheckIcon, text: 'Song & vocal recording' },
    { icon: CheckIcon, text: 'Film dubbing & voice-over' },
    { icon: CheckIcon, text: 'Karaoke sessions' },
    { icon: CheckIcon, text: 'Background score' },
    { icon: CheckIcon, text: 'Mixing & mastering' },
  ];

  return (
    <div className="band" aria-label="Studio services at a glance">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <span key={item.text}>
            <Icon size={15} /> {item.text}
          </span>
        );
      })}
    </div>
  );
}

