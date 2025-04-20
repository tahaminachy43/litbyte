import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './customer.css';
import book1 from "./Assets/C1001.jpg";
import book2 from "./Assets/Book 2.jpg";
import book3 from "./Assets/Book 3.jpg";
import book4 from "./Assets/Book 4.jpg";
import book5 from "./Assets/Book 5.jpg";

const recentBooks = [
  { id: 1, title: 'PSALMS', author: 'Jacob Scott', cover: book1 },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: book2 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: book3 },
  { id: 4, title: '1984', author: 'George Orwell', cover: book4 },
  { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', cover: book5 },
];

function Home() {
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
        <div className="welcome-section">
          <h2>Welcome to LitByte</h2>
          <p>Here are some newly added books</p>
          <p className="subtext">With us, you can shop online & help save time?</p>
          <button className="explore-button">Explore Books →</button>
        </div>
        
        <div className="books-scrollable">
          {recentBooks.map(book => (
            <div key={book.id} className="book-card">
              <img src={book.cover} alt={book.title} className="book-cover" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;