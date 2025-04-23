// src/cart.js
import React, { useState, useEffect } from 'react';
import { FaTimes,  FaSearch, FaShoppingCart }           from 'react-icons/fa';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './cart.css';

export default function Cart() {
  const navigate   = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cartItems')) || []; }
    catch { return []; }
  });

  // keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = id =>
      setCartItems(items => items.filter(i => i.id !== id));

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems(items =>
        items.map(i => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const asNumber = p =>
      typeof p === 'string' ? parseFloat(p) || 0 : p;

  const subtotal = cartItems.reduce(
      (sum, i) => sum + asNumber(i.price) * i.quantity,
      0
  );
  const tax   = subtotal * 0.1;
  const total = subtotal + tax;

  // Simplified checkout: show confirmation and redirect
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    alert('Order complete');
    setCartItems([]);
    localStorage.removeItem('cartItems');
    navigate('/recommendations');
  };

  return (
      <div className="cart-container">
        <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <h1 className="logo">LitByte</h1>
          </div>
        </div>
        
        <div className="nav-center">
          <ul className="nav-links">
            <li className={location.pathname === '/customer' ? 'active' : ''}>
              <Link to="/customer">Home</Link>
            </li>
            <li className={location.pathname === '/recommendations' ? 'active' : ''}>
              <Link to="/recommendations">Recommendations</Link>
            </li>
            <li className={location.pathname === '/courses' ? 'active' : ''}>
              <Link to="/courses">Profile</Link>
            </li>
            <li className={location.pathname === '/cart' ? 'active' : ''}>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          
          <button className="cart-button">
            <FaShoppingCart className="cart-icon" />
          </button>
        </div>
      </nav>

        <div className="cart-content">
          <h1>Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <Link to="/recommendations">Continue Shopping</Link>
              </div>
          ) : (
              <div className="cart-grid">
                <div className="cart-items">
                  {cartItems.map(item => {
                    const price = asNumber(item.price);
                    return (
                        <div key={item.id} className="cart-item">
                          {item.cover && (
                              <img
                                  src={item.cover}
                                  alt={item.title}
                                  className="cart-item-image"
                              />
                          )}
                          <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            <p className="price">${price.toFixed(2)}</p>
                            <div className="quantity-control">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                −
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                +
                              </button>
                            </div>
                          </div>
                          <div className="item-total">
                            ${(price * item.quantity).toFixed(2)}
                          </div>
                          <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                            <FaTimes />
                          </button>
                        </div>
                    );
                  })}
                </div>

                <div className="checkout-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%)</span><span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                  <button
                      type="button"
                      className="checkout-button"
                      onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <Link to="/recommendations">Continue Shopping</Link>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}