import React from 'react'

/**
 * SkipLink — accessibility skip-to-content link.
 * Hidden until focused by keyboard, then appears at top-left.
 * Place as the first child of each page.
 */
export default function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
  )
}
