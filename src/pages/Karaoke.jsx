import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { PageHead, SectionHead, CtaPanel, Checklist, ProcessSteps, featureIcons } from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Accordion from '../components/Accordion.jsx';
import { localBusinessSchema, breadcrumbSchema, faqSchema } from '../data/schema.js';
import { absoluteUrl } from '../data/seo.js';
import { site, phone } from '../data/site.js';
import { ArrowRightIcon, MusicIcon } from '../components/Icons.jsx';
import { FeatureGrid } from '../components/Blocks.jsx';

const karaokeFaqs = [
  {
    question: 'Do I need to be a good singer to book a karaoke session?',
    answer:
      'Not at all. Most people who come for karaoke are singing for fun — the engineer sets the levels and the room makes everyone sound better than they expect.',
  },
  {
    question: 'Can we book karaoke for a group or a celebration?',
    answer:
      'Yes. Karaoke sessions work for friends, families, birthdays and team outings. Tell us roughly how many people are coming on WhatsApp and we will plan the room and the slot.',
  },
  {
    question: 'Can we record our karaoke performance?',
    answer:
      'If you would like to keep it, the session can be recorded. Mention it when you book so the engineer sets up the tracks before you arrive.',
  },
  {
    question: 'What time can we come for karaoke?',
    answer:
      'The studio is open 24 hours, seven days a week, so you can book an evening, a late night slot or a weekend afternoon — subject to availability.',
  },
];

const karaokeFeatures = [
  {
    icon: 'mic',
    title: 'Studio microphones',
    text: 'Sing through the same microphones used for professional vocal recordings, with headphones on for monitoring.',
  },
  {
    icon: 'sparkles',
    title: 'A room that flatters',
    text: 'A treated acoustic room and proper monitoring make the difference between singing in a living room and singing in a studio.',
  },
  {
    icon: 'users',
    title: 'Groups welcome',
    text: 'Friends, family, colleagues — book the room together and take turns on the mic.',
  },
  {
    icon: 'headphones',
    title: 'Engineer on hand',
    text: 'Levels, echo and balance are handled for you, so nobody has to fiddle with a mixer between songs.',
  },
  {
    icon: 'disc',
    title: 'Record it if you want',
    text: 'Ask when you book and your session can be recorded — a keepsake, a demo, or content for your page.',
  },
  {
    icon: 'clock',
    title: 'Open 24 hours',
    text: 'Late-night karaoke after a shoot or an early weekend slot before the day starts — both are possible.',
  },
];

const karaokeSteps = [
  {
    title: 'Message us',
    text: `WhatsApp ${phone.display} with the date, the time and roughly how many people are singing.`,
  },
  {
    title: 'Confirm the slot',
    text: 'We check availability and confirm the session. Tell us about any favourite songs or languages in advance.',
  },
  {
    title: 'Sing',
    text: 'Arrive, grab a mic (or headphones) and sing. The engineer keeps the sound right so you can just enjoy it.',
  },
];

export default function Karaoke() {
  return (
    <>
      <Seo path={ROUTES.karaoke} />
      <JsonLd
        id="schema-karaoke"
        nodes={[
          {
            '@type': 'Service',
            name: 'Karaoke studio sessions',
            serviceType: 'Karaoke recording session',
            url: absoluteUrl(ROUTES.karaoke),
            description:
              'Karaoke sessions in a professional recording studio in RR Nagar, Bengaluru — studio microphones, acoustic room and an engineer on hand.',
            provider: { '@id': `${site.domain.replace(/\/+$/, '')}/#studio` },
            areaServed: { '@type': 'City', name: 'Bengaluru' },
            availableChannel: {
              '@type': 'ServiceChannel',
              servicePhone: { '@type': 'ContactPoint', telephone: phone.tel, contactType: 'bookings' },
            },
          },
          localBusinessSchema(),
          breadcrumbSchema(ROUTES.karaoke, 'Karaoke Studio'),
          faqSchema(karaokeFaqs),
        ]}
      />

      <PageHead
        breadcrumbs={<Breadcrumbs path={ROUTES.karaoke} />}
        eyebrow="Karaoke studio"
        title="Karaoke, but in a real recording studio"
        lede="Sing your favourites on studio microphones in a treated room, with an engineer handling the sound — in RR Nagar, Bengaluru. Open 24 hours, so late-night sessions are welcome."
      />

      <section className="section">
        <div className="container split split--media-right">
          <div className="split-body">
            <SectionHead
              eyebrow="What you get"
              title="Studio sound, zero pressure"
              lede="Karaoke sessions at VM Music Factory are built for people who want to have a good time — not an audition."
            />
            <Checklist
              items={[
                'Professional studio microphones and headphones',
                'Treated acoustic room — you hear yourself properly',
                'Engineer managing levels, echo and balance',
                'Solo sessions or groups of friends and family',
                'Record your performance if you want a keepsake',
                'Any slot, any day — the studio is open 24 hours',
              ]}
            />
            <div className="btn-row" style={{ marginTop: '1.75rem' }}>
              <Link className="btn btn--primary" to={ROUTES.contact}>
                <span>Book a karaoke slot</span>
                <ArrowRightIcon size={17} />
              </Link>
            </div>
          </div>
          <div className="split-media">
            <div className="card">
              <span className="card-icon">
                <MusicIcon size={22} />
              </span>
              <h3>Ideas for your session</h3>
              <ul className="bullet-grid" style={{ gridTemplateColumns: '1fr' }}>
                <li>Birthdays and anniversaries</li>
                <li>Weekend plans with friends</li>
                <li>Team outings and office celebrations</li>
                <li>Practice before an audition or open mic</li>
                <li>Recording a cover or a reel</li>
                <li>Simply singing your favourite songs out loud</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="Why here"
            title="Six reasons karaoke sounds better at VM"
            lede="The same room that records film songs and dubbing is available for a fun evening on the mic."
          />
          <FeatureGrid features={karaokeFeatures} icons={featureIcons} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Booking"
            title="Three steps to a mic in your hand"
            lede="Most karaoke sessions are confirmed over WhatsApp within minutes."
          />
          <ProcessSteps steps={karaokeSteps} />
        </div>
      </section>

      <section className="section section--raised">
        <div className="container container--narrow">
          <SectionHead eyebrow="Karaoke FAQs" title="Before you book" center />
          <Accordion items={karaokeFaqs} idPrefix="karaoke-faq" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaPanel
            eyebrow="Pick a night"
            title="Grab the mic whenever the mood strikes"
            text="The studio is open 24 hours, seven days a week. Tell us your date and how many singers are coming."
          />
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <Link className="link-arrow" to={ROUTES.services}>
              See all studio services <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
