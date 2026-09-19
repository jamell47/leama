import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, GraduationCap, Church, HandHeart, Briefcase, Leaf } from 'lucide-react'
import { farmer, fruitFarm, training, greenhouse, community, tanks } from '../assets'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

const clients = [
  { id: 'farmers', title: 'Farmers', subtitle: 'Small, medium & large-scale', image: farmer, alt: 'Farmer in a field', icon: Leaf, desc: 'Practical guidance for every acre.' },
  { id: 'investors', title: 'Agribusiness Investors', subtitle: 'Capital seeking returns', image: fruitFarm, alt: 'Agricultural investment opportunity', icon: Building2, desc: 'Feasibility, planning and operational clarity.' },
  { id: 'schools', title: 'Schools & Learning Institutions', subtitle: 'Learning through farming', image: training, alt: 'School farm training program', icon: GraduationCap, desc: 'Curriculum-linked agri-education.' },
  { id: 'community', title: 'Churches & Community Organizations', subtitle: 'Collective prosperity', image: community, alt: 'Community farming project', icon: Church, desc: 'Shared resources, shared success.' },
  { id: 'ngos', title: 'NGOs & Development Partners', subtitle: 'Development impact', image: greenhouse, alt: 'Agricultural development project', icon: HandHeart, desc: 'Program design and implementation.' },
  { id: 'corporate', title: 'Corporate & Private Landowners', subtitle: 'Productive land use', image: tanks, alt: 'Corporate farm infrastructure', icon: Briefcase, desc: 'Asset optimization and sustainability.' },
]

export default function TargetClients() {
  return (
    <section className="target-clients farm-section" id="clients" style={{ '--section-image': `url(${community})` }}>
      <div className="section-wash clients-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="08 / Who we work with" copy="From individual farmers to institutional partners, we build agricultural enterprises at every scale.">
          <>An ecosystem of<br /><em>possibility.</em></>
        </SectionHeading>

        <div className="clients-grid" role="list">
          {clients.map((client, index) => {
            const Icon = client.icon
            return (
              <motion.article key={client.id} className={`client-card client-card-${index + 1}`} role="listitem" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.06 * index }}>
                <div className="client-image-wrapper">
                  <ImageWrap src={client.image} alt={client.alt} radius="lg" hoverZoom aspectRatio="4/3" loading={index < 3 ? 'eager' : 'lazy'} />
                  <div className="client-overlay" aria-hidden="true" />
                  <span className="client-badge"><Icon size={21} aria-hidden="true" /></span>
                </div>
                <div className="client-content">
                  <span className="client-index">0{index + 1}</span>
                  <h3>{client.title}</h3>
                  <p className="client-subtitle">{client.subtitle}</p>
                  <p className="client-desc">{client.desc}</p>
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