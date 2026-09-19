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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/product/:id" element={<ProductDetailPage />} />
          <Route path="/marketplace/checkout" element={<CheckoutPage />} />
          <Route path="/marketplace/order/:id" element={<OrderConfirmationPage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
