// src/shared/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Clock, Phone, Calendar, MessageSquare } from 'lucide-react';
import { COLORS } from '../../constants/colors';

export default function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Super%20Mart!`;

  return (
    <footer className="w-full bg-slate-900 text-slate-300 dark:bg-[#070718] pt-16 pb-8 border-t border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: COLORS.accent.DEFAULT }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Store Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)` }}
              >
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white">SUPER MART</span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold leading-3">
                  Your Daily Store
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-2">
              Your one-stop neighbourhood store for fresh groceries, dairy products, chilled ice creams, beverages, pure ice cubes, and daily essentials.
            </p>
          </div>

          {/* Column 2: Store Info Details */}
          <div className="flex flex-col gap-5">
            <h3 className="text-white text-base font-bold tracking-wide">Store Info</h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">Near Bus Stand, Main Market</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">7:00 AM – 11:00 PM (Daily)</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">Open all 7 days</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Order via WhatsApp */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-base font-bold tracking-wide">Order via WhatsApp</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Simply browse products, add them to your cart, fill in your delivery details, and send your order summary directly on WhatsApp!
            </p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-fit flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba56] shadow-lg shadow-green-600/10 hover:shadow-green-600/25 transition-all duration-200"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-slate-800 dark:bg-white/5 my-8"></div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <span>© {new Date().getFullYear()} Super Mart. All Rights Reserved.</span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span>18+ for tobacco products</span>
            <span className="text-slate-700">•</span>
            <span>Prices subject to change</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
