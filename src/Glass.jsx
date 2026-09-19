import { cn } from './utils'

/**
 * Glass — compatibility wrapper around the glass primitives.
 * Older section drafts import `Glass`; it now forwards to the
 * shared glass-base classes so nothing renders unstyled.
 */
export default function Glass({
  children,
  variant = 'white',
  hover = false,
  hoverLift = true,
  hoverGlow = false,
  blur,
  className = '',
  ...props
}) {
  return (
    <div
      className={cn(
        'glass-base',
        variant === 'strong' && 'glass-strong',
        variant === 'green' && 'glass-green',
        variant === 'dark' && 'glass-dark',
        variant === 'soft' && 'glass-soft',
        variant === 'white' && 'glass-white',
        hover && 'glass-hover',
        hoverLift && 'glass-hover-lift',
        hoverGlow && 'glass-hover-glow',
        className,
      )}
      style={blur ? { '--glass-blur': `${blur}px` } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
