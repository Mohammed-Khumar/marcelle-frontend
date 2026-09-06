import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Check 
} from 'lucide-react'
import { PRODUCTS, assetPath } from '../data/products'
import ProductCard from '../components/product/ProductCard/ProductCard'
import RatingStars from '../components/common/RatingStars/RatingStars'
import './ProductPage.css'

export default function ProductPage() {
  const { slug } = useParams()

  // Find product by slug or default to first flagship item
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0]

  // Interactive Component States
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(
    product.attributes?.sizes?.[0] || 'M'
  )
  const [selectedColor, setSelectedColor] = useState(
    product.attributes?.colors?.[0] || { name: 'Natural Sand', hex: '#E6D7C3' }
  )
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Reset when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = `${product.name} — MARCELLE Luxury Resortwear`
    setActiveImageIndex(0)
    if (product.attributes?.sizes?.length) {
      setSelectedSize(product.attributes.sizes[0])
    }
    if (product.attributes?.colors?.length) {
      setSelectedColor(product.attributes.colors[0])
    }
    setQuantity(1)
  }, [product.id, product.slug])

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3800)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Gallery images with fallback
  const images = (product.images?.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop']).map(assetPath)

  const activeImage = images[activeImageIndex] || images[0]

  // Discount percentage calculation
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  // Related products (excluding current, max 4)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    setToastMessage(`Added "${product.name}" (${selectedSize} / ${selectedColor.name}) to your bag.`)
  }

  const handleToggleWishlist = () => {
    const next = !isWishlisted
    setIsWishlisted(next)
    setToastMessage(next ? `Saved "${product.name}" to Wishlist.` : `Removed "${product.name}" from Wishlist.`)
  }

  return (
    <div className="product-page-wrapper">
      {/* 1. Breadcrumbs Header Banner */}
      <section className="product-page-banner">
        <div className="container">
          <nav className="product-breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/shop">Shop</Link>
            {product.categories?.[0] && (
              <>
                <span className="breadcrumb-sep">/</span>
                <Link to={`/shop?category=${encodeURIComponent(product.categories[0])}`}>
                  {product.categories[0]}
                </Link>
              </>
            )}
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current" aria-current="page">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* 2. Main Split Product Overview */}
      <section className="product-main-section">
        <div className="container">
          <div className="product-main-grid">
            
            {/* Gallery Column (Left) */}
            <div className="product-gallery-sticky">
              <div className="product-main-image-wrap">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="product-main-image"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
                  }}
                />

                <div className="product-gallery-badges">
                  {product.onSale && (
                    <span className="pdp-badge-sale">
                      Sale {discountPercent ? `-${discountPercent}%` : ''}
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="pdp-badge-featured">Atelier Edit</span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="product-thumbs-strip" role="group" aria-label="Product thumbnails">
                  {images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`product-thumb-btn ${activeImageIndex === idx ? 'is-active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img 
                        src={imgSrc} 
                        alt="" 
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Purchasing Options (Right) */}
            <div className="product-info-panel">
              <div className="product-eyebrow-row">
                <span className="product-eyebrow-brand">MARCELLE ATELIER</span>
                <span className="product-sku-label">SKU: MC-{product.sku || '786753'}</span>
              </div>

              <h1 className="product-pdp-title">{product.name}</h1>

              {/* Rating */}
              <div className="product-rating-row">
                <RatingStars rating={product.rating || 5} size={15} />
                <span className="product-rating-score">{(product.rating || 5).toFixed(1)}</span>
                <button 
                  type="button" 
                  className="product-reviews-link"
                  onClick={() => {
                    setActiveTab('reviews')
                    const tabElem = document.getElementById('product-tabs')
                    if (tabElem) tabElem.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  ({product.reviewCount || 14} client reviews)
                </button>
              </div>

              {/* Price */}
              <div className="product-price-box">
                <span className="product-price-current">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="product-price-original">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent && (
                  <span className="product-price-discount">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="product-short-desc">
                {product.shortDescription || 
                  'Tailored from breathable European flax linen and fine stretch-cotton, crafted for effortless seaside poise and all-day comfort.'}
              </p>

              {/* Color Swatches */}
              {product.attributes?.colors?.length > 0 && (
                <div className="product-option-group">
                  <div className="product-option-header">
                    <span className="product-option-label">
                      Color: <span>{selectedColor.name}</span>
                    </span>
                  </div>
                  <div className="product-color-swatches">
                    {product.attributes.colors.map((c, i) => {
                      const isSelected = selectedColor.name === c.name
                      return (
                        <button
                          key={i}
                          type="button"
                          className={`product-color-btn ${isSelected ? 'is-active' : ''}`}
                          style={{ backgroundColor: c.hex }}
                          onClick={() => setSelectedColor(c)}
                          aria-label={`Select color ${c.name}`}
                        >
                          {isSelected && (
                            <Check size={14} color={c.hex === '#FFFFFF' || c.hex === '#FAF9F6' ? '#000' : '#FFF'} />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.attributes?.sizes?.length > 0 && (
                <div className="product-option-group">
                  <div className="product-option-header">
                    <span className="product-option-label">
                      Size: <span>{selectedSize}</span>
                    </span>
                    <button 
                      type="button" 
                      className="product-size-guide-link"
                      onClick={() => setShowSizeModal(true)}
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="product-size-pills">
                    {product.attributes.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`product-size-pill ${selectedSize === s ? 'is-active' : ''}`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status Indicator */}
              <div className="product-stock-status">
                <span className="stock-dot"></span>
                <span>In Stock &mdash; Handcrafted in limited batches</span>
              </div>

              {/* Purchase Actions Row (Quantity, Add to Cart, Wishlist) */}
              <div className="product-purchase-row">
                <div className="product-qty-stepper" aria-label="Quantity selector">
                  <button 
                    type="button" 
                    className="qty-btn"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button 
                    type="button" 
                    className="qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button 
                  type="button" 
                  className="product-add-cart-btn"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag &bull; ${(product.price * quantity).toFixed(2)}</span>
                </button>

                <button 
                  type="button" 
                  className={`product-wishlist-pdp-btn ${isWishlisted ? 'is-active' : ''}`}
                  onClick={handleToggleWishlist}
                  aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <Heart size={20} fill={isWishlisted ? 'var(--color-sale)' : 'none'} />
                </button>
              </div>

              {/* Perks Highlights Box */}
              <div className="product-perks-box">
                <div className="perk-row">
                  <Truck size={18} className="perk-icon" />
                  <span>Complimentary carbon-neutral express delivery on orders over $250.</span>
                </div>
                <div className="perk-row">
                  <RefreshCw size={18} className="perk-icon" />
                  <span>30-Day complimentary European &amp; International returns.</span>
                </div>
                <div className="perk-row">
                  <ShieldCheck size={18} className="perk-icon" />
                  <span>Authenticity guaranteed &bull; Handcrafted in certified ethical ateliers.</span>
                </div>
              </div>

              {/* Meta Section */}
              <div className="product-meta-section">
                <div className="meta-row">
                  <span className="meta-label">Categories:</span>
                  {product.categories?.map((cat, i) => (
                    <span key={cat}>
                      <Link to={`/shop?category=${encodeURIComponent(cat)}`}>{cat}</Link>
                      {i < product.categories.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                {product.tags?.length > 0 && (
                  <div className="meta-row">
                    <span className="meta-label">Tags:</span>
                    <span>{product.tags.join(', ')}</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Deep Dive Editorial Tabs */}
      <section className="product-tabs-section" id="product-tabs">
        <div className="container">
          <nav className="product-tabs-nav" role="tablist">
            <button
              type="button"
              className={`product-tab-btn ${activeTab === 'description' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('description')}
              role="tab"
              aria-selected={activeTab === 'description'}
            >
              Description &amp; Drape
            </button>
            <button
              type="button"
              className={`product-tab-btn ${activeTab === 'specifications' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('specifications')}
              role="tab"
              aria-selected={activeTab === 'specifications'}
            >
              Specifications &amp; Care
            </button>
            <button
              type="button"
              className={`product-tab-btn ${activeTab === 'reviews' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('reviews')}
              role="tab"
              aria-selected={activeTab === 'reviews'}
            >
              Client Reviews ({product.reviewCount || 14})
            </button>
            <button
              type="button"
              className={`product-tab-btn ${activeTab === 'shipping' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('shipping')}
              role="tab"
              aria-selected={activeTab === 'shipping'}
            >
              Shipping &amp; Returns
            </button>
          </nav>

          <div className="product-tab-content-container">
            {activeTab === 'description' && (
              <div className="tab-editorial-content">
                <h4>Mediterranean Silhouette</h4>
                <p>
                  {product.fullDescription || 
                    'Engineered with relaxed proportions inspired by Mediterranean summer holidays. Cut from breathable raw fibers that soften with every wear, this garment embodies effortless quiet luxury.'}
                </p>
                <h4>Artisanal Tailoring</h4>
                <p>
                  Every seam is reinforced with double French-stitching to ensure longevity. 
                  Designed to breathe naturally under warm Mediterranean sunlight, transition effortlessly 
                  to evening aperitivos, and pack wrinkle-resistant into your vacation luggage.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <table className="specs-table">
                  <tbody>
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, val]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{val}</td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <th>Material</th>
                          <td>100% Traceable Belgian Flax Linen</td>
                        </tr>
                        <tr>
                          <th>Origin</th>
                          <td>Hand-finished in Porto, Portugal</td>
                        </tr>
                        <tr>
                          <th>Care</th>
                          <td>Delicate cold wash, line dry in shade, light steam</td>
                        </tr>
                        <tr>
                          <th>Fit</th>
                          <td>Relaxed European Resort Cut</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-container">
                <div className="reviews-summary-card">
                  <div className="reviews-big-score">
                    <span className="big-rating-num">{(product.rating || 5).toFixed(1)}</span>
                    <div>
                      <RatingStars rating={product.rating || 5} size={18} />
                      <p style={{ margin: '4px 0 0 0', fontSize: 'var(--fs-xs)', color: '#777' }}>
                        Based on {product.reviewCount || 14} verified patron reviews
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => alert('Review form will open for authenticated patrons.')}
                  >
                    Write a Review
                  </button>
                </div>

                <div className="reviews-list">
                  <div className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">Camille Laurent &mdash; Paris</span>
                      <span className="review-date">Verified Purchase &bull; 2 weeks ago</span>
                    </div>
                    <RatingStars rating={5} size={13} />
                    <p className="review-text" style={{ marginTop: '8px' }}>
                      &ldquo;The drape and softness of the linen is unparalleled. Packed it for a holiday in Ravello and wore it repeatedly. Impeccable tailoring.&rdquo;
                    </p>
                  </div>

                  <div className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">Marcus Sterling &mdash; London</span>
                      <span className="review-date">Verified Purchase &bull; 1 month ago</span>
                    </div>
                    <RatingStars rating={5} size={13} />
                    <p className="review-text" style={{ marginTop: '8px' }}>
                      &ldquo;Fast carbon-neutral delivery to Mayfair. Beautifully boxed with zero single-use plastic. Will order again without hesitation.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-editorial-content">
                <h4>Global White-Glove Dispatch</h4>
                <p>
                  All orders are packaged in 100% recyclable, plastic-free gift boxing. We dispatch orders 
                  via carbon-neutral express courier within 24 hours of confirmation.
                </p>
                <h4>Delivery Timelines</h4>
                <ul>
                  <li><strong>European Union:</strong> 2 &ndash; 3 business days (Complimentary over $250)</li>
                  <li><strong>United Kingdom &amp; Switzerland:</strong> 2 &ndash; 4 business days</li>
                  <li><strong>North America &amp; GCC:</strong> 3 &ndash; 5 business days with prepaid duties</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Complete The Look / Related Products */}
      <section className="related-products-section">
        <div className="container">
          <div className="related-header">
            <span className="related-eyebrow">Complementary Pieces</span>
            <h2 className="related-title">Complete The Mediterranean Look</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
            {relatedProducts.map((p) => (
              <ProductCard 
                key={p.id}
                product={p}
                onAddToCart={(prod) => setToastMessage(`Added "${prod.name}" to your bag.`)}
                onToggleWishlist={(prod, state) => setToastMessage(state ? `Saved "${prod.name}" to Wishlist.` : `Removed from Wishlist.`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="pdp-toast" role="status" aria-live="polite">
          <Check size={18} color="#27AE60" />
          <span>{toastMessage}</span>
          <Link to="/cart">View Bag</Link>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="size-modal-backdrop" onClick={() => setShowSizeModal(false)}>
          <div className="size-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="size-modal-header">
              <h3>MARCELLE Sizing Table</h3>
              <button 
                type="button" 
                className="size-modal-close-btn"
                onClick={() => setShowSizeModal(false)}
                aria-label="Close size guide"
              >
                &times;
              </button>
            </div>
            <p style={{ fontSize: 'var(--fs-xs)', color: '#666', marginBottom: '16px' }}>
              All measurements correspond to garment body drape in centimeters. For relaxed seaside wear, choose your usual European size.
            </p>
            <table className="size-guide-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Bust (cm)</th>
                  <th>Waist (cm)</th>
                  <th>Hips (cm)</th>
                  <th>EU / US</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>XS</strong></td>
                  <td>82 &ndash; 86</td>
                  <td>64 &ndash; 68</td>
                  <td>90 &ndash; 94</td>
                  <td>34 / 2</td>
                </tr>
                <tr>
                  <td><strong>S</strong></td>
                  <td>86 &ndash; 90</td>
                  <td>68 &ndash; 72</td>
                  <td>94 &ndash; 98</td>
                  <td>36 / 4</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>90 &ndash; 94</td>
                  <td>72 &ndash; 76</td>
                  <td>98 &ndash; 102</td>
                  <td>38 / 6</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>94 &ndash; 98</td>
                  <td>76 &ndash; 80</td>
                  <td>102 &ndash; 106</td>
                  <td>40 / 8</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>98 &ndash; 102</td>
                  <td>80 &ndash; 84</td>
                  <td>106 &ndash; 110</td>
                  <td>42 / 10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
