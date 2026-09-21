import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { community } from '../assets'
import { clients } from '../data/content'
import { getIcon } from '../icons'
import { useReducedMotion } from '../hooks/useAnimations'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

/* Descriptive helper text per documented client group (no invented claims). */
const descriptions = {
  farmers: 'Practical guidance for every acre — smallholder to commercial scale.',
  investors: 'Feasibility, planning and operational clarity for agricultural capital.',
  schools: 'Curriculum-linked agriculture programmes and practical learning.',
  churches: 'Community-based projects that create shared, productive value.',
  ngos: 'Programme design and hands-on implementation support.',
  corporate: 'Productive, sustainable use of land and farm assets.',
}

export default function TargetClients() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="target-clients farm-section" id="clients" style={{ '--section-image': `url(${community})` }}>
      <div className="section-wash clients-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="08 / Who we work with" copy="From individual farmers to institutional partners, we build agricultural enterprises at every scale.">
          <>An ecosystem of<br /><em>possibility.</em></>
        </SectionHeading>

        <div className="clients-grid" role="list">
          {clients.map((client, index) => {
            const Icon = getIcon(client.icon)
            return (
              <motion.article key={client.id} className={`client-card client-card-${index + 1}`} role="listitem" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }} whileHover={reducedMotion ? undefined : { y: -6 }}>
                <div className="client-image-wrapper">
                  <ImageWrap src={client.image} alt={client.alt} radius="lg" hoverZoom aspectRatio="4/3" loading={index < 3 ? 'eager' : 'lazy'} />
                  <div className="client-overlay" aria-hidden="true" />
                  <span className="client-badge"><Icon size={21} aria-hidden="true" /></span>
                </div>
                <div className="client-content">
                  <span className="client-index">0{index + 1}</span>
                  <h3>{client.title}</h3>
                  <p className="client-desc">{descriptions[client.id]}</p>
                  <ArrowUpRight className="client-arrow" size={18} aria-hidden="true" />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}