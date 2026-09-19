import { motion } from 'framer-motion'
import { Leaf, Droplets, Sprout, Play, Sun, Building2, Users, Globe, BookOpen, Zap } from 'lucide-react'
import { crops, infrastructure, soil, training, greenhouse } from '../assets'
import Glass from '../Glass'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'
import Button from './Button'

const services = [
  { number: '01', title: 'Agribusiness Consultancy', desc: 'From feasibility studies to funding proposals, we turn agricultural ideas into clear, investable plans.', image: crops, alt: 'Horticultural crops in a field', icon: Leaf, items: ['Farm feasibility studies and business plans', 'Investment advisory and profitability analysis', 'Farm audits and performance assessments', 'Grant and funding proposal support'], accent: Building2 },
  { number: '02', title: 'Farm Infrastructure & Engineering', desc: 'Practical infrastructure that gives farms the foundations, water and energy to operate well.', image: infrastructure, alt: 'Farm infrastructure and water systems', icon: Droplets, items: ['Farm structures and steel water tanks', 'Borehole drilling and water systems', 'Irrigation design and installation', 'Solar power and alternative energy'], accent: Zap },
  { number: '03', title: 'Farm Management & Operations', desc: 'Hands-on operational planning for healthy production, people and resources.', image: soil, alt: 'Crop management and soil health', icon: Sprout, items: ['Farm setup and operational planning', 'Production scheduling and labour management', 'Soil fertility and crop health programs', 'Livestock production planning'], accent: Globe },
  { number: '04', title: 'Training, Capacity Building & Agri-Tours', desc: 'Build capability through practical learning, demonstration and shared experience.', image: training, alt: 'Farmer training and capacity building', icon: Play, items: ['Farmer training workshops', 'Practical agribusiness courses', 'School and institutional programs', 'Agri-tours and demonstration visits'], accent: Users },
  { number: '05', title: 'Digital Agriculture & Knowledge Products', desc: 'Useful knowledge products that make farm planning and learning more accessible.', image: greenhouse, alt: 'Greenhouse with modern agricultural technology', icon: Sun, items: ['eBooks and farm management manuals', 'Online tutorials and video training', 'Digital farm planning tools', 'Customized learning materials'], accent: BookOpen },
]

export default function Services() {
  return (
    <section className="services farm-section" id="services" style={{ '--section-image': `url(${crops})` }}>
      <div className="section-wash services-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="03 / Our services" copy="From the first feasibility study to a working farm system, we bring clarity to every stage.">
          <>Solutions for a <em>thriving</em> future.</>
        </SectionHeading>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon
            const Accent = service.accent
            return (
              <motion.article key={service.number} className={`service-card service-card-${index + 1}`} initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.75, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }} style={{ transformStyle: 'preserve-3d' }}>
                <div className="service-image-wrapper">
                  <ImageWrap src={service.image} alt={service.alt} radius="lg" hoverZoom aspectRatio="16/10" loading={index < 2 ? 'eager' : 'lazy'} />
                  <div className="service-image-shine" aria-hidden="true" />
                  <div className="service-badge"><span>{service.number}</span><Icon size={23} aria-hidden="true" /></div>
                </div>
                <div className="service-body">
                  <Glass variant="green" className="service-glass-badge"><Accent size={17} aria-hidden="true" /></Glass>
                  <div className="service-kicker"><span>Service {service.number}</span><Accent size={17} aria-hidden="true" /></div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
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