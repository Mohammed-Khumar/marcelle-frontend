import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  SlidersHorizontal,
  Search,
  X,
  Grid3X3,
  LayoutGrid,
  Columns2,
  PackageOpen,
  Check
} from 'lucide-react'
import ProductCard from '../components/product/ProductCard/ProductCard'
import Button from '../components/common/Button/Button'
import { PRODUCTS, CATEGORIES } from '../data/products'
import './ShopPage.css'

const COLOR_OPTIONS = [
  { name: 'All', hex: 'transparent' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Sand Dune', hex: '#E6D7C3' },
  { name: 'Sage Garden', hex: '#8A9A86' },
  { name: 'Navy Sea', hex: '#1C2938' },
  { name: 'Noir Black', hex: '#1A1A1A' }
]

const SIZES_LIST = ['All', 'XS', 'S', 'M', 'L', 'XL']

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read URL query params
  const urlCategory = searchParams.get('cat') || 'All'
  const urlQuery = searchParams.get('q') || ''
  const urlSort = searchParams.get('sort') || 'default'

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState(urlCategory)
  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [maxPrice, setMaxPrice] = useState(900)
  const [onlySale, setOnlySale] = useState(false)
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [selectedColor, setSelectedColor] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [sortBy, setSortBy] = useState(urlSort)
  const [gridColumns, setGridColumns] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const itemsPerPage = 9

  // Sync state when URL params change
  useEffect(() => {
    if (searchParams.get('cat')) {
      const catParam = searchParams.get('cat')
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      )
      if (matched) setSelectedCategory(matched)
    }
    if (searchParams.get('q')) {
      setSearchQuery(searchParams.get('q'))
    }
  }, [searchParams])

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts = { All: PRODUCTS.length }
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = PRODUCTS.filter((p) => p.categories.includes(cat)).length
      }
    })
    return counts
  }, [])

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (
        selectedCategory !== 'All' &&
        !product.categories.includes(selectedCategory)
      ) {
        return false
      }

      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const inName = product.name.toLowerCase().includes(query)
        const inCat = product.categories.some((c) =>
          c.toLowerCase().includes(query)
        )
        const inDesc = (product.shortDescription || '')
          .toLowerCase()
          .includes(query)
        if (!inName && !inCat && !inDesc) return false
      }

      // Max price filter
      if (product.price > maxPrice) {
        return false
      }

      // Sale status filter
      if (onlySale && !product.onSale) {
        return false
      }

      // Stock status filter
      if (onlyInStock && product.stockStatus !== 'in-stock') {
        return false
      }

      // Size filter (if specified on product)
      if (selectedSize !== 'All' && product.attributes?.sizes) {
        if (!product.attributes.sizes.includes(selectedSize)) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating-desc') return b.rating - a.rating
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return 0
    })
  }, [
    selectedCategory,
    searchQuery,
    maxPrice,
    onlySale,
    onlyInStock,
    selectedSize,
    sortBy
  ])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProducts, currentPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, maxPrice, onlySale, onlyInStock, selectedSize, sortBy])

  // Toast feedback trigger
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3200)
  }

  const handleAddToCart = (product) => {
    showToast(`Added "${product.name}" to your shopping bag.`)
  }

  const handleToggleWishlist = (product, isWishlisted) => {
    showToast(
      isWishlisted
        ? `Added "${product.name}" to your wishlist.`
        : `Removed "${product.name}" from your wishlist.`
    )
  }

  const handleResetFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setMaxPrice(900)
    setOnlySale(false)
    setOnlyInStock(false)
    setSelectedColor('All')
    setSelectedSize('All')
    setSortBy('default')
    setSearchParams({})
  }

  // Active filter checks
  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    maxPrice < 900 ||
    onlySale ||
    onlyInStock ||
    selectedColor !== 'All' ||
    selectedSize !== 'All'

  // Reusable Sidebar Filter Content
  const renderFilterWidgets = () => (
    <>
      {/* 1. In-Catalog Search */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Search Catalog</h3>
        <div className="sidebar-search-wrap">
          <input
            type="search"
            className="sidebar-search-input"
            placeholder="Search silhouettes, styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter products"
          />
          {searchQuery ? (
            <button
              type="button"
              className="sidebar-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <Search size={14} className="sidebar-search-icon" />
          )}
        </div>
      </div>

      {/* 2. Categories List */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Categories</h3>
        <ul className="sidebar-category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                className={`sidebar-category-item ${
                  selectedCategory === cat ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedCategory(cat)
                  setMobileDrawerOpen(false)
                }}
              >
                <span>{cat}</span>
                <span className="sidebar-category-count">
                  ({categoryCounts[cat] || 0})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Filter by Price Range */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Filter by Price</h3>
        <div className="sidebar-price-range">
          <div className="price-range-display">
            <span>Price Range</span>
            <span>$100 — ${maxPrice}</span>
          </div>
          <input
            type="range"
            min="100"
            max="900"
            step="20"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-slider-input"
            aria-label="Maximum price slider"
          />
          <div className="price-chips">
            <button
              type="button"
              className={`price-chip-btn ${maxPrice === 250 ? 'active' : ''}`}
              onClick={() => setMaxPrice(250)}
            >
              Under $250
            </button>
            <button
              type="button"
              className={`price-chip-btn ${maxPrice === 500 ? 'active' : ''}`}
              onClick={() => setMaxPrice(500)}
            >
              Under $500
            </button>
            <button
              type="button"
              className={`price-chip-btn ${maxPrice === 900 ? 'active' : ''}`}
              onClick={() => setMaxPrice(900)}
            >
              All Prices
            </button>
          </div>
        </div>
      </div>

      {/* 4. Filter by Offer / Stock */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Product Status</h3>
        <div className="sidebar-checkbox-group">
          <label className="sidebar-checkbox-label">
            <input
              type="checkbox"
              checked={onlySale}
              onChange={(e) => setOnlySale(e.target.checked)}
              className="sidebar-checkbox-input"
            />
            <span>On Sale Only</span>
          </label>
          <label className="sidebar-checkbox-label">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="sidebar-checkbox-input"
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

      {/* 5. Filter by Color Palette */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Color Palette</h3>
        <div className="sidebar-color-swatches">
          {COLOR_OPTIONS.map((col) => (
            <button
              key={col.name}
              type="button"
              title={col.name}
              className={`color-swatch-btn ${
                selectedColor === col.name ? 'active' : ''
              }`}
              style={{
                backgroundColor: col.hex === 'transparent' ? '#EEEEEE' : col.hex
              }}
              onClick={() => setSelectedColor(col.name)}
              aria-label={`Filter by color: ${col.name}`}
            >
              {selectedColor === col.name && (
                <Check
                  size={12}
                  style={{
                    color:
                      col.name === 'Pure White' || col.hex === 'transparent'
                        ? '#111111'
                        : '#FFFFFF',
                    margin: 'auto'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Filter by Size */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Sizes</h3>
        <div className="sidebar-sizes-group">
          {SIZES_LIST.map((sz) => (
            <button
              key={sz}
              type="button"
              className={`size-pill-btn ${
                selectedSize === sz ? 'active' : ''
              }`}
              onClick={() => setSelectedSize(sz)}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Reset Action */}
      {hasActiveFilters && (
        <button
          type="button"
          className="sidebar-reset-btn"
          onClick={handleResetFilters}
        >
          Reset All Filters
        </button>
      )}
    </>
  )

  return (
    <div className="shop-page-wrapper">
      {/* 1. Shop Header & Breadcrumbs Banner */}
      <section className="shop-hero-banner" aria-label="Shop Banner">
        <div className="container">
          <nav className="shop-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Shop</span>
            {selectedCategory !== 'All' && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{selectedCategory}</span>
              </>
            )}
          </nav>
          <h1 className="shop-page-title">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedCategory !== 'All'
              ? selectedCategory
              : 'Resort Collection'}
          </h1>
          <p className="shop-page-subtitle">
            Explore curated Mediterranean silhouettes, handwoven textures, and effortless essentials inspired by confidence.
          </p>
        </div>
      </section>

      {/* 2. Main 2-Column Catalog Section */}
      <div className="container shop-main-layout">
        {/* Desktop Sidebar */}
        <aside className="shop-sidebar" aria-label="Catalog Filters">
          {renderFilterWidgets()}
        </aside>

        {/* Catalog Content Area */}
        <main className="shop-catalog-content">
          {/* Top Control Bar */}
          <div className="catalog-control-bar">
            <div className="catalog-results-count">
              Showing <strong>{filteredProducts.length}</strong> of{' '}
              <strong>{PRODUCTS.length}</strong> results
            </div>

            <div className="catalog-actions-right">
              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                className="mobile-filter-toggle-btn"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open Filters Drawer"
              >
                <SlidersHorizontal size={15} />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              {/* Sorting Select Dropdown */}
              <select
                className="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
                <option value="rating-desc">Sort by average rating</option>
                <option value="name-asc">Sort by name: A to Z</option>
              </select>

              {/* Grid Column Layout Switcher */}
              <div className="grid-switcher" aria-label="Layout view mode">
                <button
                  type="button"
                  className={`grid-switch-btn ${gridColumns === 2 ? 'active' : ''}`}
                  onClick={() => setGridColumns(2)}
                  title="2-Column large view"
                  aria-label="2-Column layout"
                >
                  <Columns2 size={16} />
                </button>
                <button
                  type="button"
                  className={`grid-switch-btn ${gridColumns === 3 ? 'active' : ''}`}
                  onClick={() => setGridColumns(3)}
                  title="3-Column standard view"
                  aria-label="3-Column layout"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  type="button"
                  className={`grid-switch-btn ${gridColumns === 4 ? 'active' : ''}`}
                  onClick={() => setGridColumns(4)}
                  title="4-Column compact view"
                  aria-label="4-Column layout"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Chips Strip */}
          {hasActiveFilters && (
            <div className="active-filters-strip" aria-label="Active filters">
              {selectedCategory !== 'All' && (
                <span className="filter-chip">
                  Category: {selectedCategory}
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setSelectedCategory('All')}
                    aria-label={`Remove category filter: ${selectedCategory}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery.trim() && (
                <span className="filter-chip">
                  Keyword: "{searchQuery}"
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setSearchQuery('')}
                    aria-label="Remove keyword search"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {maxPrice < 900 && (
                <span className="filter-chip">
                  Under ${maxPrice}
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setMaxPrice(900)}
                    aria-label="Remove max price filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {onlySale && (
                <span className="filter-chip">
                  On Sale
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setOnlySale(false)}
                    aria-label="Remove on sale filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {onlyInStock && (
                <span className="filter-chip">
                  In Stock
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setOnlyInStock(false)}
                    aria-label="Remove in stock filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedSize !== 'All' && (
                <span className="filter-chip">
                  Size: {selectedSize}
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setSelectedSize('All')}
                    aria-label={`Remove size filter: ${selectedSize}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedColor !== 'All' && (
                <span className="filter-chip">
                  Color: {selectedColor}
                  <button
                    type="button"
                    className="filter-chip-remove"
                    onClick={() => setSelectedColor('All')}
                    aria-label={`Remove color filter: ${selectedColor}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                className="clear-all-chips-btn"
                onClick={handleResetFilters}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid / Empty State */}
          {paginatedProducts.length > 0 ? (
            <div className={`product-grid product-grid-cols-${gridColumns}`}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state">
              <PackageOpen size={48} className="empty-state-icon" />
              <h3 className="empty-state-title">No Silhouettes Found</h3>
              <p className="empty-state-desc">
                We couldn't find any items matching your selected criteria. Try
                broadening your search filters or browse all styles.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="catalog-pagination" aria-label="Catalog pagination">
              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                &larr;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`pagination-btn ${
                    currentPage === page ? 'active' : ''
                  }`}
                  onClick={() => {
                    setCurrentPage(page)
                    window.scrollTo({ top: 300, behavior: 'smooth' })
                  }}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next page"
              >
                &rarr;
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 3. Mobile Off-Canvas Filter Drawer */}
      <div
        className={`mobile-filter-backdrop ${mobileDrawerOpen ? 'open' : ''}`}
        onClick={() => setMobileDrawerOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`mobile-filter-drawer ${mobileDrawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Filters"
      >
        <div className="drawer-header">
          <span className="drawer-title">Filters</span>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
        {renderFilterWidgets()}
      </div>

      {/* 4. Floating Toast Notification */}
      <div
        className={`shop-toast ${toastMessage ? 'visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </div>
  )
}
