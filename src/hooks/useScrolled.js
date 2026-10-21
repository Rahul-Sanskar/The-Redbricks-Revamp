import { useState, useEffect } from 'react'

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used by Nav to switch from transparent → solid.
 */
export default function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    // Set initial state
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
