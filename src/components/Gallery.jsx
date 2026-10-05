import { useCallback, useEffect, useRef, useState } from 'react';
import Media from './Media.jsx';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, ZoomIcon, GoogleIcon } from './Icons.jsx';

/**
 * Gallery grid + accessible lightbox.
 *
 * • Grid: CSS grid, responsive, captions overlaid, each photo a real button.
 * • Lightbox: Escape closes, ←/→ navigate, focus is moved in and restored,
 *   background scroll is locked, and the close button is always reachable.
 * • Empty slots (no `src`) render as labelled placeholders and are not
 *   clickable — they are never replaced with a stock photo.
 */
export function GalleryGrid({ images = [], idPrefix = 'gallery' }) {
  const items = images;
  const [activeIndex, setActiveIndex] = useState(-1);
  const isOpen = activeIndex >= 0;

  const withSrc = items.map((image, index) => ({ image, index })).filter(({ image }) => image.src);
  const lastFocused = useRef(null);

  const open = (index) => {
    lastFocused.current = document.activeElement;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    setActiveIndex(-1);
    if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
  }, []);

  const step = useCallback(
    (direction) => {
      setActiveIndex((current) => {
        const position = withSrc.findIndex((entry) => entry.index === current);
        if (position === -1) return current;
        const next = (position + direction + withSrc.length) % withSrc.length;
        return withSrc[next].index;
      });
    },
    [withSrc],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const active = isOpen ? items[activeIndex] : null;

  return (
    <>
      <div className="gallery-grid">
        {items.map((image, index) => {
          const isWide = index % 7 === 0;
          const isTall = index % 5 === 3;

          return (
            <figure
              key={image.id || index}
              className={[
                'gallery-item',
                !image.src && withSrc.length === 0 ? 'gallery-item--placeholder' : '',
                isWide ? 'gallery-item--wide' : '',
                isTall ? 'gallery-item--tall' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {image.src ? (
                <button
                  type="button"
                  className="gallery-trigger"
                  onClick={() => open(index)}
                  aria-label={`Open larger view: ${image.alt}`}
                >
                  <Media
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes={image.sizes || '(max-width: 680px) 50vw, (max-width: 1020px) 33vw, 25vw'}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    ratio={isTall ? 'portrait' : isWide ? '16x9' : '4x3'}
                    figure={false}
                  >
                    <span className="gallery-zoom" aria-hidden="true">
                      <ZoomIcon size={18} />
                    </span>
                  </Media>
                </button>
              ) : (
                <Media
                  alt={image.alt}
                  ratio="4x3"
                  placeholderLabel={image.caption || 'Studio photo'}
                  placeholderHint="Studio photo coming soon — the slot is ready."
                  figure={false}
                />
              )}
              {image.src && <figcaption>{image.caption || image.alt}</figcaption>}
            </figure>
          );
        })}
      </div>

      {isOpen && active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${withSrc.findIndex((entry) => entry.index === activeIndex) + 1} of ${withSrc.length}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="lightbox-bar">
            <span>
              {withSrc.findIndex((entry) => entry.index === activeIndex) + 1} / {withSrc.length}
            </span>
            <button type="button" className="lightbox-close" onClick={close} aria-label="Close photo viewer">
              <CloseIcon size={20} />
            </button>
          </div>

          <div className="lightbox-stage">
            <img src={active.src} srcSet={active.srcSet} sizes="92vw" alt={active.alt} decoding="async" />
          </div>

          <div className="lightbox-foot">
            <button type="button" className="lightbox-nav" onClick={() => step(-1)} aria-label="Previous photo">
              <ChevronLeftIcon size={20} />
            </button>
            <p>{active.caption || active.alt}</p>
            <button type="button" className="lightbox-nav" onClick={() => step(1)} aria-label="Next photo">
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Two-block strip used for review photos / screenshots. */
export function ReviewPhotoStrip({ images = [], title }) {
  const hasAny = images.some((image) => image.src);

  return (
    <div className="stack">
      {title && <h3>{title}</h3>}
      <div className="review-photo-grid">
        {images.map((image) => (
          <figure key={image.id} className="review-photo">
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                width={image.width || 800}
                height={image.height || 600}
              />
            ) : (
              <div className="media-placeholder" role="img" aria-label={image.alt}>
                <GoogleIcon size={22} />
                <strong>{image.caption || 'Review image'}</strong>
                <span>Reserved slot — the screenshot or session photo goes here.</span>
              </div>
            )}
          </figure>
        ))}
      </div>
      {!hasAny && (
        <p className="form-note">
          Reserved slots for Google review screenshots and session photos — they fill in
          automatically once the images are added.
        </p>
      )}
    </div>
  );
}

export default GalleryGrid;
