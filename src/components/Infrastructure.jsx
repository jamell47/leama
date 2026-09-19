import { motion } from 'framer-motion'
import { ArrowUpRight, Droplets, Sun, Building2, Waves, Thermometer } from 'lucide-react'
import { borehole, irrigation, tanks, infrastructure, solar, climate } from '../assets'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

const infrastructureItems = [
  { id: 'boreholes', title: 'Boreholes', subtitle: 'Water systems', image: borehole, alt: 'Borehole drilling and water systems', icon: Droplets, desc: 'Professional drilling, casing and water quality testing.' },
  { id: 'irrigation', title: 'Irrigation', subtitle: 'Efficient application', image: irrigation, alt: 'Irrigation system', icon: Waves, desc: 'Drip, sprinkler and pivot systems designed around the crop.' },
  { id: 'tanks', title: 'Tank Towers', subtitle: 'Storage and pressure', image: tanks, alt: 'Water storage tanks', icon: Building2, desc: 'Elevated tanks, ground tanks and reliable pressure systems.' },
  { id: 'structures', title: 'Farm Structures', subtitle: 'Built for production', image: infrastructure, alt: 'Farm structures and greenhouses', icon: Building2, desc: 'Greenhouses, packhouses, cold rooms and worker facilities.' },
  { id: 'solar', title: 'Solar Power', subtitle: 'Energy for the farm', image: solar, alt: 'Solar power system', icon: Sun, desc: 'Off-grid and hybrid solar for pumping and processing.' },
  { id: 'climate', title: 'Climate Control', subtitle: 'Protected growing', image: climate, alt: 'Climate controlled greenhouse', icon: Thermometer, desc: 'Ventilation, cooling and humidity management for protected crops.' },
]

const particles = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 9) * 0.28}s`,
  duration: `${2.4 + (index % 5) * 0.35}s`,
}))

export default function Infrastructure() {
  return (
    <section className="infrastructure farm-section" id="infrastructure" style={{ '--section-image': `url(${irrigation})` }}>
      <div className="section-wash infra-wash" aria-hidden="true" />
      <div className="container">
        <div className="infra-header">
          <SectionHeading eyebrow="06 / Infrastructure" copy="Water, energy, structures and systems designed around the farm you actually have.">
            <>Engineering with<br /><em>purpose.</em></>
          </SectionHeading>
          <div className="infra-intro"><p>Every farm is different. We design infrastructure that fits your land, your water, your crops and your budget, not a catalogue.</p></div>
        </div>

        <div className="infra-grid" role="list">
          {infrastructureItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article key={item.id} className={`infra-card infra-card-${index + 1}`} role="listitem" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.06 * index }}>
                <div className="infra-image-wrapper">
                  <ImageWrap src={item.image} alt={item.alt} radius="lg" hoverZoom aspectRatio={index === 0 ? '16/9' : index === 3 ? '4/3' : '4/5'} loading={index < 3 ? 'eager' : 'lazy'} />
                  <div className="infra-overlay" aria-hidden="true" />
                  <span className="infra-badge"><Icon size={21} aria-hidden="true" /></span>
                </div>
                <div className="infra-content">
                  <span className="infra-subtitle">{item.subtitle}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <ArrowUpRight className="infra-arrow" size={18} aria-hidden="true" />
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div className="irrigation-visual" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
          <style>{`
            @keyframes waterDrop {
              0% { transform: translateY(-10px) scale(0.5); opacity: 0; }
              20% { opacity: 1; }
              80% { opacity: 0.6; }
              100% { transform: translateY(190px) scale(0.2); opacity: 0; }
            }
            @keyframes sprinklerMove {
              0%, 100% { transform: rotate(-8deg); }
              50% { transform: rotate(8deg); }
            }
          `}</style>
          <div className="irrigation-canvas" aria-hidden="true">
            <div className="irrigation-glow" />
            <div className="irrigation-particles">{particles.map((particle, index) => <span key={index} className="water-particle" style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration }} />)}</div>
            <div className="sprinkler-heads">{Array.from({ length: 5 }, (_, index) => <span key={index} className="sprinkler" style={{ left: `${14 + index * 18}%`, animationDelay: `${index * 0.35}s` }}><span className="sprinkler-arm" /></span>)}</div>
          </div>
          <div className="irrigation-caption"><span>Smart irrigation in action</span><small>Automated, efficient, precise</small></div>
        </motion.div>
      </div>
    </section>
  )
}