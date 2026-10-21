import { useEffect } from 'react'

/**
 * Seo — lightweight, dependency-free meta tag manager.
 * Sets document.title, meta description, canonical, and Open Graph tags.
 * Cleans up on unmount by removing any tags it created.
 *
 * Props:
 *   title       — page title (without site suffix)
 *   description — meta description
 *   canonical   — canonical URL path (e.g. "/projects/celestia/")
 *   image       — OG image path (optional)
 *   type        — OG type (default "website")
 */
export default function Seo({
  title,
  description,
  canonical,
  image = '/images/hero.jpg',
  type = 'website',
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | The Redbricks`
      : 'Premium Real Estate in Navi Mumbai | The Redbricks'

    const tags = []

    // Title
    document.title = fullTitle
    tags.push({ name: 'title', content: fullTitle })

    // Description
    if (description) {
      tags.push({ name: 'description', content: description })
    }

    // Canonical
    if (canonical) {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = `https://theredbricks.in${canonical}`
      document.head.appendChild(link)
      tags.push({ _el: link })
    }

    // Open Graph
    tags.push({ property: 'og:title', content: fullTitle })
    tags.push({ property: 'og:type', content: type })
    tags.push({ property: 'og:site_name', content: 'The Redbricks' })
    if (description) tags.push({ property: 'og:description', content: description })
    if (image) tags.push({ property: 'og:image', content: `https://theredbricks.in${image}` })
    if (canonical) tags.push({ property: 'og:url', content: `https://theredbricks.in${canonical}` })

    // Twitter card
    tags.push({ name: 'twitter:card', content: 'summary_large_image' })
    tags.push({ name: 'twitter:title', content: fullTitle })
    if (description) tags.push({ name: 'twitter:description', content: description })
    if (image) tags.push({ name: 'twitter:image', content: `https://theredbricks.in${image}` })

    // Create and append meta tags
    const created = []
    tags.forEach((tag) => {
      if (tag._el) return // already a DOM element (canonical link)
      const el = document.createElement('meta')
      if (tag.name) el.setAttribute('name', tag.name)
      if (tag.property) el.setAttribute('property', tag.property)
      el.setAttribute('content', tag.content)
      document.head.appendChild(el)
      created.push(el)
    })

    return () => {
      created.forEach((el) => el.remove())
      tags.forEach((t) => t._el?.remove())
    }
  }, [title, description, canonical, image, type])

  return null
}
