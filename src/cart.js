import React from 'react';
import { FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './cart.css'; 

function Cart() {
  const location = useLocation();
  const [cartItems, setCartItems] = React.useState([
    { 
      id: 1, 
      title: 'Atomic Habits', 
      author: 'James Clear', 
      cover: require('./Assets/C1001.jpg'), 
      price: 15.99,
      quantity: 1
    },
    { 
      id: 2, 
      title: 'Deep Work', 
      author: 'Cal Newport', 
      cover: require('./Assets/Book 2.jpg'), 
      price: 12.99,
      quantity: 2
    }
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; 
  const total = subtotal + tax;

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
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </div>
          <button className="cart-button">
            <FaShoppingCart className="cart-icon" />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </button>
        </div>
      </nav>


      <div className="cart-content">
        <h1 className="cart-title">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/recommendations" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.cover} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="author">{item.author}</p>
                    <p className="price">${item.price.toFixed(2)}</p>
                    
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <button className="checkout-button">
                Proceed to Checkout
              </button>
              
              <Link to="/recommendations" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;