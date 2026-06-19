// src/features/public/landing/components/Hero.jsx
import { Star, ShoppingBag } from 'lucide-react';
import { COLORS } from '../../../../shared/constants/colors';
import products from '../../../../data/products';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-emerald-50/20 via-slate-50 to-orange-50/20 dark:gradient-dark-bg text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background decorations for a premium look */}
      <div 
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full opacity-[0.04] dark:opacity-10 blur-[120px] pointer-events-none animate-pulse"
        style={{ backgroundColor: COLORS.accent.DEFAULT }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-[0.04] dark:opacity-10 blur-[150px] pointer-events-none"
        style={{ backgroundColor: COLORS.primary.DEFAULT }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="flex flex-col gap-6 text-left max-w-2xl animate-fade-right">
            
            {/* Promo Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 w-fit text-xs font-bold tracking-wide text-orange-600 dark:text-orange-400">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              <span>ORDER VIA WHATSAPP — FAST & EASY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              Your <span className="gradient-accent-text font-black">Neighbourhood</span> <br />
              Store, Delivered.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Browse groceries, Amul products, ice cream, cold drinks and more. Add items to your cart, share your address — we'll confirm and dispatch your order via WhatsApp!
            </p>

            {/* Actions & Rating */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#products"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                  }}
                >
                  <span>Shop Now</span>
                </a>
              </div>

              {/* Rating / Trust Badging */}
              <div className="flex items-center gap-2.5 mt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <span className="font-black text-slate-900 dark:text-white">4.9/5 Rating</span> • 1k+ Happy Customers
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image with Floating Glass Badges */}
          <div className="relative flex justify-center lg:justify-end animate-fade-left">
            <div className="relative max-w-[500px] w-full aspect-[4/3] lg:aspect-square group">
              
              {/* Hero Main Image Wrapper for Zoom-in Effect */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10">
                <img 
                  src="/assets/hero_products.png" 
                  alt="Super Mart Groceries" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating Badge 1: Products count */}
              <div 
                className="absolute -top-5 -right-5 sm:-right-8 p-4 rounded-2xl text-white shadow-xl flex flex-col items-center justify-center text-center select-none z-10"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                }}
              >
                <span className="text-xl sm:text-2xl font-black">{products.length}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> Products
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
