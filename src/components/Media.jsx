import { useState } from 'react';
import { ImageIcon } from './Icons.jsx';

/**
 * Image frame with four jobs:
 *
 *  1. Accessibility   → a real, descriptive `alt` on every photo; an empty
 *                       `src` renders a labelled placeholder instead of a
 *                       stock/generated photo. Nothing here is faked.
 *  2. Core Web Vitals → fixed aspect-ratio box (no layout shift), `loading`,
 *                       `decoding` and `fetchpriority` set per position.
 *  3. Resilience      → if a remote photo fails to load (expired Google link,
 *                       hot-link protection, offline), the frame falls back to
 *                       the placeholder instead of showing a broken image.
 *  4. Layout          → optional caption + arbitrary overlay children.
 */
export default function Media({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  ratio = '4x3',
  caption,
  priority = false,
  className = '',
  placeholderLabel = 'Image slot',
  placeholderHint = 'Add the studio photo link in src/data/images.js',
  figure = true,
  children,
}) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(src) && !failed;

  const frame = (
    <div className={`media media--${ratio} ${className}`.trim()}>
      {hasImage ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="media-placeholder" role="img" aria-label={alt}>
          <ImageIcon size={30} />
          <strong>{failed ? 'Photo could not be loaded' : placeholderLabel}</strong>
          <span>
            {failed
              ? 'The image link is unavailable right now — the studio photo will appear here once it is replaced.'
              : placeholderHint}
          </span>
        </div>
      )}
      {children}
    </div>
  );

  if (!figure) return frame;

  return (
    <figure className="media-wrapper">
      {frame}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
