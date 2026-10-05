import { StarIcon, StarOutlineIcon } from './Icons.jsx';

/**
 * Star row for a review. Renders the ACTUAL number of stars awarded — the
 * rating passed in from `src/data/reviews.js` is never rounded up or faked.
 */
export default function Stars({ rating = 5, max = 5, size = 15, showLabel = true, label }) {
  const value = Math.max(0, Math.min(max, Number(rating) || 0));
  const filled = Math.round(value);

  return (
    <span className="review-stars">
      <span
        className="stars-row"
        role="img"
        aria-label={`Rated ${value} out of ${max} stars`}
      >
        {Array.from({ length: max }, (_, index) =>
          index < filled ? (
            <StarIcon key={index} size={size} />
          ) : (
            <StarOutlineIcon key={index} size={size} />
          ),
        )}
      </span>
      {showLabel && (
        <span className="stars-label">{label || `${value.toFixed(1)} / ${max}`}</span>
      )}
    </span>
  );
}
