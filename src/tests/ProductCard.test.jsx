// src/tests/ProductCard.test.jsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../features/products/components/ProductCard';
import { CartProvider } from '../shared/context/CartContext';

const mockGroceriesProduct = {
  id: 'basmati-rice-1kg',
  name: 'Basmati Rice (Premium)',
  category: 'groceries',
  price: 130,
  unit: '1kg bag',
  description: 'Long grain aromatic rice suitable for everyday dishes.',
  image: 'basmati_rice',
  inStock: true
};

const mockAmulProduct = {
  id: 'amul-butter-500g',
  name: 'Amul Butter',
  category: 'amul_products',
  price: 260,
  unit: '500g pack',
  description: 'Pure dairy butter.',
  image: 'amul_butter',
  inStock: true
};

const mockOutOfStockProduct = {
  id: 'classic-milds-pack',
  name: 'Classic Milds',
  category: 'cigarettes',
  price: 180,
  unit: 'pack of 10',
  description: 'Premium quality cigarette pack.',
  image: 'cigarettes',
  inStock: false
};

const renderWithCart = (ui) => {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  );
};

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    renderWithCart(<ProductCard product={mockGroceriesProduct} />);

    expect(screen.getByText('Basmati Rice (Premium)')).toBeInTheDocument();
    expect(screen.getByText('₹130')).toBeInTheDocument();
    expect(screen.getByText('1kg bag')).toBeInTheDocument();
    expect(screen.getByText('groceries')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('renders Amul brand badge when name includes Amul', () => {
    renderWithCart(<ProductCard product={mockAmulProduct} />);
    expect(screen.getByText('Amul')).toBeInTheDocument();
  });

  it('renders Out of Stock overlay when product is out of stock', () => {
    renderWithCart(<ProductCard product={mockOutOfStockProduct} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    expect(screen.queryByText('Add')).toBeNull();
  });

  it('allows adding a product to the cart and updating its quantity', () => {
    renderWithCart(<ProductCard product={mockGroceriesProduct} />);

    // Click Add
    const addBtn = screen.getByText('Add');
    fireEvent.click(addBtn);

    // Quantity selector should render
    expect(screen.getByText('1')).toBeInTheDocument();
    const plusBtn = screen.getByTitle('Increase quantity');
    const minusBtn = screen.getByTitle('Decrease quantity');

    expect(plusBtn).toBeInTheDocument();
    expect(minusBtn).toBeInTheDocument();

    // Increment
    fireEvent.click(plusBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    // Decrement
    fireEvent.click(minusBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
