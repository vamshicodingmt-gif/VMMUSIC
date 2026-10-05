import { Link, NAV_ITEMS } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import { site, phone } from '../data/site.js';
import { WhatsAppButton, CallButton } from '../components/ContactActions.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';

/**
 * 404. Marked `noindex, follow` so the page never appears in search results
 * (and it is deliberately kept out of the sitemap).
 */
export default function NotFound() {
  return (
    <>
      <Seo
        noindex
        title={`Page not found | ${site.name}`}
        description={`The page you were looking for does not exist. Browse the ${site.name} website or call the studio on ${phone.display}.`}
      />

      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Error 404</p>
          <h1>That page has moved off the console</h1>
          <p className="lede">
            The page you were looking for is not here. Try one of the links below — or just call the
            studio, that always works.
          </p>
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <WhatsAppButton label="WhatsApp us" />
            <CallButton label={`Call ${phone.display}`} variant="ghost" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {NAV_ITEMS.map((item) => (
              <Link className="card card--hover" key={item.to} to={item.to}>
                <h3>{item.label}</h3>
                <p>
                  <span className="link-arrow">
                    Go to {item.label} <ArrowRightIcon size={16} />
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
