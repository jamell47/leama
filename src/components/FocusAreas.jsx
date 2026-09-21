import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { farmer } from '../assets'
import { focusAreas } from '../data/content'
import { getIcon } from '../icons'
import { useReducedMotion } from '../hooks/useAnimations'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export default function FocusAreas() {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section || reducedMotion || window.matchMedia('(max-width: 760px)').matches) return undefined

    /* Measured on refresh: on very wide screens the five cards may already
       fit, in which case there is nothing to scroll and no pin is created. */
    const measure = () => Math.max(0, track.scrollWidth - section.clientWidth)
    if (measure() <= 0) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(track, { x: 0 }, {
        x: () => -measure(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${measure()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => context.revert()
  }, [reducedMotion])

  return (
    <section className="focus-areas farm-section" id="focus" ref={sectionRef} style={{ '--section-image': `url(${farmer})` }}>
      <div className="section-wash focus-wash" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="04 / Focus areas" copy="We work across the systems that make agriculture more resilient, productive and useful.">
          <>Where ideas take<br /><em>root.</em></>
        </SectionHeading>
      </div>

      <div className="focus-track-wrapper" aria-label="Focus areas gallery">
        <div className="focus-track" ref={trackRef} role="list">
          {focusAreas.map((area, index) => {
            const Icon = getIcon(area.icon)
            return (
              <motion.article key={area.id} className="focus-card" role="listitem" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, delay: 0.06 * index }}>
                <ImageWrap src={area.image} alt={area.alt} radius="lg" hoverZoom aspectRatio="3/4" loading={index < 3 ? 'eager' : 'lazy'} />
                <div className="focus-overlay" aria-hidden="true" />
                <div className="focus-tag"><span>{area.number}</span><Icon size={17} aria-hidden="true" /></div>
                <div className="focus-content">
                  <h3>{area.title}</h3>
                  {area.sub && <p>{area.sub}</p>}
                  {area.varieties && (
                    <ul className="focus-varieties" role="list">
                      {area.varieties.map((variety) => <li key={variety}>{variety}</li>)}
                    </ul>
                  )}
                  <span className="focus-cta">Explore area <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
      <div className="container focus-hint"><span className="focus-line" aria-hidden="true" /><span>Scroll to move through the landscape</span></div>
    </section>
  )
}