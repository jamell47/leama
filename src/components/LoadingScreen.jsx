import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useReducedMotion } from '../hooks/useAnimations'

/**
 * LoadingScreen — short, premium intro. Black field, glass mark,
 * a growing emerald line and the company name, then a smooth hand-off.
 */
export default function LoadingScreen({ onDone, duration = 1800 }) {
  const [visible, setVisible] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false)
      onDone?.()
      return undefined
    }
    const timer = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDone, reducedMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(14px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading Leema Tech Farm Solutions"
        >
          <div className="loader-aurora" aria-hidden="true" />

          <div className="loader-inner">
            <motion.span
              className="loader-mark"
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Leaf size={26} aria-hidden="true" />
            </motion.span>

            <motion.p
              className="loader-name"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              LEEMA <b>TECH</b>
            </motion.p>

            <motion.p
              className="loader-sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              FARM SOLUTIONS
            </motion.p>

            <div className="loader-track" aria-hidden="true">
              <motion.span
                className="loader-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000 - 0.2, ease: [0.3, 0.8, 0.4, 1] }}
              />
            </div>

            <div className="loader-leaves" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.span
                  key={index}
                  className="loader-leaf"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: [0, 0.9, 0.35], y: [-2, -12, -2] }}
                  transition={{ duration: 2.6, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}