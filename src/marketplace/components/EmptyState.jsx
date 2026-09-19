import { motion } from 'framer-motion'

/** Friendly, branded empty state that keeps the farm environment visible. */
export default function EmptyState({
  title = 'No farm produce found',
  caption = 'Try searching for another product or category.',
  className = '',
}) {
  return (
    <motion.div
      className={`market-empty-state ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="market-empty-illustration" aria-hidden="true" />
      <h3 className="market-empty-title">{title}</h3>
      <p className="market-empty-caption">{caption}</p>
    </motion.div>
  )
}
