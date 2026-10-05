import { ImageIcon } from './Icons.jsx';

/**
 * Image frame with three important jobs:
 *  1. Accessibility  → real, descriptive `alt` text on every photo.
 *  2. Core Web Vitals → fixed aspect-ratio box (no CLS), `loading="lazy"`
 *     + `decoding="async"` for everything below the fold, `fetchpriority`
 *     high for the hero image.
 *  3. Honesty → an empty `src` renders a clearly labelled placeholder rather
 *     than a stock or generated photo. Nothing here is a fake image.
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
  const hasImage = Boolean(src);

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
        />
      ) : (
        <div className="media-placeholder" role="img" aria-label={alt}>
          <ImageIcon size={30} />
          <strong>{placeholderLabel}</strong>
          <span>{placeholderHint}</span>
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
