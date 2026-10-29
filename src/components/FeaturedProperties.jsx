import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const FILTERS = [
  { label: 'All',         test: () => true },
  { label: 'Residential', test: (p) => p.category === 'Residential' },
  { label: 'Commercial',  test: (p) => p.category === 'Commercial' },
  { label: 'Ongoing',     test: (p) => p.status === 'Ongoing' },
  { label: 'Upcoming',    test: (p) => p.status === 'Upcoming' },
]

const EASE = [0.4, 0, 0.2, 1]

export default function FeaturedProperties({ showAll = false }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const prefersReduced             = useReducedMotion()
  const scrollRef                  = useRef(null)
  const filtered                   = PROJECTS.filter(FILTERS[activeIdx].test)

  function scrollCards(n) {
    const el   = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const w    = card ? card.offsetWidth + 20 : 300
    el.scrollBy({ left: n * w, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="projects-heading" className="bg-white">

      {/* ── Header ── */}
      <div className="container-site pt-20 pb-8 md:pt-28 md:pb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-label mb-5">Our Portfolio</p>
            <h2
              id="projects-heading"
              className="font-display font-light text-charcoal"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
            >
              {showAll ? 'All Projects' : 'Featured Projects'}
            </h2>
          </div>
          {!showAll && (
            <Link to="/projects/" className="btn-text shrink-0 mb-1 hidden sm:inline-flex">
              View All <ArrowRight />
            </Link>
          )}
        </div>

        {/* ── Underline filter tabs ── */}
        <div
          role="tablist"
          aria-label="Filter projects"
          className="relative flex items-end gap-0 mt-10 border-b border-stone/[0.12] overflow-x-auto scrollbar-none"
        >
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              role="tab"
              aria-selected={activeIdx === i}
              onClick={() => setActiveIdx(i)}
              className={`relative shrink-0 pb-3 px-4 font-sans text-ui-sm tracking-[0.04em]
                transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick
                ${activeIdx === i ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
            >
              {f.label}
              {activeIdx === i && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-charcoal"
                  transition={{ duration: 0.28, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards ── */}
      {showAll ? (
        <div className="container-site pb-20 md:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} prefersReduced={prefersReduced} />
              ))}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <p className="font-sans text-stone text-center py-20">No projects found.</p>
          )}
        </div>
      ) : (
        <div>
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-12"
            style={{
              paddingLeft:  'max(1.25rem, calc((100vw - 1440px) / 2 + 4rem))',
              paddingRight: '1.25rem',
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} prefersReduced={prefersReduced} horizontal />
              ))}
            </AnimatePresence>

            {filtered.length > 0 && (
              <div
                data-card
                className="snap-start shrink-0 border border-stone/20 hover:border-charcoal/40
                  transition-colors duration-300 flex items-center justify-center"
                style={{ width: 'clamp(220px,26vw,300px)', aspectRatio: '2/3' }}
              >
                <Link
                  to="/projects/"
                  className="flex flex-col items-center gap-5 p-8 text-center group
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-brick"
                >
                  <span
                    className="font-display font-light text-charcoal group-hover:text-brick transition-colors"
                    style={{ fontSize: 'clamp(1.1rem,1.8vw,1.375rem)', lineHeight: 1.2 }}
                  >
                    Explore All Projects
                  </span>
                  <span className="w-10 h-10 border border-stone/30 flex items-center justify-center
                    group-hover:border-charcoal transition-colors">
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="container-site flex items-center justify-between pb-8 -mt-6">
            <Link to="/projects/" className="btn-text sm:hidden">
              View All <ArrowRight />
            </Link>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => scrollCards(-1)}
                aria-label="Scroll left"
                className="w-9 h-9 border border-stone/30 flex items-center justify-center
                  text-stone hover:border-charcoal hover:text-charcoal
                  transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => scrollCards(1)}
                aria-label="Scroll right"
                className="w-9 h-9 border border-stone/30 flex items-center justify-center
                  text-stone hover:border-charcoal hover:text-charcoal
                  transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/**
 * ProjectCard — Pecan.in inspired layout.
 *
 * Pecan card structure (top → bottom):
 *   ┌──────────────────────────────────┐
 *   │  [IMAGE — fills top portion]     │
 *   │  CONSTRUCTION UPDATE  ← badge   │
 *   ├──────────────────────────────────┤
 *   │  Location                        │
 *   │  Project Details  /  Storeys     │
 *   │  Configuration  /  Carpet Area   │
 *   │  EXPLORE MORE  →                 │
 *   └──────────────────────────────────┘
 *
 * Key differences from generic card:
 * - "Construction Update" label is the FIRST text element (Pecan positions it as a status callout)
 * - Metadata fields are labeled: Location, Project Details, Configuration/Net Carpet Area
 * - No rounded corners, no box-shadow
 * - Image sits above the metadata block — image fills a set height, metadata is below
 */
function ProjectCard({ project, index, prefersReduced, horizontal = false }) {
  return (
    <motion.article
      layout
      data-card
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        opacity: { duration: 0.45, delay: prefersReduced ? 0 : index * 0.04, ease: EASE },
        y:       { duration: 0.55, delay: prefersReduced ? 0 : index * 0.04, ease: EASE },
        layout:  { duration: 0.35, ease: EASE },
      }}
      className={`group snap-start shrink-0 bg-white border border-stone/[0.10]
        hover:border-stone/30 transition-colors duration-300 ${horizontal ? '' : 'w-full'}`}
      style={horizontal ? { width: 'clamp(280px,30vw,360px)' } : undefined}
    >
      <Link
        to={`/projects/${project.slug}/`}
        className="block focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-brick"
        aria-label={`Explore ${project.name}, ${project.location}`}
      >
        {/* ── Image — LARGE elevation, tall 2:3 ratio to show full building ── */}
        <div className="overflow-hidden relative bg-stone/10" style={{ aspectRatio: '2/3' }}>
          <picture>
            {/* Serve WebP for projects that have it */}
            <source
              srcSet={(project.largeImage || project.image).replace(/\.(jpg|jpeg)$/, '.webp')}
              type="image/webp"
            />
            <img
              src={project.largeImage || project.image}
              alt={`${project.name} — elevation view`}
              className="w-full h-full object-cover object-top transition-transform duration-[1200ms]
                ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          </picture>
          {/* Status badge — top-left, Pecan uses "Construction Update" label */}
          <span
            className={`absolute top-3 left-3 font-sans text-[0.58rem] tracking-[0.16em]
              uppercase px-2.5 py-1 backdrop-blur-[2px]
              ${project.status === 'Upcoming'
                ? 'bg-brick text-white'
                : 'bg-charcoal/80 text-white'
              }`}
          >
            {project.constructionUpdate || project.status}
          </span>
        </div>

        {/* ── Pecan-style metadata block ── */}
        {/*
          Pecan renders each field as a labeled row:
          [LABEL]
          [VALUE]
          with thin separators between rows.
        */}
        <div className="divide-y divide-stone/[0.10]">

          {/* Row 1: Location */}
          <div className="px-5 py-3.5">
            <p className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-stone/70 mb-0.5">
              Location
            </p>
            <p className="font-sans text-[0.85rem] text-charcoal leading-snug">
              {project.location}
            </p>
          </div>

          {/* Row 2: Project Details */}
          <div className="px-5 py-3.5">
            <p className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-stone/70 mb-0.5">
              Project Details
            </p>
            <p className="font-display font-light text-charcoal leading-snug"
              style={{ fontSize: 'clamp(1.05rem,1.8vw,1.3rem)' }}>
              {project.name}
            </p>
            {project.storeys && (
              <p className="font-sans text-[0.8rem] text-stone mt-0.5">
                {project.storeys}
              </p>
            )}
            <p className="font-sans text-[0.75rem] text-stone/70 mt-0.5 uppercase tracking-[0.08em]">
              {project.type}
            </p>
          </div>

          {/* Row 3: Configuration or Carpet Area */}
          <div className="px-5 py-3.5">
            <p className="font-sans text-[0.58rem] uppercase tracking-[0.16em] text-stone/70 mb-0.5">
              {project.carpetArea ? 'Net Carpet Area' : 'Configuration'}
            </p>
            <p className="font-sans text-[0.85rem] text-charcoal leading-snug">
              {project.carpetArea ?? project.config}
            </p>
          </div>

          {/* Row 4: EXPLORE MORE — Pecan's exact CTA wording */}
          <div className="px-5 py-4 flex items-center justify-between">
            <span
              className="font-sans text-[0.65rem] tracking-[0.2em] uppercase
                text-charcoal group-hover:text-brick transition-colors duration-300"
            >
              Explore More
            </span>
            <span
              className="w-7 h-7 border border-stone/30 flex items-center justify-center
                group-hover:border-brick group-hover:text-brick transition-all duration-300
                shrink-0"
            >
              <ArrowRight />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
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
