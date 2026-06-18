// src/tests/ProductList.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '../features/products/components/ProductList';
import { CartProvider } from '../shared/context/CartContext';
import { ThemeProvider } from '../shared/context/ThemeContext';

// Mock scroll window
window.scrollTo = vi.fn();

const renderProductList = () => {
  return render(
    <ThemeProvider>
      <CartProvider>
        <ProductList />
      </CartProvider>
    </ThemeProvider>
  );
};

describe('ProductList Component - Category Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initially renders the category grid', () => {
    renderProductList();
    
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Amul Products')).toBeInTheDocument();
    // Products should not be visible initially in categories view
    expect(screen.queryByText('Add to Cart')).toBeNull();
  });

  it('switches to product view when a category card is clicked', () => {
    renderProductList();
    
    const groceriesCard = screen.getByText('Groceries');
    fireEvent.click(groceriesCard);

    expect(screen.getByText('Back to Categories')).toBeInTheDocument();
    // Assuming we have products in Groceries category like "Basmati Rice"
    expect(screen.getAllByText(/Basmati Rice/i).length).toBeGreaterThan(0);

  });

  it('returns to category grid when "Back to Categories" is clicked', () => {
    renderProductList();
    
    // Go to Groceries
    fireEvent.click(screen.getByText('Groceries'));
    expect(screen.getByText('Back to Categories')).toBeInTheDocument();

    // Click Back
    fireEvent.click(screen.getByText('Back to Categories'));
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    expect(screen.queryByText('Back to Categories')).toBeNull();
  });
});
