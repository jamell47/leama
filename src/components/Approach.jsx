import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle, Circle, Leaf, Droplets, Building2, Users, BarChart3 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useAnimations'
import { crops, infrastructure, farmer, training, greenhouse } from '../assets'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { number: '01', title: 'Assessment & Planning', desc: 'Site evaluation, soil analysis, water assessment, climate study and feasibility modeling.', image: crops, alt: 'Site assessment and planning', icon: Leaf },
  { number: '02', title: 'Design & Budgeting', desc: 'System design, infrastructure layout, cost estimation, phasing plans and ROI projections.', image: infrastructure, alt: 'Design and budgeting', icon: Droplets },
  { number: '03', title: 'Implementation & Supervision', desc: 'Construction management, quality control, timeline adherence and technical supervision.', image: farmer, alt: 'Implementation and supervision', icon: Building2 },
  { number: '04', title: 'Training & Capacity Building', desc: 'Staff training, operational handover, demonstration plots and knowledge transfer.', image: training, alt: 'Training and capacity building', icon: Users },
  { number: '05', title: 'Monitoring, Evaluation & Growth Support', desc: 'Performance tracking, yield optimization, seasonal adjustments and ongoing advisory.', image: greenhouse, alt: 'Monitoring and evaluation', icon: BarChart3 },
]

export default function Approach() {
  const [activeStage, setActiveStage] = useState(0)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !lineRef.current || !timelineRef.current) return undefined
    const context = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'left center' }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 82%',
          end: 'bottom 45%',
          scrub: 1,
        },
      })
    }, timelineRef)
    return () => context.revert()
  }, [reducedMotion])

  const handleKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = event.key === 'ArrowRight' ? (index + 1) % stages.length : (index - 1 + stages.length) % stages.length
    setActiveStage(next)
    document.getElementById(`stage-tab-${next}`)?.focus()
  }

  return (
    <section className="approach farm-section" id="approach" style={{ '--section-image': `url(${greenhouse})` }}>
      <div className="section-wash approach-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="07 / Our approach" copy="Five stages. One integrated process. Results you can measure.">
          <>A clear path<br /><em>forward.</em></>
        </SectionHeading>

        <div className="approach-layout">
          <div className="approach-timeline" ref={timelineRef} role="tablist" aria-label="Our approach stages">
            <div className="timeline-line" ref={lineRef} aria-hidden="true" />
            {stages.map((stage, index) => {
              const isActive = activeStage === index
              return (
                <motion.button
                  key={stage.number}
                  id={`stage-tab-${index}`}
                  className={`timeline-stage ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStage(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${index}`}
                  initial={{ opacity: 0, x: -26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <span className="stage-marker">
                    <span className="stage-dot">{isActive ? <CheckCircle size={15} aria-hidden="true" /> : <Circle size={15} aria-hidden="true" />}</span>
                    <span className="stage-number">{stage.number}</span>
                  </span>
                  <span className="stage-info"><strong>{stage.title}</strong><ArrowUpRight size={16} aria-hidden="true" /></span>
                </motion.button>
              )
            })}
          </div>

          <div className="approach-panel">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const isActive = activeStage === index
              if (!isActive) return null
              return (
                <motion.div key={stage.number} id={`stage-panel-${index}`} role="tabpanel" aria-labelledby={`stage-tab-${index}`} className="approach-panel-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="panel-image-wrapper"><ImageWrap src={stage.image} alt={stage.alt} radius="lg" hoverZoom aspectRatio="16/9" loading="eager" /></div>
                  <div className="panel-content">
                    <span className="panel-icon"><Icon size={21} aria-hidden="true" /></span>
                    <span className="panel-stage-label">Stage {stage.number}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.desc}</p>
                    <div className="panel-highlights"><span>Site-specific analysis</span><span>Measurable outcomes</span><span>Local expertise</span></div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}