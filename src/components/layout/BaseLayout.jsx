import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, ChevronUp } from 'lucide-react'
import './BaseLayout.css'

export default function BaseLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 40)
      setShowBackToTop(scrollY > 250)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="layout-wrapper">
      {/* Seamless Transparent Header over Hero Banner */}
      <header className={`base-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container base-header-inner">
          {/* 1. Brand Logo: MARCELLE */}
          <Link to="/" className="brand-logo" aria-label="MARCELLE Home">
            <span className="brand-logo-text">MARCELLE</span>
          </Link>

          {/* 2. Desktop Navigation */}
          <nav className="base-nav" aria-label="Primary Navigation">
            <NavLink to="/" className={({ isActive }) => `base-nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `base-nav-link ${isActive ? 'active' : ''}`}>
              Shop
            </NavLink>
            <NavLink to="/product" className={({ isActive }) => `base-nav-link ${isActive ? 'active' : ''}`}>
              Product Page
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `base-nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `base-nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* 3. Header Right Actions (Underline Search & Cart) */}
          <div className="header-actions">
            {/* Search Input*/}
            <form className="header-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                className="header-search-input"
                placeholder="Search for Dress, Top, Hat"
                aria-label="Search Catalog"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="header-search-btn" aria-label="Submit Search">
                <Search size={16} />
              </button>
            </form>

            {/* Shopping Cart Icon */}
            <Link to="/cart" className="header-cart-btn" aria-label="Shopping Cart">
              <ShoppingCart size={22} strokeWidth={1.8} />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              className="mobile-menu-toggle" 
              aria-label="Open Navigation Menu" 
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-nav-backdrop" 
            onClick={() => setIsMobileMenuOpen(false)} 
            aria-hidden="true" 
          />
          <nav className="mobile-nav-drawer" aria-label="Mobile Navigation">
            <div className="mobile-nav-header">
              <span className="brand-logo-text" style={{ fontSize: '1.4rem' }}>MARCELLE</span>
              <button 
                type="button" 
                className="mobile-nav-close-btn" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="mobile-nav-links">
              <NavLink 
                to="/" 
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink 
                to="/product" 
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product Page
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </nav>
        </>
      )}

      {/* Main Content Body */}
      <main className="main-content" id="main-content">
        {children}
      </main>

      {/* Luxury Dark Footer */}
      <footer className="base-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">
              <span>MARCELLE</span>
            </div>
            <div className="footer-copyright-top">
              &copy; 2026 Created with <a href="#!">Mohammed Khumar</a>
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">New Arrivals</h4>
              <div className="footer-col-links">
                <Link to="/shop" className="footer-link">Women's New Arrivals</Link>
                <Link to="/shop" className="footer-link">Summer Essentials</Link>
                <Link to="/shop" className="footer-link">Linen Collection</Link>
                <Link to="/shop" className="footer-link">Coastal Accessories</Link>
                <Link to="/shop" className="footer-link">Limited Editions</Link>
                <Link to="/shop" className="footer-link">Tops &amp; Blouses</Link>
                <Link to="/shop" className="footer-link">Vacation Wardrobe</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Collections</h4>
              <div className="footer-col-links">
                <Link to="/shop" className="footer-link">Amalfi Edit</Link>
                <Link to="/shop" className="footer-link">Santorini Collection</Link>
                <Link to="/shop" className="footer-link">Riviera Escape</Link>
                <Link to="/shop" className="footer-link">Mallorca Mood</Link>
                <Link to="/shop" className="footer-link">Coastal Neutrals</Link>
                <Link to="/shop" className="footer-link">Sunset Palette</Link>
                <Link to="/shop" className="footer-link">Seaside Essentials</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">About Us</h4>
              <div className="footer-col-links">
                <Link to="/about" className="footer-link">Our Story</Link>
                <Link to="/about" className="footer-link">Mediterranean Heritage</Link>
                <Link to="/about" className="footer-link">Sustainability</Link>
                <Link to="/about" className="footer-link">Materials &amp; Fabrics</Link>
                <Link to="/about" className="footer-link">Ethical Production</Link>
                <Link to="/about" className="footer-link">Press</Link>
                <Link to="/about" className="footer-link">Careers</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Customer Care</h4>
              <div className="footer-col-links">
                <Link to="/contact" className="footer-link">Contact Us</Link>
                <Link to="/contact" className="footer-link">FAQs</Link>
                <Link to="/contact" className="footer-link">Shipping &amp; Delivery</Link>
                <Link to="/contact" className="footer-link">Returns &amp; Exchanges</Link>
                <Link to="/contact" className="footer-link">Size Guide</Link>
                <Link to="/contact" className="footer-link">Care Instructions</Link>
                <Link to="/contact" className="footer-link">Track Order</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Bottom Marquee Wordmark */}
        <div className="footer-giant-wordmark-container">
          <span className="footer-giant-wordmark">MARCELLE</span>
        </div>
      </footer>

      {/* Floating Back to Top Button*/}
      {showBackToTop && (
        <button
          type="button"
          className="back-to-top-btn"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  )
}
