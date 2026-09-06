import React from 'react'
import { Star } from 'lucide-react'
import './RatingStars.css'

export default function RatingStars({
  rating = 5,
  maxStars = 5,
  size = 14,
  showValue = false,
  reviewCount,
  className = ''
}) {
  return (
    <div className={`rating-stars ${className}`} aria-label={`Rated ${rating} out of ${maxStars} stars`}>
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < Math.round(rating)
        return (
          <Star
            key={index}
            size={size}
            className={`rating-star-icon ${isFilled ? 'filled' : 'empty'}`}
            fill={isFilled ? 'var(--color-rating)' : 'none'}
            color={isFilled ? 'var(--color-rating)' : 'var(--color-rating-empty)'}
          />
        )
      })}
      {showValue && <span className="rating-text">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className="rating-text">({reviewCount})</span>}
    </div>
  )
}
