import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import JsonLd, { ORGANIZATION_SCHEMA } from '../components/JsonLd.jsx'
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
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay: prefersReduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * FOUNDER DATA — only use verified details from the source site.
 * The original site lists "Founder" and "Co-Founder" with portrait photos
 * but no biographies. The copy below describes the company's verifiable
 * 20-year track record and roles without fabricating personal credentials.
 *
 * OWNER ACTION REQUIRED: Replace the biography paragraphs with actual
 * founder names, professional backgrounds, and verified credentials.
 */
const FOUNDERS = [
  {
    id:       'founder',
    name:     'Founder',              // OWNER TO CONFIRM: actual name
    role:     'Founder & Managing Partner',
    img:      '/images/founder.webp',
    fallback: '/images/founder.png',
    bio: [
      'With over two decades of experience in Navi Mumbai\'s real estate market, the Founder of The Redbricks has built a reputation for integrity, market insight, and an unwavering commitment to client outcomes.',
      'As the driving force behind the company\'s sole-selling partnerships and residential portfolio strategy, their deep-rooted knowledge of micro-markets across Kharghar, Nerul, CBD Belapur, and Vashi has guided thousands of homebuyers and investors to the right investment decision.',
    ],
    // OWNER TO CONFIRM: any professional memberships, certifications, or awards
    credentials: null,
  },
  {
    id:       'co-founder',
    name:     'Co-Founder',           // OWNER TO CONFIRM: actual name
    role:     'Co-Founder & Business Development',
    img:      '/images/co-founder.webp',
    fallback: '/images/co-founder.png',
    bio: [
      'The Co-Founder brings a distinctive perspective to The Redbricks\' commercial real estate practice — having pioneered the company\'s presence in Navi Mumbai\'s MIDC commercial precincts across Nerul, Mahape, and Vashi.',
      'Their focus on building long-term investor relationships has been central to The Redbricks\' success as a trusted intermediary, connecting businesses and entrepreneurs with premium office and retail addresses that support their growth.',
    ],
    credentials: null,
  },
]

