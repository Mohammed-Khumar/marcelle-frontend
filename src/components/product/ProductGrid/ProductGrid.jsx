import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductGrid.css'

export default function ProductGrid({
  products = [],
  columns = 3,
  onAddToCart,
  onToggleWishlist,
  showBadges = true,
  showWishlist = true,
  className = ''
}) {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty" style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-secondary)' }}>
        No products found in this selection.
      </div>
    )
  }

  return (
    <div className={`product-grid product-grid-cols-${columns} ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          showBadges={showBadges}
          showWishlist={showWishlist}
        />
      ))}
    </div>
  )
}
