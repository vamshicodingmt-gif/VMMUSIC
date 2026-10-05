import { Link, ROUTES } from '../router.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import ReviewsSection from '../components/Reviews.jsx';
import { ReviewPhotoStrip } from '../components/Gallery.jsx';
import { PageHead, SectionHead, CtaPanel } from '../components/Blocks.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { reviewsMeta } from '../data/reviews.js';
import { sectionCopy } from '../data/content.js';
import { reviewHighlightSlots, reviewMomentSlots } from '../data/images.js';
import { localBusinessSchema, breadcrumbSchema, reviewPageSchema } from '../data/schema.js';
import { ArrowRightIcon } from '../components/Icons.jsx';

export default function Reviews() {
  return (
    <>
      <Seo path={ROUTES.reviews} />
      <JsonLd
        id="schema-reviews"
        nodes={[
          reviewPageSchema(),
          localBusinessSchema({ withReviews: true }),
          breadcrumbSchema(ROUTES.reviews, 'Reviews'),
        ]}
      />

      <PageHead
        breadcrumbs={<Breadcrumbs path={ROUTES.reviews} />}
        eyebrow={sectionCopy.reviews.eyebrow}
        title={sectionCopy.reviews.title}
        lede={sectionCopy.reviews.lede}
      />

      <section className="section">
        <div className="container">
          <ReviewsSection />
        </div>
      </section>

      {/* Two blocks of review-image space, as requested */}
      <section className="section section--surface" id="review-photos">
        <div className="container">
          <SectionHead
            eyebrow="Review gallery · block one"
            title="Screenshots from the Google listing"
            lede="Screenshots of the reviews above — a visual record of what clients actually wrote, with the ratings they gave."
          />
          <ReviewPhotoStrip images={reviewHighlightSlots} />
        </div>
      </section>

      <section className="section" id="session-photos">
        <div className="container">
          <SectionHead
            eyebrow="Review gallery · block two"
            title="Sessions behind the reviews"
            lede="Photos from the dubbing, song and karaoke sessions those reviews are about."
          />
          <ReviewPhotoStrip images={reviewMomentSlots} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <CtaPanel
            eyebrow={`${reviewsMeta.averageRating.toFixed(1)} ★ on Google`}
            title="Add your review after your session"
            text="Recorded with us? A line on Google helps other musicians, film makers and first-timers find the studio."
          />
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <Link className="link-arrow" to={ROUTES.gallery}>
              See photos from the studio <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
