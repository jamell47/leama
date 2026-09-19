import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

/** Reusable featured carousel / grid: "Fresh From the Farm", "Popular …", "New …". */
export default function FeaturedSection({ title, subtitle, products, id }) {
  if (!products?.length) return null
  return (
    <section className="featured-section" id={id} aria-labelledby={`feat-${id}-title`}>
      <div className="container">
        <div className="featured-head">
          <h2 id={`feat-${id}-title`}>{title}</h2>
          {subtitle && <p className="featured-sub">{subtitle}</p>}
        </div>

        <div className="featured-track">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="featured-item"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
