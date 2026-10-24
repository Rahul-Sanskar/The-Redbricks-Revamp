import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import Nav from '../components/Nav.jsx'
import SkipLink from '../components/SkipLink.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'
import {
  PROJECTS,
  RESIDENTIAL_PROJECTS,
  COMMERCIAL_PROJECTS,
  ONGOING_PROJECTS,
  UPCOMING_PROJECTS,
} from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.4, 0, 0.2, 1]

// View modes that map to a filtered list + display name
const VIEWS = [
  { key: 'all',         label: 'All Projects',    projects: PROJECTS            },
  { key: 'upcoming',    label: 'Upcoming',         projects: UPCOMING_PROJECTS   },
  { key: 'ongoing',     label: 'Ongoing',          projects: ONGOING_PROJECTS    },
  { key: 'residential', label: 'Residential',      projects: RESIDENTIAL_PROJECTS},
  { key: 'commercial',  label: 'Commercial',       projects: COMMERCIAL_PROJECTS },
]

function Reveal({ children, delay = 0, y = 16 }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: prefersReduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeView, setActiveView] = useState('all')
  const prefersReduced = useReducedMotion()

  const view    = VIEWS.find((v) => v.key === activeView) ?? VIEWS[0]
  const showing = view.projects

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Projects — Premium Real Estate in Navi Mumbai"
        description="Explore The Redbricks' residential and commercial real estate portfolio — ongoing and upcoming developments in Kharghar, Nerul, CBD Belapur, Vashi and Mahape."
        canonical="/projects/"
      />
      <Nav />

      <main id="main-content">

        {/* ── Page hero ── */}
        <section
          className="bg-charcoal text-center relative overflow-hidden"
          style={{ paddingTop: 'calc(80px + 5rem)', paddingBottom: '5rem' }}
          aria-label="Projects page header"
        >
          {/* Subtle architectural bg texture using the hero image at low opacity */}
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{ backgroundImage: 'url(/images/celestia-lg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            aria-hidden="true"
          />
          <div className="relative z-10 container-site">
            <motion.p
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Our Portfolio
            </motion.p>
            <motion.h1
              className="font-display font-light text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              Residential &amp;{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Commercial</em>
            </motion.h1>
            <motion.p
              className="font-sans font-light text-white/50 mx-auto"
              style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            >
              Premium developments across Navi Mumbai — from residential addresses
              in Kharghar and Nerul to commercial landmarks in Mahape and Vashi.
            </motion.p>

            {/* Quick stats strip inside hero */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-10 pt-10
                border-t border-white/[0.12]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            >
              {[
                { value: PROJECTS.length,               label: 'Total Projects'         },
                { value: ONGOING_PROJECTS.length,        label: 'Ongoing'               },
                { value: UPCOMING_PROJECTS.length,       label: 'Upcoming'              },
                { value: RESIDENTIAL_PROJECTS.length,   label: 'Residential'           },
                { value: COMMERCIAL_PROJECTS.length,    label: 'Commercial'            },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-light text-white text-3xl mb-1">{s.value}</p>
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-white/45">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Filter strip ── */}
        <div className="sticky top-[80px] z-40 bg-white border-b border-stone/[0.12]">
          <div className="container-site">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex overflow-x-auto scrollbar-none"
            >
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  role="tab"
                  aria-selected={activeView === v.key}
                  onClick={() => setActiveView(v.key)}
                  className={`relative shrink-0 py-4 px-5 font-sans text-ui-sm tracking-[0.05em]
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick
                    ${activeView === v.key ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
                >
                  {v.label}
                  <span className="ml-2 font-sans text-[0.65rem] text-stone/60">
                    ({v.projects.length})
                  </span>
                  {activeView === v.key && (
                    <motion.span
                      layoutId="projects-tab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brick"
                      transition={{ duration: 0.25, ease: EASE }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Residential category section ── */}
        {(activeView === 'all' || activeView === 'residential') && (
          <section aria-labelledby="residential-heading" className="bg-white">
            <div className="container-site py-16 md:py-20">
              <Reveal>
                <div className="flex items-end justify-between mb-10 gap-4">
                  <div>
                    <p className="section-label mb-3">Residential</p>
                    <h2
                      id="residential-heading"
                      className="font-display font-light text-charcoal"
                      style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                    >
                      Homes Designed for Modern Living
                    </h2>
                  </div>
                  <span className="font-sans text-stone text-sm shrink-0 mb-1">
                    {RESIDENTIAL_PROJECTS.length} projects
                  </span>
                </div>
              </Reveal>
              <ProjectGrid projects={RESIDENTIAL_PROJECTS} prefersReduced={prefersReduced} />
            </div>
          </section>
        )}

        {/* ── Separator ── */}
        {activeView === 'all' && (
          <div className="border-t border-stone/[0.10]" />
        )}

        {/* ── Commercial category section ── */}
        {(activeView === 'all' || activeView === 'commercial') && (
          <section aria-labelledby="commercial-heading" className="bg-offwhite">
            <div className="container-site py-16 md:py-20">
              <Reveal>
                <div className="flex items-end justify-between mb-10 gap-4">
                  <div>
                    <p className="section-label mb-3">Commercial</p>
                    <h2
                      id="commercial-heading"
                      className="font-display font-light text-charcoal"
                      style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                    >
                      Offices &amp; Retail for Thriving Businesses
                    </h2>
                  </div>
                  <span className="font-sans text-stone text-sm shrink-0 mb-1">
                    {COMMERCIAL_PROJECTS.length} projects
                  </span>
                </div>
              </Reveal>
              <ProjectGrid projects={COMMERCIAL_PROJECTS} prefersReduced={prefersReduced} />
            </div>
          </section>
        )}

        {/* ── Ongoing / Upcoming filtered views ── */}
        {(activeView === 'ongoing' || activeView === 'upcoming') && (
          <section aria-labelledby="filtered-heading" className="bg-white">
            <div className="container-site py-16 md:py-20">
              <Reveal>
                <h2
                  id="filtered-heading"
                  className="font-display font-light text-charcoal mb-10"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                >
                  {view.label} Projects
                  <span className="font-sans font-light text-stone text-base ml-3">
                    ({showing.length})
                  </span>
                </h2>
              </Reveal>
              <ProjectGrid projects={showing} prefersReduced={prefersReduced} />
            </div>
          </section>
        )}

        {/* ── Delivered CTA strip ── */}
        <Reveal>
          <section className="bg-charcoal" aria-label="Delivered projects">
            <div className="container-site py-12 md:py-16 flex flex-col md:flex-row
              items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Our Track Record
                </p>
                <h2
                  className="font-display font-light text-white"
                  style={{ fontSize: 'clamp(1.375rem,2.5vw,2rem)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
                >
                  View Delivered Projects
                </h2>
              </div>
              <Link to="/delivered-projects/" className="btn-outline-light shrink-0">
                Delivered Projects <ArrowRight />
              </Link>
            </div>
          </section>
        </Reveal>

        <EnquiryFooter />
      </main>
    </div>
  )
}

// ── Shared project grid ──────────────────────────────────────────────────────
function ProjectGrid({ projects, prefersReduced }) {
  if (!projects.length) return (
    <p className="font-sans text-stone text-center py-16">No projects in this category.</p>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((p, i) => (
          <PecanCard key={p.id} project={p} index={i} prefersReduced={prefersReduced} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── Pecan-inspired card (full version with all labeled rows) ─────────────────
function PecanCard({ project, index, prefersReduced }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        opacity: { duration: 0.45, delay: prefersReduced ? 0 : index * 0.05, ease: EASE },
        y:       { duration: 0.55, delay: prefersReduced ? 0 : index * 0.05, ease: EASE },
        layout:  { duration: 0.35, ease: EASE },
      }}
      className="group bg-white border border-stone/[0.10] hover:border-stone/25
        hover:shadow-card transition-all duration-300"
    >
      <Link
        to={`/projects/${project.slug}/`}
        className="block focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-brick"
        aria-label={`Explore ${project.name}, ${project.location}`}
      >
        {/* Image */}
        <div className="overflow-hidden relative bg-stone/10" style={{ aspectRatio: '16/10' }}>
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-[1200ms]
              ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          {/* Construction Update badge — Pecan's most prominent status element */}
          <span
            className={`absolute top-0 left-0 font-sans text-[0.58rem] tracking-[0.16em]
              uppercase px-3 py-1.5
              ${project.status === 'Upcoming' ? 'bg-brick text-white' : 'bg-charcoal/85 text-white'}`}
          >
            {project.constructionUpdate || project.status}
          </span>
        </div>

        {/* Pecan-style labeled data rows */}
        <div className="divide-y divide-stone/[0.10]">

          {/* Location */}
          <div className="px-5 pt-4 pb-3">
            <span className="font-sans text-[0.57rem] uppercase tracking-[0.18em] text-stone/60 block mb-0.5">
              Location
            </span>
            <span className="font-sans text-[0.84rem] text-charcoal">{project.location}</span>
          </div>

          {/* Project Details */}
          <div className="px-5 py-3">
            <span className="font-sans text-[0.57rem] uppercase tracking-[0.18em] text-stone/60 block mb-1">
              Project Details
            </span>
            <span
              className="font-display font-light text-charcoal group-hover:text-brick
                transition-colors duration-300 block"
              style={{ fontSize: 'clamp(1rem,1.7vw,1.25rem)', lineHeight: 1.2 }}
            >
              {project.name}
            </span>
            {project.storeys ? (
              <span className="font-sans text-[0.78rem] text-stone block mt-0.5">
                {project.storeys}
              </span>
            ) : null}
            <span className="font-sans text-[0.72rem] text-stone/60 uppercase tracking-[0.08em] block mt-0.5">
              {project.type}
            </span>
          </div>

          {/* Configuration or Net Carpet Area */}
          <div className="px-5 py-3">
            <span className="font-sans text-[0.57rem] uppercase tracking-[0.18em] text-stone/60 block mb-0.5">
              {project.carpetArea ? 'Net Carpet Area' : 'Configuration'}
            </span>
            <span className="font-sans text-[0.84rem] text-charcoal">
              {project.carpetArea ?? project.config}
            </span>
          </div>

          {/* Explore More CTA */}
          <div className="px-5 py-3.5 flex items-center justify-between">
            <span className="font-sans text-[0.63rem] tracking-[0.2em] uppercase
              text-charcoal/70 group-hover:text-brick transition-colors duration-300">
              Explore More
            </span>
            <ArrowRight />
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
