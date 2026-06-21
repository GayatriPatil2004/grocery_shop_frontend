// src/features/cart/components/CartPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, MessageSquare, MapPin, User, FileText, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../../shared/hooks/useCart';
import { firebaseService } from '../../../shared/services/firebaseService';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../../shared/components/layout/Footer';
import { getImageUrl } from '../../../shared/lib/cloudinary';
import { sendOrderToWhatsApp } from '../../../shared/utils/whatsapp';
import { COLORS } from '../../../shared/constants/colors';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    notes: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phoneVal) => {
    if (!phoneVal.trim()) {
      return 'Contact number is required';
    }
    // Strip all non-digit characters except the leading '+'
    const cleanPhone = phoneVal.replace(/[^\d+]/g, '');
    let baseDigits = cleanPhone;
    if (cleanPhone.startsWith('+91')) {
      baseDigits = cleanPhone.slice(3);
    } else if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
      baseDigits = cleanPhone.slice(2);
    }
    const isExactly10Digits = /^\d{10}$/.test(baseDigits);
    if (!isExactly10Digits) {
      return 'Phone number must be exactly 10 digits';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';

    if (name === 'name') {
      if (!value.trim()) {
        errorMsg = 'Full name is required';
      } else if (value.trim().length < 2) {
        errorMsg = 'Name must be at least 2 characters';
      }
    } else if (name === 'phone') {
      errorMsg = validatePhone(value);
    } else if (name === 'address') {
      if (!value.trim()) {
        errorMsg = 'Delivery address is required';
      } else if (value.trim().length < 10) {
        errorMsg = 'Address should be at least 10 characters';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      if (!formData.name.trim()) {
        toast.error('Please enter your name');
      } else if (!formData.phone.trim()) {
        toast.error('Please enter your contact number');
      } else if (!formData.address.trim()) {
        toast.error('Please enter your delivery address');
      } else {
        toast.error('Please fix the errors in the form');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const fullAddress = `${formData.address}${formData.landmark ? `, Landmark: ${formData.landmark}` : ''}`;
      const customerInfo = {
        name: formData.name,
        phone: formData.phone,
        address: fullAddress,
        notes: formData.notes,
      };

      // 1. Save to Firebase first for admin tracking
      const orderData = {
        customerName: formData.name,
        mobile: formData.phone,
        address: fullAddress,
        products: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cartTotal,
        status: 'Pending',
        notes: formData.notes || ''
      };

      try {
        await firebaseService.add('orders', orderData);
      } catch (fbError) {
        console.error("Failed to save order to Firebase, proceeding with WhatsApp only:", fbError);
        // We don't block the user if Firebase fails, but we log it.
      }

      // 2. Open WhatsApp order
      sendOrderToWhatsApp(cartItems, customerInfo);
      
      toast.success('Redirecting to WhatsApp to place your order!');
      
      // Clear cart after short delay
      setTimeout(() => {
        clearCart();
        setIsSubmitting(false);
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b1e] text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Navigation & Header */}
        <div className="flex items-center gap-2 mb-8 animate-fade-down">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <h1 className="text-3xl font-black tracking-tight mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          /* Empty Cart View */
          <div className="w-full text-center py-20 bg-white dark:bg-[#161638] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm max-w-2xl mx-auto animate-scale-up">
            <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Add some products from our catalog to get started.</p>
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white shadow-md hover:-translate-y-0.5 transition-all"
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
              }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Items list & Delivery Details Form */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Items Card */}
              <div className="bg-white dark:bg-[#161638] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-black tracking-wide">Cart Items ({cartItems.length})</h2>
                  <button 
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider"
                  >
                    <Trash2 className="w-4 h-4" /> Clear All
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-5 flex gap-4 sm:gap-6 items-center">
                      
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 dark:bg-[#1f1f4d] overflow-hidden flex items-center justify-center p-2 shrink-0 border border-slate-100 dark:border-white/5">
                        <img 
                          src={getImageUrl(item.image, { width: 100, height: 100 })} 
                          alt={item.name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-white">
                            {item.name}
                          </h3>
                          <span className="text-xs text-slate-400 font-semibold">{item.unit}</span>
                          <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300 mt-1 sm:hidden">
                            ₹{item.price} each
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-6 justify-between sm:justify-end">
                          <span className="hidden sm:inline text-xs font-bold text-slate-400">
                            ₹{item.price} each
                          </span>
                          
                          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#1f1f4d]">
                            <button 
                              onClick={() => item.quantity === 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity - 1)}
                              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:scale-110 transition-transform"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:scale-110 transition-transform"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm sm:text-base font-black text-slate-800 dark:text-white min-w-[70px] text-right">
                            ₹{item.price * item.quantity}
                          </span>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-all shrink-0"
                            title="Remove item"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="bg-white dark:bg-[#161638] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-black tracking-wide mb-6">Delivery Details</h2>
                
                <form onSubmit={handleCheckout} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${errors.name ? 'text-red-500' : 'text-slate-400'}`}>
                      <User className="w-3.5 h-3.5" /> Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-200 dark:border-white/10 focus:border-orange-500'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.name}</span>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-2">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${errors.phone ? 'text-red-500' : 'text-slate-400'}`}>
                      <Phone className="w-3.5 h-3.5" /> Contact Phone *
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-200 dark:border-white/10 focus:border-orange-500'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.phone}</span>
                    )}
                  </div>

                  {/* Address Input */}
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${errors.address ? 'text-red-500' : 'text-slate-400'}`}>
                      <MapPin className="w-3.5 h-3.5" /> Delivery Address *
                    </label>
                    <textarea 
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Street name, building number, area details"
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors resize-none ${
                        errors.address 
                          ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-200 dark:border-white/10 focus:border-orange-500'
                      }`}
                    ></textarea>
                    {errors.address && (
                      <span className="text-[11px] text-red-500 font-semibold mt-0.5">{errors.address}</span>
                    )}
                  </div>

                  {/* Landmark Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Landmark (Optional)
                    </label>
                    <input 
                      type="text" 
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="e.g. Near bus stop, temple"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Order Notes Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Special Instructions (Optional)
                    </label>
                    <input 
                      type="text" 
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Leave at door, call before delivery"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                </form>
              </div>

            </div>

            {/* Right Side: Order Summary Card */}
            <div className="lg:col-span-4 sticky top-36 flex flex-col gap-6 animate-scale-up">
              
              <div className="bg-white dark:bg-[#161638] rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-black tracking-wide mb-6">Order Summary</h2>

                <div className="flex flex-col gap-4 text-sm font-medium mb-6">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-slate-900 dark:text-white font-extrabold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Delivery Charge</span>
                    <span className="text-green-500 font-extrabold uppercase tracking-wide">Free</span>
                  </div>
                  
                  <div className="w-full h-px bg-slate-100 dark:bg-white/5 my-2"></div>
                  
                  <div className="flex justify-between text-base font-black">
                    <span>Grand Total</span>
                    <span className="text-lg text-slate-900 dark:text-white">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-white text-base shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-55 disabled:shadow-none transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                  }}
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>{isSubmitting ? 'Processing...' : 'Place Order via WhatsApp'}</span>
                </button>

                <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-widest leading-relaxed">
                  🛒 Checkout via owner's WhatsApp Business
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
