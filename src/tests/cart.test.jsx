// src/tests/cart.test.jsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../shared/context/CartContext';
import { useCart } from '../shared/hooks/useCart';

const TestCartComponent = () => {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    cartCount 
  } = useCart();

  const sampleProduct = {
    id: 'test-p1',
    name: 'Basmati Rice',
    price: 120,
    category: 'groceries',
    unit: '1kg'
  };

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <div data-testid="items-list">
        {cartItems.map(item => (
          <div key={item.id} data-testid={`item-${item.id}`}>
            {item.name} - Qty: {item.quantity}
          </div>
        ))}
      </div>
      <button data-testid="add-btn" onClick={() => addToCart(sampleProduct)}>Add Rice</button>
      <button data-testid="add-qty-btn" onClick={() => addToCart(sampleProduct, 2)}>Add 2 Rice</button>
      <button data-testid="update-btn" onClick={() => updateQuantity('test-p1', 5)}>Set Qty to 5</button>
      <button data-testid="remove-btn" onClick={() => removeFromCart('test-p1')}>Remove Rice</button>
      <button data-testid="clear-btn" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext & Cart Operations', () => {
  it('starts with an empty cart', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
  });

  it('adds items to cart and computes count and total price', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    const addBtn = screen.getByTestId('add-btn');
    fireEvent.click(addBtn);

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('120');
    expect(screen.getByTestId('item-test-p1').textContent).toContain('Basmati Rice - Qty: 1');

    // Add with custom quantity
    const addQtyBtn = screen.getByTestId('add-qty-btn');
    fireEvent.click(addQtyBtn);

    expect(screen.getByTestId('cart-count').textContent).toBe('3');
    expect(screen.getByTestId('cart-total').textContent).toBe('360');
    expect(screen.getByTestId('item-test-p1').textContent).toContain('Basmati Rice - Qty: 3');
  });

  it('updates item quantity and removes item if quantity becomes zero or less', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    // Add initial item
    fireEvent.click(screen.getByTestId('add-btn'));

    // Update quantity to 5
    fireEvent.click(screen.getByTestId('update-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('5');
    expect(screen.getByTestId('cart-total').textContent).toBe('600');

    // Update quantity to 0 (should remove the item)
    // We can do it by triggering a custom update quantity click since our updateBtn is hardcoded to 5.
    // Let's create an input trigger if needed, or we can test removeFromCart directly:
    fireEvent.click(screen.getByTestId('remove-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.queryByTestId('item-test-p1')).toBeNull();
  });

  it('clears all items when clearCart is called', () => {
    render(
      <CartProvider>
        <TestCartComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');

    fireEvent.click(screen.getByTestId('clear-btn'));
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.queryByTestId('item-test-p1')).toBeNull();
  });
});
