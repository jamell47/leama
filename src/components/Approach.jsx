import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle, Circle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { approachStages } from '../data/content'
import { getIcon } from '../icons'
import { useReducedMotion } from '../hooks/useAnimations'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

/* The documented outcomes of the holistic, end-to-end process. */
const outcomes = [
  { title: 'Technically sound', icon: 'HardHat' },
  { title: 'Financially viable', icon: 'LineChart' },
  { title: 'Scalable', icon: 'TrendingUp' },
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
    const next = event.key === 'ArrowRight' ? (index + 1) % approachStages.length : (index - 1 + approachStages.length) % approachStages.length
    setActiveStage(next)
    document.getElementById(`stage-tab-${next}`)?.focus()
  }

  return (
    <section className="approach farm-section" id="approach">
      <div className="section-wash approach-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="07 / Our approach" copy="Five stages. One integrated, holistic process that keeps every project technically sound, financially viable and scalable.">
          <>A clear path<br /><em>forward.</em></>
        </SectionHeading>

        <div className="approach-layout">
          <div className="approach-timeline" ref={timelineRef} role="tablist" aria-label="Our approach stages">
            <div className="timeline-line" ref={lineRef} aria-hidden="true" />
            {approachStages.map((stage, index) => {
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
            {approachStages.map((stage, index) => {
              const Icon = getIcon(stage.icon)
              const isActive = activeStage === index
              if (!isActive) return null
              return (
                <motion.div key={stage.number} id={`stage-panel-${index}`} role="tabpanel" aria-labelledby={`stage-tab-${index}`} className="approach-panel-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="panel-image-wrapper"><ImageWrap src={stage.image} alt={stage.alt || stage.title} radius="lg" hoverZoom aspectRatio="16/9" loading="eager" /></div>
                  <div className="panel-content">
                    <span className="panel-icon"><Icon size={21} aria-hidden="true" /></span>
                    <span className="panel-stage-label">Stage {stage.number}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                    <div className="panel-highlights">
                      {outcomes.map((outcome) => {
                        const OutcomeIcon = getIcon(outcome.icon)
                        return (
                          <span key={outcome.title}><OutcomeIcon size={14} aria-hidden="true" />{outcome.title}</span>
                        )
                      })}
                    </div>
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