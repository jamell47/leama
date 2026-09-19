import { motion } from 'framer-motion'
import { cn } from '../utils'

const EASE = [0.22, 1, 0.36, 1]

const offsets = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { x: -44, y: 0 },
  right: { x: 44, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * ScrollReveal — one shared, subtle scroll animation wrapper.
 * Directions: up | down | left | right | none. Optionally scales in.
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  scale = false,
  blur = false,
  amount = 0.25,
  once = true,
  as = 'div',
  ...props
}) {
  const Component = motion[as] || motion.div
  const offset = offsets[direction] || offsets.up

  return (
    <Component
      className={cn('reveal', className)}
      initial={{ opacity: 0, ...offset, scale: scale ? 0.96 : 1, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Component>
  )
}