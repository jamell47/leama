import { motion } from 'framer-motion'
import { cn } from '../utils'

const variants = {
  white: 'glass-white',
  strong: 'glass-strong',
  green: 'glass-green',
  soft: 'glass-soft',
  dark: 'glass-dark',
}

/**
 * GlassCard — the one glass surface primitive used across the site.
 * Glass is applied selectively: panels, floating stats, captions and CTAs,
 * never as a blanket background.
 */
export default function GlassCard({
  children,
  className = '',
  variant = 'white',
  blur = 22,
  hover = false,
  hoverLift = true,
  hoverGlow = false,
  panel = false,
  as = 'div',
  ...props
}) {
  const Component = motion[as] || motion.div

  return (
    <Component
      className={cn(
        'glass-base',
        variants[variant] || variants.white,
        panel && 'glass-panel',
        hover && 'glass-hover',
        hoverLift && 'glass-hover-lift',
        hoverGlow && 'glass-hover-glow',
        className,
      )}
      style={{ '--glass-blur': `${blur}px` }}
      whileHover={
        hover
          ? {
              y: hoverLift ? -5 : 0,
              boxShadow: hoverGlow
                ? '0 30px 80px rgba(57, 255, 106, 0.22), 0 0 60px rgba(57, 255, 106, 0.12)'
                : '0 28px 70px rgba(0, 0, 0, 0.3)',
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 360, damping: 25 }}
      {...props}
    >
      {children}
    </Component>
  )
}
