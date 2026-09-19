import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Menu, Phone, ShoppingCart, X } from 'lucide-react'
import { company, navLinks, whatsappLink } from '../data/content'
import { useCart } from '../marketplace/context/CartContext'
import { formatCurrency } from '../utils'
import { useReducedMotion } from '../hooks/useAnimations'
import { cn } from '../utils'
import MagneticButton from './MagneticButton'

const EASE = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = window.location.pathname
  const reducedMotion = useReducedMotion()
  const { totalItems, total, currency, openCart } = useCart()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 420 && y > last + 4)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const toggle = useCallback(() => setOpen((value) => !value), [])

  const NavLink = ({ to, children, className: classNameProp }) => {
    const isActive = pathname === to || pathname.startsWith(to + '/')
    return (
      <a
        href={to}
        className={cn(isActive ? 'active' : '', classNameProp)}
        onClick={(e) => {
          if (to.startsWith('/marketplace')) {
            e.preventDefault()
            window.location.pathname = to
            window.dispatchEvent(new PopStateEvent('popstate'))
          }
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <motion.header
        className={cn('navbar', scrolled && 'is-scrolled', hidden && !open && 'is-hidden')}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
      >
        <a href="/" className="brand" aria-label={`${company.name} home`}>
          <span className="brand-mark" aria-hidden="true">
            <Leaf size={20} />
          </span>
          <span>
            LEEMA <b>TECH</b>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          <a className="nav-phone" href={company.phoneHref} aria-label={`Call ${company.phone}`}>
            <Phone size={15} aria-hidden="true" />
            <span>{company.phone}</span>
          </a>
          <button
            type="button"
            className="cart-fab-nav glass-base"
            style={{ '--glass-blur': '18px' }}
            onClick={openCart}
            aria-label={`Open cart — ${totalItems} items, ${formatCurrency(total, currency)}`}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            <span className="cart-fab-nav-count">{totalItems}</span>
            <span className="cart-fab-nav-total">{formatCurrency(total, currency)}</span>
          </button>
          <MagneticButton to="/contact" variant="primary" size="sm" magnetic={!reducedMotion}>
            Get in Touch
          </MagneticButton>
          <button type="button" className="menu-button" onClick={toggle} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: EASE }}
                >
                  <NavLink to={link.to}>
                    <span>{link.label}</span>
                    <span className="mobile-nav-index" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                className="mobile-nav-actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.36, ease: EASE }}
              >
                <a className="mobile-nav-phone" href={company.phoneHref}>
                  <Phone size={15} aria-hidden="true" />
                  <span>{company.phone}</span>
                </a>
                <button
                  type="button"
                  className="cart-fab-nav glass-base mobile-cart-fab"
                  style={{ '--glass-blur': '18px' }}
                  onClick={() => {
                    setOpen(false)
                    openCart()
                  }}
                  aria-label={`Open cart — ${totalItems} items, ${formatCurrency(total, currency)}`}
                >
                  <ShoppingCart size={16} aria-hidden="true" />
                  <span>Cart · {totalItems} items · {formatCurrency(total, currency)}</span>
                </button>
                <MagneticButton to="/contact" variant="primary" magnetic={false}>
                  Get in Touch
                </MagneticButton>
                <a className="btn btn-glass mobile-nav-cta" href={whatsappLink()} target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
