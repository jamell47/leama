import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * AnimatedHeading — reveals an oversized heading line by line, with
 * optional emerald accent words. Renders semantic h1/h2/h3 tags.
 */
export default function AnimatedHeading({
  lines,
  as = 'h2',
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.12,
  once = true,
  animateOnMount = false,
}) {
  const Tag = motion[as] || motion.h2

  const linesArray = Array.isArray(lines) ? lines : [lines]

  const motionProps = animateOnMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once, amount: 0.4 } }

  return (
    <Tag
      className={className}
      initial="hidden"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...motionProps}
    >
      {linesArray.map((line, index) => {
        const content = typeof line === 'string' ? { text: line } : line
        return (
          <span className={`heading-line ${lineClassName}`} key={`${content.text}-${index}`}>
            <motion.span
              className="heading-line-inner"
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {content.text}
              {content.accent ? <em className="heading-accent">{content.accent}</em> : null}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

/**
 * SectionHeading — eyebrow + oversized heading + supporting copy.
 * Used by every section so spacing and rhythm stay consistent.
 */
export function SectionHeading({ eyebrow, lines, copy, className = '', align = 'left', animateOnMount = false }) {
  return (
    <div className={`section-heading section-heading-${align} ${className}`}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          {...(animateOnMount
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 } })}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="eyebrow-line" aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}
      <AnimatedHeading lines={lines} className="section-title" animateOnMount={animateOnMount} />
      {copy && (
        <motion.p
          className="section-copy"
          initial={{ opacity: 0, y: 18 }}
          {...(animateOnMount
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.5 } })}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  )
}

/** CountingNumber — animates a number from 0 once it scrolls into view. */
export function CountingNumber({ value, duration = 1800, delay = 0, suffix = '', className = '' }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) {
      setDisplay(value)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        const start = performance.now() + delay
        const tick = (now) => {
          const elapsed = now - start
          if (elapsed < 0) {
            requestAnimationFrame(tick)
            return
          }
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [value, duration, delay])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}