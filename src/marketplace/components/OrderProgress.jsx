import { motion } from 'framer-motion'
import { orderProgress } from '../services/orderService'

/** Horizontal order progress tracker: Received → Paid → Processing → … → Delivered. */
export default function OrderProgress({ order }) {
  const steps = orderProgress(order)
  const index = steps.findIndex((s) => s.state === 'active')

  return (
    <div className="order-progress">
      {steps.map((step, i) => {
        const active = i <= index
        const current = i === index
        return (
          <motion.div
            key={step.key}
            className="order-progress-step"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <div
              className={`order-step-dot ${active ? 'done' : ''} ${current ? 'active' : ''}`}
              aria-hidden="true"
            >
              {active && <span className="order-step-check" aria-hidden="true" />}
              {current && <span className="order-step-pulse" aria-hidden="true" />}
            </div>
            <span className={`order-step-label ${active ? 'done' : ''} ${current ? 'active' : ''}`}>
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <div className={`order-step-line ${active ? 'done' : ''}`} aria-hidden="true" />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
