import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, getRelatedProjects, CONTACT, NAV_LINKS } from '../data/projects.js'
import Seo from '../components/Seo.jsx'
import JsonLd, { buildProjectSchema, ORGANIZATION_SCHEMA } from '../components/JsonLd.jsx'
import Nav from '../components/Nav.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Reveal from '../components/Reveal.jsx'
import ImageReveal from '../components/ImageReveal.jsx'
import ProjectGallery from '../components/ProjectGallery.jsx'
import ProjectEnquiry from '../components/ProjectEnquiry.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.16, 1, 0.3, 1]

// ─── Amenity icon map (SVG inline, no icon library needed) ────────────────────
function AmenityIcon({ type }) {
  const icons = {
    garden: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <path d="M12 22V12M12 12C12 12 7 10 7 5a5 5 0 0110 0c0 5-5 7-5 7z"/>
      </svg>
    ),
    play: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/>
      </svg>
    ),
    parking: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="1"/>
        <path d="M9 17V7h4a3 3 0 010 6H9"/>
      </svg>
    ),
    lift: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <rect x="4" y="2" width="16" height="20" rx="1"/>
        <path d="M9 9l3-3 3 3M9 15l3 3 3-3"/>
      </svg>
    ),
    power: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    security: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    gym: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <path d="M6 4v16M18 4v16M3 8h3M18 8h3M3 16h3M18 16h3M6 12h12"/>
      </svg>
    ),
    conference: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="1"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v3M8 12v3M16 12v3"/>
      </svg>
    ),
    cafeteria: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
      </svg>
    ),
    games: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <path d="M6 12h4M8 10v4M15 11h.01M17 13h.01"/>
      </svg>
    ),
  }
  return icons[type] ?? icons.security
}

