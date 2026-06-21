// src/tests/ProductList.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '../features/products/components/ProductList';
import { CartProvider } from '../shared/context/CartContext';
import { ThemeProvider } from '../shared/context/ThemeContext';
import { firebaseService } from '../shared/services/firebaseService';

// Mock scroll window
window.scrollTo = vi.fn();

// Mock Firebase Service
vi.mock('../shared/services/firebaseService', () => ({
  firebaseService: {
    getAll: vi.fn()
  }
}));

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
    // Default mocked data
    firebaseService.getAll.mockImplementation((name) => {
      if (name === 'categories') return Promise.resolve([
        { id: 'groceries', name: 'Groceries', image: 'groceries.jpg' },
        { id: 'dairy', name: 'Amul Products', image: 'dairy.jpg' }
      ]);
      if (name === 'products') return Promise.resolve([
        { id: 'p1', name: 'Basmati Rice', category: 'groceries', price: 100 }
      ]);
      return Promise.resolve([]);
    });
  });

  it('initially renders the category grid', async () => {
    renderProductList();
    
    await waitFor(() => {
      expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Amul Products')).toBeInTheDocument();
    // Products should not be visible initially in categories view
    expect(screen.queryByText('Add to Cart')).toBeNull();
  });

  it('switches to product view when a category card is clicked', async () => {
    renderProductList();
    
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });

    const groceriesCard = screen.getByText('Groceries');
    fireEvent.click(groceriesCard);

    await waitFor(() => {
      expect(screen.getByText('Back to Categories')).toBeInTheDocument();
    });

    // Assuming we have products in Groceries category like "Basmati Rice"
    expect(screen.getAllByText(/Basmati Rice/i).length).toBeGreaterThan(0);
  });

  it('returns to category grid when "Back to Categories" is clicked', async () => {
    renderProductList();
    
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });

    // Go to Groceries
    fireEvent.click(screen.getByText('Groceries'));
    
    await waitFor(() => {
      expect(screen.getByText('Back to Categories')).toBeInTheDocument();
    });

    // Click Back
    fireEvent.click(screen.getByText('Back to Categories'));
    
    await waitFor(() => {
      expect(screen.getByText('Shop by Category')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Back to Categories')).toBeNull();
  });
});
