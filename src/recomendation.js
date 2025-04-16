import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './customer.css'; 

function Recommendations() {
  const location = useLocation();

  return (
    <div className="home-container">

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
              <Link to="/courses">Courses</Link>
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
          </button>
        </div>
      </nav>
      

      <div className="main-content">
        <h2>Recommended Books For You</h2>

      </div>
    </div>
  );
}

export default Recommendations;