// src/routes/AppRoutes.jsx
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from '../features/public/landing/LandingPage';
import CartPage from '../features/cart/components/CartPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Cart / Order via WhatsApp */}
      <Route path="/cart" element={<CartPage />} />

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-6xl font-black text-orange-500 mb-4">404</h1>
          <h2 className="text-xl font-bold mb-6">Page Not Found</h2>
          <Link to="/" className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold transition-colors">
            Back to Home
          </Link>
        </div>
      } />
    </Routes>
  );
}
