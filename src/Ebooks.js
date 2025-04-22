import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function EBooks() {
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useState([]);
  const [newEbook, setNewEbook] = useState({
    ebook_id: '',
    author: '',
    name: '',
    stock: '',
    price: '',
    genre: ''
  });

  // Fetch existing ebooks
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/ebook/getAll');
        if (!res.ok) throw new Error(`Error fetching eBooks: ${res.status}`);
        const data = await res.json();
        const withExpand = data.map(e => ({
          ...e,
          id: e.ebook_id || e.Ebook_id,
          expanded: false
        }));
        setEbooks(withExpand);
      } catch (error) {
        console.error("Failed to fetch eBooks:", error);
      }
    };
    fetchEbooks();
  }, []);

  const toggleExpand = (id) => {
    setEbooks(prev =>
      prev.map(e => (e.id === id ? { ...e, expanded: !e.expanded } : e))
    );
  };

  const handleChange = (id, field, value) => {
    setEbooks(prev =>
      prev.map(e => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleUpdate = async (id) => {
    const ebook = ebooks.find(e => e.id === id);
    if (!ebook) return;
    try {
      const res = await fetch('http://localhost:3000/admin/ebook/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ebook_id: id,
          price: parseFloat(ebook.price)
        })
      });
      if (res.ok) {
        alert('E-Book price updated successfully!');
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
    setNewEbook(prev => ({ ...prev, [field]: value }));
  };

  const handleInsert = async () => {
    const { ebook_id, author, name, stock, price, genre } = newEbook;
    if (!ebook_id || !author || !name || !stock || !price || !genre) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/admin/ebook/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ebook_id,
          author,
          name,
          stock: parseInt(stock),
          price: parseFloat(price),
          genre,
          rental: 0,             // default to 0 (not rented)
          cover_page: ''         // optional, leave empty or update as needed
        })
      });

      if (res.ok) {
        alert('E-Book inserted successfully!');
        setNewEbook({
          ebook_id: '', author: '', name: '', stock: '', price: '', genre: ''
        });
        const updatedList = await res.json();
        setEbooks(prev => [...prev, {
          ...newEbook,
          id: ebook_id,
          expanded: false
        }]);
      } else {
        const text = await res.text();
        alert(`Insert failed: ${text}`);
      }
    } catch (err) {
      console.error('Insert error:', err);
      alert('Network or server error');
    }
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">E-Books List</h1>

      {/* Insert Form */}
      <div className="list-item-box">
        <h2 style={{ marginBottom: '1rem' }}>Insert New E-Book</h2>
        <div className="item-details">
          {['ebook_id', 'author', 'name', 'stock', 'price', 'genre'].map(field => (
            <div className="field-block" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                className="compact-input"
                type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                value={newEbook[field]}
                onChange={(e) => handleNewChange(field, e.target.value)}
              />
            </div>
          ))}
          <button className="btn btn-primary small-update-btn" onClick={handleInsert}>
            Insert E-Book
          </button>
        </div>
      </div>

      {/* Existing List */}
      <div className="item-list">
        {ebooks.map(ebook => (
          <div className="list-item-box" key={ebook.id}>
            <button
              className="btn btn-primary compact-btn"
              onClick={() => toggleExpand(ebook.id)}
            >
              {ebook.name}
            </button>

            {ebook.expanded && (
              <div className="item-details">
                <div className="field-block">
                  <label>ID:</label>
                  <span>{ebook.id}</span>
                </div>
                <div className="field-block">
                  <label>Title:</label>
                  <span>{ebook.name}</span>
                </div>
                <div className="field-block">
                  <label>Price ($):</label>
                  <input
                    type="number"
                    className="compact-input"
                    value={ebook.price}
                    onChange={e => handleChange(ebook.id, 'price', e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-secondary small-update-btn"
                  onClick={() => handleUpdate(ebook.id)}
                >
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

export default EBooks;
