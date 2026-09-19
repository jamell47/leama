import { Star } from 'lucide-react'
import { ratingStars } from '../utils'

/** Premium star rating, half-filled via clip-path. */
export default function RatingStars({ rating = 0, reviews = null, className = '' }) {
  const { full, half, empty } = ratingStars(rating)
  const total = full + (half ? 1 : 0) + empty
  const bar = (fill) =>
    fill === 'full'
      ? 'filled'
      : fill === 'half'
        ? 'half'
        : 'empty'

  return (
    <div className={`rating-stars ${className}`}>
      {Array.from({ length: total }).map((_, i) => {
        const kind = bar(i < full ? 'full' : i === full && half ? 'half' : 'empty')
        return (
          <Star
            key={i}
            size={14}
            className={`star star-${kind}`}
            aria-hidden="true"
          />
        )
      })}
      {reviews != null && (
        <span className="rating-reviews">{reviews}</span>
      )}
    </div>
  )
}
