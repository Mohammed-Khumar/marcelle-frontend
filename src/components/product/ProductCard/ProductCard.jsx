import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import RatingStars from '../../common/RatingStars/RatingStars'
import Badge from '../../common/Badge/Badge'
import './ProductCard.css'

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted: initialWishlisted = false,
  showBadges = true,
  showWishlist = true
}) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted)

  if (!product) return null

  const {
    slug,
    name,
    type,
    price,
    originalPrice,
    onSale,
    rating = 5,
    categories = [],
    images = []
  } = product

  const primaryImage = images[0] || ''
  const secondaryImage = images[1] || images[0] || ''

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const nextState = !isWishlisted
    setIsWishlisted(nextState)
    if (onToggleWishlist) onToggleWishlist(product, nextState)
  }

  const handleActionClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  const actionText = type === 'simple'
    ? 'Add to Cart'
    : type === 'variable'
    ? 'Select Options'
    : type === 'external'
    ? 'Buy Now'
    : 'View Details'

  return (
    <article className="product-card" aria-label={name}>
      <div className="product-card-media">
        <Link to={`/product/${slug}`} className="product-card-image-link" tabIndex={-1}>
          <img
            src={primaryImage}
            alt={name}
            className="product-img product-img-primary"
            loading="lazy"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${name} preview`}
              className="product-img product-img-secondary"
              loading="lazy"
            />
          )}
        </Link>

        {/* Sale Badge */}
        {showBadges && onSale && (
          <div className="product-card-badges">
            <Badge variant="sale">Sale!</Badge>
          </div>
        )}

        {/* Wishlist Toggle Button */}
        {showWishlist && (
          <button
            type="button"
            className={`product-card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? `Remove ${name} from Wishlist` : `Add ${name} to Wishlist`}
          >
            <Heart size={16} fill={isWishlisted ? 'var(--color-sale)' : 'none'} />
          </button>
        )}

        {/* Hover Slide-up Action Button */}
        <div className="product-card-action-overlay">
          <button
            type="button"
            className="product-card-action-btn"
            onClick={handleActionClick}
          >
            <ShoppingBag size={14} />
            <span>{actionText}</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-card-content">
        {categories.length > 0 && (
          <div className="product-card-categories">
            {categories.join(', ')}
          </div>
        )}

        <h3 className="product-card-title">
          <Link to={`/product/${slug}`}>{name}</Link>
        </h3>

        <div className="product-card-rating">
          <RatingStars rating={rating} size={14} />
        </div>

        <div className="product-card-price">
          {originalPrice ? (
            <>
              <del>${originalPrice.toFixed(2)}</del>
              <ins>${price.toFixed(2)}</ins>
            </>
          ) : (
            <ins>${price.toFixed(2)}</ins>
          )}
        </div>
      </div>
    </article>
  )
}
