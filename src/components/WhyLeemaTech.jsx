import { motion } from 'framer-motion'
import { Leaf, Target, Award, Shield, Star } from 'lucide-react'
import { farmWebp, farmer, crops, infrastructure } from '../assets'
import { useCounter } from '../hooks/useAnimations'
import Glass from '../Glass'
import SectionHeading from './SectionHeading'

const whyPoints = [
  { icon: Leaf, text: 'Over a decade of hands-on agribusiness experience' },
  { icon: Target, text: 'Practical, locally adapted solutions for Kenyan conditions' },
  { icon: Award, text: 'Strong expertise in farming and infrastructure engineering' },
  { icon: Shield, text: 'Professional documentation and planning support' },
  { icon: Star, text: 'Commitment to client success and long-term partnerships' },
]

export default function WhyLeemaTech() {
  const [experienceRef, experienceCount] = useCounter(10, 1800, 200)

  return (
    <section className="why-leema farm-section" id="why" style={{ '--section-image': `url(${farmWebp})` }}>
      <div className="section-wash why-wash" aria-hidden="true" />
      <div className="container why-layout">
        <motion.div className="why-content" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <SectionHeading eyebrow="09 / Why Leema Tech" copy="Over a decade of hands-on agribusiness experience, translated into practical, locally adapted solutions." delay={0.08}>
            <>Why choose<br /><em>Leema Tech?</em></>
          </SectionHeading>
          <div className="why-points" role="list">
            {whyPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <motion.div key={point.text} className="why-point" role="listitem" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + index * 0.07 }}>
                  <span className="point-icon"><Icon size={19} aria-hidden="true" /></span>
                  <span>{point.text}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="why-visual" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, delay: 0.15 }}>
          <Glass variant="strong" blur={30} className="experience-card" ref={experienceRef}>
            <span className="experience-eyebrow">Field experience</span>
            <div className="experience-number"><span>{experienceCount}</span><strong>10+</strong></div>
            <div className="experience-label"><span>Years of</span><strong>hands-on agricultural experience</strong></div>
            <div className="experience-details"><span>Established 2012</span><span>Registered 2017</span><span>Nairobi, Kenya</span></div>
          </Glass>
          <div className="why-visual-collage" aria-hidden="true">
            <img src={farmer} alt="" />
            <img src={crops} alt="" />
            <img src={infrastructure} alt="" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}