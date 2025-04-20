import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function EBooks() {
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useState([]);

  // Fetch eBooks on first render
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/ebook/getAll');
        const data = await res.json();
        // Add expanded flag to each ebook
        const withExpand = data.map(e => ({ ...e, expanded: false }));
        setEbooks(withExpand);
      } catch (error) {
        console.error("Failed to fetch eBooks:", error);
      }
    };

    fetchEbooks();
  }, []);

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

  const handleUpdate = async (id) => {
    const ebook = ebooks.find(e => e.id === id);
    try {
      const res = await fetch(`http://localhost:3000/admin/ebook/admin/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: ebook.title, price: ebook.price })
      });

      if (res.ok) {
        alert('E-Book updated successfully!');
      } else {
        alert('Failed to update E-Book.');
      }
    } catch (err) {
      console.error("Update error:", err);
    }
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
                  <label>Title:</label>
                  <input
                    className="compact-input"
                    value={ebook.title}
                    onChange={(e) => handleChange(ebook.id, 'title', e.target.value)}
                  />
                </div>
                <div className="field-block">
                  <label>Price ($):</label>
                  <input
                    className="compact-input"
                    value={ebook.price}
                    onChange={(e) => handleChange(ebook.id, 'price', e.target.value)}
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
      <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
        Back
      </button>
    </div>
  );
}

export default EBooks;
