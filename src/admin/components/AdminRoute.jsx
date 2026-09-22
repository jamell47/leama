/**
 * Protected route guard for the admin app.
 *
 * Renders the admin dashboard only when a valid JWT session with
 * `role: 'ADMIN'` is present. Otherwise it redirects to /admin/login.
 * This is a pure component — it never talks to the backend itself;
 * the token was already validated server-side by the time the user
 * reached this route through the auth API.
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function AdminRoute({ children }) {
  const { user, isAdmin, ready } = useAdminAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="admin-route-guard" aria-busy="true">
        <div className="admin-route-guard-card glass-base glass-green">
          <span className="admin-route-guard-dot" aria-hidden="true" />
          <p>Restoring admin session…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname, error: 'account_not_admin' }} />
  }

  return children
}