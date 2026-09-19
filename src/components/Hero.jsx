import { motion } from 'framer-motion'
import { Leaf, HardHat, ClipboardCheck, GraduationCap, ChevronDown } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'
import { farmWebp, sunset } from '../assets'
import { company, heroStats, heroCapabilities } from '../data/content'
import ImageWrap from './ImageWrap'
import Glass from '../Glass'
import Button from './Button'

export default function Hero() {
  const [heroRef, isInView] = useInView(0.15, '-100px')
  const [hudRef, hudInView] = useInView(0.1)

  return (
    <section ref={heroRef} className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">
          <motion.span
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <span className="eyebrow-dot" aria-hidden="true" />
            Nairobi, Kenya <span className="eyebrow-separator" aria-hidden="true" /> Agricultural Enterprise Platform
          </motion.span>

          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            <span>GROW</span>
            <span>SMARTER.</span>
            <em>GROW TOGETHER.</em>
          </motion.h1>

          <motion.p className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 }}>
            {company.tagline}
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.52 }}>
            <Button variant="primary" size="lg" href="#marketplace">
              Explore Leema
            </Button>
            <Button variant="green" size="lg" href="/marketplace">
              Marketplace
            </Button>
            <Button variant="glass" size="lg" href="#join">
              Join the Community
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="hero-side"
          ref={hudRef}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: hudInView ? 1 : 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Glass variant="strong" className="hero-dashboard">
            <div className="dashboard-head">
              <div>
                <span>LIVE MARKET</span>
                <strong>Leema Marketplace</strong>
              </div>
              <div className="dashboard-live"><i aria-hidden="true" /><span>Active</span></div>
            </div>

            <div className="dashboard-stats">
              <Glass variant="soft" className="dashboard-stat">
                <strong>12,500+</strong>
                <span>Farmers</span>
              </Glass>
              <Glass variant="soft" className="dashboard-stat">
                <strong>48,000+</strong>
                <span>Tonnes Produced</span>
              </Glass>
              <Glass variant="soft" className="dashboard-stat">
                <strong>120+</strong>
                <span>Market Categories</span>
              </Glass>
              <Glass variant="soft" className="dashboard-stat">
                <strong>47</strong>
                <span>Counties</span>
              </Glass>
            </div>

            <div className="dashboard-rows">
              <div className="dashboard-row">
                <span><b>Top</b> Avocado, Citrus, Maize</span>
                <span><b>Trending</b> +24% this month</span>
              </div>
              <div className="dashboard-row">
                <span><b>Fresh</b> 2,340 listings</span>
                <span><b>Verified</b> 89% sellers</span>
              </div>
            </div>

            <div className="dashboard-foot">
              <span>Data updates every 6 hours</span>
            </div>
          </Glass>
        </motion.div>

        <motion.div className="hero-capabilities" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          {heroCapabilities.map((cap, index) => (
            <Glass key={cap.title} variant="soft" className="capability" whileHover={{ y: -4 }}>
              <div className="capability-icon"><cap.icon size={20} aria-hidden="true" /></div>
              <div>
                <strong>{cap.title}</strong>
                <small>{cap.desc}</small>
              </div>
            </Glass>
          ))}
        </motion.div>

        <motion.a className="hero-scroll" href="#features" aria-label="Scroll to features">
          <span>Scroll to explore</span>
          <ChevronDown size={18} aria-hidden="true" />
        </motion.a>
      </div>

      <motion.div className="hero-hud" ref={hudRef} initial={{ opacity: 0 }} animate={{ opacity: hudInView ? 1 : 0 }} transition={{ duration: 0.9, delay: 0.4 }}>
        <Glass className="hud-chip hud-1 floating-animation" style={{ animationDelay: '0s' }} variant="soft">
          <div className="hud-icon"><Leaf size={18} aria-hidden="true" /></div>
          <div><strong>12,500+</strong><span>Farmers</span></div>
        </Glass>

        <Glass className="hud-chip hud-2 floating-animation" style={{ animationDelay: '1.2s' }} variant="soft">
          <div className="hud-icon"><HardHat size={18} aria-hidden="true" /></div>
          <div><strong>48,000+</strong><span>Tonnes</span></div>
        </Glass>

        <Glass className="hud-chip hud-3 floating-animation" style={{ animationDelay: '2.4s' }} variant="soft">
          <div className="hud-icon"><ClipboardCheck size={18} aria-hidden="true" /></div>
          <div><strong>120+</strong><span>Categories</span></div>
        </Glass>

        <Glass className="hud-chip hud-4 floating-animation" style={{ animationDelay: '3.6s' }} variant="soft">
          <div className="hud-icon"><GraduationCap size={18} aria-hidden="true" /></div>
          <div><strong>47</strong><span>Counties</span></div>
        </Glass>
      </motion.div>
    </section>
  )
}