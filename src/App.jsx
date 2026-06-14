// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './shared/context/ThemeContext.jsx';
import { CartProvider } from './shared/context/CartContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              background: 'rgba(10, 10, 10, 0.8)',
              color: '#fff',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              fontSize: '0.875rem',
              fontWeight: '600',
              padding: '12px 20px',
              maxWidth: '400px',
            },
            success: {
              iconTheme: {
                primary: '#16a34a',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }
            },
          }}
        />
      </CartProvider>
    </ThemeProvider>
  );
}
