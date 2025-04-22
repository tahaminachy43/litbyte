import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  // Fetch customers on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/user/getAll');
        if (!res.ok) throw new Error(`Error fetching customers: ${res.status}`);
        const data = await res.json();
        const withExpand = data.map(c => ({
          ...c,
          id: c.customer_id || c.Customer_id || c.user_id,
          expanded: false
        }));
        setCustomers(withExpand);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  const toggleExpand = (id) => {
    setCustomers(prev =>
      prev.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c)
    );
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('http://localhost:3000/admin/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id })
      });

      if (res.ok) {
        alert('Customer deleted successfully!');
        setCustomers(prev => prev.filter(c => c.id !== id));
      } else {
        const text = await res.text();
        alert(`Delete failed: ${text}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network or server error');
    }
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">Customers List</h1>
      <div className="item-list">
        {customers.map(customer => (
          <div className="list-item-box" key={customer.id}>
          <button className="btn btn-primary compact-btn" onClick={() => toggleExpand(customer.id)}>
            {customer.name}
          </button>

            {customer.expanded && (
              <div className="item-details">
                <div className="field-block">
                  <label>ID:</label>
                  <span>{customer.id}</span>
                </div>
                <div className="field-block">
                  <label>Name:</label>
                  <span>{customer.name}</span>
                </div>
                <div className="field-block">
                  <label>Email:</label>
                  <span>{customer.email}</span>
                </div>
                <button className="btn btn-secondary small-update-btn" onClick={() => handleDelete(customer.id)}>
                Delete
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

export default Customers;
