import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONTACT } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.4, 0, 0.2, 1]

export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', background: '#0C0A09' }}
    >
      {/* ── Background video ─────────────────────────────────────────────────
          - autoPlay / muted / loop / playsInline are all required for
            autoplay to work on every browser and iOS.
          - preload="metadata" avoids downloading the full 27 MB on page load;
            the browser only fetches the first few frames initially.
          - When the user prefers reduced motion we show a static poster
            (the first frame of the video) instead of playing it.
          - The <source> inside <video> gives the browser the MIME type hint.
      ── */}
      {prefersReduced ? (
        /* Static poster for reduced-motion users */
        <img
          src="/images/celestia-lg.jpg"
          alt="Premium residential architecture in Navi Mumbai"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/images/video.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img
            src="/images/celestia-lg.jpg"
            alt="Premium residential architecture in Navi Mumbai"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      )}

      {/* ── Gradient overlay ─────────────────────────────────────────────────
          Two-layer gradient:
          1. Bottom-up — ensures text is readable
          2. Left-side vignette — gives the composition depth
      ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10,8,7,0.88) 0%, rgba(10,8,7,0.45) 35%, rgba(10,8,7,0.08) 62%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(10,8,7,0.55) 0%, rgba(10,8,7,0.15) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* ── Hero content ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end"
        style={{ paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
      >
        <div className="container-site">

          {/* Eyebrow */}
          <motion.p
            className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-white/55 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            Premium Real Estate Partners · Navi Mumbai
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display font-light text-white mb-5 leading-[1.04]"
            style={{ fontSize: 'clamp(2.75rem,6.5vw,5.75rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.95, ease: EASE }}
          >
            Where Commitment Meets{'\n'}
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>
              Exceptional Living
            </em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="font-sans font-light text-white/60 mb-9 leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem,1.5vw,1.125rem)', maxWidth: '520px' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.85, ease: EASE }}
          >
            Two decades of trusted expertise in residential and commercial
            real estate across Navi Mumbai.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.8, ease: EASE }}
          >
            <Link to="/projects/" className="btn-outline-light">
              Explore Projects
              <ArrowRight />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans text-ui-sm
                tracking-[0.1em] uppercase text-white/60
                hover:text-white transition-colors duration-300"
            >
              Enquire on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Floating stats — desktop only ───────────────────────────────── */}
      {!prefersReduced && (
        <motion.div
          className="absolute right-0 bottom-[4.5rem] z-30 hidden lg:flex flex-col gap-5 pr-14"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          {[
            { value: '20+',      label: 'Years Expertise' },
            { value: '5,000+',   label: 'Satisfied Investors' },
            { value: '5L+ sqft', label: 'Inventory Sold' },
          ].map((s) => (
            <div key={s.label} className="text-right">
              <p className="font-display font-light text-white text-2xl leading-none mb-0.5">
                {s.value}
              </p>
              <p className="font-sans text-[0.58rem] text-white uppercase tracking-[0.14em]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Scroll indicator ── */}
      {!prefersReduced && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30
            hidden sm:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          aria-hidden="true"
        >
          <span className="font-sans text-[0.58rem] text-white/35 uppercase tracking-[0.2em] mb-1">
            Scroll
          </span>
          <motion.span
            className="block w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}

      {/* ── Thin bottom line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/[0.06]"
        aria-hidden="true"
      />
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
