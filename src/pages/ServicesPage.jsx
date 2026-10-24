import React from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'
import { Link } from 'react-router-dom'

const EASE = [0.4, 0, 0.2, 1]

const SERVICES = [
  {
    title: 'Residential Sales',
    body:  'Expert guidance for homebuyers seeking premium 2, 3, and 4 BHK residences across Navi Mumbai.',
    icon:  '01',
  },
  {
    title: 'Commercial Properties',
    body:  'Dedicated support for businesses and investors seeking office spaces and retail units in Navi Mumbai\'s prime commercial precincts.',
    icon:  '02',
  },
  {
    title: 'Sole Selling Partner',
    body:  'We act as the authorised sole selling agent for premium developments, delivering targeted marketing and qualified buyer introductions.',
    icon:  '03',
  },
  {
    title: 'Investment Advisory',
    body:  'Personalised guidance for investors looking to build or diversify their real estate portfolio across Navi Mumbai\'s most promising micro-markets.',
    icon:  '04',
  },
  {
    title: 'End-to-End Transaction Support',
    body:  'From the initial site visit to final possession, our team manages the entire transaction — documentation, negotiation, and handover.',
    icon:  '05',
  },
  {
    title: 'Client Relationship Management',
    body:  'We build long-term relationships built on transparency and trust, ensuring every client receives the attention and service they deserve.',
    icon:  '06',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Services — The Redbricks"
        description="The Redbricks offers residential and commercial real estate services in Navi Mumbai — from homebuying guidance to sole-selling partnerships and investment advisory."
        canonical="/services/"
      />
      <Nav />

      <main id="main-content">

        {/* ── Page hero header ── */}
        <section
          className="bg-charcoal text-center"
          style={{ paddingTop: 'calc(80px + 5rem)', paddingBottom: '5rem' }}
          aria-label="Services page header"
        >
          <div className="container-site">
            <motion.p
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              What We Do
            </motion.p>

            <motion.h1
              className="font-display font-light text-white"
              style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              Our{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Services</em>
            </motion.h1>

            <motion.p
              className="font-sans font-light text-white/50 mx-auto mt-5"
              style={{ fontSize: '1.0625rem', maxWidth: '48ch' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            >
              End-to-end real estate expertise — from first enquiry to final possession.
            </motion.p>
          </div>
        </section>

        {/* ── Services grid ── */}
        <section aria-labelledby="services-heading" className="bg-white">
          <div className="container-site py-20 md:py-28">
            <h2 id="services-heading" className="sr-only">Services we offer</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 border-l border-stone/[0.12]">
              {SERVICES.map((svc, i) => (
                <motion.article
                  key={svc.title}
                  className="border-r border-b border-stone/[0.12] px-8 py-10"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                >
                  {/* Number */}
                  <span className="font-sans text-[0.65rem] tracking-[0.16em] text-stone/40 mb-5 block">
                    {svc.icon}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display font-light text-charcoal mb-4"
                    style={{ fontSize: 'clamp(1.1rem,1.8vw,1.375rem)', lineHeight: 1.2 }}
                  >
                    {svc.title}
                  </h3>

                  {/* Body */}
                  <p className="font-sans font-light text-stone leading-relaxed"
                    style={{ fontSize: '0.9375rem' }}>
                    {svc.body}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link to="/contact-us/" className="btn-outline">
                Speak With Our Team
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <EnquiryFooter />
      </main>
    </div>
  )
}
