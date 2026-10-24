import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * HERO SLIDES
 * Using the best available elevation images for each project.
 * Banner headline intentionally separates brand story from project names —
 * the first slide IS the brand statement, subsequent slides are projects.
 */
const SLIDES = [
  // ── Slide 0: Brand — pure atmosphere, not tied to one project ──────────────
  {
    id:        'brand',
    image:     '/images/celestia-lg.jpg',
    imageWebp: '/images/celestia-lg.webp',
    alt:       'Premium residential architecture in Navi Mumbai',
    eyebrow:   'Premium Real Estate Partners · Navi Mumbai',
    headline:  'Where Commitment Meets\nExceptional Living',
    sub:       'Two decades of trusted expertise in residential and commercial real estate across Navi Mumbai.',
    href:      '/projects/',
    cta:       'Explore Our Portfolio',
    community: 'Navi Mumbai',
    // Brand slide uses a richer two-layer gradient for maximum impact
    isBrand:   true,
  },
  // ── Project slides ──────────────────────────────────────────────────────────
  {
    id:        'celestia',
    image:     '/images/celestia-lg.jpg',
    imageWebp: '/images/celestia-lg.webp',
    alt:       'Celestia — premium 3 & 4 BHK residences, Kharghar',
    eyebrow:   'Residential · Upcoming',
    headline:  'Celestia',
    sub:       '3 & 4 BHK residences. Kharghar, Navi Mumbai.',
    href:      '/projects/celestia/',
    cta:       'Explore Celestia',
    community: 'Kharghar',
    isBrand:   false,
  },
  {
    id:        'silver-crest',
    image:     '/images/silver-crest-lg.jpg',
    imageWebp: '/images/silver-crest-lg.webp',
    alt:       'Silver Crest — premium 2 & 3 BHK residences, Nerul',
    eyebrow:   'Residential · Upcoming',
    headline:  'Silver Crest',
    sub:       '2 & 3 BHK residences. Nerul, Navi Mumbai.',
    href:      '/projects/silver-crest/',
    cta:       'Explore Silver Crest',
    community: 'Nerul',
    isBrand:   false,
  },
  {
    id:        'trident',
    image:     '/images/trident-lg.jpg',
    imageWebp: '/images/trident-lg.webp',
    alt:       'Trident Elevation — commercial development, Mahape',
    eyebrow:   'Commercial · Ongoing',
    headline:  'Trident Elevation',
    sub:       'Premium offices & retail. Mahape MIDC, Navi Mumbai.',
    href:      '/projects/trident-elevation/',
    cta:       'Explore Trident',
    community: 'Mahape',
    isBrand:   false,
  },
  {
    id:        'hitech-cosmos',
    image:     '/images/hitech-cosmos-lg.jpg',
    imageWebp: '/images/hitech-cosmos-lg.webp',
    alt:       'Hitech Cosmos — residential development, Kharghar',
    eyebrow:   'Residential · Ongoing',
    headline:  'Hitech Cosmos',
    sub:       '2 & 3 BHK residences. Kharghar Sector 11, Navi Mumbai.',
    href:      '/projects/hitech-cosmos/',
    cta:       'Explore Hitech Cosmos',
    community: 'Kharghar',
    isBrand:   false,
  },
  {
    id:        'business-square',
    image:     '/images/business-square-lg.jpg',
    imageWebp: '/images/business-square-lg.webp',
    alt:       'Business Square — commercial development, Nerul MIDC',
    eyebrow:   'Commercial · Ongoing',
    headline:  'Business Square',
    sub:       'Office spaces & retail. Nerul MIDC, Navi Mumbai.',
    href:      '/projects/business-square/',
    cta:       'Explore Business Square',
    community: 'Nerul',
    isBrand:   false,
  },
]

const INTERVAL   = 6000
const SLIDE_EASE = [0.4, 0, 0.2, 1]

