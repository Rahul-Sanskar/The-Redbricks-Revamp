import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import { CONTACT, PROJECTS } from '../data/projects.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.4, 0, 0.2, 1]

function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ── Enquiry form ─────────────────────────────────────────────────────────── */
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY    = 'YOUR_WEB3FORMS_ACCESS_KEY'  // replace before going live

function ContactForm() {
  const [form,   setForm]   = useState({
    name: '', phone: '', email: '', project: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const projectOptions = PROJECTS.map((p) => p.name)

  function validate() {
    const e = {}
    if (!form.name.trim())                                  e.name  = 'Please enter your name.'
    if (!form.phone.match(/^[0-9+\s\-(]{7,}$/))            e.phone = 'Please enter a valid phone number.'
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = 'Please enter a valid email address.'
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
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({
          access_key: ACCESS_KEY,
          ...form,
          subject: `Redbricks Enquiry${form.project ? ` — ${form.project}` : ''} from Website`,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
      if (data.success) setForm({ name: '', phone: '', email: '', project: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-10">
        <div className="w-12 h-12 border border-[#C9A96E] flex items-center justify-center mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#C9A96E" strokeWidth="1.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display font-light text-white mb-3"
          style={{ fontSize: 'clamp(1.25rem,2vw,1.625rem)' }}>
          Thank you for reaching out.
        </p>
        <p className="font-sans font-light text-white/60 mb-8 leading-relaxed"
          style={{ fontSize: '1rem' }}>
          Our team will contact you within 24 hours. If you need
          an immediate response, please call us directly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-sans text-[0.65rem] uppercase tracking-[0.18em] text-white/50
            hover:text-white transition-colors duration-200"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact enquiry form"
      className="flex flex-col gap-7"
    >
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <FieldDark
          id="cf-name"  label="Full Name *"    type="text"   value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          error={errors.name}  autoComplete="name"
        />
        <FieldDark
          id="cf-phone" label="Phone Number *" type="tel"    value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          error={errors.phone} autoComplete="tel"
        />
      </div>

      {/* Row 2: Email */}
      <FieldDark
        id="cf-email" label="Email Address"   type="email"  value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        error={errors.email}  autoComplete="email"
      />

      {/* Row 3: Project of interest — select from real data */}
      <div>
        <label
          htmlFor="cf-project"
          className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-white/50 block mb-2"
        >
          Project of Interest
        </label>
        <select
          id="cf-project"
          value={form.project}
          onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
          className="w-full bg-transparent border-b border-white/25 py-3
            font-sans text-[0.875rem] text-white
            focus:outline-none focus:border-white transition-colors duration-300
            cursor-pointer"
          aria-label="Select a project of interest"
        >
          <option value="" className="text-charcoal bg-white">Select a project (optional)</option>
          {projectOptions.map((name) => (
            <option key={name} value={name} className="text-charcoal bg-white">
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Row 4: Message */}
      <FieldDark
        id="cf-msg"   label="Message (optional)" type="textarea" value={form.message}
        onChange={(v) => setForm((f) => ({ ...f, message: v }))}
      />

      {/* Consent note — Paradise Group style */}
      <p className="font-sans text-[0.72rem] text-white/35 leading-relaxed">
        By submitting this form, I authorize The Redbricks to contact me with updates and
        notifications via email, SMS, WhatsApp and call. This may override the registry on DND/NDNC.
      </p>

      {status === 'error' && (
        <p role="alert" className="font-sans text-sm text-red-400">
          Something went wrong. Please{' '}
          <a href={CONTACT.phoneHref} className="underline hover:text-red-300">
            call us directly
          </a>.
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

function FieldDark({ id, label, type, value, onChange, error, autoComplete }) {
  const base = `input-field-dark ${error ? 'border-red-400 focus:border-red-400' : ''}`
  return (
    <div>
      <label htmlFor={id}
        className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-white/50 block mb-2">
        {label}
      </label>
      {type === 'textarea'
        ? <textarea id={id} rows={3} value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label} className={`${base} resize-none`} />
        : <input id={id} type={type} value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label} autoComplete={autoComplete} className={base} />
      }
      {error && (
        <p role="alert" className="font-sans text-xs text-red-400 mt-1.5">{error}</p>
      )}
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Contact Us — The Redbricks Navi Mumbai"
        description="Get in touch with The Redbricks. Call +91 99874 32055 or email theredbricks.in@gmail.com to enquire about premium real estate projects in Navi Mumbai."
        canonical="/contact-us/"
      />
      <Nav />

      <main id="main-content">

        {/* ── Page hero ── */}
        <section
          className="bg-charcoal text-center"
          style={{ paddingTop: 'calc(80px + 5rem)', paddingBottom: '5rem' }}
          aria-label="Contact page header"
        >
          <div className="container-site">
            <motion.p
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Speak To Us
            </motion.p>
            <motion.h1
              className="font-display font-light text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              Contact{' '}
              <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Us</em>
            </motion.h1>
            <motion.p
              className="font-sans font-light text-white/50 mx-auto"
              style={{ fontSize: '1.0625rem', maxWidth: '48ch' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            >
              For any query, fill in the form below and our team will
              get in touch with you shortly.
            </motion.p>
          </div>
        </section>

        {/* ── Contact details strip — Paradise Group style ── */}
        <section aria-label="Contact details" className="border-b border-stone/[0.12]">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone/[0.12]">
              {[
                {
                  label:   'Phone',
                  value:   CONTACT.phone,
                  href:    CONTACT.phoneHref,
                  sub:     'Mon – Sat, 9 am – 7 pm',
                  ext:     false,
                  icon:    (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  ),
                },
                {
                  label:   'Email',
                  value:   CONTACT.email,
                  href:    CONTACT.emailHref,
                  sub:     'We respond within 24 hours',
                  ext:     false,
                  icon:    (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  ),
                },
                {
                  label:   'WhatsApp',
                  value:   'Chat with us',
                  href:    CONTACT.whatsapp,
                  sub:     'Quick responses via WhatsApp',
                  ext:     true,
                  icon:    (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.848L.057 23.571a.5.5 0 00.607.63l5.882-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.67-.523-5.188-1.43l-.37-.222-3.843 1.008 1.03-3.742-.242-.383A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  {...(item.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 px-8 py-8 group
                    hover:bg-offwhite transition-colors duration-200
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-brick"
                  aria-label={`${item.label}: ${item.value}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  {/* Icon */}
                  <span className="w-9 h-9 border border-stone/25 flex items-center justify-center
                    text-stone group-hover:border-brick group-hover:text-brick
                    transition-all duration-200 shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-stone mb-1">
                      {item.label}
                    </p>
                    <p className="font-sans text-[0.95rem] text-charcoal group-hover:text-brick
                      transition-colors duration-200 leading-snug mb-1">
                      {item.value}
                    </p>
                    <p className="font-sans text-[0.75rem] text-stone/60">
                      {item.sub}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content: form + office info ── */}
        <section aria-labelledby="enquiry-form-heading" className="bg-charcoal">
          <div className="container-site py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">

              {/* Left — office info + map link */}
              <div>
                <Reveal>
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-7">
                    Our Office
                  </p>
                </Reveal>

                <Reveal delay={0.08} y={22}>
                  <h2
                    id="enquiry-form-heading"
                    className="font-display font-light text-white mb-7"
                    style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', lineHeight: 1.1, letterSpacing: '-0.015em' }}
                  >
                    Get In{' '}
                    <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Touch</em>
                  </h2>
                </Reveal>

                <Reveal delay={0.14} y={14}>
                  <p className="font-sans font-light text-white/60 leading-relaxed mb-8"
                    style={{ fontSize: '1.0625rem', maxWidth: '46ch' }}>
                    For any query, please fill in the form and our team will get in
                    touch with you shortly. You may also reach us directly on phone
                    or WhatsApp for immediate assistance.
                  </p>
                </Reveal>

                {/* Address */}
                <Reveal delay={0.2} y={12}>
                  <div className="border-t border-white/[0.10] pt-8 mb-8">
                    <p className="font-sans text-[0.62rem] uppercase tracking-[0.16em] text-white/40 mb-2">
                      Address
                    </p>
                    <p className="font-sans text-[0.9375rem] text-white/75 leading-relaxed">
                      Navi Mumbai, Maharashtra, India
                    </p>
                    {/* OWNER TO CONFIRM: full office address */}
                  </div>
                </Reveal>

                {/* Direct contact rows */}
                <Reveal delay={0.26} y={12}>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Phone',    value: CONTACT.phone,  href: CONTACT.phoneHref, ext: false },
                      { label: 'Email',    value: CONTACT.email,  href: CONTACT.emailHref, ext: false },
                      { label: 'WhatsApp', value: 'Chat with us', href: CONTACT.whatsapp,  ext: true  },
                    ].map((c) => (
                      <div key={c.label} className="flex items-baseline gap-4">
                        <span className="font-sans text-[0.62rem] uppercase tracking-[0.14em]
                          text-white/35 w-16 shrink-0">
                          {c.label}
                        </span>
                        <a
                          href={c.href}
                          {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="font-sans text-[0.875rem] text-white/75 hover:text-white
                            transition-colors duration-200"
                        >
                          {c.value}
                        </a>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Right — form */}
              <Reveal delay={0.12} y={18}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Footer — minimal, reusing footer from EnquiryFooter pattern ── */}
        <footer aria-label="Site footer" className="bg-charcoal border-t border-white/[0.08]">
          <div className="container-site py-12 flex flex-col sm:flex-row
            justify-between items-center gap-4">
            <p className="font-sans text-[0.7rem] text-white/35">
              © {new Date().getFullYear()} The Redbricks. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/" className="font-sans text-[0.7rem] text-white/35 hover:text-white/60 transition-colors">
                Home
              </a>
              <a href="/projects/" className="font-sans text-[0.7rem] text-white/35 hover:text-white/60 transition-colors">
                Projects
              </a>
              <a href="/about-us/" className="font-sans text-[0.7rem] text-white/35 hover:text-white/60 transition-colors">
                About
              </a>
            </div>
          </div>
        </footer>

        {/* WhatsApp FAB */}
        <a
          href={CONTACT.whatsapp}
          target="_blank" rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white
            flex items-center justify-center rounded-full shadow-lg
            hover:scale-110 transition-transform duration-300
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          style={{ width: '52px', height: '52px' }}
        >
          <WhatsAppIcon />
        </a>
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

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.532 5.848L.057 23.571a.5.5 0 00.607.63l5.882-1.545A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.67-.523-5.188-1.43l-.37-.222-3.843 1.008 1.03-3.742-.242-.383A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}
