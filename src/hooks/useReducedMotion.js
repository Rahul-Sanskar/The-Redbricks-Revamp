import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * Returns true if the user prefers reduced motion.
 * Uses Framer Motion's built-in hook which reads the
 * prefers-reduced-motion media query reactively.
 */
export default function useReducedMotion() {
  return useFramerReducedMotion() ?? false
}
