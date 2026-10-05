import { useEffect, useRef, useState } from 'react';
import { Link, NAV_ITEMS, useRouter, ROUTES } from '../router.jsx';
import { site, phone, links } from '../data/site.js';
import { PhoneIcon, WhatsAppIcon } from './Icons.jsx';

export default function SiteHeader() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu, and the page behind it is locked while it is open
  // so the drawer never scrolls the content underneath on a phone.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`.trim()}>
      <div className="container header-inner">
        <Link className="brand" to={ROUTES.home} aria-label={`${site.name} — home`}>
          <span className="brand-mark" aria-hidden="true">
            VM
          </span>
          <span className="brand-text">
            <span className="brand-name">{site.name}</span>
            <span className="brand-sub">Recording Studio · Bengaluru</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              className="nav-link"
              to={item.to}
              aria-current={path === item.to ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="btn btn--ghost btn--sm"
            href={links.call}
            aria-label={`Call ${site.name} on ${phone.display}`}
          >
            <PhoneIcon size={16} />
            <span>Call</span>
          </a>
          <a
            className="btn btn--whatsapp btn--sm"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${site.name} on ${phone.display}`}
          >
            <WhatsAppIcon size={17} />
            <span>WhatsApp</span>
          </a>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div className="nav-drawer" id="mobile-menu">
          <div className="container">
            <ul className="nav-drawer-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    className="nav-drawer-link"
                    to={item.to}
                    aria-current={path === item.to ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="nav-drawer-link"
                  to={ROUTES.karaoke}
                  aria-current={path === ROUTES.karaoke ? 'page' : undefined}
                >
                  Karaoke Studio
                </Link>
              </li>
            </ul>
            <div className="nav-drawer-cta">
              <a className="btn btn--whatsapp btn--block" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={19} />
                <span>WhatsApp {phone.display}</span>
              </a>
              <a className="btn btn--primary btn--block" href={links.call}>
                <PhoneIcon size={18} />
                <span>Call {phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
