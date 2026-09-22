import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CartProvider from './marketplace/context/CartContext'
import MarketplacePage from './marketplace/pages/MarketplacePage'
import ProductDetailPage from './marketplace/pages/ProductDetailPage'
import CheckoutPage from './marketplace/pages/CheckoutPage'
import OrderConfirmationPage from './marketplace/pages/OrderConfirmationPage'
import AdminAuthProvider from './admin/context/AdminAuthContext'
import AdminRoute from './admin/components/AdminRoute'
import AdminLayout from './admin/components/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminProducts from './admin/pages/AdminProducts'
import AdminProductForm from './admin/pages/AdminProductForm'
import AdminCategories from './admin/pages/AdminCategories'
import AdminOrders from './admin/pages/AdminOrders'
import AdminOrderDetail from './admin/pages/AdminOrderDetail'
import AdminPayments from './admin/pages/AdminPayments'

function AdminShell({ children }) {
  return (
    <AdminAuthProvider>
      <AdminRoute>
        <AdminLayout>{children}</AdminLayout>
      </AdminRoute>
    </AdminAuthProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/product/:id" element={<ProductDetailPage />} />
          <Route path="/marketplace/checkout" element={<CheckoutPage />} />
          <Route path="/marketplace/order/:id" element={<OrderConfirmationPage />} />

          <Route
            path="/admin/login"
            element={
              <AdminAuthProvider>
                <AdminLogin />
              </AdminAuthProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminShell>
                <AdminDashboard />
              </AdminShell>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminShell>
                <AdminProducts />
              </AdminShell>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <AdminShell>
                <AdminProductForm />
              </AdminShell>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <AdminShell>
                <AdminProductForm />
              </AdminShell>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminShell>
                <AdminCategories />
              </AdminShell>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminShell>
                <AdminOrders />
              </AdminShell>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <AdminShell>
                <AdminOrderDetail />
              </AdminShell>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <AdminShell>
                <AdminPayments />
              </AdminShell>
            }
          />
          <Route path="*" element={<App />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