// ─── Section: Hero ────────────────────────────────────────────────────────────
function DetailHero({ project, prefersReduced }) {
  return (
    <section aria-label={`${project.name} hero`} className="relative h-[75vh] min-h-[520px] flex flex-col justify-end overflow-hidden bg-charcoal">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: prefersReduced ? 1 : 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: 'easeOut' }}
      >
        <img
          src={project.largeImage}
          alt={`${project.name} — ${project.location}`}
          className="w-full h-full object-cover object-center"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.94) 0%, rgba(28,25,23,0.4) 50%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 container-site pb-16 md:pb-20">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
          className="flex items-center gap-2 mb-6"
        >
          <Link to="/" className="font-sans text-xs text-white/50 hover:text-white/80 transition-colors">Home</Link>
          <span className="text-white/30 text-xs">/</span>
          <Link to="/projects/" className="font-sans text-xs text-white/50 hover:text-white/80 transition-colors">Projects</Link>
          <span className="text-white/30 text-xs">/</span>
          <span className="font-sans text-xs text-[#C9A96E]">{project.name}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          <span className={`px-3 py-1 font-sans text-[0.6rem] font-medium tracking-widest uppercase
            ${project.status === 'Upcoming' ? 'bg-brick text-ivory' : 'bg-charcoal/70 text-ivory border border-ivory/20'}`}>
            {project.status}
          </span>
          <span className="px-3 py-1 font-sans text-[0.6rem] font-medium tracking-widest uppercase bg-white/10 text-white/80 border border-ivory/20">
            {project.type}
          </span>
        </motion.div>

        <motion.h1
          className="font-display font-light text-display-xl text-white mb-3 leading-[1.06]"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
        >
          {project.name}
        </motion.h1>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.8, ease: EASE }}
        >
          <div className="flex items-center gap-2 text-white/70">
            <LocationIcon />
            <span className="font-sans text-sm">{project.address || project.location}</span>
          </div>
          {project.config && (
            <>
              <span className="text-white/30">·</span>
              <span className="font-sans text-sm text-white/70">{project.config}</span>
            </>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 mt-8"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease: EASE }}
        >
          <a href="#enquire" className="btn-primary">
            Enquire Now
            <ArrowIcon />
          </a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section: Pecan-style data bar ────────────────────────────────────────────
/**
 * A horizontal strip of labeled data rows immediately below the hero.
 * Inspired by Pecan.in's project card layout — each field is labelled
 * and the Construction Update status is the first prominent element.
 */
function PecanDataBar({ project }) {
  const fields = [
    {
      label: 'Construction Update',
      value: project.constructionUpdate || project.status,
      highlight: true,
    },
    {
      label: 'Location',
      value: project.address || project.location,
    },
    {
      label: 'Project Details',
      value: [project.type, project.storeys].filter(Boolean).join(' · ') || project.type,
    },
    {
      label: project.carpetArea ? 'Net Carpet Area' : 'Configuration',
      value: project.carpetArea ?? project.config,
    },
    ...(project.rera ? [{
      label: 'RERA',
      value: project.rera,
    }] : []),
    ...(project.possessionDate ? [{
      label: 'Possession',
      value: project.possessionDate,
    }] : []),
  ]

  return (
    <section aria-label="Project quick facts" className="border-b border-stone/[0.12] bg-white">
      <div className="container-site">
        <div className="flex overflow-x-auto scrollbar-none divide-x divide-stone/[0.10]">
          {fields.map((f, i) => (
            <div
              key={f.label}
              className="shrink-0 px-6 py-5 min-w-[160px]"
            >
              <p className="font-sans text-[0.58rem] uppercase tracking-[0.18em] text-stone/60 mb-1">
                {f.label}
              </p>
              <p
                className={`font-sans text-[0.88rem] leading-snug
                  ${f.highlight
                    ? project.status === 'Upcoming'
                      ? 'text-brick font-medium'
                      : 'text-charcoal font-medium'
                    : 'text-charcoal'
                  }`}
              >
                {f.value}
              </p>
            </div>
          ))}
          {/* Enquire CTA in the data bar */}
          <div className="shrink-0 px-6 py-5 flex items-center ml-auto">
            <a
              href="#enquire"
              className="btn-primary"
            >
              Enquire Now <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Overview ────────────────────────────────────────────────────────
function DetailOverview({ project }) {
  return (
    <section aria-labelledby="overview-heading" className="section-gap bg-ivory">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left — copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-5 mb-6">
                <span className="block h-px bg-[#C9A96E] w-8 shrink-0" aria-hidden="true" />
                <p className="eyebrow">{project.type} · {project.status}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={32}>
              <h2 id="overview-heading" className="font-display font-light text-display-xl text-charcoal mb-6">
                {project.tagline || project.name}
              </h2>
            </Reveal>

            {project.bodyText?.map((para, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08} y={16}>
                <p className="font-sans font-light text-stone text-lg leading-relaxed mb-5 max-w-prose-narrow">{para}</p>
              </Reveal>
            ))}

            {/* Key facts row */}
            <Reveal delay={0.3} y={12}>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-stone/20 pt-8">
                <div>
                  <dt className="eyebrow text-stone text-[0.6rem] mb-1">Location</dt>
                  <dd className="font-sans text-sm text-charcoal">{project.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-stone text-[0.6rem] mb-1">Configuration</dt>
                  <dd className="font-sans text-sm text-charcoal">{project.config}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-stone text-[0.6rem] mb-1">Status</dt>
                  <dd className={`font-sans text-sm font-medium ${project.status === 'Upcoming' ? 'text-brick' : 'text-charcoal'}`}>
                    {project.status}
                  </dd>
                </div>
                {project.rera ? (
                  <div>
                    <dt className="eyebrow text-stone text-[0.6rem] mb-1">RERA</dt>
                    <dd className="font-sans text-sm text-charcoal">{project.rera}</dd>
                  </div>
                ) : null}
                {project.possessionDate ? (
                  <div>
                    <dt className="eyebrow text-stone text-[0.6rem] mb-1">Possession</dt>
                    <dd className="font-sans text-sm text-charcoal">{project.possessionDate}</dd>
                  </div>
                ) : null}
                {project.launchDate ? (
                  <div>
                    <dt className="eyebrow text-stone text-[0.6rem] mb-1">Launch Date</dt>
                    <dd className="font-sans text-sm text-charcoal">{project.launchDate}</dd>
                  </div>
                ) : null}
              </dl>
            </Reveal>
          </div>

          {/* Right — portrait image */}
          <div className="hidden lg:block">
            <ImageReveal
              src={project.portraitImage}
              alt={`${project.name} — ${project.location}`}
              className="aspect-[4/5]"
              imgClassName="w-full h-full object-cover"
              delay={0.12}
              duration={1.15}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Gallery ─────────────────────────────────────────────────────────
function DetailGallery({ project }) {
  if (!project.gallery?.length) return null
  return (
    <section aria-labelledby="gallery-heading" className="section-gap-sm bg-offwhite">
      <div className="container-site">
        <Reveal>
          <div className="flex items-center gap-5 mb-10">
            <span className="block h-px bg-[#C9A96E] w-8 shrink-0" aria-hidden="true" />
            <h2 id="gallery-heading" className="eyebrow">Gallery</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ProjectGallery images={project.gallery} projectName={project.name} />
        </Reveal>
      </div>
    </section>
  )
}

// ─── Section: Configurations ─────────────────────────────────────────────────
function DetailConfigurations({ project }) {
  if (!project.configurations?.length) return null
  return (
    <section aria-labelledby="config-heading" className="section-gap bg-ivory">
      <div className="container-site">
        <Reveal>
          <div className="flex items-center gap-5 mb-10">
            <span className="block h-px bg-[#C9A96E] w-8 shrink-0" aria-hidden="true" />
            <h2 id="config-heading" className="font-display font-light text-display-lg text-charcoal">
              Property <em className="italic text-brick">Configurations</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.configurations.map((c, i) => (
            <Reveal key={c.type} delay={i * 0.09} y={16}>
              <div className="border border-stone/20 p-7 hover:border-[#C9A96E] transition-colors duration-300">
                <span className="block h-px bg-[#C9A96E] w-6 mb-4" aria-hidden="true" />
                <h3 className="font-display font-light text-display-md text-charcoal mb-2">{c.type}</h3>
                <p className="font-sans font-light text-stone text-sm leading-relaxed">{c.details}</p>
                <a
                  href="#enquire"
                  className="mt-5 inline-flex items-center gap-2 font-sans text-xs text-brick font-medium tracking-widest uppercase
                    hover:gap-4 transition-all duration-300"
                >
                  Get Pricing <ArrowIcon size={12} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 font-sans text-sm text-stone/70 italic">
            * Pricing and exact sizes available on request. Contact our team for a detailed proposal.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Section: Amenities ───────────────────────────────────────────────────────
function DetailAmenities({ project }) {
  if (!project.amenities?.length) return null
  return (
    <section aria-labelledby="amenities-heading" className="section-gap bg-charcoal">
      <div className="container-site">
        <Reveal>
          <div className="flex items-center gap-5 mb-12">
            <span className="block h-px w-8 bg-[#C9A96E] shrink-0" aria-hidden="true" />
            <h2 id="amenities-heading" className="font-display font-light text-display-lg text-white">
              Amenities &amp; <em className="italic text-[#C9A96E]">Facilities</em>
            </h2>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Project amenities">
          {project.amenities.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07} y={14}>
              <li className="flex items-center gap-4 group">
                <span className="w-10 h-10 border border-stone/30 flex items-center justify-center text-[#C9A96E]
                  group-hover:border-[#C9A96E] transition-colors duration-300 shrink-0">
                  <AmenityIcon type={item.icon} />
                </span>
                <span className="font-sans text-sm text-stone/80 leading-snug">{item.label}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        {project.amenitiesNote && (
          <Reveal delay={0.2}>
            <p className="mt-10 font-sans text-sm text-stone italic border-l-2 border-[#C9A96E]/40 pl-4">
              {project.amenitiesNote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

// ─── Section: Location ────────────────────────────────────────────────────────
function DetailLocation({ project }) {
  return (
    <section aria-labelledby="location-heading" className="section-gap bg-ivory">
      <div className="container-site">
        <Reveal>
          <div className="flex items-center gap-5 mb-10">
            <span className="block h-px bg-[#C9A96E] w-8 shrink-0" aria-hidden="true" />
            <h2 id="location-heading" className="font-display font-light text-display-lg text-charcoal">
              Location &amp; <em className="italic text-brick">Connectivity</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Highlights list */}
          <div>
            <Reveal delay={0.1} y={16}>
              <p className="font-sans font-light text-stone text-lg leading-relaxed mb-8">
                {project.address && (
                  <><strong className="font-medium text-charcoal">Address:</strong>{' '}{project.address}</>
                )}
              </p>
            </Reveal>

            {project.locationHighlights?.length > 0 && (
              <ul className="flex flex-col gap-4" aria-label="Location highlights">
                {project.locationHighlights.map((hl, i) => (
                  <Reveal key={hl} delay={0.12 + i * 0.07} y={10}>
                    <li className="flex items-start gap-4">
                      <span className="mt-2 w-4 h-px bg-[#C9A96E] shrink-0" aria-hidden="true" />
                      <span className="font-sans font-light text-stone text-base leading-relaxed">{hl}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}

            {project.googleMapsHref && (
              <Reveal delay={0.35} y={10}>
                <a
                  href={project.googleMapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 btn-outline inline-flex"
                >
                  Get Directions
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </Reveal>
            )}
          </div>

          {/* Static map placeholder — no paid API */}
          {project.gps ? (
            <Reveal delay={0.15} y={20}>
              <div className="aspect-[4/3] bg-offwhite border border-stone/20 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="w-12 h-12 border border-stone/30 flex items-center justify-center text-stone">
                  <LocationIcon size={22} />
                </span>
                <div>
                  <p className="font-display font-light text-display-md text-charcoal mb-1">{project.name}</p>
                  <p className="font-sans text-sm text-stone mb-4">{project.address}</p>
                  <a
                    href={project.googleMapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs text-brick font-medium tracking-widest uppercase hover:gap-4 transition-all duration-300"
                  >
                    Open in Google Maps <ArrowIcon size={12} />
                  </a>
                </div>
                <p className="font-sans text-[0.65rem] text-stone/60 mt-2">
                  {project.gps.lat.toFixed(6)}, {project.gps.lng.toFixed(6)}
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.15} y={16}>
              <div className="aspect-[4/3] bg-offwhite border border-stone/20 flex items-center justify-center p-8 text-center">
                <p className="font-sans text-sm text-stone">
                  Location details available on enquiry.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Enquiry ─────────────────────────────────────────────────────────
function DetailEnquiry({ project }) {
  return (
    <section id="enquire" aria-labelledby="enquiry-heading" className="section-gap bg-charcoal">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <Reveal>
              <div className="flex items-center gap-5 mb-6">
                <span className="block h-px w-8 bg-[#C9A96E] shrink-0" aria-hidden="true" />
                <p className="eyebrow text-stone">Register Your Interest</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={28}>
              <h2 id="enquiry-heading" className="font-display font-light text-display-xl text-white mb-6 leading-[1.07]">
                Enquire About{' '}
                <em className="italic text-[#C9A96E]">{project.name}</em>
              </h2>
            </Reveal>
            <Reveal delay={0.18} y={16}>
              <p className="font-sans font-light text-stone/80 text-lg leading-relaxed mb-10">
                Our team will provide you with detailed pricing, floor plans, and availability
                for <strong className="font-medium text-white">{project.name}</strong> in {project.location}.
              </p>
            </Reveal>
            <Reveal delay={0.24} y={12}>
              <div className="flex flex-col gap-4">
                <ContactRow icon="phone" label="Phone" value={CONTACT.phone} href={CONTACT.phoneHref} />
                <ContactRow icon="email" label="Email" value={CONTACT.email} href={CONTACT.emailHref} />
                <ContactRow icon="whatsapp" label="WhatsApp" value="Chat with us" href={CONTACT.whatsapp} external />
              </div>
            </Reveal>
          </div>
          {/* Right — form */}
          <Reveal delay={0.15}>
            <ProjectEnquiry projectName={project.name} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Related Projects ────────────────────────────────────────────────
function DetailRelated({ currentId }) {
  const related = getRelatedProjects(currentId, 3)
  if (!related.length) return null

  return (
    <section aria-labelledby="related-heading" className="section-gap bg-ivory">
      <div className="container-site">
        <Reveal>
          <div className="flex items-center justify-between gap-6 mb-12 flex-wrap">
            <div className="flex items-center gap-5">
              <span className="block h-px bg-[#C9A96E] w-8 shrink-0" aria-hidden="true" />
              <h2 id="related-heading" className="font-display font-light text-display-lg text-charcoal">
                Related <em className="italic text-brick">Projects</em>
              </h2>
            </div>
            <Link to="/projects/" className="btn-outline shrink-0">
              View All
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {related.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1} y={20}>
              <Link
                to={`/projects/${project.slug}/`}
                className="group block bg-white overflow-hidden shadow-card hover:shadow-card-hover
                  transition-shadow duration-[600ms] focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-brick"
                aria-label={`View ${project.name} in ${project.location}`}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={`absolute top-3 left-3 px-2.5 py-0.5 font-sans text-[0.58rem] font-medium tracking-widest uppercase
                    ${project.status === 'Upcoming' ? 'bg-brick text-ivory' : 'bg-charcoal/75 text-ivory'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-light text-display-md text-charcoal mb-1 group-hover:text-brick transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <LocationIcon size={11} className="text-stone" />
                    <span className="font-sans text-xs text-stone">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-0 text-brick">
                    <span className="font-sans text-xs font-medium tracking-widest uppercase mr-2">View Project</span>
                    <span className="block h-px bg-brick transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-4 group-hover:w-7" aria-hidden="true" />
                    <ArrowIcon size={12} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Footer ──────────────────────────────────────────────────────────
function DetailFooter() {
  return (
    <footer aria-label="Site footer" className="bg-charcoal border-t border-stone/15">
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-10 items-start">
          <div className="flex flex-col gap-4 max-w-[200px]">
            <Link to="/" aria-label="The Redbricks home">
              <picture>
                <source srcSet="/logo-sq.webp" type="image/webp" />
                <img src="/logo-sq.png" alt="The Redbricks"
                  className="h-10 w-auto object-contain" />
              </picture>
            </Link>
            <p className="font-sans text-xs text-stone leading-relaxed">Premium Real Estate Partners. Navi Mumbai.</p>
          </div>

          <nav aria-label="Footer navigation" className="md:justify-self-center">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}
                    className="font-sans text-sm text-stone hover:text-[#C9A96E] transition-colors duration-300
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-2">
            <a href={CONTACT.phoneHref} className="font-sans text-sm text-stone hover:text-[#C9A96E] transition-colors">{CONTACT.phone}</a>
            <a href={CONTACT.emailHref} className="font-sans text-sm text-stone hover:text-[#C9A96E] transition-colors">{CONTACT.email}</a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone/15 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-stone/55">© {new Date().getFullYear()} The Redbricks. All rights reserved.</p>
          <p className="font-sans text-xs text-stone/55">
            Developed by{' '}
            <a href="https://www.glocious.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A96E] transition-colors">
              Glocious Infotech Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center
          rounded-full shadow-lg hover:scale-110 transition-transform duration-300
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]">
        <WhatsAppIcon />
      </a>
    </footer>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project  = getProjectBySlug(slug)
  const prefersReduced = useReducedMotion()

  if (!project) return <Navigate to="/projects/" replace />

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title={`${project.name} — ${project.config}`}
        description={project.description}
        canonical={`/projects/${project.slug}/`}
        image={project.largeImage}
        type="website"
      />
      <JsonLd data={[ORGANIZATION_SCHEMA, buildProjectSchema(project)]} />
      <Nav />

      <main id="main-content">
        {/* 1. Hero */}
        <DetailHero project={project} prefersReduced={prefersReduced} />

        {/* 1b. Pecan-style project data bar — horizontal labeled strip */}
        <PecanDataBar project={project} />

        {/* 2. Overview */}
        <DetailOverview project={project} />

        {/* 3. Gallery */}
        <DetailGallery project={project} />

        {/* 4. Configurations / pricing */}
        <DetailConfigurations project={project} />

        {/* 5. Amenities */}
        <DetailAmenities project={project} />

        {/* 6. Location */}
        <DetailLocation project={project} />

        {/* 7. Floor plans / brochure — only show when real files exist */}
        {(project.brochure || project.floorPlan) && (
          <section aria-labelledby="docs-heading" className="section-gap-sm bg-offwhite">
            <div className="container-site">
              <Reveal>
                <h2 id="docs-heading" className="font-display font-light text-display-lg text-charcoal mb-8">
                  Downloads
                </h2>
              </Reveal>
              <div className="flex flex-wrap gap-4">
                {project.brochure && (
                  <a href={project.brochure} download className="btn-outline">
                    Download Brochure
                    <DownloadIcon />
                  </a>
                )}
                {project.floorPlan && (
                  <a href={project.floorPlan} download className="btn-outline">
                    Download Floor Plan
                    <DownloadIcon />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 8. Enquiry form */}
        <DetailEnquiry project={project} />

        {/* 9. Related projects */}
        <DetailRelated currentId={project.id} />
      </main>

      {/* 10. Footer */}
      <DetailFooter />
    </div>
  )
}

// ─── Shared small components ─────────────────────────────────────────────────
function ArrowIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function LocationIcon({ size = 12, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
      <path d="M12 21s-8-5.686-8-12a8 8 0 1116 0c0 6.314-8 12-8 12z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.848L.057 23.571a.5.5 0 00.607.63l5.882-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.67-.523-5.188-1.43l-.37-.222-3.843 1.008 1.03-3.742-.242-.383A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function ContactRow({ icon, label, value, href, external = false }) {
  const icons = {
    phone: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>,
    email: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    whatsapp: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.848L.057 23.571a.5.5 0 00.607.63l5.882-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.67-.523-5.188-1.43l-.37-.222-3.843 1.008 1.03-3.742-.242-.383A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>,
  }
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 text-white hover:text-[#C9A96E] transition-colors duration-300"
    >
      <span className="w-9 h-9 border border-stone/30 flex items-center justify-center shrink-0 group-hover:border-[#C9A96E] transition-colors duration-300">
        {icons[icon]}
      </span>
      <div>
        <p className="eyebrow text-stone/60 text-[0.55rem] mb-0.5">{label}</p>
        <p className="font-sans text-sm">{value}</p>
      </div>
    </a>
  )
}