export default function Hero() {
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]       = useState(false)
  const prefersReduced             = useReducedMotion()
  const timerRef                   = useRef(null)
  const count                      = SLIDES.length

  const advance = useCallback((dir = 1) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + count) % count)
  }, [count])

  useEffect(() => {
    clearInterval(timerRef.current)
    if (prefersReduced || paused) return
    timerRef.current = setInterval(() => advance(1), INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [prefersReduced, paused, advance, current])

  function goTo(idx) {
    clearInterval(timerRef.current)
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const imgVariants = {
    enter:  { opacity: 0, scale: prefersReduced ? 1 : 1.04 },
    center: { opacity: 1, scale: 1 },
    exit:   { opacity: 0 },
  }

  const textVariants = {
    enter:  { opacity: 0, y: prefersReduced ? 0 : 24 },
    center: { opacity: 1, y: 0 },
    exit:   { opacity: 0, y: prefersReduced ? 0 : -8 },
  }

  const imgTrans  = { duration: prefersReduced ? 0.15 : 1.4, ease: SLIDE_EASE }
  const textTrans = { duration: prefersReduced ? 0.15 : 0.8, ease: SLIDE_EASE, delay: 0.2 }

  const slide = SLIDES[current]

  return (
    <section
      aria-label="Featured properties carousel"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', background: '#0C0A09' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slide images ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`img-${slide.id}`}
          className="absolute inset-0 z-0"
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={imgTrans}
        >
          <picture>
            <source srcSet={slide.imageWebp} type="image/webp" />
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              loading={current === 0 ? 'eager' : 'lazy'}
              fetchpriority={current === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ──
           Brand slide: richer two-layer gradient for a more cinematic feel.
           Project slides: clean bottom-up fade.
      ── */}
      {slide.isBrand ? (
        <>
          {/* Left-side vignette for brand slide */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.3) 55%, transparent 80%)',
            }}
            aria-hidden="true"
          />
          {/* Bottom gradient for text readability */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,8,7,0.85) 0%, rgba(10,8,7,0.35) 35%, transparent 65%)',
            }}
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(10,8,7,0.90) 0%, rgba(10,8,7,0.50) 30%, rgba(10,8,7,0.12) 58%, transparent 78%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Text content — bottom-left ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end"
        style={{ paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
      >
        <div className="container-site">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={textTrans}
              className={slide.isBrand ? 'max-w-[740px]' : 'max-w-[600px]'}
            >
              {/* Eyebrow */}
              <motion.p
                className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-white/55 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                {slide.eyebrow}
              </motion.p>

              {/* Headline */}
              <h1
                className="font-display font-light text-white mb-5 leading-[1.04] whitespace-pre-line"
                style={{
                  fontSize:      slide.isBrand
                    ? 'clamp(2.75rem,6.5vw,5.75rem)'
                    : 'clamp(2.6rem,5.5vw,5rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                {slide.headline}
              </h1>

              {/* Sub */}
              <p
                className="font-sans font-light text-white/65 mb-9 leading-relaxed"
                style={{
                  fontSize: slide.isBrand
                    ? 'clamp(0.9rem,1.5vw,1.125rem)'
                    : 'clamp(0.875rem,1.3vw,1rem)',
                  maxWidth: slide.isBrand ? '520px' : '440px',
                }}
              >
                {slide.sub}
              </p>

              {/* CTAs — brand slide gets two buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={slide.href}
                  className="btn-outline-light"
                  aria-label={slide.cta}
                >
                  {slide.cta}
                  <ArrowRight />
                </Link>
                {slide.isBrand && (
                  <a
                    href="/contact-us/"
                    className="inline-flex items-center gap-2.5 font-sans text-ui-sm
                      tracking-[0.1em] uppercase text-white/60
                      hover:text-white transition-colors duration-300"
                  >
                    Speak with us
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Brand stats bar — only on the brand slide ── */}
      <AnimatePresence>
        {slide.isBrand && !prefersReduced && (
          <motion.div
            key="stats"
            className="absolute right-0 bottom-[4.5rem] z-30 hidden lg:flex flex-col gap-5 pr-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.7, duration: 0.8, ease: SLIDE_EASE }}
          >
            {[
              { value: '20+',     label: 'Years Expertise' },
              { value: '5,000+',  label: 'Investors' },
              { value: '5L+ sqft',label: 'Inventory Sold' },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p className="font-display font-light text-white text-2xl leading-none mb-0.5">
                  {s.value}
                </p>
                <p className="font-sans text-[0.58rem] text-white/40 uppercase tracking-[0.14em]">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom strip: counter + community + arrows ── */}
      <div className="absolute bottom-8 left-0 right-0 z-30 container-site flex items-center justify-between">
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="font-sans text-[0.65rem] text-white/40 tracking-[0.12em]">
            {String(current + 1).padStart(2, '0')}
            <span className="mx-1.5 text-white/20">/</span>
            {String(count).padStart(2, '0')}
          </span>
          <span className="w-px h-3 bg-white/20" />
          <AnimatePresence mode="wait">
            <motion.span
              key={`loc-${slide.id}`}
              className="font-sans text-[0.65rem] text-white/40 tracking-[0.14em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {slide.community}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => advance(-1)}
            aria-label="Previous slide"
            className="w-9 h-9 flex items-center justify-center
              border border-white/20 text-white/55
              hover:border-white/55 hover:text-white
              transition-all duration-300 focus-visible:outline-none
              focus-visible:ring-1 focus-visible:ring-white/50"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => advance(1)}
            aria-label="Next slide"
            className="w-9 h-9 flex items-center justify-center
              border border-white/20 text-white/55
              hover:border-white/55 hover:text-white
              transition-all duration-300 focus-visible:outline-none
              focus-visible:ring-1 focus-visible:ring-white/50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ── Progress bar indicators ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to ${s.headline}`}
            onClick={() => goTo(i)}
            className="relative flex-1 h-[3px] bg-white/12 overflow-hidden
              hover:bg-white/25 transition-colors duration-300
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          >
            {i === current && !prefersReduced && (
              <motion.span
                key={`prog-${slide.id}`}
                className="absolute inset-0 bg-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              />
            )}
            {i < current && <span className="absolute inset-0 bg-white" />}
            <span className="sr-only">{s.headline}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function ChevronLeft() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
