import React from 'react'

/**
 * Picture — renders a <picture> element with WebP source + JPEG/PNG fallback.
 * Automatically generates the WebP path from the original image path.
 *
 * Props:
 *   src       — original image path (e.g. "/images/celestia.jpg")
 *   alt       — required alt text
 *   className — applied to the <img> element
 *   width     — explicit width (prevents CLS)
 *   height    — explicit height (prevents CLS)
 *   loading   — "eager" (default) or "lazy"
 *   fetchpriority — "high" for above-the-fold hero
 *
 * Usage:
 *   <Picture src="/images/hero.jpg" alt="Hero" width={1920} height={1080} loading="eager" fetchpriority="high" />
 *   <Picture src="/images/celestia.jpg" alt="Celestia" width={640} height={360} loading="lazy" />
 */
export default function Picture({
  src,
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchpriority,
  decoding = 'async',
  ...rest
}) {
  // Generate WebP path from src — e.g. "/images/celestia.jpg" → "/images/celestia.webp"
  const dotIdx = src.lastIndexOf('.')
  const webpSrc = dotIdx > -1 ? `${src.slice(0, dotIdx)}.webp` : src

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        fetchpriority={fetchpriority}
        decoding={decoding}
        {...rest}
      />
    </picture>
  )
}
