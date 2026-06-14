// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<div>Home Page - Coming Soon</div>} />

      {/* Product Routes - To be added */}
      {/* <Route path="/products" element={<ProductsPage />} /> */}
      {/* <Route path="/products/:category" element={<CategoryPage />} /> */}
      {/* <Route path="/products/:category/:id" element={<ProductDetailPage />} /> */}

      {/* Static Pages - To be added */}
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="/contact" element={<ContactPage />} /> */}

      {/* Cart / Order via WhatsApp */}
      {/* <Route path="/cart" element={<CartPage />} /> */}

      {/* 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
