import { motion } from 'framer-motion'
import { ArrowUpRight, Award, Leaf, Target, Sun, Users } from 'lucide-react'
import { farmWebp, farmer, crops, greenhouse, soil, infrastructure } from '../assets'
import { useReducedMotion } from '../hooks/useAnimations'
import Glass from '../Glass'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'
import Button from './Button'

const values = [
  { icon: Award, title: 'Professionalism', desc: 'Care and clarity in every engagement' },
  { icon: Sun, title: 'Innovation', desc: 'Useful ideas, tested in the field' },
  { icon: Leaf, title: 'Sustainability', desc: 'Systems designed to regenerate' },
  { icon: Target, title: 'Client Focus', desc: 'Your outcomes shape our work' },
  { icon: Users, title: 'Excellence', desc: 'Standards that endure beyond handover' },
]

const floatingImages = [
  { src: farmer, alt: 'Farmer inspecting crops in a greenhouse', className: 'float-img-1', ratio: '4/5' },
  { src: crops, alt: 'Healthy crops growing in a field', className: 'float-img-2', ratio: '1/1' },
  { src: greenhouse, alt: 'Modern greenhouse structure', className: 'float-img-3', ratio: '3/4' },
  { src: soil, alt: 'Soil and crop planning', className: 'float-img-4', ratio: '4/3' },
  { src: infrastructure, alt: 'Farm infrastructure and water systems', className: 'float-img-5', ratio: '3/4' },
]

export default function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="about farm-section" id="about" style={{ '--section-image': `url(${farmWebp})` }}>
      <div className="section-wash" aria-hidden="true" />
      <div className="container about-grid">
        <motion.div className="about-images" aria-label="Leema Tech agricultural work" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {floatingImages.map((image, index) => (
            <motion.div key={image.className} className={`floating-image ${image.className}`} initial={{ opacity: 0, y: 34, rotate: index % 2 ? 5 : -5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }} style={{ animation: reducedMotion ? 'none' : `float ${6 + index * 0.45}s ease-in-out ${index * 0.55}s infinite` }}>
              <ImageWrap src={image.src} alt={image.alt} radius="lg" hoverZoom aspectRatio={image.ratio} loading={index < 2 ? 'eager' : 'lazy'} />
            </motion.div>
          ))}
          <div className="collage-orbit" aria-hidden="true"><span /></div>
        </motion.div>

        <motion.div className="about-content" initial={{ opacity: 0, x: 42 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <Glass variant="strong" blur={28} className="about-panel">
            <SectionHeading eyebrow="01 / The Leema approach" delay={0.08}>
              <>We don&apos;t just farm.<br /><em>We build agricultural enterprises.</em></>
            </SectionHeading>
            <p>Leema Tech Farm Solutions is an agribusiness consultancy based in Nairobi, Kenya. We support farmers, investors and institutions with practical consultancy, farm infrastructure, training and farm management solutions. Our work connects good ideas to thoughtful planning, sound systems and the everyday realities of agriculture.</p>
            <div className="about-highlights">
              {['Practical, locally adapted solutions', 'Strong expertise in farming and infrastructure', 'Professional documentation and planning support', 'Commitment to client success and long-term partnerships'].map((point, index) => (
                <motion.div key={point} className="highlight-item" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.28 + index * 0.07 }}>
                  <Leaf size={17} aria-hidden="true" /><span>{point}</span>
                </motion.div>
              ))}
            </div>
            <Button variant="green" icon="ArrowUpRight" href="#services" className="about-cta">What we do</Button>
          </Glass>
        </motion.div>
      </div>

      <div className="container principles-wrap">
        <SectionHeading eyebrow="02 / What guides us" copy="Professional thinking, grounded in the field and shaped around the people who work it.">
          <>Built on good<br /><em>principles.</em></>
        </SectionHeading>
        <div className="principles-grid">
          {[
            { title: 'Vision', text: 'To be a leading agribusiness consultancy in Kenya, driving sustainable agricultural development.', icon: Target },
            { title: 'Mission', text: 'To empower farmers, investors and institutions with practical solutions that create lasting value.', icon: ArrowUpRight },
            { title: 'Core Values', text: 'Professionalism, innovation, sustainability, client focus and excellence.', icon: Award },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article key={item.title} className="principle-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, delay: 0.08 * index }}>
                <Glass variant="white" hover hoverLift hoverGlow className="principle-glass">
                  <span className="principle-number">0{index + 1}</span>
                  <span className="principle-icon"><Icon size={23} aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Glass>
              </motion.article>
            )
          })}
        </div>

        <div className="values-grid">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div key={value.title} className="value-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.06 * index }}>
                <Glass variant="green" hover hoverLift className="value-glass">
                  <span className="value-icon"><Icon size={20} aria-hidden="true" /></span>
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </Glass>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}