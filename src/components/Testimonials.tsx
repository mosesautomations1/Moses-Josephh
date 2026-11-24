import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Quote,
  Star,
  X,
} from 'lucide-react';
import { BRAND } from '../data/brand';
import {
  FIVERR_SUMMARY,
  VERIFIED_FIVERR_REVIEWS,
  type TestimonialEntry,
} from '../data/testimonials';

type ViewMode = 'featured' | 'screenshots';

export function Testimonials() {
  const [viewMode, setViewMode] = useState<ViewMode>('featured');
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxReview, setLightboxReview] = useState<TestimonialEntry | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  const current = VERIFIED_FIVERR_REVIEWS[activeIndex] ?? VERIFIED_FIVERR_REVIEWS[0];

  useEffect(() => {
    if (!lightboxReview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxReview(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxReview]);

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + VERIFIED_FIVERR_REVIEWS.length) % VERIFIED_FIVERR_REVIEWS.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % VERIFIED_FIVERR_REVIEWS.length);
  };

  const markImageFailed = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const renderScreenshot = (review: TestimonialEntry) => {
    const isFailed = failedImages[review.id];
    if (isFailed) {
      return (
        <div className="rounded-xl bg-[#071426] border border-white/10 p-6 text-center">
          <p className="text-sm font-medium text-white">{review.clientName}</p>
          <p className="mt-1 text-xs text-[#DCE5F0]/75">
            {review.serviceCategory} · {review.rating}.0 Fiverr Review
          </p>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setLightboxReview(review)}
        aria-label={`Enlarge Fiverr review screenshot from ${review.clientName}`}
        className="group relative block w-full text-left rounded-xl bg-white p-2 sm:p-3 border border-white/15 shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
      >
        <img
          src={review.screenshotSrc}
          alt={review.screenshotAlt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => markImageFailed(review.id)}
          className="w-full h-auto block rounded-lg"
        />
        <span className="mt-2.5 flex items-center justify-between gap-3 px-1 text-xs sm:text-sm font-bold text-[#0B1D38]">
          <span>
            Verified Fiverr Screenshot · {review.clientName} ({review.country})
          </span>
          <span className="inline-flex items-center gap-1 text-[#1677FF] font-extrabold whitespace-nowrap shrink-0">
            <Maximize2 className="w-4 h-4" aria-hidden="true" />
            <span>View Full Size</span>
          </span>
        </span>
      </button>
    );
  };

  return (
    <section id="testimonials" className="relative scroll-mt-20 py-20 md:py-28 bg-[#071426]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
              Client Testimonials
            </p>
            <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
              Trusted by Clients. Built with Purpose.
            </h2>
            <p className="mt-4 text-base sm:text-lg font-semibold text-[#DCE5F0] leading-relaxed">
              Verified 5.0-star client reviews directly from Fiverr — featuring ongoing
              collaborations with international clients across Skool setup, strategy, and email
              automation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div
              role="tablist"
              aria-label="Testimonials display mode"
              className="inline-flex items-center p-1 rounded-lg bg-[#0B1D38] border border-white/15"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'featured'}
                onClick={() => setViewMode('featured')}
                className={`px-3.5 py-2 rounded-md text-sm font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] ${
                  viewMode === 'featured'
                    ? 'bg-[#1677FF] text-white'
                    : 'text-[#DCE5F0] hover:text-white'
                }`}
              >
                Featured Reviews
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'screenshots'}
                onClick={() => setViewMode('screenshots')}
                className={`px-3.5 py-2 rounded-md text-sm font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] ${
                  viewMode === 'screenshots'
                    ? 'bg-[#1677FF] text-white'
                    : 'text-[#DCE5F0] hover:text-white'
                }`}
              >
                All Fiverr Screenshots (5)
              </button>
            </div>

            <a
              href={BRAND.fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm font-bold whitespace-nowrap shrink-0 transition-colors shadow-[0_10px_24px_rgba(22,119,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
            >
              <span>Read My Fiverr Reviews</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Verified Fiverr Rating Summary Line */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 pb-6 border-b border-white/10 text-sm sm:text-base font-bold text-[#DCE5F0]">
          <div className="inline-flex items-center gap-2 text-white font-extrabold">
            <div className="flex items-center gap-0.5 text-[#65A9FF]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-mono-tabular">{FIVERR_SUMMARY.overallRating}</span>
            <span className="text-[#DCE5F0] font-semibold">
              ({FIVERR_SUMMARY.totalReviews} Verified Fiverr Reviews)
            </span>
          </div>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
          <span>{FIVERR_SUMMARY.repeatClientsLabel}</span>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
          <span>Avg. Response Time: {FIVERR_SUMMARY.responseTime}</span>
        </div>

        {viewMode === 'featured' ? (
          <div className="mt-8 rounded-2xl bg-[#0B1D38] border border-white/10 p-6 sm:p-10 lg:p-12">
            {/* Top Controls & Selector Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Quote className="w-9 h-9 text-[#1677FF]/85 shrink-0" aria-hidden="true" />
                <div className="flex items-center gap-1 text-[#65A9FF]" aria-label="5 out of 5 stars">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                  <span className="ml-1.5 font-mono-tabular text-xs font-semibold text-white">
                    {current.rating}.0
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-lg bg-[#071426] border border-white/15 hover:border-[#65A9FF]/60 flex items-center justify-center text-[#DCE5F0] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-lg bg-[#071426] border border-white/15 hover:border-[#65A9FF]/60 flex items-center justify-center text-[#DCE5F0] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active Review Content + Original Fiverr Screenshot Proof */}
            <div className="mt-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="font-display text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-relaxed max-w-4xl">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  <div className="mt-7 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-display font-extrabold text-lg text-white">
                        {current.clientName}
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-[#DCE5F0]">
                        {current.country} · {current.serviceCategory} · {current.duration} ·{' '}
                        {current.timeframe}
                      </p>
                    </div>

                    <span className="text-sm font-bold text-[#65A9FF] whitespace-nowrap shrink-0">
                      {current.collaborationStatus} · Verified Fiverr Order
                    </span>
                  </div>

                  {/* Direct Original Fiverr Screenshot Proof */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    {renderScreenshot(current)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Direct Client Order Tabs */}
            <div className="mt-7 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {VERIFIED_FIVERR_REVIEWS.map((review, idx) => (
                  <button
                    key={review.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] ${
                      idx === activeIndex
                        ? 'bg-[#1677FF] text-white'
                        : 'bg-[#071426] border border-white/10 text-[#DCE5F0] hover:text-white hover:border-[#65A9FF]/40'
                    }`}
                  >
                    {review.tabLabel}
                  </button>
                ))}
              </div>
              <span className="font-mono-tabular text-sm font-bold text-[#DCE5F0] whitespace-nowrap shrink-0">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(VERIFIED_FIVERR_REVIEWS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        ) : (
          /* All 5 Verified Fiverr Screenshots Gallery */
          <div className="mt-8 grid grid-cols-1 gap-6">
            {VERIFIED_FIVERR_REVIEWS.map((review, index) => (
              <article
                key={review.id}
                className="rounded-2xl bg-[#0B1D38] border border-white/10 p-5 sm:p-7"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="text-sm text-white font-semibold">
                    <span className="font-mono-tabular text-[#65A9FF] mr-2">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>{review.clientName}</span>
                    <span className="text-[#DCE5F0]/60 font-normal">
                      {' '}
                      · {review.country} · {review.serviceCategory} · {review.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#65A9FF] font-medium whitespace-nowrap shrink-0">
                    <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span>
                      {review.rating}.0 · {review.collaborationStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-4">{renderScreenshot(review)}</div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Full-Size Screenshot Lightbox */}
      {lightboxReview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fiverr-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B16]/90 backdrop-blur-md"
          onClick={() => setLightboxReview(null)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl bg-[#0B1D38] border border-white/15 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 id="fiverr-lightbox-title" className="font-display font-bold text-base sm:text-lg text-white">
                  {lightboxReview.clientName} · {lightboxReview.country}
                </h3>
                <p className="text-xs text-[#DCE5F0]/75 mt-0.5">
                  {lightboxReview.serviceCategory} · {lightboxReview.duration} ·{' '}
                  {lightboxReview.priceRange} · {lightboxReview.timeframe}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxReview(null)}
                aria-label="Close Fiverr review screenshot"
                className="w-10 h-10 rounded-lg bg-[#071426] border border-white/15 flex items-center justify-center text-[#DCE5F0] hover:text-white shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-white p-3 sm:p-5 overflow-auto max-h-[75vh]">
              <img
                src={lightboxReview.screenshotSrc}
                alt={lightboxReview.screenshotAlt}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#DCE5F0]/80">
              <span>{lightboxReview.collaborationStatus} on Fiverr</span>
              <a
                href={BRAND.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#65A9FF] hover:text-white transition-colors"
              >
                <span>Verify on Fiverr Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
