import { Star, MapPin } from 'lucide-react'

export default function FarmerProfile({ farmerName, location, rating = 0, bio = '', verified = false, compact = false }) {
  if (!farmerName) return null
  return (
    <div className="farmer-profile glass-base" style={{ '--glass-blur': '20px' }}>
      <div className="farmer-avatar farmer-avatar-fallback" aria-hidden="true">{farmerName.charAt(0)}</div>
      <div className="farmer-profile-body">
        <div className="farmer-profile-head">
          <h3>{farmerName}</h3>
          {verified && <span className="farmer-verified" title="Verified producer"><Star size={12} fill="currentColor" /></span>}
        </div>
        {location && <div className="farmer-profile-loc"><MapPin size={13} /><span>{location}</span></div>}
        {Number(rating) > 0 && <div className="farmer-profile-rating"><Star size={13} fill="currentColor" /><span>{Number(rating).toFixed(1)}</span></div>}
        {!compact && bio && <p className="farmer-profile-bio">{bio}</p>}
      </div>
      <button type="button" className="farmer-profile-cta glass-micro" aria-label={`Visit ${farmer.name}'s farm`}>
        <ExternalLink size={13} />
      </button>
    </div>
  )
}
