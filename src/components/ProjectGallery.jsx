import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

const EASE = [0.16, 1, 0.3, 1]

/**
 * ProjectGallery
 * - Thumbnail strip + full lightbox
 * - Keyboard navigable (arrow keys, Escape)
 * - Accessible: roles, aria-labels, focus management
 * - Reduced-motion aware
 */
export default function ProjectGallery({ images = [], projectName = '' }) {
  const [active, setActive]         = useState(0)
  const [lightbox, setLightbox]     = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const prefersReduced               = useReducedMotion()

  const count = images.length
  if (count === 0) return null

  // ── Lightbox keyboard navigation ──
  const handleKey = useCallback((e) => {
    if (!lightbox) return
    if (e.key === 'ArrowRight') setLightboxIdx((i) => (i + 1) % count)
    if (e.key === 'ArrowLeft')  setLightboxIdx((i) => (i - 1 + count) % count)
    if (e.key === 'Escape')     setLightbox(false)
  }, [lightbox, count])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Open lightbox
  function openLightbox(idx) {
    setLightboxIdx(idx)
    setLightbox(true)
  }

  const imgVariants = {
    enter:  { opacity: 0, x: prefersReduced ? 0 : 24  },
    center: { opacity: 1, x: 0 },
    exit:   { opacity: 0, x: prefersReduced ? 0 : -24 },
  }

  return (
    <>
      {/* ── Main gallery grid ── */}
      <div aria-label={`${projectName} photo gallery`}>

        {/* Primary image — always visible */}
        <button
          onClick={() => openLightbox(active)}
          className="relative w-full overflow-hidden block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
          aria-label={`View ${images[active].alt} fullscreen`}
        >
          <div className="aspect-[16/9] overflow-hidden bg-charcoal">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={images[active].src}
                alt={images[active].alt}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                initial={imgVariants.enter}
                animate={imgVariants.center}
                exit={imgVariants.exit}
                transition={{ duration: 0.45, ease: EASE }}
              />
            </AnimatePresence>
          </div>

          {/* View fullscreen hint */}
          <div className="absolute bottom-4 right-4 bg-charcoal/70 text-ivory px-3 py-1.5
            font-sans text-[0.65rem] tracking-widest uppercase flex items-center gap-2
            opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            <ExpandIcon />
            View Fullscreen
          </div>
        </button>

        {/* Thumbnail strip — only when multiple images */}
        {count > 1 && (
          <div
            role="tablist"
            aria-label="Gallery thumbnails"
            className="flex gap-3 mt-3 overflow-x-auto pb-1 scrollbar-none"
          >
            {images.map((img, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-label={`Show image: ${img.alt}`}
                onClick={() => setActive(i)}
                className={`relative shrink-0 w-20 h-14 md:w-24 md:h-16 overflow-hidden transition-all duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick
                  ${active === i ? 'ring-2 ring-brick ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image counter */}
        {count > 1 && (
          <p className="mt-2 font-sans text-xs text-stone" aria-live="polite">
            {active + 1} / {count}
          </p>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${projectName} fullscreen gallery`}
            className="fixed inset-0 z-[100] bg-charcoal/98 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-ivory/70
                hover:text-ivory transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label="Close fullscreen gallery"
            >
              <CloseIcon />
            </button>

            {/* Prev */}
            {count > 1 && (
              <button
                onClick={() => setLightboxIdx((i) => (i - 1 + count) % count)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center
                  text-ivory/60 hover:text-ivory transition-colors duration-200
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
            )}

            {/* Image */}
            <div className="w-full max-w-5xl px-16 md:px-24">
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIdx}
                  src={images[lightboxIdx].src}
                  alt={images[lightboxIdx].alt}
                  className="w-full max-h-[80vh] object-contain"
                  loading="eager"
                  decoding="async"
                  initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </AnimatePresence>
              <p className="mt-4 font-sans text-sm text-stone/80 text-center">
                {images[lightboxIdx].alt} &nbsp;·&nbsp; {lightboxIdx + 1} / {count}
              </p>
            </div>

            {/* Next */}
            {count > 1 && (
              <button
                onClick={() => setLightboxIdx((i) => (i + 1) % count)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center
                  text-ivory/60 hover:text-ivory transition-colors duration-200
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </button>
            )}

            {/* Dot indicators */}
            {count > 1 && (
              <div className="absolute bottom-6 flex gap-2" aria-hidden="true">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                      ${lightboxIdx === i ? 'bg-gold w-4' : 'bg-ivory/30 hover:bg-ivory/60'}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
function ChevronLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
