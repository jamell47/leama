/**
 * Admin auth context.
 *
 * Holds the currently-authenticated user and exposes helpers for the
 * admin UI: login, logout, and a derived `isAdmin` flag. The token is
 * stored by the existing `api.js` session helpers, so the marketplace
 * and admin apps share one auth state.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, logout } from '../services/adminApi'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Re-read from storage on mount so a refresh keeps the session.
    setUser(getCurrentUser())
    setReady(true)
  }, [])

  const value = useMemo(() => {
    const isAdmin = Boolean(user && user.role === 'ADMIN')
    return {
      user,
      isAdmin,
      ready,
      login: (nextUser) => setUser(nextUser ?? getCurrentUser()),
      logout: () => {
        logout()
        setUser(null)
      },
    }
  }, [user, ready])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export default AdminAuthProvider