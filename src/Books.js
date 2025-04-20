import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([
    { id: 1, title: "Book A", price: "19.99", stock: "25", expanded: false },
    { id: 2, title: "Book B", price: "14.99", stock: "40", expanded: false },
    { id: 3, title: "Book C", price: "9.99", stock: "12", expanded: false }
  ]);
  

  const toggleExpand = (id) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, expanded: !book.expanded } : book
      )
    );
  };

  const handleChange = (id, field, value) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, [field]: value } : book
      )
    );
  };

  const handleUpdate = (id) => {
    const updatedBook = books.find(book => book.id === id);
    console.log("Updating:", updatedBook);
    // TODO: Add API call or logic to persist update
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">Books List</h1>

      <div className="item-list">
        {books.map((book) => (
          <div key={book.id} className="list-item-box">
            <button className="btn btn-primary compact-btn" onClick={() => toggleExpand(book.id)}>
              {book.title}
            </button>
            {book.expanded && (
  <div className="item-details">
    <div className="field-block">
    </div>
    <div className="field-block">
      <label>Price ($):</label><br></br>
      <input
        type="text"
        value={book.price}
        onChange={(e) => handleChange(book.id, "price", e.target.value)}
        className="compact-input"
      />
    </div>

    <div className="field-block">
      <label>Stock:</label><br></br>
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

      <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
        Back
      </button>
    </div>
  );
}

export default Books;
