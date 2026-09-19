import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MoveUpRight, Phone, MessageSquare, Send } from 'lucide-react'
import { useReducedMotion } from '../hooks/useAnimations'
import { cn } from '../utils'

const icons = { ArrowUpRight, MoveUpRight, Phone, MessageSquare, Send }

/**
 * MagneticButton — CTA primitive. Renders a router Link, an anchor or a
 * real button depending on props. On desktop the button leans gently
 * toward the cursor.
 */
export default function MagneticButton({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  magnetic = true,
  type,
  onClick,
  external = false,
  ...props
}) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const Icon = icon ? icons[icon] : null

  const handleMove = (event) => {
    if (!magnetic || reducedMotion) return
    const element = ref.current
    if (!element || window.matchMedia('(pointer: coarse)').matches) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.14
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18
    element.style.transform = `translate3d(${x}px, ${y - 3}px, 0)`
  }

  const handleLeave = () => {
    const element = ref.current
    if (element) element.style.transform = 'translate3d(0,0,0)'
  }

  const classes = cn('btn', `btn-${variant}`, size === 'lg' && 'btn-lg', size === 'sm' && 'btn-sm', className)

  const inner = (
    <>
      {iconPosition === 'left' && Icon && <Icon size={18} aria-hidden="true" />}
      <span className="btn-label">{children}</span>
      {iconPosition === 'right' && Icon && <Icon size={18} aria-hidden="true" className="btn-icon" />}
    </>
  )

  const shared = {
    className: classes,
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onFocus: handleLeave,
    onClick,
  }

  if (to) {
    return (
      <motion.span className="btn-shell" whileTap={{ scale: 0.98 }}>
        <Link {...shared} to={to} {...props}>
          {inner}
        </Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.span className="btn-shell" whileTap={{ scale: 0.98 }}>
        <a {...shared} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>
          {inner}
        </a>
      </motion.span>
    )
  }

  return (
    <motion.span className="btn-shell" whileTap={{ scale: 0.98 }}>
      <button {...shared} type={type || 'button'} {...props}>
        {inner}
      </button>
    </motion.span>
  )
}