import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronDown, 
  CheckCircle2 
} from 'lucide-react'
import './ContactPage.css'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Contact Concierge — MARCELLE Luxury Resortwear'
  }, [])

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiries',
    orderNumber: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // FAQ Accordion State (index of open item, default first open)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  const faqs = [
    {
      q: 'How do MARCELLE garments fit compared to standard sizing?',
      a: 'Our resort wear collections are drafted around effortless, breezy Mediterranean proportions. Silhouettes are designed to drape with relaxed elegance. If you prefer a tailored, closer silhouette, we advise selecting one size smaller. Detailed garment measurements are provided on every product page.'
    },
    {
      q: 'What are your worldwide shipping times and costs?',
      a: 'We provide complimentary carbon-neutral express courier shipping worldwide on all orders over $250. Orders within the European Union arrive within 2 to 4 business days. Shipments to the US, Canada, Australia, and GCC nations arrive within 3 to 5 business days with full customs pre-clearance.'
    },
    {
      q: 'How should I care for natural Belgian flax linen and raw silk?',
      a: 'We recommend gentle cold hand washing or a delicate machine cycle using non-biological, eco-friendly liquid detergent. Avoid machine drying; instead, reshape and line-dry away from direct harsh sun. A light steam while the fiber remains slightly damp will preserve the authentic relaxed texture.'
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We gladly accommodate complimentary exchanges and returns within 30 days of parcel receipt. Items must remain unworn, unwashed, and in their original packaging with all security tags intact. Our concierge will dispatch a prepaid courier pickup label upon request.'
    }
  ]

  return (
    <div className="contact-page-wrapper">
      {/* 1. Hero Banner */}
      <section className="contact-hero-banner">
        <div className="container">
          <nav className="contact-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Contact Us</span>
          </nav>
          <span className="contact-hero-eyebrow">Concierge &amp; Ateliers</span>
          <h1 className="contact-hero-title">Connect With Our Team</h1>
          <p className="contact-hero-subtitle">
            Whether you seek personal styling consultations, bespoke sizing advice, or order inquiries, 
            our Mediterranean client advisors are dedicated to assisting you.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Section (Split Grid) */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Info Column */}
            <div className="contact-info-col">
              <div>
                <span className="contact-section-label">Client Services</span>
                <h2 className="contact-info-title">At Your Service</h2>
                <p className="contact-info-desc">
                  Our private client concierge is at your disposal across global time zones. 
                  Experience attentive, personalized styling guidance and seamless ordering support.
                </p>
              </div>

              <div className="contact-response-badge">
                <span className="contact-response-dot"></span>
                <span>Average Concierge Response: Under 4 Hours</span>
              </div>

              {/* Atelier Cards */}
              <div className="contact-ateliers">
                <div className="atelier-card">
                  <h3 className="atelier-city">Biarritz Atelier &amp; Head Office</h3>
                  <span className="atelier-type">Flagship Design Studio &bull; France</span>
                  
                  <div className="atelier-details">
                    <div className="atelier-row">
                      <MapPin size={16} className="atelier-icon" />
                      <span>14 Avenue &Eacute;douard VII, 64200 Biarritz, France</span>
                    </div>
                    <div className="atelier-row">
                      <Clock size={16} className="atelier-icon" />
                      <span>Monday &ndash; Friday: 09:00 &ndash; 18:00 CET</span>
                    </div>
                    <div className="atelier-row">
                      <Phone size={16} className="atelier-icon" />
                      <a href="tel:+33559228000">+33 (0)5 59 22 80 00</a>
                    </div>
                    <div className="atelier-row">
                      <Mail size={16} className="atelier-icon" />
                      <a href="mailto:concierge@marcelle-resort.com">concierge@marcelle-resort.com</a>
                    </div>
                  </div>
                </div>

                <div className="atelier-card">
                  <h3 className="atelier-city">Santorini Summer Showroom</h3>
                  <span className="atelier-type">Private Appointments &bull; Greece</span>
                  
                  <div className="atelier-details">
                    <div className="atelier-row">
                      <MapPin size={16} className="atelier-icon" />
                      <span>Oia Caldera Walkway, 847 02 Santorini, Greece</span>
                    </div>
                    <div className="atelier-row">
                      <Clock size={16} className="atelier-icon" />
                      <span>Tuesday &ndash; Sunday: 10:00 &ndash; 20:00 EEST</span>
                    </div>
                    <div className="atelier-row">
                      <Phone size={16} className="atelier-icon" />
                      <a href="tel:+302286071200">+30 22860 71200</a>
                    </div>
                    <div className="atelier-row">
                      <Mail size={16} className="atelier-icon" />
                      <a href="mailto:santorini@marcelle-resort.com">santorini@marcelle-resort.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3>Send a Message</h3>
                <p>Please provide details about your inquiry and we will respond promptly.</p>
              </div>

              {isSubmitted ? (
                <div className="contact-success-banner">
                  <CheckCircle2 size={36} color="#27AE60" />
                  <h4 className="contact-success-title">Message Transmitted</h4>
                  <p className="contact-success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your message has been received by our Biarritz concierge team. 
                    A personal reply will be dispatched to <em>{formData.email}</em> shortly.
                  </p>
                  <button 
                    type="button" 
                    className="contact-submit-btn" 
                    style={{ marginTop: '12px' }}
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'General Inquiries',
                        orderNumber: '',
                        message: ''
                      })
                    }}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row-2col">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">
                        Your Name <span className="req">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        name="name" 
                        className="form-input" 
                        placeholder="e.g. Elena Rostova"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">
                        Email Address <span className="req">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        name="email" 
                        className="form-input" 
                        placeholder="elena@domain.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-subject">
                        Inquiry Topic
                      </label>
                      <select 
                        id="contact-subject" 
                        name="subject" 
                        className="form-select"
                        value={formData.subject}
                        onChange={handleInputChange}
                      >
                        <option value="General Inquiries">General Inquiries</option>
                        <option value="Order & Shipping Status">Order &amp; Shipping Status</option>
                        <option value="Sizing & Style Advice">Sizing &amp; Style Advice</option>
                        <option value="Garment Care & Repairs">Garment Care &amp; Repairs</option>
                        <option value="Press & Editorial">Press &amp; Editorial</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-order">
                        Order Reference <span style={{ color: '#888888', fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <input 
                        type="text" 
                        id="contact-order" 
                        name="orderNumber" 
                        className="form-input" 
                        placeholder="e.g. MC-8921"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">
                      Your Message <span className="req">*</span>
                    </label>
                    <textarea 
                      id="contact-message" 
                      name="message" 
                      className="form-textarea" 
                      rows={5}
                      placeholder="Please elaborate on your inquiry or specific garment questions..."
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="contact-submit-btn" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Transmitting Note...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="contact-faq-header">
            <span className="contact-section-label">Questions &amp; Guidance</span>
            <h2 className="contact-info-title" style={{ textAlign: 'center' }}>Frequently Inquired</h2>
            <p className="contact-hero-subtitle" style={{ margin: '0 auto' }}>
              Common insights regarding our garment fits, shipping commitments, and sustainable fabric care.
            </p>
          </div>

          <div className="contact-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn" 
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
