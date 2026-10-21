import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useReducedMotion from '../hooks/useReducedMotion.js'

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

export default function BrandIntro() {
  return (
    <section
      aria-labelledby="brand-heading"
      className="bg-white"
    >
      {/*
        Emaar layout: full-width asymmetric split.
        Left column = large image bleeding to edge.
        Right column = copy, wide paragraph, text link.
        No decorative gold rules. No floating stat cards.
        No coloured backgrounds.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* ── Left — image bleeds to viewport edge on desktop ── */}
        <div className="relative overflow-hidden bg-offwhite order-2 lg:order-1"
          style={{ minHeight: '480px' }}>
          <motion.img
            src="/images/celestia-port.jpg"
            alt="Premium residences — Celestia, Kharghar"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.04, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.3, ease: EASE }}
          />
        </div>

        {/* ── Right — editorial copy ── */}
        <div className="order-1 lg:order-2 flex flex-col justify-center
          px-8 py-16 md:px-14 lg:px-16 xl:px-20
          lg:py-20"
        >
          <Reveal>
            <p className="section-label mb-8">About The Redbricks</p>
          </Reveal>

          <Reveal delay={0.1} y={28}>
            <h2
              id="brand-heading"
              className="font-display font-light text-charcoal mb-7"
              style={{
                fontSize: 'clamp(1.75rem,3.5vw,2.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
              }}
            >
              Where Commitment Meets{' '}
              <em className="italic not-italic" style={{ color: '#84251F' }}>
                Exceptional
              </em>{' '}
              Sole Selling
            </h2>
          </Reveal>

          <Reveal delay={0.18} y={16}>
            <p className="font-sans font-light text-stone leading-relaxed mb-5"
              style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
              REDBRICKS is a trusted real estate partner with more than 20 years of expertise,
              dedicated to delivering exceptional properties to our valued clients and partners.
              Specialising in the luxury real estate market, we pride ourselves on offering
              personalised solutions tailored to the unique needs of every client.
            </p>
          </Reveal>

          <Reveal delay={0.24} y={16}>
            <p className="font-sans font-light text-stone leading-relaxed mb-10"
              style={{ fontSize: '1.0625rem', maxWidth: '52ch' }}>
              From first-time homebuyers to seasoned investors, our team combines deep local
              knowledge with a commitment to transparency and excellence.
            </p>
          </Reveal>

          <Reveal delay={0.3} y={12}>
            <Link to="/about-us/" className="btn-text">
              Learn More
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ── Values row — below the split, full width, white bg ── */}
      {/* Emaar uses a simple horizontal facts strip with thin borders */}
      <div className="border-t border-stone/12">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone/12">
            {[
              { title: 'Premium Services',         body: 'Luxury real estate solutions tailored to your unique needs.' },
              { title: 'Client Satisfaction',      body: 'Your satisfaction is our highest priority — we exceed expectations.' },
              { title: 'Expert Team',              body: 'Extensive knowledge, professionalism, and dedication to every project.' },
              { title: 'Timely & Efficient',       body: 'Prompt, hassle-free processes from enquiry to possession.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07} y={14}>
                <div className="px-7 py-10 lg:py-12">
                  <h3
                    className="font-display font-light text-charcoal mb-3"
                    style={{ fontSize: 'clamp(1.1rem,1.8vw,1.375rem)', lineHeight: 1.2 }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-sans font-light text-stone leading-relaxed"
                    style={{ fontSize: '0.9rem' }}>
                    {item.body}
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
