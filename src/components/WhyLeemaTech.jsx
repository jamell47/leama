import { motion } from 'framer-motion'
import { farmWebp, farmer, crops, infrastructure } from '../assets'
import { whyPoints } from '../data/content'
import { getIcon } from '../icons'
import { useCounter } from '../hooks/useAnimations'
import Glass from '../Glass'
import SectionHeading from './SectionHeading'

/* Faithful short explanations of each documented reason. */
const details = [
  'Established in 2012 and registered in 2017, with more than a decade of practical field work.',
  'Solutions adapted to Kenyan conditions, soils, water and markets.',
  'A rare combination of agronomic know-how and engineering delivery.',
  'Clear plans, budgets and documentation that stand up to scrutiny.',
  'We stay involved as the enterprise grows and succeeds.',
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
              const Icon = getIcon(point.icon)
              return (
                <motion.div key={point.text} className="why-point" role="listitem" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + index * 0.07 }}>
                  <span className="point-icon"><Icon size={19} aria-hidden="true" /></span>
                  <span className="point-body">
                    <strong>{point.text}</strong>
                    {details[index] && <small>{details[index]}</small>}
                  </span>
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