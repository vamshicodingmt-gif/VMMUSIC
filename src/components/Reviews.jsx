import Stars from './Stars.jsx';
import { reviews, reviewsMeta } from '../data/reviews.js';
import { site, links } from '../data/site.js';
import { GoogleIcon, ExternalLinkIcon, CheckIcon } from './Icons.jsx';
import { WhatsAppButton } from './ContactActions.jsx';

/** Two-letter monogram for the reviewer avatar (no fake profile photos). */
export function initials(name = '') {
  return name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/**
 * One Google review — reproduced word for word, with the exact star rating the
 * reviewer gave. Nothing is paraphrased and no review is invented.
 */
export function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <header className="review-head">
        <span className="reviewer-avatar" aria-hidden="true">
          {initials(review.author)}
        </span>
        <span className="reviewer-meta">
          <span className="reviewer-name">{review.author}</span>
          {review.badge && <span className="reviewer-badge">{review.badge}</span>}
        </span>
      </header>

      <Stars rating={review.rating} label={`${review.rating} / 5`} />

      <p className="review-text">{review.text}</p>

      {review.truncated && (
        <p className="form-note" style={{ margin: 0 }}>
          Google cuts this review off behind “More” — we publish the same visible text, nothing
          added.
        </p>
      )}

      {review.ownerResponse && (
        <div className="owner-response">
          <strong>Response from the owner</strong>
          {review.ownerResponse.text}
          {review.ownerResponse.relativeDate ? ` — ${review.ownerResponse.relativeDate}` : ''}
        </div>
      )}

      <footer className="review-foot">
        <span className="review-google">
          <GoogleIcon size={16} /> Found on Google
        </span>
        <span>
          {review.relativeDate}
          {review.likes ? ` · ${review.likes} like${review.likes > 1 ? 's' : ''}` : ''}
        </span>
      </footer>
    </article>
  );
}

/**
 * Review summary band: the real Google score, the number of reviews shown, a
 * link to the listing and the two contact actions.
 */
export function ReviewSummary() {
  return (
    <div className="review-summary">
      <div className="review-score">
        <span className="review-score-value">{reviewsMeta.averageRating.toFixed(1)}</span>
        <Stars rating={reviewsMeta.averageRating} showLabel={false} size={16} />
        <span className="review-score-of">Google rating</span>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.4rem' }}>
          {reviews.length} real reviews from the {site.name} Google listing
        </h3>
        <p>
          Every review on this page was left publicly on Google by a client of the studio. Ratings
          and wording are unchanged — including the reviews Google truncates behind “More”. Read
          them on the listing, or ask us anything on WhatsApp before you book.
        </p>
      </div>

      <div className="btn-row" style={{ flexDirection: 'column', minWidth: 'min(100%, 220px)' }}>
        <a className="btn btn--ghost" href={links.reviews} target="_blank" rel="noopener noreferrer">
          <GoogleIcon size={18} />
          <span>See on Google</span>
          <ExternalLinkIcon size={15} />
        </a>
        <WhatsAppButton label="WhatsApp us" />
      </div>
    </div>
  );
}

/** Full reviews block: summary + every review card + an honesty note. */
export default function ReviewsSection({ limit }) {
  const list = typeof limit === 'number' ? reviews.slice(0, limit) : reviews;

  return (
    <div className="flow">
      <ReviewSummary />

      <div className="reviews-grid">
        {list.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="notice">
        <CheckIcon size={18} />
        <span>
          Reviews are published exactly as they appear on Google. No review on this site is written
          by us, and every star count matches the original rating.
        </span>
      </div>
    </div>
  );
}
