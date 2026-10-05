import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { PageHead, SectionHead, ServiceList, ProcessSteps, CtaPanel } from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Accordion from '../components/Accordion.jsx';
import { services, process, faqs, sectionCopy } from '../data/content.js';
import { localBusinessSchema, breadcrumbSchema, faqSchema, servicePageSchema } from '../data/schema.js';
import { ArrowRightIcon } from '../components/Icons.jsx';

export default function Services() {
  return (
    <>
      <Seo path={ROUTES.services} />
      <JsonLd
        id="schema-services"
        nodes={[
          servicePageSchema(),
          localBusinessSchema(),
          breadcrumbSchema(ROUTES.services, 'Services'),
          faqSchema(faqs),
        ]}
      />

      <PageHead
        breadcrumbs={<Breadcrumbs path={ROUTES.services} />}
        eyebrow={sectionCopy.services.eyebrow}
        title="Studio services in Bengaluru"
        lede={sectionCopy.services.lede}
      />

      <section className="section">
        <div className="container">
          <ServiceList services={services} />
          <div className="notice" style={{ marginTop: '2rem' }}>
            <span>
              <strong>Not sure what your project needs?</strong> Send a voice note or a rough
              recording of the song to{' '}
              <Link to={ROUTES.contact}>the studio on WhatsApp</Link> and you will get an honest
              answer about what to book — and what you can skip.
            </span>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="A session, step by step"
            lede="Whether you book a single evening for vocals or a full film score, the flow is the same."
          />
          <ProcessSteps steps={process} />
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Questions"
            title="Studio FAQs"
            lede="The answers most people ask for before booking their first session."
            center
          />
          <Accordion items={faqs} idPrefix="services-faq" />
          <div className="btn-row" style={{ marginTop: '2rem', justifyContent: 'center' }}>
            <Link className="btn btn--primary" to={ROUTES.contact}>
              <span>Book a session</span>
              <ArrowRightIcon size={17} />
            </Link>
            <Link className="btn btn--ghost" to={ROUTES.karaoke}>
              <span>Karaoke studio</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <CtaPanel />
        </div>
      </section>
    </>
  );
}
