import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './customer.css';
import book1 from "./Assets/C1001.jpg";
import book2 from "./Assets/Book 2.jpg";
import book3 from "./Assets/Book 3.jpg";
import book4 from "./Assets/Book 4.jpg";
import book5 from "./Assets/Book 5.jpg";

const recommendedBooks = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', cover: book1 },
  { id: 2, title: 'Deep Work', author: 'Cal Newport', cover: book2 },
  { id: 3, title: 'The Psychology of Money', author: 'Morgan Housel', cover: book3 },
  { id: 4, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', cover: book4 },
  { id: 5, title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', cover: book5 },
  { id: 6, title: "YOU'VE REACHED SAM", author: 'Dustin Thao', cover: book1 },
  { id: 7, title: 'Educated', author: 'Tara Westover', cover: book2 },
  { id: 8, title: 'Sapiens', author: 'Yuval Noah Harari', cover: book3 },
];

function Recommendations() {
  const location = useLocation();

  return (
    <div className="recommendations-container">
      {/* Navigation Bar */}
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
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="recommendations-content">
        <div className="recommendations-header">
          <h1>Recommended Books For You</h1>
          <p className="subtitle">Based on your reading preferences</p>
        </div>
        
        <div className="full-width-scroll-container">
          <div className="books-scrollable">
            {recommendedBooks.map(book => (
              <div key={book.id} className="book-card">
                <img src={book.cover} alt={book.title} className="book-cover" />
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;