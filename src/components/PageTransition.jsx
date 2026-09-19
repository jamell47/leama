import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useAnimations'

/**
 * PageTransition — smooth hand-off between routes.
 * The outgoing page fades and lifts while a soft emerald wash crosses,
 * then the incoming page fades in behind it. No abrupt changes.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  if (reducedMotion) {
    return <div key={location.pathname}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="page-transition">
        <motion.div
          className="page-veil"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1, transition: { duration: 0.34, ease: 'easeIn' } }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}