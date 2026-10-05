import { phone, links } from '../data/site.js';
import { PhoneIcon, WhatsAppIcon, MapPinIcon } from './Icons.jsx';

/**
 * The two primary contact actions — a call button and a WhatsApp button — both
 * pointing at the SAME number: +91 95133 45544. Rendered as real <a> elements
 * so they work without JavaScript and are crawlable.
 */

export function CallButton({ className = '', label, size, block = false, variant = 'primary' }) {
  return (
    <a
      className={`btn btn--${variant} ${block ? 'btn--block' : ''} ${className}`.trim()}
      href={links.call}
      data-action="call"
      aria-label={`Call VM Music Factory on ${phone.display}`}
    >
      <PhoneIcon size={size || 18} />
      {label !== null && <span>{label || `Call ${phone.display}`}</span>}
    </a>
  );
}

export function WhatsAppButton({
  className = '',
  label,
  size,
  block = false,
  variant = 'whatsapp',
  message,
}) {
  const href = message
    ? `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(message)}`
    : links.whatsapp;

  return (
    <a
      className={`btn btn--${variant} ${block ? 'btn--block' : ''} ${className}`.trim()}
      href={href}
      data-action="whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp VM Music Factory on ${phone.display}`}
    >
      <WhatsAppIcon size={size || 19} />
      {label !== null && <span>{label || 'WhatsApp us'}</span>}
    </a>
  );
}

export function DirectionsButton({ className = '', label = 'Get directions', variant = 'ghost' }) {
  return (
    <a
      className={`btn btn--${variant} ${className}`.trim()}
      href={links.maps}
      target="_blank"
      rel="noopener noreferrer"
      data-action="directions"
    >
      <MapPinIcon size={18} />
      <span>{label}</span>
    </a>
  );
}

/**
 * Floating action buttons — always reachable on mobile (thumb zone) and on
 * desktop. Same number for both actions, as requested.
 */
export function ContactFab() {
  return (
    <div className="fab-stack">
      <a
        className="fab fab--whatsapp"
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        data-action="whatsapp"
        aria-label={`WhatsApp VM Music Factory on ${phone.display}`}
      >
        <WhatsAppIcon size={22} />
        <span className="fab-label">WhatsApp</span>
      </a>
      <a
        className="fab fab--call"
        href={links.call}
        data-action="call"
        aria-label={`Call VM Music Factory on ${phone.display}`}
      >
        <PhoneIcon size={21} />
        <span className="fab-label">Call us</span>
      </a>
    </div>
  );
}

/** Inline "call or WhatsApp" pair used inside pages and cards. */
export function ContactPair({ className = '', compact = false }) {
  return (
    <div className={`btn-row ${className}`.trim()}>
      <WhatsAppButton
        label={compact ? 'WhatsApp' : 'WhatsApp us'}
        size={compact ? 17 : 19}
        className={compact ? 'btn--sm' : ''}
      />
      <CallButton
        label={compact ? 'Call' : 'Call us'}
        size={compact ? 16 : 18}
        variant="ghost"
        className={compact ? 'btn--sm' : ''}
      />
    </div>
  );
}

export default ContactFab;
