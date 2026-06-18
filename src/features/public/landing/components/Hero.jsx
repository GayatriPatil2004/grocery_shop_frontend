// src/features/public/landing/components/Hero.jsx
import { ArrowRight, MessageSquare, Star, ShoppingBag } from 'lucide-react';
import { COLORS } from '../../../../shared/constants/colors';

export default function Hero() {
  const whatsappNumber = '919518967710';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Super%20Mart!%20I%20want%20to%20enquire%20about%20some%20products.`;

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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a 
                href="#products"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                }}
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Image with Floating Glass Badges */}
          <div className="relative flex justify-center lg:justify-end animate-fade-left">
            <div className="relative max-w-[500px] w-full aspect-[4/3] lg:aspect-square">
              
              {/* Hero Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
                alt="Super Mart Groceries" 
                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10"
              />

              {/* Floating Badge 1: 200+ Products */}
              <div 
                className="absolute -top-5 -right-5 sm:-right-8 p-4 rounded-2xl text-white shadow-xl flex flex-col items-center justify-center text-center select-none"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                }}
              >
                <span className="text-xl sm:text-2xl font-black">200+</span>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> Products
                </span>
              </div>

              {/* Floating Badge 2: 4.9 Rating */}
              <div className="absolute -bottom-5 left-6 sm:left-10 glass-morphic px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 dark:text-white">4.9 Rating</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">1k+ Happy Customers</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
