import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../components/common/Button/Button'
import SectionHeader from '../components/common/SectionHeader/SectionHeader'
import RatingStars from '../components/common/RatingStars/RatingStars'
import ProductGrid from '../components/product/ProductGrid/ProductGrid'
import { PRODUCTS, CATEGORIES, BRAND_PARTNERS } from '../data/products'
import './HomePage.css'

export default function HomePage() {
  const [wantedCategory, setWantedCategory] = useState('All')
  const [activeSlide, setActiveSlide] = useState(0)

  // Specific products for Curated section matching reference screenshot
  const curatedProducts = [
    PRODUCTS.find((p) => p.id === 'prod-002') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'prod-005') || PRODUCTS[4]
  ]

  // Filter products for Most Wanted section (up to 6 products)
  const wantedProducts = PRODUCTS.filter((p) => {
    if (wantedCategory === 'All') return true
    return p.categories.includes(wantedCategory)
  }).slice(0, 6)

  return (
    <div className="home-container">
      {/* 1. Hero Showcase Section — Exact Match to Reference Screenshot */}
      <section className="hero-section" aria-label="Hero Banner">
        <div className="container hero-content">
          <div className="hero-text-block">
            <span className="hero-eyebrow">
              Effortless Style for Every Moment
            </span>
            <h1 className="hero-title">
              Designed To Inspire<br />
              Confidence In Moment
            </h1>
            <p className="hero-subtitle">
              From playground fun to family outings — discover<br />
              comfy, colorful clothes made to move with them.
            </p>
            <div className="hero-cta-wrap">
              <Link to="/shop" className="hero-cta-btn">
                Shop Fall Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Center Horizontal Slider Track matching Reference Screenshot */}
        <div
          className="hero-slider-track"
          aria-label="Slide indicator"
          role="button"
          tabIndex={0}
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveSlide((prev) => (prev === 0 ? 1 : 0))
            }
          }}
        >
          <div
            className="hero-slider-fill"
            style={{ width: activeSlide === 0 ? '50%' : '100%' }}
          />
        </div>
      </section>

      {/* 2. Brand Trust & Social Proof Bar */}
      <section className="trust-bar-section">
        <div className="container">
          <h2 className="trust-heading">Trusted by the World's Most Admired Fashion Houses</h2>
          <p className="trust-subtext">Over 18,000 satisfied style seekers worldwide.</p>
          <div className="trust-rating-row">
            <RatingStars rating={5} size={16} />
            <span className="trust-rating-val">4.8</span>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>(18k reviews)</span>
          </div>

          <div className="trust-brands-grid">
            {BRAND_PARTNERS.map((brand, index) => (
              <span key={index} className="trust-brand-item">
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Curated for the Modern Escape (Split Layout matching Reference Screenshot) */}
      <section className="section container curated-section">
        <div className="split-curated-layout">
          {/* Left Side: Header, Subtitle, 2-Col Grid */}
          <div className="curated-left-col">
            <div className="curated-header-block">
              <h2 className="curated-title">Curated for the Modern Escape</h2>
              <p className="curated-subtitle">
                Quiet quiet content light smooth clean sample quiet writer paper modern sample creative smooth light signal. Steady useful friendly clean river sample sample paper creative coffee sample steady content steady.
              </p>
            </div>

            {/* 2-Column Product Cards without badges matching reference screenshot */}
            <ProductGrid
              products={curatedProducts}
              columns={2}
              showBadges={false}
              showWishlist={false}
            />
          </div>

          {/* Right Side: Sunlit Savings Event Promo Card matching Reference Screenshot */}
          <div className="curated-promo-card">
            <div className="curated-promo-inner">
              <span className="curated-promo-eyebrow">Sunlit Savings Event</span>
              <h3 className="curated-promo-title">
                Enjoy up to 50% off selected<br />seasonal favorites.
              </h3>
              <Link to="/shop" className="curated-promo-link">
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. This Season's Most Wanted (3-Col Grid) */}
      <section className="section container">
        <SectionHeader
          title="This Season's Most Wanted"
          subtitle="Our most sought-after silhouettes, handwoven textures, and effortless essentials."
          align="center"
        />

        {/* Category Filter Tabs */}
        <div className="filter-tab-strip" style={{ justifyContent: 'center' }} role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={wantedCategory === cat}
              className={`filter-tab-item ${wantedCategory === cat ? 'active' : ''}`}
              onClick={() => setWantedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Product Grid */}
        <ProductGrid products={wantedProducts} columns={3} />

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Button to="/shop" variant="outline" size="md">
            View All Collection
          </Button>
        </div>
      </section>

      {/* 5. Value Proposition & Summer Event Banner matching Reference Screenshot */}
      <section className="section container value-service-section">
        <div className="split-service-layout">
          {/* Left Column: Heading, Subtitle & 4 Features Grid */}
          <div className="service-left-col">
            <h2 className="service-heading">
              Exceptional quality, thoughtful service,<br />
              and a seamless shopping.
            </h2>
            <p className="service-intro">
              Digital digital friendly fresh design market content modern river content signal useful sample market smooth clean. Useful digital future coffee river browser sample clean design digital quick river project future window future. Quiet modern friendly light smooth modern clean quick project future forest smooth browser modern friendly writer. Forest sample daily creative light useful design friendly forest content useful sample garden .
            </p>

            {/* 4 Feature Items (2x2 Grid) */}
            <div className="service-features-grid">
              <div className="service-feature-item">
                <div className="service-feature-icon" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
                  </svg>
                </div>
                <h3 className="service-feature-title">24/7 Customer Support</h3>
                <p className="service-feature-desc">
                  We're here to help anytime, anywhere. Window river quiet modern bright smooth creative fresh design steady coffee river future quick bright friendly.
                </p>
              </div>

              <div className="service-feature-item">
                <div className="service-feature-icon" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="13" rx="1"/>
                    <path d="M3 13h18"/>
                    <path d="M12 8v13"/>
                  </svg>
                </div>
                <h3 className="service-feature-title">Eco-Friendly Packaging</h3>
                <p className="service-feature-desc">
                  Eco-Friendly packaging for every order. Window river quiet modern bright smooth creative fresh design steady coffee river future quick bright friendly.
                </p>
              </div>

              <div className="service-feature-item">
                <div className="service-feature-icon" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="1"/>
                    <circle cx="12" cy="12" r="2.5"/>
                    <path d="M6 12h.01M18 12h.01" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="service-feature-title">Secure Payments</h3>
                <p className="service-feature-desc">
                  Safe and trusted payment methods for you. Window river quiet modern bright smooth creative fresh design steady coffee river future quick bright friendly.
                </p>
              </div>

              <div className="service-feature-item">
                <div className="service-feature-icon" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="5" x2="5" y2="19"/>
                    <circle cx="6.5" cy="6.5" r="2.5"/>
                    <circle cx="17.5" cy="17.5" r="2.5"/>
                  </svg>
                </div>
                <h3 className="service-feature-title">Exclusive Offers</h3>
                <p className="service-feature-desc">
                  Unique styles you won't find anywhere else. Window river quiet modern bright smooth creative fresh design steady coffee river future quick bright friendly.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Limited-Time Summer Event Promo Banner */}
          <div className="service-promo-card">
            <div className="service-promo-inner">
              <span className="service-promo-eyebrow">Limited-Time Summer Event</span>
              <h3 className="service-promo-title">
                Save up to 50% on selected styles<br />
                before the season ends.
              </h3>
              <Link to="/shop" className="service-promo-link">
                Shop Sale <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
