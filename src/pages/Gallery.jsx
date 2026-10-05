import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { GalleryGrid } from '../components/Gallery.jsx';
import { PageHead, SectionHead, CtaPanel } from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { gallerySections, allGalleryImages } from '../data/images.js';
import { sectionCopy } from '../data/content.js';
import { localBusinessSchema, breadcrumbSchema, imageGallerySchema } from '../data/schema.js';
import { InfoIcon, ArrowRightIcon } from '../components/Icons.jsx';

export default function Gallery() {
  const filled = allGalleryImages.filter((image) => image.src).length;
  const total = allGalleryImages.length;

  return (
    <>
      <Seo path={ROUTES.gallery} />
      <JsonLd
        id="schema-gallery"
        nodes={[localBusinessSchema(), breadcrumbSchema(ROUTES.gallery, 'Gallery'), imageGallerySchema()]}
      />

      <PageHead
        breadcrumbs={<Breadcrumbs path={ROUTES.gallery} />}
        eyebrow={sectionCopy.gallery.eyebrow}
        title={sectionCopy.gallery.title}
        lede={sectionCopy.gallery.lede}
      />

      {/* Two gallery sections, ten slots each = 20 photo spaces */}
      {gallerySections.map((section, index) => (
        <section
          className={`section ${index % 2 === 1 ? 'section--surface' : ''}`.trim()}
          key={section.id}
          id={section.id}
        >
          <div className="container">
            <SectionHead eyebrow={section.eyebrow} title={section.title} lede={section.description} />

            {filled === 0 && index === 0 && (
              <div className="notice" style={{ marginBottom: '1.75rem' }}>
                <InfoIcon size={18} />
                <span>
                  The photo slots below are ready and waiting. Send the studio photo links (or drop
                  the files in <code>public/images/</code>) and they appear here automatically — the
                  layout, captions, alt text and lightbox are already wired up. No stock photos are
                  used anywhere on this site.
                </span>
              </div>
            )}

            <GalleryGrid images={section.images} idPrefix={section.id} />

            <div className="btn-row" style={{ marginTop: '1.75rem' }}>
              <p className="form-note" style={{ margin: 0 }}>
                {section.images.filter((image) => image.src).length} of {section.images.length} photos
                added in this section
                {filled > 0 ? ` · ${filled} of ${total} across the gallery` : ''}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <CtaPanel
            eyebrow="See it in person"
            title="Photos only tell half the story"
            text="The rooms sound better than they photograph. Book a slot, walk in, and hear your own voice on studio monitors."
          />
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <Link className="link-arrow" to={ROUTES.reviews}>
              Read what clients say about recording here <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
