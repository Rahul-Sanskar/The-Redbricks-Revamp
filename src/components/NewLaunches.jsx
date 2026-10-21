import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * NewLaunches — the "Newly Launched" count strip Emaar places immediately
 * below the hero. For The Redbricks this maps to Upcoming projects.
 *
 * Emaar pattern:
 *  ┌──────────────────────────────────────────────────────────────────┐
 *  │  REDBRICKS   N upcoming projects.         Explore All  →        │
 *  │  ─────────────────────────────────────────────────────────────  │
 *  │  Project A   Project B   Project C   Project D   Project E  … │
 *  └──────────────────────────────────────────────────────────────────┘
 *
 * The strip is full-width, white background, compact — acts as a
 * visual bridge between the hero and the main portfolio section.
 */

const EASE = [0.4, 0, 0.2, 1]

export default function NewLaunches() {
  const prefersReduced = useReducedMotion()

  const upcoming = PROJECTS.filter((p) => p.status === 'Upcoming')
  if (upcoming.length === 0) return null

  return (
    <section
      aria-labelledby="launches-heading"
      className="bg-white border-b border-stone/[0.12]"
    >
      {/* ── Top bar: count + label + CTA ── */}
      <div className="container-site">
        <div className="flex items-center justify-between py-5 border-b border-stone/[0.08]">
          <motion.div
            className="flex items-baseline gap-3"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Big count — Emaar shows "130,900 homes" in the same weight */}
            <span
              className="font-display font-light text-charcoal"
              style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              {upcoming.length}
            </span>
            <div>
              <h2
                id="launches-heading"
                className="font-sans text-ui-sm text-charcoal tracking-[0.04em]"
              >
                Upcoming Projects
              </h2>
              <p className="font-sans text-[0.7rem] text-stone tracking-[0.06em] mt-0.5">
                New launches across Navi Mumbai
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <Link to="/projects/" className="btn-text">
              Explore All Launches
              <ArrowRight />
            </Link>
          </motion.div>
        </div>

        {/* ── Horizontal launch cards ── */}
        {/*
          Emaar shows each launch as a minimal inline item:
          community name / project name / bedrooms / starting price
          All on one horizontal scrolling row.
          We use: location / name / config / status
        */}
        <div
          className="flex overflow-x-auto scrollbar-none gap-0 divide-x divide-stone/[0.10]"
          role="list"
          aria-label="Upcoming project launches"
        >
          {upcoming.map((project, i) => (
            <motion.div
              key={project.id}
              role="listitem"
              className="shrink-0 group"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay:    prefersReduced ? 0 : 0.06 + i * 0.06,
                ease:     EASE,
              }}
            >
              <Link
                to={`/projects/${project.slug}/`}
                className="flex flex-col gap-1 px-7 py-5 min-w-[180px]
                  hover:bg-stone/[0.04] transition-colors duration-200
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-brick focus-visible:outline-offset-2"
                aria-label={`${project.name}, ${project.location}`}
              >
                {/* Location */}
                <span className="font-sans text-[0.62rem] tracking-[0.14em] uppercase text-stone">
                  {project.location.split(',')[0]}
                </span>

                {/* Project name */}
                <span
                  className="font-display font-light text-charcoal group-hover:text-brick
                    transition-colors duration-200"
                  style={{ fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', lineHeight: 1.2 }}
                >
                  {project.name}
                </span>

                {/* Config */}
                <span className="font-sans text-[0.72rem] text-stone/80 tracking-[0.02em]">
                  {project.config}
                </span>

                {/* Status pill */}
                <span className="mt-1 self-start font-sans text-[0.58rem] tracking-[0.14em]
                  uppercase bg-brick/[0.08] text-brick px-2 py-0.5">
                  Upcoming
                </span>
              </Link>
            </motion.div>
          ))}

          {/* Trailing "View all" cell */}
          <div className="shrink-0 flex items-center px-7">
            <Link
              to="/projects/"
              className="flex items-center gap-2 font-sans text-[0.65rem]
                tracking-[0.14em] uppercase text-stone/60
                hover:text-charcoal transition-colors duration-200
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-brick focus-visible:outline-offset-2"
            >
              All projects
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
