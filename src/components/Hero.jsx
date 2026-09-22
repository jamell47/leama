import { motion } from 'framer-motion'
import { Leaf, HardHat, ClipboardCheck, GraduationCap, ChevronDown } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'
import { company, heroStats, heroCapabilities } from '../data/content'
import { getIcon } from '../icons'
import Glass from '../Glass'
import Button from './Button'

export default function Hero() {
  const [heroRef] = useInView(0.15, '-100px')
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
            Nairobi, Kenya <span className="eyebrow-separator" aria-hidden="true" /> Established {company.established} · Registered {company.registered}
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
            <Button variant="primary" size="lg" href="#about">
              Explore Leema
            </Button>
            <Button variant="green" size="lg" href="/marketplace">
              Shop
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
                <span>COMPANY PROFILE</span>
                <strong>{company.name}</strong>
              </div>
              <div className="dashboard-live"><i aria-hidden="true" /><span>Since {company.established}</span></div>
            </div>

            <div className="dashboard-stats">
              {heroStats.map((stat) => (
                <Glass key={stat.label} variant="soft" className="dashboard-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </Glass>
              ))}
              <Glass variant="soft" className="dashboard-stat">
                <strong>10+</strong>
                <span>Years Experience</span>
              </Glass>
            </div>

            <div className="dashboard-rows">
              <div className="dashboard-row">
                <span><b>Based</b> Nairobi, Kenya</span>
                <span><b>Region</b> Kenya & East Africa</span>
              </div>
              <div className="dashboard-row">
                <span><b>Serves</b> Farmers, investors & institutions</span>
                <span><b>Focus</b> Sustainable agribusiness</span>
              </div>
            </div>

            <div className="dashboard-foot">
              <span>{company.coreBusiness}</span>
            </div>
          </Glass>
        </motion.div>

        <motion.div className="hero-capabilities" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          {heroCapabilities.map((cap) => {
            const Icon = getIcon(cap.icon)
            return (
              <Glass key={cap.title} variant="soft" className="capability" whileHover={{ y: -4 }}>
                <div className="capability-icon"><Icon size={20} aria-hidden="true" /></div>
                <div>
                  <strong>{cap.title}</strong>
                  <small>{cap.desc}</small>
                </div>
              </Glass>
            )
          })}
        </motion.div>

        <motion.a className="hero-scroll" href="#features" aria-label="Scroll to features">
          <span>Scroll to explore</span>
          <ChevronDown size={18} aria-hidden="true" />
        </motion.a>
      </div>

      <motion.div className="hero-hud" ref={hudRef} initial={{ opacity: 0 }} animate={{ opacity: hudInView ? 1 : 0 }} transition={{ duration: 0.9, delay: 0.4 }}>
        <Glass className="hud-chip hud-1 floating-animation" style={{ animationDelay: '0s' }} variant="soft">
          <div className="hud-icon"><Leaf size={18} aria-hidden="true" /></div>
          <div><strong>{company.established}</strong><span>Established</span></div>
        </Glass>

        <Glass className="hud-chip hud-2 floating-animation" style={{ animationDelay: '1.2s' }} variant="soft">
          <div className="hud-icon"><HardHat size={18} aria-hidden="true" /></div>
          <div><strong>{company.registered}</strong><span>Registered</span></div>
        </Glass>

        <Glass className="hud-chip hud-3 floating-animation" style={{ animationDelay: '2.4s' }} variant="soft">
          <div className="hud-icon"><ClipboardCheck size={18} aria-hidden="true" /></div>
          <div><strong>Nairobi</strong><span>Kenya</span></div>
        </Glass>

        <Glass className="hud-chip hud-4 floating-animation" style={{ animationDelay: '3.6s' }} variant="soft">
          <div className="hud-icon"><GraduationCap size={18} aria-hidden="true" /></div>
          <div><strong>10+</strong><span>Years Experience</span></div>
        </Glass>
      </motion.div>
    </section>
  )
}