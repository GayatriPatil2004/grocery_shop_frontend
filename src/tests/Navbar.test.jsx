// src/tests/Navbar.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Navbar from '../shared/components/layout/Navbar';
import { CartProvider } from '../shared/context/CartContext';
import { useCart } from '../shared/hooks/useCart';

// Mock useCart hook
vi.mock('../shared/hooks/useCart', () => ({
  useCart: vi.fn(),
}));

const renderNavbar = (path = '/') => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and default links', () => {
    useCart.mockReturnValue({ cartCount: 0 });
    renderNavbar('/');

    expect(screen.getByText('SUPER MART')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('How to Order')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('does NOT render the removed Categories link', () => {
    useCart.mockReturnValue({ cartCount: 0 });
    renderNavbar('/');

    expect(screen.queryByText('Categories')).toBeNull();
  });

  it('formats anchors with hash when on landing page (/)', () => {
    useCart.mockReturnValue({ cartCount: 0 });
    renderNavbar('/');

    const productsLink = screen.getByText('Products');
    expect(productsLink.getAttribute('href')).toBe('#products');

    const howToOrderLink = screen.getByText('How to Order');
    expect(howToOrderLink.getAttribute('href')).toBe('#how-to-order');
  });

  it('formats anchors with full path when on a subpage (/cart)', () => {
    useCart.mockReturnValue({ cartCount: 0 });
    renderNavbar('/cart');

    const productsLink = screen.getByText('Products');
    expect(productsLink.getAttribute('href')).toBe('/#products');

    const howToOrderLink = screen.getByText('How to Order');
    expect(howToOrderLink.getAttribute('href')).toBe('/#how-to-order');
  });

  it('displays the dynamic cart count badge', () => {
    useCart.mockReturnValue({ cartCount: 3 });
    renderNavbar('/');

    // Check cart badges
    const cartBadges = screen.getAllByText('3');
    expect(cartBadges.length).toBe(2); // One desktop, one mobile
  });

  it('toggles mobile menu drawer on click', () => {
    useCart.mockReturnValue({ cartCount: 0 });
    renderNavbar('/');

    // Find the toggle button (the menu icon)
    const toggleBtn = screen.getByRole('button');
    
    // Drawer should not be rendered initially
    expect(screen.queryByText('Go to Cart (0 items)')).toBeNull();

    // Click to open
    fireEvent.click(toggleBtn);
    expect(screen.getByText('Go to Cart (0 items)')).toBeInTheDocument();

    // Click to close
    fireEvent.click(toggleBtn);
    expect(screen.queryByText('Go to Cart (0 items)')).toBeNull();
  });
});
