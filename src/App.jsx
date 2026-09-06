import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import BaseLayout from './components/layout/BaseLayout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<ShopPage />} />
          <Route path="/cart" element={<ShopPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BaseLayout>
    </Router>
  )
}
