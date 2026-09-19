import { Star, MapPin, ExternalLink } from 'lucide-react'
import { farmerLabel } from '../data/products'

/** Small farmer profile panel shown on the product detail page. */
export default function FarmerProfile({ farmerId, compact = false }) {
  const farmer = farmerLabel(farmerId || '')
  if (!farmer.avatar) return null

  return (
    <div className="farmer-profile glass-base" style={{ '--glass-blur': '20px' }}>
      <img src={farmer.avatar} alt={farmer.name} className="farmer-avatar" loading="lazy" decoding="async" />
      <div className="farmer-profile-body">
        <div className="farmer-profile-head">
          <h3>{farmer.name}</h3>
          {farmer.verified && (
            <span className="farmer-verified" title="Verified producer">
              <Star size={12} fill="currentColor" />
            </span>
          )}
        </div>
        <div className="farmer-profile-loc">
          <MapPin size={13} />
          <span>{farmer.location}</span>
        </div>
        <div className="farmer-profile-rating">
          <Star size={13} fill="currentColor" />
          <span>{farmer.rating.toFixed(1)}</span>
        </div>
        {!compact && <p className="farmer-profile-bio">{farmer.bio}</p>}
      </div>
      <button type="button" className="farmer-profile-cta glass-micro" aria-label={`Visit ${farmer.name}'s farm`}>
        <ExternalLink size={13} />
      </button>
    </div>
  )
}
