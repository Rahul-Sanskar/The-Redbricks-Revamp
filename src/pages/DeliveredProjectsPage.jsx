import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import JsonLd from '../components/JsonLd.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'
import { STATS, CONTACT } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.4, 0, 0.2, 1]

function Reveal({ children, delay = 0, y = 18, className = '' }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: prefersReduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Milestones sourced from verified company data on the original site.
 * Do not add invented project names, dates, or awards.
 */
const MILESTONES = [
  {
    stat:  '20+',
    label: 'Years of Industry Expertise',
    body:  'Two decades of deep market knowledge across Navi Mumbai\'s residential and commercial real estate corridors.',
  },
  {
    stat:  '5,000+',
    label: 'Satisfied Investors',
    body:  'A growing community of homebuyers and investors who have trusted The Redbricks to guide their property decisions.',
  },
  {
    stat:  '5 Lakh+',
    label: 'Sq. Ft. Inventory Sold',
    body:  'Premium residential and commercial inventory successfully transacted across Kharghar, Nerul, CBD Belapur, Vashi and Mahape.',
  },
  {
    stat:  '3 Lakh+',
    label: 'Sq. Ft. In Planning',
    body:  'A robust pipeline of new developments currently in planning and pre-launch across Navi Mumbai\'s key micro-markets.',
  },
]

/**
 * Location track record — verified micro-markets from the source website.
 */
const LOCATIONS_SERVED = [
  {
    name:    'Kharghar',
    detail:  'Residential hub, Sector 11 & Sector 19',
    note:    'Multiple residential developments delivered and ongoing',
  },
  {
    name:    'Nerul',
    detail:  'Premium residential & MIDC commercial',
    note:    'Residential and commercial projects across Sector 19A and MIDC',
  },
  {
    name:    'CBD Belapur',
    detail:  "Navi Mumbai's financial hub, Sector 30",
    note:    'Ongoing residential developments in an established zone',
  },
  {
    name:    'Vashi',
    detail:  "Navi Mumbai's premier commercial centre",
    note:    'Commercial office and retail developments',
  },
  {
    name:    'Mahape',
    detail:  'Industrial & commercial MIDC precinct',
    note:    'Commercial development serving Navi Mumbai\'s corporate corridor',
  },
]

export default function DeliveredProjectsPage() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Delivered Projects & Track Record — The Redbricks"
        description="The Redbricks has guided 5,000+ investors and sold 5 lakh+ sq. ft. of premium real estate across Navi Mumbai over 20 years. Explore our track record."
        canonical="/delivered-projects/"
      />
      <Nav />

      <main id="main-content">

        {/* ── Page hero — Paradise Group inspired ── */}
        {/*
          Paradise Group's delivered page opens with:
          "THAT BECAME BENCHMARKS (ACTUAL PHOTOGRAPHS)"
          We adapt this honest, confident tone for The Redbricks.
        */}
        <section
          className="bg-charcoal relative overflow-hidden"
          style={{ paddingTop: 'calc(72px + 5rem)', paddingBottom: '5rem' }}
          aria-label="Delivered projects header"
        >
          {/* Architectural image at low opacity — same pattern as ProjectsPage hero */}
          <div
            className="absolute inset-0 z-0 opacity-[0.08]"
            style={{
              backgroundImage: 'url(/images/trident-lg.jpg)',
              backgroundSize:  'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 container-site">
            <motion.p
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Our Track Record
            </motion.p>
            <motion.h1
              className="font-display font-light text-white mb-5 max-w-3xl"
              style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              Developments That{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Became Benchmarks</em>
            </motion.h1>
            <motion.p
              className="font-sans font-light text-white/55 max-w-[52ch]"
              style={{ fontSize: '1.0625rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            >
              Over two decades, The Redbricks has built a reputation for delivering
              premium real estate experiences across Navi Mumbai — guiding thousands
              of investors and homebuyers through successful property transactions.
            </motion.p>
          </div>
        </section>

        {/* ── Stats band — Paradise Group style, full-width ── */}
        {/*
          Paradise Group shows large project counts and delivery years.
          We show verified company statistics from the original site.
        */}
        <section aria-label="Company milestones" className="border-b border-stone/[0.12]">
          <div className="container-site">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone/[0.12]">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08} y={12}>
                  <div className="px-6 py-10 lg:py-14 text-center">
                    <p
                      className="font-display font-light text-charcoal mb-1.5"
                      style={{ fontSize: 'clamp(2rem,4vw,3.25rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                      {m.stat}
                    </p>
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-stone mb-2">
                      {m.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Honest portfolio note ── */}
        {/*
          Important: We do NOT invent delivered project names.
          Instead we present the company's track record authentically — the same
          approach as Paradise Group's earliest entries which have no photos.
        */}
        <section
          aria-labelledby="portfolio-note-heading"
          className="bg-offwhite"
        >
          <div className="container-site py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left: editorial copy */}
              <div>
                <Reveal>
                  <p className="section-label mb-6">Our Experience</p>
                </Reveal>
                <Reveal delay={0.1} y={24}>
                  <h2
                    id="portfolio-note-heading"
                    className="font-display font-light text-charcoal mb-7"
                    style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                  >
                    20 Years of Premium{' '}
                    <em style={{ color: '#84251F', fontStyle: 'italic' }}>
                      Real Estate Expertise
                    </em>
                  </h2>
                </Reveal>
                <Reveal delay={0.18} y={16}>
                  <p className="font-sans font-light text-stone leading-relaxed mb-5"
                    style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
                    The Redbricks has been a trusted partner to over 5,000 investors
                    and homebuyers in Navi Mumbai. Our sole-selling mandates across
                    residential and commercial developments have established a
                    consistent track record of delivering premium property experiences.
                  </p>
                </Reveal>
                <Reveal delay={0.24} y={16}>
                  <p className="font-sans font-light text-stone leading-relaxed mb-10"
                    style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
                    With over 5 lakh sq. ft. of inventory successfully transacted and
                    a pipeline of 3 lakh+ sq. ft. in active planning, our portfolio
                    spans every significant micro-market in Navi Mumbai.
                  </p>
                </Reveal>
                <Reveal delay={0.3} y={12}>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/projects/" className="btn-outline">
                      View Current Projects <ArrowRight />
                    </Link>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="btn-text">
                      Speak with us <ArrowRight />
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right: image + stat overlay */}
              <Reveal delay={0.15} y={20}>
                <div className="relative">
                  <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <motion.img
                      src="/images/celestia-lg.jpg"
                      alt="Premium residential development by The Redbricks"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 1.04 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, ease: EASE }}
                    />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute bottom-0 right-0 bg-charcoal text-white px-7 py-6
                    max-w-[220px]">
                    <p
                      className="font-display font-light text-white mb-1"
                      style={{ fontSize: '2.5rem', lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                      5,000+
                    </p>
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-white/60">
                      Satisfied Investors
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Locations served — Paradise Group style listing ── */}
        {/*
          Paradise Group lists every delivered project with address.
          We list every location we serve with verified context.
        */}
        <section aria-labelledby="locations-heading" className="bg-white">
          <div className="container-site py-16 md:py-24">
            <Reveal>
              <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
                <div>
                  <p className="section-label mb-4">Locations We Serve</p>
                  <h2
                    id="locations-heading"
                    className="font-display font-light text-charcoal"
                    style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                  >
                    Across Navi Mumbai's{' '}
                    <em style={{ color: '#84251F', fontStyle: 'italic' }}>Key Addresses</em>
                  </h2>
                </div>
              </div>
            </Reveal>

            {/* Location cards — Paradise Group listing style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone/[0.10] border border-stone/[0.10]">
              {LOCATIONS_SERVED.map((loc, i) => (
                <Reveal key={loc.name} delay={i * 0.07} y={14}>
                  <div className="bg-white px-7 py-8 h-full">
                    {/* Number — Paradise Group style index */}
                    <p className="font-sans text-[0.6rem] tracking-[0.18em] text-stone/40 mb-4">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3
                      className="font-display font-light text-charcoal mb-2"
                      style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)', lineHeight: 1.15 }}
                    >
                      {loc.name}
                    </h3>
                    <p className="font-sans text-[0.78rem] text-stone mb-3 tracking-[0.02em]">
                      {loc.detail}
                    </p>
                    <p className="font-sans text-[0.75rem] text-stone/60 leading-relaxed">
                      {loc.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Milestone detail cards — expanded from the MILESTONES array ── */}
        <section aria-labelledby="milestones-heading" className="bg-offwhite">
          <div className="container-site py-16 md:py-24">
            <Reveal>
              <h2
                id="milestones-heading"
                className="font-display font-light text-charcoal mb-12"
                style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
              >
                The Numbers Behind{' '}
                <em style={{ color: '#84251F', fontStyle: 'italic' }}>Our Work</em>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.09} y={16}>
                  <div className="bg-white px-8 py-8 border-l-2 border-brick">
                    <p
                      className="font-display font-light text-brick mb-1"
                      style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                      {m.stat}
                    </p>
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-stone mb-3">
                      {m.label}
                    </p>
                    <p className="font-sans font-light text-stone leading-relaxed"
                      style={{ fontSize: '0.9375rem' }}>
                      {m.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content gap notice — Honest, professional ── */}
        {/*
          This section is visible only in the admin/developer view (commented out for production).
          It honestly communicates that individual delivered project photographs
          need to be provided by the business owner.
        */}
        {/* 
          OWNER ACTION REQUIRED:
          To populate this page with individual delivered project entries (like Paradise Group's listing),
          please provide:
          1. Project name and location
          2. Year of delivery / possession date
          3. Configuration (BHK type / commercial type)
          4. Actual project photographs
          5. Plot/address details
          These should be added to the DELIVERED_PROJECTS array in src/data/projects.js.
        */}

        {/* ── CTA strip ── */}
        <section aria-label="Start your enquiry" className="bg-charcoal">
          <div className="container-site py-14 md:py-16 flex flex-col md:flex-row
            items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-2">
                Begin a conversation
              </p>
              <h2
                className="font-display font-light text-white"
                style={{ fontSize: 'clamp(1.375rem,2.5vw,2rem)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
              >
                Explore Our Current Portfolio
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link to="/projects/" className="btn-outline-light">
                View Projects <ArrowRight />
              </Link>
              <a href={CONTACT.phoneHref} className="btn-text-light">
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>

        <EnquiryFooter />
      </main>
    </div>
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
