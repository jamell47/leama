import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SHOP_GALLERY from '../data/shopGallery'

export default function Marketplace() {
  return (
    <section className="marketplace-section section" id="marketplace">
      <div className="container">
        <SectionHeading
          eyebrow="04 / Shop"
          lines={['A stronger link', 'between farms and buyers']}
          copy="Our shop connects farm output with the right demand, helping agricultural businesses reach better, more transparent market channels."
        />

        <div className="shop-gallery">
          {SHOP_GALLERY.map((item) => (
            <Link
              key={item.name}
              to="/marketplace"
              className="shop-card"
              aria-label={`${item.name} — ${item.caption}`}
            >
              <img src={item.image} alt={item.caption} loading="lazy" />
              <span className="shop-card-body">
                <span className="shop-card-tag">{item.tag}</span>
                <span className="shop-card-name">{item.name}</span>
                <span className="shop-card-caption">{item.caption}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="shop-cta-row">
          <Link to="/marketplace" className="btn btn-primary">
            Browse the full shop
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}