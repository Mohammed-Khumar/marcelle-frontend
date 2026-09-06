import React from 'react'
import './SectionHeader.css'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleTag: TitleTag = 'h2'
}) {
  return (
    <div className={`section-header align-${align} ${className}`}>
      {eyebrow && <span className="section-header-eyebrow">{eyebrow}</span>}
      <TitleTag className="section-header-title">{title}</TitleTag>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
  )
}
