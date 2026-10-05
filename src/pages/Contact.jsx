import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { PageHead, SectionHead, AddressCard, HoursCard, ContactCard, CtaPanel } from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { MapEmbed, default as EnquiryForm } from '../components/Contact.jsx';
import Accordion from '../components/Accordion.jsx';
import { contactPageSchema, localBusinessSchema, breadcrumbSchema, faqSchema } from '../data/schema.js';
import { faqs } from '../data/content.js';
import { site, phone, links } from '../data/site.js';
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons.jsx';

export default function Contact() {
  return (
    <>
      <Seo path={ROUTES.contact} />
      <JsonLd
        id="schema-contact"
        nodes={[
          contactPageSchema(),
          localBusinessSchema(),
          breadcrumbSchema(ROUTES.contact, 'Contact'),
          faqSchema(faqs.slice(0, 5)),
        ]}
      />

      <PageHead
        breadcrumbs={<Breadcrumbs path={ROUTES.contact} />}
        eyebrow="Contact us"
        title="Talk to the studio"
        lede={`Call or WhatsApp ${phone.display} — one number for both — or send an enquiry below. ${site.name} is in ${site.address.locality}, ${site.address.city}, open 24 hours a day.`}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <ContactCard />
            <AddressCard />
            <HoursCard />
          </div>
        </div>
      </section>

      <section className="section section--surface" id="enquiry-section">
        <div className="container split split--media-right" style={{ alignItems: 'start' }}>
          <div className="split-body">
            <SectionHead
              eyebrow="Enquiry"
              title="Tell us about your project"
              lede="Share what you want to record and when. The form prepares a WhatsApp message for you — no account, no waiting on email."
            />
            <ul className="info-list">
              <li>
                <PhoneIcon size={17} />
                <span>
                  <strong>{phone.display}</strong>
                  Calls and WhatsApp — same number.
                </span>
              </li>
              <li>
                <WhatsAppIcon size={17} />
                <span>
                  <strong>Fastest replies on WhatsApp</strong>
                  Send a voice note, a reference track or a rough mix.
                </span>
              </li>
            </ul>
            <div className="btn-row" style={{ marginTop: '1.25rem' }}>
              <Link className="link-arrow" to={ROUTES.karaoke}>
                Looking for karaoke? <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
          <div className="split-media" style={{ width: '100%' }}>
            <EnquiryForm compact />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Find us"
            title={`${site.name} in ${site.address.locality}, ${site.address.city}`}
            lede="Open the interactive map, or jump straight to Google Maps for turn-by-turn directions from wherever you are."
          />
          <MapEmbed />
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <a className="btn btn--ghost" href={links.reviews} target="_blank" rel="noopener noreferrer">
              <span>See the studio on Google</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container container--narrow">
          <SectionHead eyebrow="Before you call" title="Quick answers" center />
          <Accordion items={faqs} idPrefix="contact-faq" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <CtaPanel
            eyebrow="Open 24 hours"
            title="The studio is ready when you are"
            text="Booking a song, a dubbing date or a karaoke evening takes one message."
          />
        </div>
      </section>
    </>
  );
}
