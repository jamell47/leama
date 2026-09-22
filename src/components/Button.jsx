import { cn } from '../utils'

/**
 * Button — thin wrapper that outputs semantic <a> or <button>
 * with the design-system classes. No Framer Motion, no custom
 * cursor logic — pure CSS + :hover/:focus/:active states.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  href,
  type = 'button',
  disabled = false,
  /* Presentational-only props consumed by richer button primitives;
     stripped here so they never leak into the DOM. */
  icon: _icon,
  magnetic: _magnetic,
  external: _external,
  ...props
}) {
  const isLink = Boolean(href)
  const Tag = isLink ? 'a' : Component

  const base = cn(
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'glass' && 'btn-glass',
    variant === 'outline' && 'btn-outline',
    variant === 'green' && 'btn-green',
    size === 'lg' && 'btn-lg',
    size === 'sm' && 'btn-sm',
    className,
  )

  return (
    <Tag
      className={base}
      href={isLink ? href : undefined}
      type={isLink ? undefined : type}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Tag>
  )
}