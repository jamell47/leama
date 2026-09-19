import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Leaf, TreePine, Egg, Users, Sparkles, Wheat } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useAnimations'
import { crops, fruitFarm, poultry, farmer, greenhouse, solar, seedlings } from '../assets'
import ImageWrap from './ImageWrap'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const focusAreas = [
  { id: '01', title: 'Horticulture', image: crops, alt: 'Horticultural crop production', icon: Leaf },
  { id: '02', title: 'Fruit Farming', subtitle: 'Avocado / Citrus / Mangoes / Apples', image: fruitFarm, alt: 'Fruit farming orchard', icon: TreePine },
  { id: '03', title: 'Poultry', image: poultry, alt: 'Poultry farming systems', icon: Egg },
  { id: '04', title: 'Livestock', image: farmer, alt: 'Livestock and mixed farming', icon: Wheat },
  { id: '05', title: 'Mixed Farming', image: seedlings, alt: 'Integrated mixed farming model', icon: Leaf },
  { id: '06', title: 'Community Agribusiness', image: greenhouse, alt: 'Community agribusiness project', icon: Users },
  { id: '07', title: 'Sustainable Agriculture', image: solar, alt: 'Sustainable solar-powered agriculture', icon: Sparkles },
]

export default function FocusAreas() {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section || reducedMotion || window.matchMedia('(max-width: 760px)').matches) return undefined

    const context = gsap.context(() => {
      const distance = Math.max(0, track.scrollWidth - section.clientWidth)
      gsap.fromTo(track, { x: 0 }, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
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
            const Icon = area.icon
            return (
              <motion.article key={area.id} className="focus-card" role="listitem" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, delay: 0.06 * index }}>
                <ImageWrap src={area.image} alt={area.alt} radius="lg" hoverZoom aspectRatio="3/4" loading={index < 3 ? 'eager' : 'lazy'} />
                <div className="focus-overlay" aria-hidden="true" />
                <div className="focus-tag"><span>{area.id}</span><Icon size={17} aria-hidden="true" /></div>
                <div className="focus-content">
                  <h3>{area.title}</h3>
                  {area.subtitle && <p>{area.subtitle}</p>}
                  <span className="focus-cta">Explore area <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
      <style>{`@keyframes focusPulse{0%,100%{opacity:.4;transform:scaleX(1)}50%{opacity:.9;transform:scaleX(1.4)}}`}</style>
      <div className="container focus-hint"><span className="focus-line" aria-hidden="true" /><span>Scroll to move through the landscape</span></div>
    </section>
  )
}