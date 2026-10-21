import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * HERO SLIDES — verified project data only, no invented details.
 */
const SLIDES = [
  {
    id:        'celestia',
    image:     '/images/celestia-lg.jpg',
    imageWebp: '/images/celestia-lg.webp',
    alt:       'Celestia — premium residences, Kharghar',
    eyebrow:   'Residential · Upcoming',
    // Short headline — Emaar always uses the project name alone
    headline:  'Celestia',
    // Sub ≤ 10 words — Emaar restraint
    sub:       '3 & 4 BHK residences. Kharghar, Navi Mumbai.',
    href:      '/projects/celestia/',
    cta:       'Explore Celestia',
    // Community label shown beside the counter — Emaar pattern
    community: 'Kharghar',
  },
  {
    id:        'silver-crest',
    image:     '/images/silver-crest-lg.jpg',
    imageWebp: '/images/silver-crest-lg.webp',
    alt:       'Silver Crest — premium residences, Nerul',
    eyebrow:   'Residential · Upcoming',
    headline:  'Silver Crest',
    sub:       '2 & 3 BHK residences. Nerul, Navi Mumbai.',
    href:      '/projects/silver-crest/',
    cta:       'Explore Silver Crest',
    community: 'Nerul',
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

  // Reset and restart the timer whenever the slide changes or paused state changes
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

  // Cross-dissolve — no x translation, just opacity + subtle scale
  const imgVariants = {
    enter:  { opacity: 0, scale: prefersReduced ? 1 : 1.03 },
    center: { opacity: 1, scale: 1 },
    exit:   { opacity: 0, scale: prefersReduced ? 1 : 1.01 },
  }

  const textVariants = {
    enter:  { opacity: 0, y: prefersReduced ? 0 : 18 },
    center: { opacity: 1, y: 0 },
    exit:   { opacity: 0, y: prefersReduced ? 0 : -10 },
  }

  const imgTrans  = { duration: prefersReduced ? 0.15 : 1.2, ease: SLIDE_EASE }
  const textTrans = { duration: prefersReduced ? 0.15 : 0.7, ease: SLIDE_EASE, delay: 0.18 }

  const slide = SLIDES[current]

  return (
    <section
      aria-label="Featured properties"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden bg-[#141210]"
      // 100dvh with 100svh fallback for iOS Safari
      style={{ height: '100svh', minHeight: '560px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background images — cross-dissolve ── */}
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

      {/* ── Gradient — bottom-heavy, minimal ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(14,12,10,0.88) 0%, rgba(14,12,10,0.45) 28%, rgba(14,12,10,0.08) 55%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* ── Slide text — bottom-left ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end"
        style={{ paddingBottom: 'clamp(3.5rem, 7vw, 6.5rem)' }}
      >
        <div className="container-site">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              className="max-w-[600px]"
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={textTrans}
            >
              {/* Eyebrow */}
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/60 mb-4">
                {slide.eyebrow}
              </p>

              {/* Headline — project name */}
              <h1
                className="font-display font-light text-white mb-4 leading-[1.04]"
                style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', letterSpacing: '-0.025em' }}
              >
                {slide.headline}
              </h1>

              {/* Sub — one short sentence */}
              <p
                className="font-sans font-light text-white/65 mb-8 leading-snug"
                style={{ fontSize: 'clamp(0.875rem,1.3vw,1rem)' }}
              >
                {slide.sub}
              </p>

              {/* CTA */}
              <Link
                to={slide.href}
                className="btn-outline-light"
                aria-label={slide.cta}
              >
                {slide.cta}
                <ArrowRight />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom strip: counter + community + arrows ── */}
      {/*
        Emaar pattern: counter bottom-left, community name beside it,
        prev/next arrows bottom-right — all on the same horizontal line.
      */}
      <div className="absolute bottom-8 left-0 right-0 z-30 container-site flex items-center justify-between">

        {/* Counter + community name */}
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="font-sans text-[0.65rem] text-white/45 tracking-[0.12em]">
            {String(current + 1).padStart(2, '0')}
            <span className="mx-1.5 text-white/20">/</span>
            {String(count).padStart(2, '0')}
          </span>
          {/* Thin separator */}
          <span className="w-px h-3 bg-white/20" aria-hidden="true" />
          {/* Community label — appears with the slide text */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`community-${slide.id}`}
              className="font-sans text-[0.65rem] text-white/45 tracking-[0.12em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: SLIDE_EASE }}
            >
              {slide.community}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Prev / Next — square minimal buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => advance(-1)}
            aria-label="Previous slide"
            className="w-9 h-9 flex items-center justify-center
              border border-white/25 text-white/60
              hover:border-white/60 hover:text-white
              transition-all duration-300"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => advance(1)}
            aria-label="Next slide"
            className="w-9 h-9 flex items-center justify-center
              border border-white/25 text-white/60
              hover:border-white/60 hover:text-white
              transition-all duration-300"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ── Progress bar indicators — very bottom edge ── */}
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
            className="relative flex-1 h-[3px] bg-white/15 overflow-hidden
              hover:bg-white/30 transition-colors duration-300
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
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
            {i < current && (
              <span className="absolute inset-0 bg-white" />
            )}
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
