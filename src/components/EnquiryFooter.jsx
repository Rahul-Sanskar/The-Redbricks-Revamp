import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONTACT, NAV_LINKS } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
// Replace with your real Web3Forms access key from https://web3forms.com (free)
const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

const EASE = [0.4, 0, 0.2, 1]

function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: prefersReduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ── Enquiry form ────────────────────────────────────────────────────────── */
function EnquiryForm() {
  const [form,   setForm]   = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function validate() {
    const e = {}
    if (!form.name.trim())                              e.name  = 'Please enter your name.'
    if (!form.phone.match(/^[0-9+\s\-(]{7,}$/))        e.phone = 'Please enter a valid phone number.'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res  = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, ...form, subject: 'Redbricks Enquiry from Website' }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
      if (data.success) setForm({ name: '', phone: '', email: '', message: '' })
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="py-8">
        <p className="font-display font-light text-charcoal mb-3"
          style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>
          Thank you for your enquiry.
        </p>
        <p className="font-sans font-light text-stone text-sm mb-6">
          Our team will contact you within 24 hours.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-text">
          Send another <span aria-hidden="true">→</span>
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Property enquiry form"
      className="flex flex-col gap-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <Field id="ef-name"  label="Full Name"    type="text"  value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}  error={errors.name}  autoComplete="name" />
        <Field id="ef-phone" label="Phone Number" type="tel"   value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))} error={errors.phone} autoComplete="tel" />
      </div>
      <Field id="ef-email" label="Email Address" type="email" value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))} error={errors.email} autoComplete="email" />
      <Field id="ef-msg"   label="Message (optional)" type="textarea" value={form.message}
        onChange={(v) => setForm((f) => ({ ...f, message: v }))} />

      {status === 'error' && (
        <p role="alert" className="font-sans text-sm text-red-500">
          Something went wrong. Please{' '}
          <a href={CONTACT.phoneHref} className="underline">call us directly</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
        <ArrowRight />
      </button>
    </form>
  )
}

function Field({ id, label, type, value, onChange, error, autoComplete }) {
  const cls = `input-field-dark ${error ? 'border-red-400 focus:border-red-400' : ''}`
  return (
    <div>
      <label htmlFor={id} className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-white/50 block mb-2">
        {label}
      </label>
      {type === 'textarea'
        ? <textarea id={id} rows={3} value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={label} className={`${cls} resize-none`} />
        : <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={label} autoComplete={autoComplete} className={cls} />
      }
      {error && <p role="alert" className="font-sans text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}

/* ── EnquiryFooter — the final CTA section + footer ─────────────────────── */
export default function EnquiryFooter() {
  return (
    <>
      {/* ── Emaar-style enquiry CTA ── */}
      {/*
        Emaar: "The journey begins with a conversation"
        Dark/charcoal background with white text.
        Left: headline + contact items.  Right: simple form.
      */}
      <section
        id="enquire"
        aria-labelledby="enquiry-heading"
        className="bg-charcoal"
      >
        <div className="container-site py-20 md:py-28 lg:py-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — heading + direct contact */}
            <div>
              <Reveal>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-stone/80 mb-7">
                  Begin a conversation
                </p>
              </Reveal>

              <Reveal delay={0.08} y={24}>
                <h2
                  id="enquiry-heading"
                  className="font-display font-light text-white mb-7"
                  style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                >
                  Speak with{' '}
                  <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>our team</em>
                </h2>
              </Reveal>

              <Reveal delay={0.14} y={14}>
                <p className="font-sans font-light text-stone/80 leading-relaxed mb-10"
                  style={{ fontSize: '1.0625rem', maxWidth: '46ch' }}>
                  Explore a home or investment opportunity. Our team will connect you with
                  the people best placed to help.
                </p>
              </Reveal>

              {/* Direct contacts — no boxes, just clean lines */}
              <Reveal delay={0.2} y={12}>
                <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                  {[
                    { label: 'Phone',     value: CONTACT.phone,   href: CONTACT.phoneHref,   ext: false },
                    { label: 'Email',     value: CONTACT.email,   href: CONTACT.emailHref,   ext: false },
                    { label: 'WhatsApp',  value: 'Chat with us',  href: CONTACT.whatsapp,    ext: true  },
                  ].map((c) => (
                    <div key={c.label} className="flex items-baseline gap-4">
                      <span className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-stone w-16 shrink-0">
                        {c.label}
                      </span>
                      <a
                        href={c.href}
                        {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="font-sans text-white/80 hover:text-white transition-colors duration-200
                          text-sm tracking-[0.02em]"
                      >
                        {c.value}
                      </a>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.12} y={20}>
              <div className="pt-[calc(0.65rem+0.5rem+1.75rem)]">
                {/* Align with the "section-label" height on the left */}
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer aria-label="Site footer" className="bg-charcoal border-t border-white/[0.08]">
        <div className="container-site py-14 md:py-16">

          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-10 items-start mb-12">

            {/* Brand */}
            <div>
              <Link to="/" aria-label="The Redbricks — Home"
                className="flex items-center gap-3 mb-4">
                <picture>
                  <source srcSet="/logo-sq.webp" type="image/webp" />
                  <img src="/logo-sq.png" alt="The Redbricks"
                    aria-hidden="true"
                    className="h-10 w-auto object-contain" />
                </picture>
              </Link>
              <p className="font-sans text-[0.75rem] text-stone/70 leading-relaxed max-w-[200px]">
                Premium Real Estate Partners.<br />Navi Mumbai, Maharashtra.
              </p>
            </div>

            {/* Nav */}
            <nav aria-label="Footer navigation" className="md:justify-self-center">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-sans text-ui-sm text-stone/70 hover:text-white
                        transition-colors duration-200 tracking-[0.02em]
                        focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-white/50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a href={CONTACT.phoneHref}
                className="font-sans text-ui-sm text-stone/70 hover:text-white transition-colors">
                {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref}
                className="font-sans text-ui-sm text-stone/70 hover:text-white transition-colors">
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Bottom bar — Emaar has a full-width rule above copyright */}
          <div className="border-t border-white/[0.08]" aria-hidden="true" />
          <div className="pt-6 flex flex-col sm:flex-row
            justify-between items-center gap-3">
            <p className="font-sans text-[0.7rem] text-stone/45">
              © {new Date().getFullYear()} The Redbricks. All rights reserved.
            </p>
            <p className="font-sans text-[0.7rem] text-stone/45">
              Developed by{' '}
              <a href="https://www.glocious.com/" target="_blank" rel="noopener noreferrer"
                className="hover:text-stone/70 transition-colors">
                Glocious Infotech Pvt. Ltd.
              </a>
            </p>
          </div>
        </div>

        {/* WhatsApp FAB */}
        <a
          href={CONTACT.whatsapp}
          target="_blank" rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-[#25D366]
            text-white flex items-center justify-center shadow-lg
            hover:scale-110 transition-transform duration-300
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          style={{ width: '52px', height: '52px' }}
        >
          <WhatsAppIcon />
        </a>
      </footer>
    </>
  )
}

/* ── Icons ── */
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.848L.057 23.571a.5.5 0 00.607.63l5.882-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.67-.523-5.188-1.43l-.37-.222-3.843 1.008 1.03-3.742-.242-.383A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}
