import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useAnimations'

const ACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor="link"]'
const VIEW_SELECTOR =
  '[data-cursor="view"], .parallax-image, .service-card, .focus-panel, .infra-card, .client-card, .fruit-variety'

/**
 * CustomCursor — desktop only, and only when motion is allowed.
 * A crisp emerald dot (tracks the pointer precisely) plus a soft outer
 * ring that eases behind it. Images show a "View" indicator; CTAs react.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState('default')
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const canHover = window.matchMedia('(hover: hover)').matches
    setEnabled(finePointer && canHover && !reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled) return undefined

    document.documentElement.classList.add('has-custom-cursor')

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pointer.x, y: pointer.y }
    let frame = 0

    const render = () => {
      ring.x += (pointer.x - ring.x) * 0.16
      ring.y += (pointer.y - ring.y) * 0.16
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)

    const handleMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const handleOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest(VIEW_SELECTOR)) setState('view')
      else if (target.closest(ACTIVE_SELECTOR)) setState('link')
      else setState('default')
    }

    const handleDown = () => setState((current) => (current === 'view' ? 'view' : 'press'))
    const handleUp = () => setState((current) => (current === 'press' ? 'default' : current))
    const handleLeave = () => setState('hidden')
    const handleEnter = () => setState('default')

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver, { passive: true })
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    document.addEventListener('pointerleave', handleLeave)
    document.addEventListener('pointerenter', handleEnter)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      document.removeEventListener('pointerleave', handleLeave)
      document.removeEventListener('pointerenter', handleEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div className={`custom-cursor ${state}`} ref={dotRef} aria-hidden="true">
        <span className="cursor-dot" />
      </div>
      <div className={`cursor-ring-layer ${state}`} ref={ringRef} aria-hidden="true">
        <span className="cursor-ring" />
        <span className="cursor-label">View</span>
      </div>
    </>
  )
}