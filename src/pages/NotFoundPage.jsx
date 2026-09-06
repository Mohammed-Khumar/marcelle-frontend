import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="section container" style={{ textAlign: 'center', padding: 'var(--space-20) 0' }}>
      <h1 style={{ fontSize: 'var(--fs-4xl)', marginBottom: 'var(--space-4)', fontFamily: 'var(--font-heading)' }}>
        404 — Page Not Found
      </h1>
      <p style={{ maxWidth: '480px', margin: '0 auto var(--space-8)' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary" style={{ margin: '0 auto' }}>
        Return to Home Page
      </Link>
    </div>
  )
}
