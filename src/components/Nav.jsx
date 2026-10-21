import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useScrolled from '../hooks/useScrolled.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { NAV_LINKS, CONTACT } from '../data/projects.js'

const EASE = [0.4, 0, 0.2, 1]

export default function Nav() {
  const scrolled       = useScrolled(40)
  const [open, setOpen] = useState(false)
  const prefersReduced  = useReducedMotion()
  const { pathname }    = useLocation()

  return (
    <>
      {/* ── Main header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50
          transition-[background-color,border-color] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled
            ? 'bg-white border-b border-stone/15'
            : 'bg-transparent border-b border-transparent'
          }`}
        style={{ height: '72px' }}
      >
        <div className="container-site h-full flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link
            to="/"
            aria-label="The Redbricks — Home"
            className="flex items-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brick"
          >
            {/* Official square logo — contains both mark and wordmark */}
            <picture>
              <source srcSet="/logo-sq.webp" type="image/webp" />
              <img
                src="/logo-sq.png"
                alt="The Redbricks"
                width={44}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </picture>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-0"
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-1 font-sans text-ui-sm tracking-[0.04em]
                    transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-brick
                    ${scrolled
                      ? active ? 'text-charcoal' : 'text-charcoal/70 hover:text-charcoal'
                      : active ? 'text-white' : 'text-white/75 hover:text-white'
                    }`}
                >
                  {link.label}
                  {/* Thin underline — only visible on hover or active */}
                  <span
                    className={`absolute bottom-[-2px] left-4 right-4 h-px
                      transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left
                      ${scrolled ? 'bg-charcoal' : 'bg-white'}
                      ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop enquiry action ── */}
          <a
            href="/contact-us/"
            className={`hidden lg:inline-flex items-center gap-2.5
              font-sans text-ui-xs tracking-[0.14em] uppercase
              transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick
              ${scrolled
                ? 'text-charcoal hover:text-brick'
                : 'text-white/80 hover:text-white'
              }`}
          >
            Enquire
            <ChevronRight
              className={`transition-colors duration-300
                ${scrolled ? 'text-stone' : 'text-white/50'}`}
            />
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden flex flex-col justify-center items-end w-10 h-10 gap-1.5
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Three lines with different widths — Emaar style */}
            <span
              className={`block h-px transition-all duration-300 origin-right
                ${scrolled ? 'bg-charcoal' : 'bg-white'}
                ${open ? 'w-6 rotate-45 translate-y-[7.5px]' : 'w-6'}`}
            />
            <span
              className={`block h-px transition-all duration-300
                ${scrolled ? 'bg-charcoal' : 'bg-white'}
                ${open ? 'opacity-0 w-0' : 'w-4'}`}
            />
            <span
              className={`block h-px transition-all duration-300 origin-right
                ${scrolled ? 'bg-charcoal' : 'bg-white'}
                ${open ? 'w-6 -rotate-45 -translate-y-[7.5px]' : 'w-6'}`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer — slides from right */}
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: prefersReduced ? 0.15 : 0.42, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-50
                w-[min(360px,90vw)] bg-white flex flex-col lg:hidden"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-7 border-b border-stone/12"
                style={{ height: '72px' }}
              >
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                  aria-label="Home"
                >
                  <picture>
                    <source srcSet="/logo-sq.webp" type="image/webp" />
                    <img
                      src="/logo-sq.png"
                      alt="The Redbricks"
                      className="h-9 w-auto object-contain"
                    />
                  </picture>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center text-stone/60
                    hover:text-charcoal transition-colors duration-200"
                >
                  <XIcon />
                </button>
              </div>

              {/* Nav links — large, editorial */}
              <ul className="flex flex-col px-7 pt-10 pb-8 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: prefersReduced ? 0 : 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: prefersReduced ? 0 : 0.06 + i * 0.05,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 border-b border-stone/10
                        font-display font-light text-display-md text-charcoal
                        hover:text-brick transition-colors duration-300
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-brick"
                    >
                      {link.label}
                      <ChevronRight className="text-stone/40 shrink-0" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Footer strip */}
              <div className="px-7 py-8 border-t border-stone/12">
                <a
                  href={CONTACT.phoneHref}
                  className="block font-sans text-ui-sm text-stone mb-1 hover:text-brick transition-colors"
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.emailHref}
                  className="block font-sans text-ui-sm text-stone hover:text-brick transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Icon helpers ── */
function ChevronRight({ className = '' }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
