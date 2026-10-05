import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { localBusinessSchema, breadcrumbSchema } from '../data/schema.js';
import { site, phone, links, fullAddress } from '../data/site.js';

const LAST_UPDATED = '5 October 2026';

export default function PrivacyPolicy() {
  return (
    <>
      <Seo path={ROUTES.privacy} />
      <JsonLd
        id="schema-privacy"
        nodes={[
          {
            '@type': 'WebPage',
            name: 'Privacy Policy — VM Music Factory',
            url: `${site.domain.replace(/\/+$/, '')}${ROUTES.privacy}`,
            dateModified: '2026-10-05',
            isPartOf: { '@id': `${site.domain.replace(/\/+$/, '')}/#website` },
            about: { '@id': `${site.domain.replace(/\/+$/, '')}/#studio` },
          },
          localBusinessSchema(),
          breadcrumbSchema(ROUTES.privacy, 'Privacy Policy'),
        ]}
      />

      <section className="page-head">
        <div className="container">
          <Breadcrumbs path={ROUTES.privacy} />
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="lede">
            How {site.name} handles the information you share when you call, WhatsApp or send an
            enquiry through this website. Last updated: {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <nav className="toc" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              <li>
                <a href="#who-we-are">Who we are</a>
              </li>
              <li>
                <a href="#what-we-collect">What we collect</a>
              </li>
              <li>
                <a href="#what-we-dont">What this website does not do</a>
              </li>
              <li>
                <a href="#third-parties">Third-party services</a>
              </li>
              <li>
                <a href="#how-we-use">How we use your information</a>
              </li>
              <li>
                <a href="#retention">How long we keep information</a>
              </li>
              <li>
                <a href="#your-rights">Your choices and rights</a>
              </li>
              <li>
                <a href="#children">Children</a>
              </li>
              <li>
                <a href="#changes">Changes to this policy</a>
              </li>
              <li>
                <a href="#contact-privacy">Contact us</a>
              </li>
            </ol>
          </nav>

          <article className="prose">
            <h2 id="who-we-are">1. Who we are</h2>
            <p>
              {site.name} is a music recording studio located at {fullAddress || `${site.address.locality}, ${site.address.city}, ${site.address.region}, India`}.
              In this policy, “we”, “us” and “the studio” mean {site.name}; “you” means anyone who
              contacts the studio or uses this website.
            </p>
            <p>
              You can reach us for anything related to this policy on{' '}
              <a href={links.call}>{phone.display}</a> (call or WhatsApp).
            </p>

            <h2 id="what-we-collect">2. What we collect</h2>
            <p>
              This website has no account system, no checkout and no newsletter. The only personal
              information we receive is what you choose to give us directly:
            </p>
            <ul>
              <li>
                <strong>Contact details you send us</strong> — your name and phone number when you
                call or message the studio on WhatsApp.
              </li>
              <li>
                <strong>Project information</strong> — details you share about your song, dubbing
                project, karaoke booking or event, and any files (voice notes, references, stems)
                you send for review or production.
              </li>
              <li>
                <strong>Booking records</strong> — session dates, notes and invoices kept for studio
                administration and accounting.
              </li>
            </ul>
            <p>
              The enquiry form on the{' '}
              <Link to={ROUTES.contact}>contact page</Link> does not store anything on this website.
              It simply prepares a message and opens WhatsApp with the studio number, so your
              enquiry is delivered to us by WhatsApp under WhatsApp's own terms and privacy policy.
            </p>

            <h2 id="what-we-dont">3. What this website does not do</h2>
            <ul>
              <li>No advertising or cross-site tracking cookies are set.</li>
              <li>No third-party analytics scripts are installed on this website.</li>
              <li>No payment card details are collected or processed here.</li>
              <li>
                The Google Map on the contact page is <em>not</em> loaded until you choose to load
                it, so Google receives no data from an idle page load.
              </li>
              <li>
                Fonts are self-hosted from our own domain — no requests are made to Google Fonts.
              </li>
            </ul>

            <h2 id="third-parties">4. Third-party services</h2>
            <p>
              A few services outside the studio's control help make this website and communication
              work. Each has its own privacy policy:
            </p>
            <ul>
              <li>
                <strong>WhatsApp (Meta)</strong> — when you message the studio, WhatsApp processes
                that conversation. Calling uses your telephone network.
              </li>
              <li>
                <strong>Google Maps / Google Business Profile</strong> — the map embed loads only
                after you click “Load the map”, and links to the studio's Google listing open inside
                Google.
              </li>
              <li>
                <strong>Google-hosted images</strong> — studio photographs served from the studio's
                Google Business profile are delivered by Google's image servers.
              </li>
              <li>
                <strong>Hosting provider</strong> — this website is hosted on a cloud platform
                (Vercel) which keeps standard technical server logs, such as IP address, browser
                type and requested pages, for security, performance and abuse prevention.
              </li>
            </ul>

            <h2 id="how-we-use">5. How we use your information</h2>
            <ul>
              <li>To answer your enquiry and quote for a session.</li>
              <li>To plan, run and deliver your recording, dubbing, karaoke or production work.</li>
              <li>To keep studio records, invoices and accounting entries where required.</li>
              <li>
                To follow up on a project you have discussed with us, on the number you contacted us
                from.
              </li>
            </ul>
            <p>
              We do not sell, rent or trade your personal information. We share it only where
              necessary to deliver what you asked for (for example, with a session musician, mixing
              engineer or cloud storage provider working on your project), or where the law
              requires it.
            </p>

            <h2 id="retention">6. How long we keep information</h2>
            <p>
              Enquiry conversations are kept while your project is active and for a reasonable
              period afterwards, so we can support re-mixes or follow-ups. Project files are stored
              for a limited period and are archived or deleted as studio storage needs change —
              please keep your own backup of your final master. Accounting records are kept for as
              long as tax law requires.
            </p>

            <h2 id="your-rights">7. Your choices and rights</h2>
            <p>
              You can ask us what information we hold about you, ask for corrections, or ask us to
              delete information we no longer need. Send the request on WhatsApp or by phone to{' '}
              <a href={links.call}>{phone.display}</a> and we will act on it. You can also stop
              messages at any time by telling us, or by blocking the WhatsApp number.
            </p>

            <h2 id="children">8. Children</h2>
            <p>
              This website is intended for adults enquiring about studio services. Where a session
              involves a minor, a parent or guardian should make the booking and stay for the
              session.
            </p>

            <h2 id="changes">9. Changes to this policy</h2>
            <p>
              If this policy changes, the updated version will be published on this page with a new
              “last updated” date.
            </p>

            <h2 id="contact-privacy">10. Contact us</h2>
            <p>
              Questions about privacy? Call or WhatsApp <a href={links.call}>{phone.display}</a>, or
              see the <Link to={ROUTES.contact}>contact page</Link> for the studio address and map.
              Booking terms are explained in our{' '}
              <Link to={ROUTES.terms}>Terms &amp; Conditions</Link>.
            </p>
          </article>

          <p className="prose-note">
            This policy describes how the studio website operates today. If the studio later adds
            analytics, a booking system, online payments or advertising, this page must be updated
            before those features go live.
          </p>
        </div>
      </section>
    </>
  );
}
