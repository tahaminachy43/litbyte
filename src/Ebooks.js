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
        if (!res.ok) throw new Error(`Error fetching eBooks: ${res.status}`);
        const data = await res.json();
        // Include an 'id' field for each ebook (from ebook_id or Ebook_id) and expanded flag
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

  // Toggle expanded view for a specific ebook
  const toggleExpand = (id) => {
    setEbooks(prev =>
        prev.map(e =>
            e.id === id ? { ...e, expanded: !e.expanded } : e
        )
    );
  };

  // Handle field changes (only price is editable)
  const handleChange = (id, field, value) => {
    setEbooks(prev =>
        prev.map(e =>
            e.id === id ? { ...e, [field]: value } : e
        )
    );
  };

  // Update price for the expanded ebook
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
        // Collapse the panel after a successful update
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

  return (
      <div className="App">
        <h1 className="dashboard-title">E-Books List</h1>
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
        <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
          Back
        </button>
      </div>
  );
}

export default EBooks;