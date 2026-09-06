import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Leaf, Compass, ShieldCheck, ArrowRight } from 'lucide-react'
import './AboutPage.css'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'About Us — MARCELLE Luxury Resortwear'
  }, [])

  return (
    <div className="about-page-wrapper">
      {/* 1. Hero Banner */}
      <section className="about-hero-banner">
        <div className="container">
          <nav className="about-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span aria-current="page">About Us</span>
          </nav>
          <span className="about-hero-eyebrow">Our Story &amp; Atelier</span>
          <h1 className="about-hero-title">The Art of Quiet Luxury &amp; Mindful Silhouettes</h1>
          <p className="about-hero-subtitle">
            Born along the sun-drenched coastlines of the Mediterranean, MARCELLE crafts enduring 
            garments that celebrate effortless elegance, sustainable fiber sourcing, and artisanal tailoring.
          </p>
        </div>
      </section>

      {/* 2. Editorial Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-image-wrap">
              <img 
                src="./images/products/golf-muse.jpg" 
                alt="MARCELLE Mediterranean Atelier and Resort Collection" 
                className="about-story-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop'
                }}
              />
              <span className="about-story-tag">EST. 2021 &mdash; MEDITERRANEAN ATELIER</span>
            </div>

            <div className="about-story-content">
              <span className="about-section-label">Heritage &amp; Vision</span>
              <h2 className="about-story-title">Crafted for Moments of Sunlit Grace</h2>
              <p className="about-story-p">
                MARCELLE was established with a singular ethos: to create refined, seasonless resort wear 
                that honors both the human touch and the natural world. Drawing inspiration from 
                the architectural purity of Aegean villages and the breeze of French Riviera shores, 
                our designs embrace breathable textures and fluid proportions.
              </p>
              <p className="about-story-p">
                Every piece in our collection begins with carefully selected raw fibers: GOTS-certified 
                organic cotton, Belgian flax linen, and responsibly harvested silks. We collaborate 
                closely with heritage family-owned mills across Southern Europe to produce garments 
                that feel as gentle against your skin as a Mediterranean summer breeze.
              </p>

              {/* Metrics Row */}
              <div className="about-metrics-row">
                <div className="about-metric-item">
                  <span className="about-metric-val">100%</span>
                  <span className="about-metric-lbl">Traceable European Fibers</span>
                </div>
                <div className="about-metric-item">
                  <span className="about-metric-val">18K+</span>
                  <span className="about-metric-lbl">Discerning Patrons Worldwide</span>
                </div>
                <div className="about-metric-item">
                  <span className="about-metric-val">0%</span>
                  <span className="about-metric-lbl">Single-Use Plastics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Values Section (4 Cards) */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-values-header">
            <span className="about-section-label">Guiding Principles</span>
            <h2 className="about-story-title">Conscious Luxury by Design</h2>
            <p className="about-hero-subtitle" style={{ margin: '0 auto' }}>
              We believe true sophistication requires mindfulness, responsibility, and an unyielding dedication to excellence.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <Sparkles size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-value-title">Artisanal Craftsmanship</h3>
              <p className="about-value-text">
                Every hem, drape, and seam is finessed by multi-generational craftspeople who take pride in perfection.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <Leaf size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-value-title">Regenerative Fibers</h3>
              <p className="about-value-text">
                We prioritize certified natural flax, regenerative silk, and botanical dyes that leave no toxic footprint.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <Compass size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-value-title">Timeless Silhouettes</h3>
              <p className="about-value-text">
                Rejecting fast-fashion trends, we architect enduring essentials that remain staples year after year.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <h3 className="about-value-title">Conscious Production</h3>
              <p className="about-value-text">
                Small-batch runs guarantee zero overproduction and ensure each garment receives personalized attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pull Quote Section */}
      <section className="about-quote-section">
        <div className="about-quote-inner">
          <div className="about-quote-mark" aria-hidden="true">&ldquo;</div>
          <blockquote className="about-quote-text">
            True luxury lies not in excess, but in the effortless harmony of pure fabrics, 
            honest lines, and unhurried design.
          </blockquote>
          <cite className="about-quote-author">Elena Vance &mdash; Creative Director &amp; Founder</cite>
        </div>
      </section>

      {/* 5. About CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-inner">
            <h2 className="about-cta-title">Discover The New Collection</h2>
            <p className="about-cta-desc">
              Explore curated linen sets, sun dresses, and coastal tailoring designed 
              to inspire confidence in every moment.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>Explore The Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
