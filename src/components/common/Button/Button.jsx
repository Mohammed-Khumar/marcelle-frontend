import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = true,
  fullWidth = false,
  to,
  href,
  onClick,
  disabled = false,
  className = '',
  iconLeft,
  iconRight,
  type = 'button',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    pill ? 'btn-pill' : 'btn-rounded',
    fullWidth ? 'btn-full' : '',
    className
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {iconLeft && <span className="btn-icon-left">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="btn-icon-right">{iconRight}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  )
}
