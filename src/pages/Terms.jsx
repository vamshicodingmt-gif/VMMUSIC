import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { localBusinessSchema, breadcrumbSchema } from '../data/schema.js';
import { site, phone, links, fullAddress } from '../data/site.js';

const LAST_UPDATED = '5 October 2026';
const SITE_URL = site.domain.replace(/\/+$/, '');

export default function Terms() {
  return (
    <>
      <Seo path={ROUTES.terms} />
      <JsonLd
        id="schema-terms"
        nodes={[
          {
            '@type': 'WebPage',
            name: 'Terms & Conditions — VM Music Factory',
            url: `${SITE_URL}${ROUTES.terms}`,
            dateModified: '2026-10-05',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#studio` },
          },
          localBusinessSchema(),
          breadcrumbSchema(ROUTES.terms, 'Terms & Conditions'),
        ]}
      />

      <section className="page-head">
        <div className="container">
          <Breadcrumbs path={ROUTES.terms} />
          <p className="eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="lede">
            The terms that apply to studio bookings, session time and the use of this website. Last
            updated: {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <nav className="toc" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              <li>
                <a href="#acceptance">Acceptance of these terms</a>
              </li>
              <li>
                <a href="#bookings">Bookings and confirmation</a>
              </li>
              <li>
                <a href="#session">Session time and studio rules</a>
              </li>
              <li>
                <a href="#charges">Charges and payment</a>
              </li>
              <li>
                <a href="#cancellations">Rescheduling and cancellations</a>
              </li>
              <li>
                <a href="#delivery">Recordings, files and delivery</a>
              </li>
              <li>
                <a href="#ip">Ownership and portfolio use</a>
              </li>
              <li>
                <a href="#website">Website content and third-party links</a>
              </li>
              <li>
                <a href="#reviews">Reviews published on this site</a>
              </li>
              <li>
                <a href="#liability">Limitation of liability</a>
              </li>
              <li>
                <a href="#law">Governing law</a>
              </li>
              <li>
                <a href="#changes-terms">Changes to these terms</a>
              </li>
              <li>
                <a href="#contact-terms">Contact</a>
              </li>
            </ol>
          </nav>

          <article className="prose">
            <h2 id="acceptance">1. Acceptance of these terms</h2>
            <p>
              By booking a session, entering the studio or using this website, you agree to these
              terms. If you are booking on behalf of a band, production house, agency or company,
              you confirm you are authorised to accept them for that organisation. Project-specific
              terms — deliverables, timelines, advance amounts and usage rights — are confirmed in
              writing (usually on WhatsApp) before the session begins, and those confirmations take
              precedence over this page for that project.
            </p>

            <h2 id="bookings">2. Bookings and confirmation</h2>
            <p>
              Sessions are booked by phone or WhatsApp on{' '}
              <a href={links.call}>{phone.display}</a>. A slot is held only once both sides have
              confirmed the date and time in writing. Tell us in advance about the type of session
              (song recording, dubbing, karaoke, mixing, background score), the number of people
              attending and any specific equipment or file requirements, so the room can be prepared.
            </p>

            <h2 id="session">3. Session time and studio rules</h2>
            <ul>
              <li>Please arrive at the agreed start time; session time is counted from that time.</li>
              <li>
                Treat microphones, instruments, computers and the acoustic treatment with care. Any
                damage caused by misuse is chargeable at repair or replacement cost.
              </li>
              <li>
                Smoking, alcohol and outside food are not permitted in the recording rooms unless
                the studio has agreed otherwise in writing.
              </li>
              <li>
                The studio may pause or end a session if a person is behaving in a way that risks
                equipment, the session or other people. In that case charges already incurred remain
                payable.
              </li>
              <li>
                Please keep phones on silent while recording. The engineer will tell you when it is a
                good time to take photos or record video.
              </li>
            </ul>

            <h2 id="charges">4. Charges and payment</h2>
            <p>
              Studio charges depend on the service, duration, number of songs or dubbing hours, the
              number of people and whether mixing, mastering or editing is included. You will be told
              the charges before the session is confirmed, and any advance required to hold a slot
              will be communicated at the same time. Additional hours, extra revisions or additional
              deliverables requested later may be charged separately.
            </p>

            <h2 id="cancellations">5. Rescheduling and cancellations</h2>
            <p>
              Plans change — tell us as early as you can, whether it is hours or days before the
              session, so the slot can be released to someone else. Where an advance was paid, the
              studio will discuss how it can be used for a rescheduled session. Repeated no-shows or
              cancellations at short notice may affect future bookings or advances.
            </p>

            <h2 id="delivery">6. Recordings, files and delivery</h2>
            <ul>
              <li>
                Delivery timelines for mixing, mastering or scored output depend on the scope of the
                project; the studio will indicate an expected timeline when the work is booked.
              </li>
              <li>
                Always keep your own backup of final masters and delivered files. Studio storage is
                limited and project files may be archived or deleted after a period.
              </li>
              <li>
                Raw multitracks or project sessions are provided only if agreed in writing at the
                time of booking.
              </li>
            </ul>

            <h2 id="ip">7. Ownership and portfolio use</h2>
            <p>
              Your song, lyrics, composition, performance and other creative material remain yours.
              Once the agreed charges for a commissioned work are fully paid, the master recording
              produced for you is delivered to you for use as agreed. Unless you tell us in writing
              that you do not want it published, the studio may include excerpts of completed work in
              its own portfolio — this website's gallery, social media and showreels — and may
              credit the work to the artists and technicians involved. The studio's own name, logo
              and website content may not be copied or reused without written permission.
            </p>

            <h2 id="website">8. Website content and third-party links</h2>
            <p>
              The information on this website — services, timings, location and general studio
              details — is provided in good faith and updated as things change. Links to Google
              Maps, the studio's Google Business Profile and social platforms lead to third-party
              services that have their own terms and privacy policies; the studio is not responsible
              for those services or their content.
            </p>

            <h2 id="reviews">9. Reviews published on this site</h2>
            <p>
              Reviews shown on the <Link to={ROUTES.reviews}>reviews page</Link> are public Google
              reviews of {site.name}, reproduced word for word with the star rating each reviewer
              gave. They are opinions of individual clients, not promises or guarantees by the
              studio, and they do not replace the terms agreed for your own project.
            </p>

            <h2 id="liability">10. Limitation of liability</h2>
            <p>
              The studio takes reasonable care of equipment, files and premises, but is not liable
              for indirect or consequential losses — for example lost profits, missed release dates
              or opportunities. Please do not leave valuables unattended; the studio is not
              responsible for personal belongings. Nothing in these terms limits liability that
              cannot be limited under applicable law.
            </p>

            <h2 id="law">11. Governing law</h2>
            <p>
              These terms are governed by the laws of India. The courts at {site.address.city},{' '}
              {site.address.region} have exclusive jurisdiction over any dispute arising from them.
            </p>

            <h2 id="changes-terms">12. Changes to these terms</h2>
            <p>
              These terms may be updated to reflect how the studio works. The current version is
              always published on this page with a new “last updated” date.
            </p>

            <h2 id="contact-terms">13. Contact</h2>
            <p>
              Questions about these terms, or about a booking? Call or WhatsApp{' '}
              <a href={links.call}>{phone.display}</a>, or write to us at{' '}
              {fullAddress || `${site.address.locality}, ${site.address.city}, ${site.address.region}`}
              . See also our <Link to={ROUTES.privacy}>Privacy Policy</Link>.
            </p>
          </article>

          <p className="prose-note">
            These terms describe standard studio practice. The studio should confirm the commercial
            specifics (advance amounts, revision limits, usage rights and file-retention periods)
            before this page is relied on for a large project.
          </p>
        </div>
      </section>
    </>
  );
}
