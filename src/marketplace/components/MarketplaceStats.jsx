import { motion } from 'framer-motion'
import { Package, Users, Globe, MapPin } from 'lucide-react'
import { useCounter } from '../../hooks/useAnimations'

function StatTile({ icon: Icon, label, value, suffix, delay }) {
  const [ref, count] = useCounter(value, 2200, delay * 1000)
  return (
    <motion.div
      ref={ref}
      className="market-stat-tile"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="market-stat-icon" aria-hidden="true">
        <Icon size={18} />
      </div>
      <div className="market-stat-value">
        {count}
        {suffix}
      </div>
      <div className="market-stat-label">{label}</div>
    </motion.div>
  )
}

/** The four marketplace pulse stats shown in the hero. */
export default function MarketplaceStats() {
  return (
    <div className="market-stats">
      <StatTile icon={Package} label="Products" value={10000} suffix="+" delay={0} />
      <StatTile icon={Users} label="Farmers" value={1000} suffix="+" delay={0.1} />
      <StatTile icon={MapPin} label="Regions" value={50} suffix="+" delay={0.2} />
      <StatTile icon={Globe} label="Countries" value={12} delay={0.3} />
    </div>
  )
}
