import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { LOCATIONS } from '../data/projects.js'

const EASE = [0.4, 0, 0.2, 1]

function Reveal({ children, delay = 0, y = 20, className = '' }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay: prefersReduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/*
  Emaar's community / lifestyle sections:
  - Full-width image on one side, copy on the other
  - Background is always white or very light
  - No coloured blocks, no floating cards
  - Image and text share exactly 50% of the page
  - Section has generous top/bottom whitespace
*/
export default function LocationLifestyle() {
  return (
    <section aria-labelledby="location-heading" className="bg-offwhite">

      {/* ── Main split — image right, copy left ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* Copy — left on desktop */}
        <div className="flex flex-col justify-center
          px-8 py-16 md:px-14 lg:px-16 xl:px-20
          lg:py-24 order-2 lg:order-1"
        >
          <Reveal>
            <p className="section-label mb-8">Where We Operate</p>
          </Reveal>

          <Reveal delay={0.1} y={28}>
            <h2
              id="location-heading"
              className="font-display font-light text-charcoal mb-7"
              style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
            >
              Navi Mumbai's{' '}
              <em className="italic" style={{ color: '#84251F', fontStyle: 'italic' }}>
                Most Sought-After
              </em>{' '}
              Addresses
            </h2>
          </Reveal>

          <Reveal delay={0.18} y={16}>
            <p className="font-sans font-light text-stone leading-relaxed mb-5"
              style={{ fontSize: '1.0625rem', maxWidth: '50ch' }}>
              Navi Mumbai has emerged as one of India's most thoughtfully planned urban
              developments — offering exceptional quality of life, modern infrastructure,
              and strong connectivity to Mumbai.
            </p>
          </Reveal>

          <Reveal delay={0.24} y={16}>
            <p className="font-sans font-light text-stone leading-relaxed mb-10"
              style={{ fontSize: '1.0625rem', maxWidth: '50ch' }}>
              The Redbricks positions you at the centre of Navi Mumbai's finest
              real estate opportunities across five key micro-markets.
            </p>
          </Reveal>

          {/* Location list — clean, no icons */}
          <Reveal delay={0.3} y={12}>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 mb-10"
              aria-label="Locations we serve">
              {[
                { name: 'Kharghar',    sub: 'Residential Hub' },
                { name: 'CBD Belapur', sub: 'Commercial & Residential' },
                { name: 'Nerul',       sub: 'Premium Residential' },
                { name: 'Vashi',       sub: 'Commercial Centre' },
                { name: 'Thane',       sub: 'Expanding Corridor' },
                { name: 'Mahape',      sub: 'Industrial & Commercial' },
              ].map((loc) => (
                <li key={loc.name}>
                  <p className="font-display font-light text-charcoal"
                    style={{ fontSize: 'clamp(1rem,1.6vw,1.25rem)', lineHeight: 1.2 }}>
                    {loc.name}
                  </p>
                  <p className="font-sans text-[0.75rem] text-stone tracking-[0.04em]">
                    {loc.sub}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.36} y={10}>
            <Link to="/projects/" className="btn-text">
              View Projects by Location
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        {/* Image — right on desktop, full-height */}
        <div className="relative overflow-hidden order-1 lg:order-2"
          style={{ minHeight: '420px' }}>
          <motion.img
            src="/images/mount-bliss.jpg"
            alt="Modern architecture in Navi Mumbai"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.04, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.3, ease: EASE }}
          />
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
