/**
 * StatCard — small glass surface for the admin dashboard.
 */

import { motion } from 'framer-motion'
import { cn } from '../../utils'

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = 'green',
  subtitle,
}) {
  const toneClass = tone === 'green' ? 'admin-stat-green' : tone === 'amber' ? 'admin-stat-amber' : 'admin-stat-cyan'

  return (
    <motion.div
      className={cn('admin-stat-card glass-base', toneClass)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="admin-stat-head">
        <span className={cn('admin-stat-icon', toneClass)} aria-hidden="true">
          {Icon ? <Icon size={18} /> : null}
        </span>
        {change !== undefined && change !== null && (
          <span className={cn('admin-stat-change', change >= 0 ? 'is-up' : 'is-down')}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value">{value}</p>
      {subtitle && <p className="admin-stat-subtitle">{subtitle}</p>}
    </motion.div>
  )
}
