import { useEffect } from 'react'
import { CONTACT } from '../data/projects.js'

/**
 * JsonLd — injects a JSON-LD <script type="application/ld+json"> tag
 * into the document head and removes it on unmount.
 *
 * Props:
 *   data — a JS object (or array of objects) to serialise
 */
export default function JsonLd({ data }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => script.remove()
  }, [data])

  return null
}

/**
 * Reusable Organization schema — describes The Redbricks.
 * Based only on verified contact details from the source site.
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'The Redbricks',
  description:
    'Premium Real Estate Partners in Navi Mumbai with 20+ years of expertise in residential and commercial real estate.',
  url: 'https://theredbricks.in',
  telephone: CONTACT.phone,
  email: CONTACT.email,
  areaServed: ['Navi Mumbai', 'Kharghar', 'CBD Belapur', 'Nerul', 'Vashi', 'Thane'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Navi Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
}

/**
 * Builds a Product schema for a single project listing.
 * Only includes fields that have real data — no fabrication.
 */
export function buildProjectSchema(project) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.name,
    description: project.description,
    url: `https://theredbricks.in/projects/${project.slug}/`,
    brand: { '@type': 'Brand', name: 'The Redbricks' },
    category: project.type === 'Commercial' ? 'Commercial Real Estate' : 'Residential Real Estate',
  }

  if (project.image) {
    schema.image = `https://theredbricks.in${project.image}`
  }

  if (project.address) {
    schema.areaServed = {
      '@type': 'Place',
      name: project.address,
    }
  }

  return schema
}
