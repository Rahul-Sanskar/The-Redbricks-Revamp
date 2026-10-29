import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * CommunitiesSection — Emaar's "A World Built Around Life" editorial block.
 *
 * Desktop: three full-height panels sit side by side in a horizontally
 *   scrollable strip. Each panel = large architectural image (left ~60%)
 *   + copy (right ~40%) locked together. No gap between panels.
 *
 * Mobile: panels stack vertically, image first then copy, full viewport width.
 *
 * Only verified location data is used — no invented descriptions.
 */

const EASE = [0.4, 0, 0.2, 1]

const COMMUNITIES = [
  {
    id:       'kharghar',
    label:    'Residential Living',
    name:     'Kharghar',
    tagline:  'A planned township of parks, schools and connected living.',
    body:     'Sector 11 and Sector 19 in Kharghar form the heart of The Redbricks\' residential portfolio. Homes here sit close to Central Park, the CIDCO cricket ground, and Kharghar Railway Station.',
    image:    '/images/celestia-lg.jpg',
    imageWebp:'/images/celestia-lg.webp',
    imageAlt: 'Kharghar residential development — Celestia',
    href:     '/projects/?location=kharghar',
    cta:      'Explore Kharghar',
    // Tone colour for the panel label — stays within brand palette
    accent:   '#84251F',
  },
  {
    id:       'nerul',
    label:    'Premium Residences',
    name:     'Nerul',
    tagline:  'Urban connectivity meets green surroundings.',
    body:     'Nerul\'s Sector 19A and MIDC precincts combine excellent transit links with mature neighbourhoods. The area is close to Seawoods, DY Patil Stadium, and Palm Beach Road.',
    image:    '/images/silver-crest-main.jpg',
    imageWebp:'/images/silver-crest-main.webp',
    imageAlt: 'Nerul residential development — Silver Crest',
    href:     '/projects/?location=nerul',
    cta:      'Explore Nerul',
    accent:   '#84251F',
  },
  {
    id:       'belapur',
    label:    'Commercial & Residential',
    name:     'CBD Belapur',
    tagline:  'Navi Mumbai\'s civic and financial centre.',
    body:     'Sector 30 in CBD Belapur offers a prestigious address with proximity to government offices, the CBD Belapur Railway Station, and direct expressway access to Mumbai.',
    image:    '/images/mount-bliss.jpg',
    imageWebp:'/images/mount-bliss.webp',
    imageAlt: 'CBD Belapur residential development — Mount Bliss',
    href:     '/projects/?location=cbd-belapur',
    cta:      'Explore Belapur',
    accent:   '#84251F',
  },
]