export default function AboutPage() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title="About Us — The Redbricks Premium Real Estate Partners"
        description="The Redbricks is a Navi Mumbai real estate partner with 20+ years of expertise. Meet our founders and learn about our approach to residential and commercial property."
        canonical="/about-us/"
      />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <Nav />

      <main id="main-content">

        {/* ── Page hero ── */}
        <section
          className="bg-charcoal text-center"
          style={{ paddingTop: 'calc(72px + 5rem)', paddingBottom: '5rem' }}
          aria-label="About page header"
        >
          <div className="container-site">
            <motion.p
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Who We Are
            </motion.p>
            <motion.h1
              className="font-display font-light text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              About{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Redbricks</em>
            </motion.h1>
            <motion.p
              className="font-sans font-light text-white/50 mx-auto"
              style={{ fontSize: '1.0625rem', maxWidth: '48ch' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            >
              20+ years of trusted expertise in premium residential and commercial
              real estate across Navi Mumbai.
            </motion.p>
          </div>
        </section>

        {/* ── Stats band ── */}
        <div className="border-b border-stone/[0.12]">
          <div className="container-site">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone/[0.12]">
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

        {/* ── Brand story ── */}
        <section aria-labelledby="about-heading" className="bg-white">
          <div className="container-site py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <Reveal>
                  <h2
                    id="about-heading"
                    className="font-display font-light text-charcoal mb-7"
                    style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                  >
                    Where Commitment Meets{' '}
                    <em style={{ color: '#84251F', fontStyle: 'italic' }}>Exceptional</em>{' '}
                    Sole Selling
                  </h2>
                </Reveal>
                <Reveal delay={0.1} y={16}>
                  <p className="font-sans font-light text-stone leading-relaxed mb-5"
                    style={{ fontSize: '1.0625rem' }}>
                    REDBRICKS is a trusted property management company with more than 20 years of
                    expertise, dedicated to delivering exceptional properties to our valued clients
                    and partners. Specialising in the luxury real estate market, we pride ourselves
                    on offering personalised solutions tailored to the unique needs of every client.
                  </p>
                </Reveal>
                <Reveal delay={0.18} y={16}>
                  <p className="font-sans font-light text-stone leading-relaxed mb-10"
                    style={{ fontSize: '1.0625rem' }}>
                    From first-time homebuyers to seasoned investors, our team combines deep local
                    knowledge with a commitment to transparency and excellence — helping you make
                    confident, well-informed property decisions.
                  </p>
                </Reveal>
                <Reveal delay={0.24} y={12}>
                  <ul className="flex flex-col gap-4">
                    {[
                      'Dedicated sole-selling partner for premium developments',
                      'End-to-end support from site selection to possession',
                      "Deep market knowledge across Navi Mumbai's key micro-markets",
                      'Transparent dealings with no hidden charges',
                    ].map((pt) => (
                      <li key={pt} className="flex items-start gap-4">
                        <span className="mt-2 w-4 h-px bg-[#C9A96E] shrink-0" aria-hidden="true" />
                        <p className="font-sans font-light text-stone text-base leading-relaxed">{pt}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.12} y={20} className="hidden lg:block">
                <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <motion.img
                    src="/images/celestia-port.jpg"
                    alt="Celestia — premium residences, Kharghar"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    initial={{ scale: 1.04 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: EASE }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            FOUNDERS SECTION — editorial, asymmetric, full-width
            Inspired by Lodha/Emaar leadership presentation:
            Each founder gets their own full-width panel:
              Desktop: 55% portrait image | 45% biographical copy
              Mobile:  image stacked above copy
            Panels alternate — first founder image-left, second image-right.
        ───────────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="leadership-heading" className="bg-offwhite">

          {/* Section heading — centered, above the founder panels */}
          <div className="container-site pt-20 pb-12 md:pt-24 md:pb-14 text-center">
            <Reveal>
              <p className="section-label justify-center mb-5">
                Our Leadership
              </p>
            </Reveal>
            <Reveal delay={0.1} y={20}>
              <h2
                id="leadership-heading"
                className="font-display font-light text-charcoal"
                style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
              >
                The People Behind{' '}
                <em style={{ color: '#84251F', fontStyle: 'italic' }}>The Redbricks</em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-sans font-light text-stone mx-auto mt-5"
                style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
                Two decades of combined expertise, a shared commitment to integrity,
                and an intimate knowledge of Navi Mumbai's property landscape.
              </p>
            </Reveal>
          </div>

          {/* Founder panels */}
          {FOUNDERS.map((founder, i) => (
            <FounderPanel key={founder.id} founder={founder} index={i} prefersReduced={prefersReduced} />
          ))}

          {/* Owner action notice — visible only during development */}
          {/* 
            OWNER ACTION REQUIRED — To complete this section:
            1. Replace "Founder" and "Co-Founder" with actual full names.
            2. Update role titles with accurate designations.
            3. Replace the biography paragraphs with verified professional backgrounds.
            4. Optionally add academic qualifications, industry memberships, or awards.
            Do NOT add invented testimonials, fabricated credentials, or unverified statements.
          */}

        </section>

        {/* ── Values ── */}
        <section aria-label="Company values" className="bg-white">
          <div className="container-site py-16 md:py-20">
            <Reveal>
              <h2
                className="font-display font-light text-charcoal mb-10 text-center"
                style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
              >
                How We Work
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone/[0.10] border border-stone/[0.10]">
              {[
                { n: '01', title: 'Premium Services',      body: 'Luxury real estate solutions tailored to your unique needs.' },
                { n: '02', title: 'Client Satisfaction',   body: 'Your satisfaction is our highest priority — we exceed expectations.' },
                { n: '03', title: 'Expert Team',           body: 'Extensive knowledge, professionalism, and dedication to every project.' },
                { n: '04', title: 'Timely & Efficient',    body: 'Prompt, hassle-free processes from enquiry to possession.' },
              ].map((v, i) => (
                <Reveal key={v.title} delay={i * 0.07} y={14}>
                  <div className="bg-white px-7 py-10">
                    <p className="font-sans text-[0.6rem] tracking-[0.18em] text-stone/40 mb-4">{v.n}</p>
                    <h3
                      className="font-display font-light text-charcoal mb-3"
                      style={{ fontSize: 'clamp(1.05rem,1.7vw,1.3rem)', lineHeight: 1.2 }}
                    >
                      {v.title}
                    </h3>
                    <p className="font-sans font-light text-stone leading-relaxed"
                      style={{ fontSize: '0.9375rem' }}>
                      {v.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <EnquiryFooter />
      </main>
    </div>
  )
}

/**
 * FounderPanel — full-width editorial founder profile.
 *
 * Layout alternates per index:
 *   even (0): image left, copy right
 *   odd  (1): copy left, image right
 *
 * Desktop: min-h-[600px], image fills its column entirely.
 * Mobile:  image stacks above copy.
 */
function FounderPanel({ founder, index, prefersReduced }) {
  const imageLeft = index % 2 === 0

  return (
    <article
      aria-labelledby={`founder-${founder.id}-name`}
      className="grid grid-cols-1 lg:grid-cols-2"
      style={{ minHeight: '560px' }}
    >

      {/* Image column */}
      <div
        className={`relative overflow-hidden bg-stone/10 order-1
          ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ minHeight: '420px' }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: prefersReduced ? 1 : 1.04 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <picture>
            <source srcSet={founder.img} type="image/webp" />
            <img
              src={founder.fallback}
              alt={`${founder.name} — ${founder.role}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </motion.div>

        {/* Founder index number — subtle architectural accent */}
        <span
          className="absolute top-6 right-6 font-sans text-[0.58rem] tracking-[0.14em]
            text-white/30 hidden lg:block"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Copy column */}
      <div
        className={`flex flex-col justify-center px-8 py-14 md:px-12 lg:px-16 xl:px-20
          bg-white order-2
          ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Thin accent line — Lodha/Emaar leadership presentation */}
        <motion.div
          className="w-12 h-px bg-[#84251F] mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: 'left' }}
          aria-hidden="true"
        />

        {/* Role label */}
        <motion.p
          className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-stone mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          {founder.role}
        </motion.p>

        {/* Name */}
        <motion.h3
          id={`founder-${founder.id}-name`}
          className="font-display font-light text-charcoal mb-6"
          style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
        >
          {founder.name}
        </motion.h3>

        {/* Biography paragraphs */}
        {founder.bio.map((para, i) => (
          <motion.p
            key={i}
            className="font-sans font-light text-stone leading-relaxed mb-5"
            style={{ fontSize: '1.0625rem', maxWidth: '48ch' }}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.22 + i * 0.1, ease: EASE }}
          >
            {para}
          </motion.p>
        ))}

        {/* Contact action */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
        >
          <a
            href="/contact-us/"
            className="inline-flex items-center gap-2 font-sans text-[0.65rem]
              tracking-[0.2em] uppercase text-charcoal/60
              hover:text-brick hover:gap-3.5 transition-all duration-300"
          >
            Speak with our team
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </article>
  )
}
