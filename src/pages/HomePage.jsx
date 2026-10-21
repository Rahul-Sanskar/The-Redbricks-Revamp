import React from 'react'
import Seo from '../components/Seo.jsx'
import JsonLd, { ORGANIZATION_SCHEMA } from '../components/JsonLd.jsx'
import SkipLink from '../components/SkipLink.jsx'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import NewLaunches from '../components/NewLaunches.jsx'
import BrandIntro from '../components/BrandIntro.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import CommunitiesSection from '../components/CommunitiesSection.jsx'
import LocationLifestyle from '../components/LocationLifestyle.jsx'
import TrustStrip from '../components/TrustStrip.jsx'
import EnquiryFooter from '../components/EnquiryFooter.jsx'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Premium Real Estate in Navi Mumbai"
        description="Discover premium residential and commercial real estate in Navi Mumbai with The Redbricks. 20+ years of expertise. Explore projects in Kharghar, Nerul, CBD Belapur and Vashi."
        canonical="/"
      />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <Nav />
      <main id="main-content">
        {/* 1. Cinematic carousel hero */}
        <Hero />

        {/* 2. Upcoming launches strip — Emaar's "Newly Launched" count band */}
        <NewLaunches />

        {/* 3. Brand story — 50/50 editorial split */}
        <BrandIntro />

        {/* 4. Featured properties — portrait cards, horizontal scroll */}
        <FeaturedProperties />

        {/* 5. Communities — 3-panel editorial scroll (Emaar signature) */}
        <CommunitiesSection />

        {/* 6. Location & lifestyle — full-bleed split */}
        <LocationLifestyle />

        {/* 7. Trust / stats / team */}
        <TrustStrip />

        {/* 8. Enquiry CTA + footer */}
        <EnquiryFooter />
      </main>
    </div>
  )
}
