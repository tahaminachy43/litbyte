import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function EBooks() {
  const navigate = useNavigate();

  const [ebooks, setEbooks] = useState([
    { id: 1, title: "E-Book A", price: "12.99", stock: "30", expanded: false },
    { id: 2, title: "E-Book B", price: "9.99", stock: "50", expanded: false },
    { id: 3, title: "E-Book C", price: "5.99", stock: "80", expanded: false }
  ]);

  const toggleExpand = (id) => {
    setEbooks(prev =>
      prev.map(e => e.id === id ? { ...e, expanded: !e.expanded } : e)
    );
  };

  const handleChange = (id, field, value) => {
    setEbooks(prev =>
      prev.map(e => e.id === id ? { ...e, [field]: value } : e)
    );
  };

  const handleUpdate = (id) => {
    const ebook = ebooks.find(e => e.id === id);
    console.log("Updated e-book:", ebook);
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">E-Books List</h1>
      <div className="item-list">
        {ebooks.map(ebook => (
          <div className="list-item-box" key={ebook.id}>
            <button className="btn btn-primary compact-btn" onClick={() => toggleExpand(ebook.id)}>
              {ebook.title}
            </button>
            {ebook.expanded && (
              <div className="item-details">
                <div className="field-block">
                </div>
                <div className="field-block">
                  <label>Price ($):</label><br></br>
                  <input
                    className="compact-input"
                    value={ebook.price}
                    onChange={(e) => handleChange(ebook.id, 'price', e.target.value)}
                  />
                </div>
                <div className="field-block">
                  <label>Stock:</label><br></br>
                  <input
                    className="compact-input"
                    value={ebook.stock}
                    onChange={(e) => handleChange(ebook.id, 'stock', e.target.value)}
                  />
                </div>
                <button className="btn btn-secondary small-update-btn" onClick={() => handleUpdate(ebook.id)}>
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" onClick={() => navigate('/admin')}>Back</button>
    </div>
  );
}

export default EBooks;
