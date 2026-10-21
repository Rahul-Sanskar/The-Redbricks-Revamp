import React, { useState } from 'react'
import { CONTACT } from '../data/projects.js'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
// Replace with your real key from https://web3forms.com (free — no backend needed)
const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

/**
 * ProjectEnquiry — inline enquiry form for a specific project.
 * Validates, submits via Web3Forms (free), shows success/error feedback.
 */
export default function ProjectEnquiry({ projectName = '' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function validate() {
    const e = {}
    if (!form.name.trim())                            e.name  = 'Please enter your name.'
    if (!form.phone.match(/^[0-9+\s\-(]{7,}$/))      e.phone = 'Please enter a valid phone number.'
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
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Enquiry: ${projectName} — The Redbricks`,
          project: projectName,
          ...form,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
      if (data.success) setForm({ name: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-4 py-6">
        <span className="block h-px w-8 bg-gold" aria-hidden="true" />
        <p className="font-display font-light text-display-md text-charcoal">
          Thank you for your enquiry.
        </p>
        <p className="font-sans font-light text-stone text-base">
          Our team will contact you within 24 hours regarding <strong className="font-medium text-charcoal">{projectName}</strong>.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-ghost self-start mt-2">
          Send Another Enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={`Enquiry form for ${projectName}`}
      className="flex flex-col gap-7"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <Field id="eq-name"  label="Full Name"     type="text"  value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}  error={errors.name}  autoComplete="name" />
        <Field id="eq-phone" label="Phone Number"  type="tel"   value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))} error={errors.phone} autoComplete="tel" />
      </div>

      <Field id="eq-email" label="Email Address" type="email" value={form.email}
        onChange={(v) => setForm((f) => ({ ...f, email: v }))} error={errors.email} autoComplete="email" />

      <Field id="eq-msg"   label="Message (optional)" type="textarea" value={form.message}
        onChange={(v) => setForm((f) => ({ ...f, message: v }))} />

      {status === 'error' && (
        <p role="alert" className="font-sans text-sm text-red-500">
          Something went wrong. Please try again or{' '}
          <a href={CONTACT.phoneHref} className="underline hover:text-brick transition-colors">call us directly</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : `Enquire About ${projectName}`}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <p className="font-sans text-xs text-stone">
        Or call us directly:{' '}
        <a href={CONTACT.phoneHref} className="text-brick hover:underline">{CONTACT.phone}</a>
        {' · '}
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-brick hover:underline">
          WhatsApp
        </a>
      </p>
    </form>
  )
}

function Field({ id, label, type, value, onChange, error, autoComplete }) {
  const base = `input-lux ${error ? 'border-red-400 focus:border-red-400' : ''}`
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-[0.6rem]">{label}</label>
      {type === 'textarea' ? (
        <textarea id={id} rows={3} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={label} className={`${base} resize-none`} />
      ) : (
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={label} autoComplete={autoComplete} className={base} />
      )}
      {error && <p role="alert" className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  )
}