export default function CommunitiesSection() {
  const prefersReduced = useReducedMotion()
  const stripRef       = useRef(null)

  function scrollPanels(dir) {
    const el = stripRef.current
    if (!el) return
    // Scroll by ~80vw per click on desktop
    const w = el.offsetWidth * 0.78
    el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <section
      aria-labelledby="communities-heading"
      className="bg-white overflow-hidden"
    >
      {/* ── Section header ── */}
      <div className="container-site pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-label mb-5">Where We Build</p>
            <h2
              id="communities-heading"
              className="font-display font-light text-charcoal"
              style={{
                fontSize:      'clamp(1.75rem,3.5vw,2.75rem)',
                lineHeight:    1.1,
                letterSpacing: '-0.015em',
              }}
            >
              A World Built Around Life
            </h2>
          </div>

          {/* Desktop scroll controls */}
          <div className="hidden lg:flex items-center gap-2 mb-1">
            <button
              onClick={() => scrollPanels(-1)}
              aria-label="Previous community"
              className="w-9 h-9 border border-stone/30 flex items-center justify-center
                text-stone hover:border-charcoal hover:text-charcoal
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scrollPanels(1)}
              aria-label="Next community"
              className="w-9 h-9 border border-stone/30 flex items-center justify-center
                text-stone hover:border-charcoal hover:text-charcoal
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ── Panel strip ── */}
      {/*
        Desktop: horizontal scroll, no snap (keeps organic feel like Emaar).
        Each panel is ~78vw wide and min-h-[520px].
        Image fills left 60% of the panel, copy fills right 40%.
        No gap between panels — they sit flush.
      */}
      <div
        ref={stripRef}
        className="flex overflow-x-auto scrollbar-none"
        style={{ scrollBehavior: 'smooth' }}
        role="list"
        aria-label="Navi Mumbai communities"
      >
        {COMMUNITIES.map((community, i) => (
          <CommunityPanel
            key={community.id}
            community={community}
            index={i}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>

      {/* ── Mobile scroll hint ── */}
      <div className="lg:hidden container-site py-4 flex items-center gap-2">
        <span className="font-sans text-[0.65rem] tracking-[0.1em] uppercase text-stone/60">
          Scroll to explore
        </span>
        <span className="flex-1 h-px bg-stone/15" aria-hidden="true" />
      </div>
    </section>
  )
}

/* ── Single community panel ─────────────────────────────────────────────── */
function CommunityPanel({ community, index, prefersReduced }) {
  return (
    <motion.article
      role="listitem"
      className="group relative shrink-0 flex"
      style={{
        // ~78vw on desktop, full width on mobile
        width:     'clamp(320px, 78vw, 1060px)',
        minHeight: '520px',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay:    prefersReduced ? 0 : index * 0.1,
        ease:     EASE,
      }}
    >
      {/* ── Left: architectural image — 60% of panel ── */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ width: '60%' }}
      >
        <motion.picture
          className="absolute inset-0"
          // Subtle scale-in on viewport entry
          initial={{ scale: prefersReduced ? 1 : 1.04 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <source srcSet={community.imageWebp} type="image/webp" />
          <img
            src={community.image}
            alt={community.imageAlt}
            className="absolute inset-0 w-full h-full object-cover object-center
              transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </motion.picture>
      </div>

      {/* ── Right: editorial copy — 40% of panel ── */}
      {/*
        Emaar keeps copy very minimal: label, large location name,
        one sentence tagline, one short paragraph, one text CTA.
        Generous padding — no card treatment.
      */}
      <div
        className="flex flex-col justify-center
          px-10 py-14 lg:px-14 lg:py-20 bg-white"
        style={{ width: '40%' }}
      >
        {/* Category label */}
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: prefersReduced ? 0 : 0.15 + index * 0.1, ease: EASE }}
        >
          {community.label}
        </motion.p>

        {/* Location name — large display */}
        <motion.h3
          className="font-display font-light text-charcoal mb-4"
          style={{
            fontSize:      'clamp(1.75rem,3vw,2.5rem)',
            lineHeight:    1.08,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: prefersReduced ? 0 : 0.22 + index * 0.1, ease: EASE }}
        >
          {community.name}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          className="font-sans font-light text-charcoal/80 mb-4"
          style={{ fontSize: 'clamp(0.9rem,1.3vw,1.0625rem)', lineHeight: 1.5 }}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.28 + index * 0.1, ease: EASE }}
        >
          {community.tagline}
        </motion.p>

        {/* Body paragraph */}
        <motion.p
          className="font-sans font-light text-stone leading-relaxed mb-8"
          style={{ fontSize: 'clamp(0.8rem,1.1vw,0.9375rem)', maxWidth: '36ch' }}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.34 + index * 0.1, ease: EASE }}
        >
          {community.body}
        </motion.p>

        {/* CTA — Emaar text link style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.4 + index * 0.1, ease: EASE }}
        >
          <Link
            to={community.href}
            className="btn-text"
            aria-label={community.cta}
          >
            {community.cta}
            <ArrowRight />
          </Link>
        </motion.div>
      </div>

      {/* Panel index — subtle top-right decorative number, Emaar style */}
      <span
        className="absolute top-6 right-6 font-sans text-[0.6rem] text-stone/30
          tracking-[0.1em] hidden lg:block"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.article>
  )
}

/* ── Icons ── */
function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
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
