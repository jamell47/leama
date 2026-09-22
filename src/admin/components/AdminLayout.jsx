/**
 * Admin layout — sidebar + top bar + glass/green identity.
 *
 * Reuses the existing design tokens from index.css so the admin app
 * feels like part of the same Leema Tech product rather than a separate
 * tool. No marketplace files are touched.
 */

import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  FolderOpen,
  Leaf,
  LogOut,
  Package,
  Receipt,
  ShoppingBag,
  Wallet,
  X,
} from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { cn } from '../../utils'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { to: '/admin/orders', label: 'Orders', icon: Receipt },
  { to: '/admin/payments', label: 'Payments', icon: Wallet },
]

export default function AdminLayout({ children }) {
  const { user, logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const initials = (user?.name || 'A')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="admin-shell">
      <aside
        className={cn('admin-sidebar', sidebarOpen && 'is-open')}
        aria-label="Admin navigation"
      >
        <div className="admin-sidebar-head">
          <Link to="/admin" className="admin-brand">
            <span className="admin-brand-mark" aria-hidden="true">
              <Leaf size={20} />
            </span>
            <span>
              LEEMA <b>TECH</b>
            </span>
            <span className="admin-brand-tag">Admin</span>
          </Link>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close admin menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="admin-nav">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn('admin-nav-item', isActive(item) && 'is-active')}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-foot">
          <div className="admin-user-card glass-base glass-green">
            <div className="admin-user-avatar" aria-hidden="true">
              {initials}
            </div>
            <div className="admin-user-meta">
              <p className="admin-user-name">{user?.name || 'Administrator'}</p>
              <p className="admin-user-role">{user?.role || 'ADMIN'}</p>
            </div>
          </div>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            <LogOut size={16} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="admin-veil"
          aria-label="Close admin menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-main">
        <header className={cn('admin-topbar', scrolled && 'is-scrolled')}>
          <button
            type="button"
            className="admin-menu-button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
            aria-label="Toggle admin menu"
          >
            <span className="admin-menu-bar" />
            <span className="admin-menu-bar" />
            <span className="admin-menu-bar" />
          </button>

          <div className="admin-search">
            <span className="admin-search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input type="search" placeholder="Search products, orders, categories…" aria-label="Search admin" />
          </div>

          <div className="admin-topbar-actions">
            <span className="admin-live" title="Leema Tech Solutions admin panel">
              <span className="admin-live-dot" aria-hidden="true" />
              Live
            </span>
            <Link to="/marketplace" className="admin-link-back" title="Back to marketplace">
              <ShoppingBag size={16} aria-hidden="true" />
              <span>Marketplace</span>
            </Link>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}