// src/features/products/components/ProductList.jsx
import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import categories from '../../../data/categories';
import products from '../../../data/products';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  // Helper to dynamically render Lucide Icons by name
  const renderCategoryIcon = (iconName, className) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.ShoppingBag;
    return <IconComponent className={className} />;
  };

  return (
    <section id="products" className="py-20 bg-slate-50 dark:bg-[#0b0b1e] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              All Products
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {filteredProducts.length} products found • Add items and send WhatsApp inquiry
            </p>
          </div>
        </div>

        {/* Category Filter Pills - Sticky scroll wrapper */}
        <div id="categories" className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap border transition-all duration-200 select-none shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-[#161638] dark:text-orange-400 border-slate-900 dark:border-orange-500/30 shadow-md shadow-slate-900/10 dark:shadow-orange-500/5'
                    : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:text-slate-900 dark:bg-[#111130]/40 dark:text-slate-300 dark:border-white/5 dark:hover:bg-[#111130]/80 dark:hover:text-white'
                }`}
              >
                {renderCategoryIcon(category.icon, `w-4 h-4 ${isActive ? 'text-orange-500' : 'text-slate-400'}`)}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="animate-scale-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20 bg-white dark:bg-[#161638] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
            <LucideIcons.ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No products found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">We don't have products in this category at the moment.</p>
          </div>
        )}

      </div>
    </section>
  );
}
