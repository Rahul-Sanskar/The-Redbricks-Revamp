import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Nav from '../components/Nav.jsx'
import SkipLink from '../components/SkipLink.jsx'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <SkipLink />
      <Seo
        title="Page Not Found"
        description="The page you are looking for does not exist."
        canonical="/404"
      />
      <Nav />
      <Nav />
      <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <span className="font-display text-[8rem] font-light text-stone/20 leading-none mb-4">404</span>
        <h1 className="font-display font-light text-display-xl text-charcoal mb-4">Page Not Found</h1>
        <p className="font-sans font-light text-stone text-lg mb-10 max-w-md">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Return Home
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </main>
    </div>
  )
}
