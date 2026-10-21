import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STATS } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.4, 0, 0.2, 1]

function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: prefersReduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/*
  Emaar's "More than a destination" section:
  - White background, no dark panels
  - Stats in a clean horizontal row with light dividers
  - Short paragraph, no bullet lists
  - Team portraits are simple, no cards/borders
*/
export default function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="bg-white">

      {/* ── Stats row — Emaar-style horizontal band ── */}
      <div className="border-y border-stone/12">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone/12">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} y={12}>
                <div className="px-6 py-12 lg:py-14 text-center">
                  <p
                    className="font-display font-light text-charcoal mb-2"
                    style={{ fontSize: 'clamp(2.25rem,4vw,3.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-sans text-[0.7rem] uppercase tracking-[0.14em] text-stone">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Company story + leadership ── */}
      <div className="container-site py-20 md:py-28 lg:py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Copy */}
          <div>
            <Reveal>
              <p className="section-label mb-7">Expert Real Estate Partner</p>
            </Reveal>

            <Reveal delay={0.1} y={24}>
              <h2
                id="trust-heading"
                className="font-display font-light text-charcoal mb-7"
                style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
              >
                Trusted by{' '}
                <em style={{ color: '#84251F', fontStyle: 'italic' }}>
                  5,000+
                </em>{' '}
                Investors
              </h2>
            </Reveal>

            <Reveal delay={0.18} y={14}>
              <p className="font-sans font-light text-stone leading-relaxed mb-6"
                style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
                With over 20 years of expertise in luxury real estate, REDBRICKS delivers
                personalised solutions and exceptional experiences, turning your vision
                into reality.
              </p>
            </Reveal>

            <Reveal delay={0.24} y={14}>
              <p className="font-sans font-light text-stone leading-relaxed mb-10"
                style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
                From dedicated sole-selling partnerships to end-to-end transaction support,
                our team brings deep market knowledge and transparent dealings to every project.
              </p>
            </Reveal>

            <Reveal delay={0.3} y={10}>
              <Link to="/about-us/" className="btn-text">
                Meet the Team
                <ArrowRight />
              </Link>
            </Reveal>
          </div>

          {/* Team portraits — minimal, no card frames */}
          <div className="flex gap-6 lg:gap-8 items-start">
            {[
              { name: 'Founder',    role: 'Founder, The Redbricks',    img: '/images/founder.webp',    fallback: '/images/founder.png' },
              { name: 'Co-Founder', role: 'Co-Founder, The Redbricks', img: '/images/co-founder.webp', fallback: '/images/co-founder.png' },
            ].map((person, i) => (
              <Reveal key={person.name} delay={0.1 + i * 0.12} y={16} className="flex-1">
                <div>
                  {/* Portrait — 3:4 aspect, image fills */}
                  <div className="overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
                    <picture>
                      <source srcSet={person.img} type="image/webp" />
                      <img
                        src={person.fallback}
                        alt={person.role}
                        className="w-full h-full object-cover object-top
                          transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                          hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  {/* Name and role */}
                  <p className="font-display font-light text-charcoal mb-0.5"
                    style={{ fontSize: 'clamp(1rem,1.6vw,1.2rem)' }}>
                    {person.name}
                  </p>
                  <p className="font-sans text-[0.75rem] text-stone tracking-[0.04em]">
                    {person.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
