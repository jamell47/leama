import { useScrollProgress } from '../hooks/useAnimations'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return <div className="scroll-progress" aria-hidden="true"><div className="scroll-progress-bar" style={{ transform: `scaleY(${progress})` }} /></div>
}
