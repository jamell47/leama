import { motion } from 'framer-motion'

export function SectionHeading({
  eyebrow,
  lines,
  copy,
  className = '',
  align = 'left',
  animateOnMount = false,
}) {
  const headingLines = Array.isArray(lines) ? lines : [lines].filter(Boolean)

  return (
    <div className={`section-heading section-heading-${align} ${className}`}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          {...(animateOnMount
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 } })}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-line" aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}

      {headingLines.length > 0 && (
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          {...(animateOnMount
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.4 } })}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {headingLines.map((line, index) => (
            <span key={`${line}-${index}`} className="heading-line">
              {line}
            </span>
          ))}
        </motion.h2>
      )}

      {copy && (
        <motion.p
          className="section-copy"
          initial={{ opacity: 0, y: 18 }}
          {...(animateOnMount
            ? { animate: { opacity: 1, y: 0 } }
            : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.5 } })}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeading
