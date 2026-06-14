// src/features/public/landing/components/HowToOrder.jsx
import { ShoppingCart, MapPin, Send } from 'lucide-react';
import { COLORS } from '../../../../shared/constants/colors';

export default function HowToOrder() {
  const steps = [
    {
      id: 1,
      title: 'Add to Cart',
      description: 'Choose your favorite groceries and add them to the cart.',
      icon: ShoppingCart,
    },
    {
      id: 2,
      title: 'Enter Address',
      description: 'Provide your delivery address and contact details.',
      icon: MapPin,
    },
    {
      id: 3,
      title: 'Send WhatsApp',
      description: 'Confirm and place your order directly via WhatsApp chat.',
      icon: Send,
    },
  ];

  return (
    <section id="how-to-order" className="py-20 bg-slate-50 dark:bg-[#0b0b1e] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Wrapper Box - Glassmorphic styled card like Figma */}
        <div className="glass-morphic rounded-[2.5rem] py-16 px-8 sm:px-12 lg:px-16 text-center max-w-5xl mx-auto shadow-2xl relative">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">How to Order</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md">
              3 easy steps to get your items delivered to your doorstep
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Dotted connecting line for desktop */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-700/50 -z-10"></div>

            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center gap-4 group">
                  {/* Icon Container */}
                  <div 
                    className="w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-lg relative group-hover:scale-105 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.accent.gradientStart} 0%, ${COLORS.accent.gradientEnd} 100%)`,
                    }}
                  >
                    <IconComponent className="w-9 h-9" />
                    {/* Step badge */}
                    <span className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                      {step.id}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      Step {step.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] leading-relaxed mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
