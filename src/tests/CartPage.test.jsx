// src/tests/CartPage.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartPage from '../features/cart/components/CartPage';
import { CartContext } from '../shared/context/CartContext';
import toast from 'react-hot-toast';
import * as whatsappUtils from '../shared/utils/whatsapp';

import { ThemeProvider } from '../shared/context/ThemeContext';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn()
  }
}));

// Mock the whatsapp utility
vi.mock('../shared/utils/whatsapp', () => ({
  sendOrderToWhatsApp: vi.fn()
}));

const mockProduct = {
  id: 'rice-1kg',
  name: 'Basmati Rice',
  price: 120,
  unit: '1kg',
  category: 'groceries',
  quantity: 2
};

const renderCartPage = (cartItems = [], clearCart = vi.fn(), updateQuantity = vi.fn(), removeFromCart = vi.fn()) => {
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return render(
    <BrowserRouter>
      <ThemeProvider>
        <CartContext.Provider value={{ cartItems, clearCart, updateQuantity, removeFromCart, cartTotal, cartCount }}>
          <CartPage />
        </CartContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('CartPage Component & Checkout Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.open
    window.open = vi.fn();
  });

  it('renders empty cart view when cart has no items', () => {
    renderCartPage([]);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Browse Products')).toBeInTheDocument();
  });

  it('renders cart items and total when items are present', () => {
    renderCartPage([mockProduct]);

    expect(screen.getByText('Cart Items (1)')).toBeInTheDocument();
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
    expect(screen.getAllByText('₹240').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Grand Total')).toBeInTheDocument();
  });

  it('validates checkout form inputs', () => {
    renderCartPage([mockProduct]);

    const submitBtn = screen.getByText('Place Order via WhatsApp');

    // Trigger form submit directly
    fireEvent.click(submitBtn);

    // Should toast error for name
    expect(toast.error).toHaveBeenCalledWith('Please enter your name');

    // Fill name input
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.click(submitBtn);

    // Should toast error for phone
    expect(toast.error).toHaveBeenCalledWith('Please enter your contact number');

    // Fill phone input
    const phoneInput = screen.getByPlaceholderText('e.g. +91 9876543210');
    fireEvent.change(phoneInput, { target: { value: '9876543210' } });
    fireEvent.click(submitBtn);

    // Should toast error for address
    expect(toast.error).toHaveBeenCalledWith('Please enter your delivery address');
  });

  it('triggers checkout redirect to WhatsApp on valid form submission', async () => {
    const clearCartMock = vi.fn();
    renderCartPage([mockProduct], clearCartMock);

    // Fill inputs
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('e.g. +91 9876543210'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Street name, building number, area details'), { target: { value: '123 Main St' } });

    // Click submit
    const submitBtn = screen.getByText('Place Order via WhatsApp');
    fireEvent.click(submitBtn);

    // Verify WhatsApp util call
    expect(whatsappUtils.sendOrderToWhatsApp).toHaveBeenCalledWith(
      [mockProduct],
      {
        name: 'John Doe',
        address: '123 Main St',
        notes: 'Phone: 9876543210'
      }
    );

    expect(toast.success).toHaveBeenCalledWith('Redirecting to WhatsApp to place your order!');
  });
});
