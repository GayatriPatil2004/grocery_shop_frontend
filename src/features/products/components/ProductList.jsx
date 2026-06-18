// src/features/products/components/ProductList.jsx
import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import categories from '../../../data/categories';
import products from '../../../data/products';
import ProductCard from './ProductCard';
import CategoryCard from '../../categories/components/CategoryCard';

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    return activeCategory === 'all'
      ? [] // No products shown in the main categories view (unless "all" was specifically intended to show everything)
      : products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Categories to show in the grid (excluding "All Products" which acts as the root view)
  const displayCategories = useMemo(() => {
    return categories.filter(c => c.id !== 'all');
  }, []);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Smooth scroll to the top of the products section
    const section = document.getElementById('products');
    if (section) {
      const offset = 80; // offset for navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Helper to dynamically render Lucide Icons by name
  const renderCategoryIcon = (iconName, className) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.ShoppingBag;
    return <IconComponent className={className} />;
  };

  const selectedCategoryName = categories.find(c => c.id === activeCategory)?.name || 'Products';

  return (
    <section id="products" className="py-20 bg-slate-50 dark:bg-[#0b0b1e] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="animate-fade-right">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
              {activeCategory === 'all' ? 'Shop by Category' : selectedCategoryName}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              {activeCategory === 'all' 
                ? 'Choose a category to explore our wide range of products'
                : `Showing ${filteredProducts.length} items in ${selectedCategoryName}. Add to your cart and place order via WhatsApp.`
              }
            </p>
          </div>

          {activeCategory !== 'all' && (
            <button 
              onClick={() => setActiveCategory('all')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#161638] text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-wider border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-[#1f1f4d] hover:text-slate-900 dark:hover:text-white transition-all shadow-sm self-start md:self-auto group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Categories</span>
            </button>
          )}
        </div>

        {/* Categories View */}
        {activeCategory === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
            {displayCategories.map((category) => {
              const productCount = products.filter(p => p.category === category.id).length;
              return (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  productCount={productCount}
                  onClick={() => handleCategoryClick(category.id)}
                />
              );
            })}
          </div>
        ) : (
          /* Products View */
          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="animate-scale-up">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center py-24 bg-white dark:bg-[#161638] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm animate-scale-up">
                <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No products found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">We don't have products in this category at the moment. Please check back soon!</p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

