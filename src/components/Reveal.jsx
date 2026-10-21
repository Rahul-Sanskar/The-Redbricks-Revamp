import React from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * Reveal — viewport-triggered fade + vertical rise.
 *
 * Props:
 *   delay    — stagger delay in seconds (default 0)
 *   y        — initial vertical offset (default 24)
 *   duration — animation duration in seconds (default 0.85)
 *   className
 *   as       — HTML element tag (default 'div')
 *   once     — whether to animate only once (default true)
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.85,
  className = '',
  as = 'div',
  once = true,
}) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  // Reduced motion: only fade, no movement, shorter duration
  const initial  = prefersReduced ? { opacity: 0 }         : { opacity: 0, y }
  const animate  = prefersReduced ? { opacity: 1 }         : { opacity: 1, y: 0 }

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: '-72px' }}
      transition={{
        duration: prefersReduced ? 0.3 : duration,
        delay:    prefersReduced ? 0   : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
