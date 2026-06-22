import { useState, useEffect } from 'react';
import Navbar from '../../../shared/components/layout/Navbar';
import Hero from './components/Hero';
import ProductList from '../../products/components/ProductList';
import HowToOrder from './components/HowToOrder';
import Footer from '../../../shared/components/layout/Footer';
import { firebaseService } from '../../../shared/services/firebaseService';

export default function LandingPage() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    async function getCount() {
      try {
        const products = await firebaseService.getAll('products');
        setProductCount(products.length);
      } catch (error) {
        console.error("Failed to fetch product count for Hero:", error);
      }
    }
    getCount();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b1e] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero productCount={productCount} />

      {/* Products & Filters Section */}
      <ProductList />

      {/* How to Order Steps */}
      <HowToOrder />

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-whatsapp-float-glow">
        <a 
          href="https://wa.me/919518967710?text=Hello!%20I%20have%20a%20query%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group relative"
          aria-label="Chat on WhatsApp"
        >
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-900/90 dark:bg-[#161638]/90 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-xl border border-white/10 opacity-0 scale-90 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md">
            Chat with us
          </span>
          
          {/* WhatsApp SVG */}
          <svg viewBox="0 0 448 512" className="w-7 h-7 fill-white">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3.2 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </a>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
