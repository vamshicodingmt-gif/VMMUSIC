import { useMemo, useState } from 'react';
import { site, phone, links } from '../data/site.js';
import { services } from '../data/content.js';
import { MapPinIcon, SendIcon, WhatsAppIcon, CheckIcon, ExternalLinkIcon } from './Icons.jsx';
import { CallButton, DirectionsButton } from './ContactActions.jsx';

/**
 * Enquiry form.
 *
 * There is no backend on purpose — a static Vercel site has nothing to post to,
 * and a fake "message sent" screen would be worse than useless. Instead the
 * form composes a perfectly formatted WhatsApp message and hands it to the
 * WhatsApp app/web with the studio number already filled in, so nothing is
 * lost and no server is required.
 */
export default function EnquiryForm({ compact = false }) {
  const [form, setForm] = useState({
    name: '',
    service: services[0].title,
    date: '',
    details: '',
  });
  const [touched, setTouched] = useState(false);

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const message = useMemo(() => {
    const lines = [
      `Hello ${site.name}! I would like to enquire about a studio session.`,
      form.name ? `Name: ${form.name}` : null,
      form.service ? `Service: ${form.service}` : null,
      form.date ? `Preferred date/time: ${form.date}` : null,
      form.details ? `Details: ${form.details}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  }, [form]);

  const waHref = `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(message)}`;
  const valid = form.name.trim().length > 1 && form.details.trim().length > 3;

  return (
    <form
      className="card"
      id="enquiry"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        if (!valid) return;
        window.open(waHref, '_blank', 'noopener');
      }}
      noValidate
    >
      <h3 style={{ marginBottom: '0.35rem' }}>Send an enquiry</h3>
      <p style={{ marginBottom: '1.25rem' }}>
        Fill this in and it opens WhatsApp with your message ready to send to {phone.display}. You
        can also simply call — both reach the same studio line.
      </p>

      <div className={`form-grid ${compact ? '' : 'form-grid--2'}`.trim()}>
        <div className="field">
          <label htmlFor="enquiry-name">Your name *</label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update('name')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && form.name.trim().length < 2}
          />
          {touched && form.name.trim().length < 2 && (
            <span className="field-hint" style={{ color: 'var(--gold)' }}>
              Please enter your name.
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="enquiry-service">What do you need?</label>
          <select id="enquiry-service" name="service" value={form.service} onChange={update('service')}>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="enquiry-date">Preferred date / time</label>
          <input
            id="enquiry-date"
            name="date"
            type="text"
            placeholder="e.g. this Saturday night, 9 pm"
            value={form.date}
            onChange={update('date')}
          />
          <span className="field-hint">The studio is open 24 hours, so night slots are fine.</span>
        </div>

        <div className="field">
          <label htmlFor="enquiry-details">Tell us about the project *</label>
          <textarea
            id="enquiry-details"
            name="details"
            required
            placeholder="Song recording, film dubbing, karaoke evening, background score…"
            value={form.details}
            onChange={update('details')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && form.details.trim().length < 4}
          />
        </div>
      </div>

      <div className="btn-row" style={{ marginTop: '1.25rem' }}>
        <button className="btn btn--whatsapp" type="submit">
          <WhatsAppIcon size={19} />
          <span>Continue on WhatsApp</span>
        </button>
        <CallButton label={`Call ${phone.display}`} variant="ghost" />
      </div>

      <p className="form-note" style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem' }}>
        <SendIcon size={16} />
        <span>
          Nothing is stored on this website — your message goes straight to the studio WhatsApp. We
          read every message and reply as soon as we are off the console.
        </span>
      </p>
    </form>
  );
}

/**
 * Google Map. The iframe is only created after the visitor asks for it, so an
 * idle page load never pays for Google Maps (Core Web Vitals) and no cookies
 * are set before consent. The address, phone and directions links are always
 * visible for anyone who does not want the embed.
 */
export function MapEmbed({ query = site.google.embedQuery, title = `${site.name} location map` }) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="map-embed">
      {loaded ? (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-placeholder">
          <MapPinIcon size={30} />
          <h3>VM Music Factory, {site.address.locality}</h3>
          <p style={{ maxWidth: '40ch', marginInline: 'auto' }}>
            Loading the interactive map contacts Google. Load it only if you want the embed, or open
            directions directly.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button className="btn btn--primary" type="button" onClick={() => setLoaded(true)}>
              <CheckIcon size={17} />
              <span>Load the map</span>
            </button>
            <a
              className="btn btn--ghost"
              href={links.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPinIcon size={17} />
              <span>Open in Google Maps</span>
              <ExternalLinkIcon size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export { DirectionsButton, CallButton };
