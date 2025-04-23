import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './customer.css';


function Home() {
  const location = useLocation();
  const [books, setBooks] = useState([]);

  // Fetch top 5 books on mount
  useEffect(() => {
    async function fetchTopBooks() {
      try {
        const res = await fetch('http://localhost:3000/student/top5Books');
        if (!res.ok) throw new Error(`Error fetching books: ${res.status}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Failed to fetch top books:', err);
      }
    }
    fetchTopBooks();
  }, []);

  // Ensure exactly 5 slots
  const slots = Array.from({ length: 5 });

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

        <div className="main-content">
          <div className="welcome-section">
            <h2>Welcome to LitByte</h2>
            <p>Here are some newly added books</p>
            <p className="subtext">With us, you can shop online &amp; help save time?</p>
            <Link to="/recommendations" className="explore-button" >
              Explore Books

            </Link>

          </div>

          <div className="books-scrollable">
            {slots.map((_, idx) => {
              const book = books[idx];
              return (
                  <div key={idx} className="book-card">
                    {book ? (
                        <>
                          <img
                              src={book.cover_image}
                              alt={book.name || book.book_name}
                              className="book-cover"
                          />
                          <h3>{book.name || book.book_name}</h3>
                          <p>Author: {book.author}</p>
                          <p>Price: ${book.price}</p>
                          <p>Course: {book.course_id}</p>
                          <p>ID: {book.book_id}</p>
                        </>
                    ) : (
                        <div className="empty-slot" />
                    )}
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}

export default Home;
