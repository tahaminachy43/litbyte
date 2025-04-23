// recomendation.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './recomendation.css';

const Recommendations = () => {
  const location = useLocation();
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [cartCount, setCartCount] = useState(() => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      return existingCart.reduce((sum, item) => sum + item.quantity, 0);
    } catch {
      return 0;
    }
  });

  // Add book to cart, update badge count, persist to localStorage
  const handleAddToCart = (book) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const idx = existingCart.findIndex(i => i.id === book.book_id);

      // Convert incoming price (string) to a number
      const priceNum = Number(book.price) || 0;

      if (idx > -1) {
        existingCart[idx].quantity += 1;
      } else {
        existingCart.push({
          id:       book.book_id,
          title:    book.name,
          price:    priceNum,
          quantity: 1,
          cover:    book.cover_image,
          author:   book.author,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      setCartCount(existingCart.reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  useEffect(() => {
    const ucid = localStorage.getItem('ucid');
    if (!ucid) return;

    const fetchRecommended = async () => {
      try {
        const res = await fetch(`http://localhost:3000/student/rec/Books?ucid=${ucid}`);
        if (!res.ok) throw new Error(`Recommendations error: ${res.status}`);
        setRecommendedBooks(await res.json());
      } catch (err) {
        console.error('Failed to fetch recommended books:', err);
      }
    };

    const fetchAll = async () => {
      try {
        const res = await fetch('http://localhost:3000/student/AllBooks');
        if (!res.ok) throw new Error(`All books error: ${res.status}`);
        setAllBooks(await res.json());
      } catch (err) {
        console.error('Failed to fetch all books:', err);
      }
    };

    fetchRecommended();
    fetchAll();
  }, []);

  return (
      <div className="recommendations-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-left">
            <h1 className="logo">LitByte</h1>
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
            <Link to="/cart" className="cart-button">
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </nav>

        {/* Recommended Books */}
        <div className="recommendations-header">
          <h1>Recommended Books For You</h1>
          <p className="subtitle">Based on your courses</p>
        </div>
        <div className="full-width-scroll-container">
          <div className="books-scrollable">
            {recommendedBooks.length > 0 ? (
                recommendedBooks.map(book => (
                    <div key={book.book_id} className="book-card">
                      <img src={book.cover_image} alt={book.name} className="book-cover" />
                      <h3>{book.name}</h3>
                      <p className="author">Author: {book.author}</p>
                      <p>Price: ${Number(book.price).toFixed(2)}</p>
                      <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(book)}
                      >
                        Add to Cart
                      </button>
                    </div>
                ))
            ) : (
                <p className="no-data">No recommendations available</p>
            )}
          </div>
        </div>

        {/* All Books Section */}
        <div className="all-books-section">
          <div className="section-header">
            <h2>All Available Books</h2>
            <p className="subtitle">Browse our complete collection</p>
          </div>
          <div className="books-grid">
            {allBooks.length > 0 ? (
                allBooks.map(book => (
                    <div key={book.book_id} className="book-card">
                      <img src={book.cover_image} alt={book.name} className="book-cover" />
                      <h3>{book.name}</h3>
                      <p className="author">Author: {book.author}</p>
                      <p>Price: ${Number(book.price).toFixed(2)}</p>
                      <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(book)}
                      >
                        Add to Cart
                      </button>
                    </div>
                ))
            ) : (
                <p className="no-data">No books available</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Recommendations;