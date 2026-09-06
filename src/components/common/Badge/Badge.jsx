import React from 'react'
import './Badge.css'

export default function Badge({
  children,
  variant = 'category',
  className = '',
  icon
}) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
