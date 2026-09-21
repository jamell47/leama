import { motion } from 'framer-motion'
import { services } from '../data/content'
import { getIcon } from '../icons'
import { useReducedMotion } from '../hooks/useAnimations'
import Glass from '../Glass'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'
import Button from './Button'

/* Secondary accent icon per service card, purely decorative. */
const accents = ['Building2', 'Zap', 'Globe', 'Users', 'BookOpen']

export default function Services() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="services farm-section" id="services">
      <div className="section-wash services-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="03 / Our services" copy="Five integrated service lines. From the first feasibility study to a working farm system, we bring clarity to every stage.">
          <>Solutions for a <em>thriving</em> future.</>
        </SectionHeading>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon)
            const Accent = getIcon(accents[index] || service.icon)
            return (
              <motion.article key={service.number} className={`service-card service-card-${index + 1}`} initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.75, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }} whileHover={reducedMotion ? undefined : { y: -8, rotateX: 1.5, rotateY: -1.5 }} style={{ transformStyle: 'preserve-3d' }}>
                <div className="service-image-wrapper">
                  <ImageWrap src={service.image} alt={service.alt} radius="lg" hoverZoom aspectRatio="16/10" loading={index < 2 ? 'eager' : 'lazy'} />
                  <div className="service-image-shine" aria-hidden="true" />
                  <div className="service-badge"><span>{service.number}</span><Icon size={23} aria-hidden="true" /></div>
                </div>
                <div className="service-body">
                  <Glass variant="green" className="service-glass-badge"><Accent size={17} aria-hidden="true" /></Glass>
                  <div className="service-kicker"><span>Service {service.number}</span><Accent size={17} aria-hidden="true" /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-list" role="list">
                    {service.items.map((item) => <li key={item}><span>{item}</span></li>)}
                  </ul>
                  <Button variant="outline" icon="ArrowUpRight" href="#contact" className="service-link">Explore</Button>
                </div>
                <Glass variant="green" className="service-accent" aria-hidden="true"><Accent size={18} /></Glass>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}