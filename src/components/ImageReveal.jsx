import React from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * ImageReveal — reveals an architectural image using an overflow-clip wipe.
 *
 * The outer container clips from scaleY(0) → scaleY(1) (origin: bottom).
 * The inner image simultaneously scales from 1.08 → 1 (Ken-Burns counter-scale)
 * so the image never appears squashed — it slides into view already filling the frame.
 *
 * Props:
 *   src, alt — image attributes
 *   className — applied to the outer clipping container
 *   imgClassName — applied to the <img> tag
 *   delay — animation delay in seconds
 *   duration — clip animation duration (default 1.1s)
 *   origin — transform-origin for the clip ('bottom' | 'top' | 'left' | 'right')
 */
export default function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  delay = 0,
  duration = 1.1,
  origin = 'bottom',
  loading = 'lazy',
}) {
  const prefersReduced = useReducedMotion()
  const ease = [0.76, 0, 0.24, 1] // sharp architectural easing

  if (prefersReduced) {
    return (
      <motion.div
        className={`overflow-hidden ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay }}
      >
        <img src={src} alt={alt} className={imgClassName} loading={loading} decoding="async" />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease }}
    >
      {/* Counter-scale so image appears sharp while container wipes in */}
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        loading={loading}
        decoding="async"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: duration + 0.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
