// Books.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    book_id: '',
    author: '',
    name: '',
    stock: '',
    price: '',
    genre: '',
    course_id: '',
    cover_image: ''
  });

  // Fetch books on first render
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/book/getAll');
        if (!res.ok) throw new Error(`Error fetching books: ${res.status}`);
        const data = await res.json();
        const withExpand = data.map(b => ({
          ...b,
          id: b.book_id || b.Book_ID,
          title: b.name,
          expanded: false
        }));
        setBooks(withExpand);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  const toggleExpand = (id) => {
    setBooks(prev =>
        prev.map(b => b.id === id ? { ...b, expanded: !b.expanded } : b)
    );
  };

  const handleChange = (id, field, value) => {
    setBooks(prev =>
        prev.map(b => b.id === id ? { ...b, [field]: value } : b)
    );
  };

  const handleUpdate = async (id) => {
    const book = books.find(b => b.id === id);
    if (!book) return;

    try {
      const res = await fetch('http://localhost:3000/admin/book/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: id,
          stock: parseInt(book.stock),
          price: parseFloat(book.price)
        })
      });

      if (res.ok) {
        alert('Book updated successfully!');
        toggleExpand(id);
      } else {
        const text = await res.text();
        alert(`Update failed: ${text}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert('Network or server error');
    }
  };

  const handleNewChange = (field, value) => {
    setNewBook(prev => ({ ...prev, [field]: value }));
  };

  const handleInsert = async () => {
    const { book_id, author, name, stock, price, genre, course_id, cover_image } = newBook;
    if (!book_id || !author || !name || !stock || !price || !genre || !course_id || !cover_image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/admin/book/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id,
          author,
          name,
          stock: parseInt(stock),
          price: parseFloat(price),
          genre,
          course_id,
          // send cover_image under the key the backend expects
          cover_page: cover_image
        })
      });

      if (res.ok) {
        alert('Book inserted successfully!');
        // clear form
        setNewBook({
          book_id: '',
          author: '',
          name: '',
          stock: '',
          price: '',
          genre: '',
          course_id: '',
          cover_image: ''
        });
        // add to local list
        setBooks(prev => [...prev, {
          ...newBook,
          id: book_id,
          title: name,
          expanded: false
        }]);
      } else {
        const text = await res.text();
        alert(`Insert failed: ${text}`);
      }
    } catch (err) {
      console.error("Insert error:", err);
      alert('Network or server error');
    }
  };

  return (
      <div className="App">
        <h1 className="dashboard-title">Books List</h1>

        {/* Insert Form */}
        <div className="list-item-box">
          <h2 style={{ marginBottom: '1rem' }}>Insert New Book</h2>
          <div className="item-details">
            {['book_id', 'author', 'name', 'stock', 'price', 'genre', 'course_id', 'cover_image'].map(field => (
                <div className="field-block" key={field}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                  <input
                      className="compact-input"
                      type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                      value={newBook[field]}
                      onChange={(e) => handleNewChange(field, e.target.value)}
                  />
                </div>
            ))}
            <button className="btn btn-primary small-update-btn" onClick={handleInsert}>
              Insert Book
            </button>
          </div>
        </div>

        {/* Book List */}
        <div className="item-list">
          {books.map(book => (
              <div key={book.id} className="list-item-box">
                <button className="btn btn-primary compact-btn" onClick={() => toggleExpand(book.id)}>
                  {book.title}
                </button>
                {book.expanded && (
                    <div className="item-details">
                      <div className="field-block">
                        <label>Price ($):</label><br />
                        <input
                            type="text"
                            value={book.price}
                            onChange={(e) => handleChange(book.id, "price", e.target.value)}
                            className="compact-input"
                        />
                      </div>
                      <div className="field-block">
                        <label>Stock:</label><br />
                        <input
                            type="text"
                            value={book.stock}
                            onChange={(e) => handleChange(book.id, "stock", e.target.value)}
                            className="compact-input"
                        />
                      </div>
                      <button className="btn btn-secondary small-update-btn" onClick={() => handleUpdate(book.id)}>
                        Update
                      </button>
                    </div>
                )}
              </div>
          ))}
        </div>

        <button className="btn btn-secondary back-btn" onClick={() => navigate('/admin')}>
          Back
        </button>
      </div>
  );
}

export default Books;