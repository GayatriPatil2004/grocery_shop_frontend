// src/tests/CartPage.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

// Mock Firebase Service
vi.mock('../shared/services/firebaseService', () => ({
  firebaseService: {
    add: vi.fn().mockResolvedValue({ id: 'mock-order-id' })
  }
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
  const cartCount = cartItems.length;

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
    await waitFor(() => {
      expect(whatsappUtils.sendOrderToWhatsApp).toHaveBeenCalledWith(
        [mockProduct],
        {
          name: 'John Doe',
          phone: '9876543210',
          address: '123 Main St',
          notes: ''
        }
      );
    });

    expect(toast.success).toHaveBeenCalledWith('Redirecting to WhatsApp to place your order!');
  });

  it('calls removeFromCart when clicking the single item remove button', () => {
    const removeFromCartMock = vi.fn();
    renderCartPage([mockProduct], vi.fn(), vi.fn(), removeFromCartMock);

    const deleteBtn = screen.getByTitle('Remove item');
    fireEvent.click(deleteBtn);

    expect(removeFromCartMock).toHaveBeenCalledWith('rice-1kg');
  });

  it('calls clearCart when clicking the Clear All button', () => {
    const clearCartMock = vi.fn();
    renderCartPage([mockProduct], clearCartMock);

    const clearBtn = screen.getByText('Clear All');
    fireEvent.click(clearBtn);

    expect(clearCartMock).toHaveBeenCalled();
  });

  it('calls updateQuantity when clicking increase or decrease buttons', () => {
    const updateQuantityMock = vi.fn();
    renderCartPage([mockProduct], vi.fn(), updateQuantityMock);

    const increaseBtn = screen.getByTitle('Increase quantity');
    fireEvent.click(increaseBtn);
    expect(updateQuantityMock).toHaveBeenCalledWith('rice-1kg', 3);

    const decreaseBtn = screen.getByTitle('Decrease quantity');
    fireEvent.click(decreaseBtn);
    expect(updateQuantityMock).toHaveBeenCalledWith('rice-1kg', 1);
  });

  it('displays inline validation errors on blur for empty fields', () => {
    renderCartPage([mockProduct]);

    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    expect(screen.getByText('Full name is required')).toBeInTheDocument();

    const phoneInput = screen.getByPlaceholderText('e.g. +91 9876543210');
    fireEvent.focus(phoneInput);
    fireEvent.blur(phoneInput);
    expect(screen.getByText('Contact number is required')).toBeInTheDocument();

    const addressInput = screen.getByPlaceholderText('Street name, building number, area details');
    fireEvent.focus(addressInput);
    fireEvent.blur(addressInput);
    expect(screen.getByText('Delivery address is required')).toBeInTheDocument();
  });

  it('displays validation error for invalid phone format', () => {
    renderCartPage([mockProduct]);

    const phoneInput = screen.getByPlaceholderText('e.g. +91 9876543210');
    
    // Test 5 digits
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    fireEvent.blur(phoneInput);
    expect(screen.getByText('Phone number must be exactly 10 digits')).toBeInTheDocument();

    // Test 11 digits
    fireEvent.change(phoneInput, { target: { value: '98765432101' } });
    fireEvent.blur(phoneInput);
    expect(screen.getByText('Phone number must be exactly 10 digits')).toBeInTheDocument();
  });

  it('clears inline validation error when typing valid input', () => {
    renderCartPage([mockProduct]);

    const nameInput = screen.getByPlaceholderText('Enter your full name');
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    expect(screen.getByText('Full name is required')).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(screen.queryByText('Full name is required')).toBeNull();
  });
});
