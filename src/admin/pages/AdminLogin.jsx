/**
 * Admin login page.
 *
 * Uses the existing `authService.login` helper from marketplace/services/api.js.
 * On success we check the returned user's role; only ADMIN sessions are
 * allowed to stay on /admin. Non-admin sessions are bounced back to the
 * marketplace with a friendly message.
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Leaf, ShieldCheck } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { authService } from '../../marketplace/services/api.js'
import { ApiError } from '../../marketplace/services/api.js'

const fieldBase =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/45 outline-none transition focus:border-[var(--green-light)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--green-primary)]/30'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { login, user, isAdmin, ready } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/admin'

  useEffect(() => {
    if (ready && user && isAdmin) {
      navigate(from, { replace: true })
    }
  }, [ready, user, isAdmin, navigate, from])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setLoading(true)
    try {
      const data = await authService.login({ email: email.trim().toLowerCase(), password })
      const nextUser = data?.user
      if (nextUser?.role !== 'ADMIN') {
        // Not an admin — log them back out so the marketplace stays clean.
        const { clearAuthSession } = await import('../../marketplace/services/api.js')
        clearAuthSession()
        setError('This account does not have admin privileges. Please use an administrator account.')
        return
      }

      login(nextUser)
      setSuccess('Welcome back, administrator.')
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || 'Unable to sign in. Please try again.')
      } else if (err instanceof Error) {
        setError(err.message || 'Unable to sign in. Please try again.')
      } else {
        setError('Unable to sign in. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-grid">
        <div className="admin-login-hero glass-base glass-green">
          <div className="admin-login-mark" aria-hidden="true">
            <ShieldCheck size={40} />
          </div>
          <h1 className="admin-login-title">
            Leema Tech <b>Admin</b>
          </h1>
          <p className="admin-login-sub">
            Manage the marketplace catalogue, categories, orders and payments from one polished
            control centre. Farm produce, farmers and buyers stay visible in real time.
          </p>
          <ul className="admin-login-features">
            <li>Product catalogue with image upload</li>
            <li>Category management</li>
            <li>Order tracking &amp; status updates</li>
            <li>Payment status overview</li>
          </ul>
        </div>

        <form className="admin-login-card glass-base glass-strong" onSubmit={handleSubmit} noValidate>
          <div className="admin-login-head">
            <span className="admin-login-eyebrow">Secure access</span>
            <h2>Sign in to the admin panel</h2>
          </div>

          {error && (
            <div className="admin-alert admin-alert-error" role="alert">
              <span className="admin-alert-dot" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="admin-alert admin-alert-success" role="status">
              <span className="admin-alert-dot" aria-hidden="true" />
              <p>{success}</p>
            </div>
          )}

          <label className="admin-field">
            <span className="admin-field-label">Email address</span>
            <input
              className={fieldBase}
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@leema.tech"
              disabled={loading}
            />
          </label>

          <label className="admin-field">
            <span className="admin-field-label">Password</span>
            <input
              className={fieldBase}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </label>

          <button type="submit" className="btn btn-primary admin-btn-full" disabled={loading}>
            {loading ? (
              <>
                <span className="admin-spinner" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              <>
                <Leaf size={16} aria-hidden="true" />
                Sign in
              </>
            )}
          </button>

          <p className="admin-login-foot">
            <Link to="/marketplace" className="admin-link">Back to marketplace</Link>
            <span aria-hidden="true">·</span>
            <span>Need an admin account? Ask the platform owner.</span>
          </p>
        </form>
      </div>
    </div>
  )
}