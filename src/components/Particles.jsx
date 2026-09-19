import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useAnimations'

/**
 * Particles — subtle ambient motes that keep the dark space alive.
 * Deterministic positions so renders stay stable; purely decorative.
 */
export default function Particles({ count = 24, className = '', seed = 7 }) {
  const reducedMotion = useReducedMotion()

  const motes = Array.from({ length: count }, (_, index) => {
    const a = (index + 1) * seed
    return {
      left: `${(a * 37) % 100}%`,
      top: `${(a * 53) % 100}%`,
      size: 1 + ((a % 3) * 1.2),
      delay: `${(index % 9) * 0.6}s`,
      duration: `${7 + (index % 5) * 1.6}s`,
      drift: `${((a % 7) - 3) * 12}px`,
    }
  })

  return (
    <div className={`particles ${className}`} aria-hidden="true">
      {motes.map((mote, index) => (
        <motion.span
          key={index}
          className="particle"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            '--particle-drift': mote.drift,
          }}
          animate={reducedMotion ? undefined : { opacity: [0, 0.7, 0], y: [0, -26, 0] }}
          transition={{ duration: 9, delay: index * 0.32, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}