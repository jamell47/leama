export const getCurrentEnvironment = () => {
  if (import.meta.env?.DEV) return 'development'
  if (import.meta.env?.PROD) return 'production'
  return 'development'
}

// Vite exposes only VITE_* variables to the browser. Keep the backend URL in
// one place so it can be changed for local, preview, and production builds.
export const API_BASE = (
  import.meta.env.DEV
    ? 'http://localhost:4000/api'
    : (import.meta.env.VITE_API_URL || 'https://leemabackend.onrender.com/api')
).replace(/\/$/, '')
