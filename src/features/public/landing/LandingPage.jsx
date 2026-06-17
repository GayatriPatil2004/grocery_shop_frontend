// src/features/public/landing/LandingPage.jsx
import { MessageSquare, Phone } from 'lucide-react';
import Navbar from '../../../shared/components/layout/Navbar';
import Hero from './components/Hero';
import ProductList from '../../products/components/ProductList';
import HowToOrder from './components/HowToOrder';
import Footer from '../../../shared/components/layout/Footer';
import { COLORS } from '../../../shared/constants/colors';

export default function LandingPage() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Super%20Mart!%20I%20have%20an%20enquiry.`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b1e] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Products & Filters Section */}
      <ProductList />

      {/* How to Order Steps */}
      <HowToOrder />

      {/* Footer Section */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group hover:shadow-green-500/30"
        title="Chat with us on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="absolute right-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-lg border border-white/10 transition-transform duration-200 origin-right whitespace-nowrap">
          Order Hotline
        </span>
      </a>
    </div>
  );
}
