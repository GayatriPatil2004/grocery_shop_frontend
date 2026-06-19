// src/shared/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { COLORS } from '../../constants/colors';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const getNavLink = (hash) => isHomePage ? hash : `/${hash}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Glassmorphic Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 border-b backdrop-blur-md ${
          isScrolled 
            ? 'py-3 bg-white/80 dark:bg-[#0b0b1e]/85 shadow-lg border-slate-200/50 dark:border-white/5' 
            : 'py-5 bg-white/40 dark:bg-[#0b0b1e]/60 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)` }}
              >
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-lg font-black tracking-wider text-slate-900 dark:text-white"
                >
                  SUPER MART
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-500 dark:text-slate-400 font-semibold leading-3">
                  Your Daily Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href={getNavLink('#products')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 nav-link-hover">
                Products
              </a>

              <a href={getNavLink('#how-to-order')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 nav-link-hover">
                How to Order
              </a>
              <a href={getNavLink('#contact')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 nav-link-hover">
                Contact
              </a>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-6">




              {/* Cart Button */}
              <Link 
                to="/cart"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="flex items-center justify-center bg-white text-orange-600 text-[10px] font-black w-5 h-5 rounded-full scale-110 ml-0.5 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-3">


              {/* Cart link icon */}
              <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center bg-orange-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full py-4 px-6 bg-white dark:bg-[#0b0b1e] border-b border-slate-200 dark:border-white/10 flex flex-col gap-4 shadow-xl animate-slide-down">
            <a 
              href={getNavLink('#products')} 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1"
            >
              Products
            </a>

            <a 
              href={getNavLink('#how-to-order')} 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1"
            >
              How to Order
            </a>
            <a 
              href={getNavLink('#contact')} 
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1"
            >
              Contact
            </a>

            <Link 
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Go to Cart ({cartCount} items)</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
