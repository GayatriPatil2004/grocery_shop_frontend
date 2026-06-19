import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { COLORS } from '../../../shared/constants/colors';

export default function CategoryCard({ category, productCount, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative h-64 w-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100 dark:border-white/5 isolate will-change-transform"
      style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] overflow-hidden will-change-transform"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent dark:from-[#0b0b1e]/95 dark:via-[#0b0b1e]/40 opacity-90 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Top Floating Badge (Product Count) */}
      <div className="absolute top-6 left-8 flex flex-col gap-1 z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/90 whitespace-nowrap">
          {productCount} Products
        </span>
        <div className="w-8 h-1 rounded-full bg-orange-500/50" />
      </div>

      {/* Floating Icon (Glassmorphic) */}
      <div className="absolute top-6 right-8 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ShoppingBag className="w-5 h-5 text-white/50" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-x-8 bottom-8 flex flex-col items-start gap-4 z-10">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight transition-transform duration-300 group-hover:-translate-y-1">
            {category.name}
          </h3>
          <p className="text-sm text-slate-300 font-medium line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
            {category.description}
          </p>
        </div>

        {/* Explore Button (Glassmorphic) */}
        <button 
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl font-bold text-sm text-white transition-all duration-300 group/btn overflow-hidden relative shadow-lg shadow-black/20"
          style={{
            background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
          }}
        >
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          
          <span className="relative z-10">Explore</span>
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
