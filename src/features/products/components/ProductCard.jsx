// src/features/products/components/ProductCard.jsx
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../../shared/hooks/useCart';
import { getImageUrl } from '../../../shared/lib/cloudinary';

const CATEGORY_STYLES = {
  groceries: {
    textColor: 'text-amber-600 dark:text-amber-400',
    stripBg: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', // Orange-Yellow
    imageBg: 'bg-[#fdfbf7] dark:bg-[#201d14]', // Warm Cream
  },
  amul_products: {
    textColor: 'text-rose-600 dark:text-rose-400',
    stripBg: 'linear-gradient(90deg, #f43f5e 0%, #be123c 100%)', // Red
    imageBg: 'bg-[#fff5f5] dark:bg-[#271515]', // Soft Red
  },
  ice_cream: {
    textColor: 'text-purple-600 dark:text-purple-400',
    stripBg: 'linear-gradient(90deg, #c084fc 0%, #7c3aed 100%)', // Purple-Indigo
    imageBg: 'bg-[#FAF5FF] dark:bg-[#1a1327]', // Soft Purple/Lavender
  },
  ice_cubes: {
    textColor: 'text-sky-600 dark:text-sky-400',
    stripBg: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)', // Cyan-Blue
    imageBg: 'bg-[#F0F9FF] dark:bg-[#131d27]', // Soft Blue
  },
  water_bottles: {
    textColor: 'text-teal-600 dark:text-teal-400',
    stripBg: 'linear-gradient(90deg, #2dd4bf 0%, #0d9488 100%)', // Teal-Emerald
    imageBg: 'bg-[#F0FDFA] dark:bg-[#122220]', // Soft Teal
  },
  cigarettes: {
    textColor: 'text-slate-600 dark:text-slate-400',
    stripBg: 'linear-gradient(90deg, #94a3b8 0%, #475569 100%)', // Slate-Zinc
    imageBg: 'bg-slate-50 dark:bg-slate-800/10',
  }
};

const DEFAULT_STYLE = {
  textColor: 'text-orange-500',
  stripBg: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)',
  imageBg: 'bg-slate-50 dark:bg-[#1f1f4d]',
};

export default function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const styles = CATEGORY_STYLES[product.category] || DEFAULT_STYLE;

  const handleAdd = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  // Dynamic Badges based on names
  let badge = null;
  if (product.name.toLowerCase().includes('amul')) {
    badge = { text: 'Amul', bg: 'bg-[#b90000] text-white' };
  } else if (product.name.toLowerCase().includes('pack') || product.name.toLowerCase().includes('5kg')) {
    badge = { text: 'Family Pack', bg: 'bg-emerald-600 text-white' };
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#161638] rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800/40 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 relative group">
      {/* Top Border Accent Strip */}
      <div 
        className="h-[4px] w-full"
        style={{
          background: styles.stripBg,
        }}
      ></div>

      {/* Image Area */}
      <div className={`aspect-[4/3] w-full relative ${styles.imageBg} overflow-hidden flex items-center justify-center p-6 transition-colors duration-300`}>
        {/* Dynamic Badge (e.g. Amul / Family Pack) */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`${badge.bg} text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm`}>
              {badge.text}
            </span>
          </div>
        )}

        <img 
          src={getImageUrl(product.image, { width: 300, height: 225 })} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-500 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Category & Unit */}
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span className={`${styles.textColor} font-extrabold`}>{product.category.replace('_', ' ')}</span>
          <span>{product.unit}</span>
        </div>

        {/* Name */}
        <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price & Cart Actions */}
        <div className="flex items-center justify-between gap-4 mt-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-3">Price</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              ₹{product.price}
            </span>
          </div>

          {/* Action Button */}
          {product.inStock && (
            <div className="h-10 shrink-0">
              {quantity > 0 ? (
                <div 
                  className="flex items-center gap-3.5 h-full px-3.5 rounded-full border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white font-bold select-none shadow-sm"
                >
                  <button 
                    onClick={handleDecrement}
                    className="hover:scale-110 active:scale-95 transition-transform"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-black min-w-[12px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={handleIncrement}
                    className="hover:scale-110 active:scale-95 transition-transform"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 h-full px-5 rounded-full font-bold text-white bg-[#121235] hover:bg-[#1a1a4b] dark:bg-[#1e1e4a] dark:hover:bg-[#27275d] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-xs">Add</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
