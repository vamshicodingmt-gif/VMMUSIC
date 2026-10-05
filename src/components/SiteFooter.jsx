import { Link, NAV_ITEMS, ROUTES } from '../router.jsx';
import { site, phone, links, fullAddress } from '../data/site.js';
import { hours } from '../data/hours.js';
import { services } from '../data/content.js';
import { PhoneIcon, WhatsAppIcon, MapPinIcon, ClockIcon } from './Icons.jsx';

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <h2>{site.name}</h2>
            <p>
              A state-of-the-art recording studio in RR Nagar, Bengaluru — song recording, film
              dubbing, karaoke, background score, mixing and mastering under one roof.
            </p>
            <ul className="footer-list" style={{ marginTop: '1rem' }}>
              <li>
                <a href={links.call}>
                  <PhoneIcon size={16} /> {phone.display}
                </a>
              </li>
              <li>
                <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={16} /> WhatsApp us
                </a>
              </li>
              <li>
                <a href={links.maps} target="_blank" rel="noopener noreferrer">
                  <MapPinIcon size={16} /> {site.address.locality}, {site.address.city}
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <h3>Explore</h3>
            <ul className="footer-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to={ROUTES.karaoke}>Karaoke Studio</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Studio services">
            <h3>Services</h3>
            <ul className="footer-list">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link to={`${ROUTES.services}#${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3>
              <ClockIcon size={14} /> Opening hours
            </h3>
            <div className="footer-hours">
              {hours.map((entry) => (
                <div key={entry.day}>
                  <span>{entry.day}</span>
                  <span>{entry.time}</span>
                </div>
              ))}
            </div>
            {fullAddress && <p className="muted" style={{ marginTop: '0.8rem' }}>{fullAddress}</p>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <Link to={ROUTES.privacy}>Privacy Policy</Link>
            <Link to={ROUTES.terms}>Terms &amp; Conditions</Link>
            <a href={links.reviews} target="_blank" rel="noopener noreferrer">
              Google reviews
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
