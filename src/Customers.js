// Customers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  // Fetch customers on mount
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch('http://localhost:3000/admin/user/getAll');
        if (!res.ok) throw new Error(`Error fetching customers: ${res.status}`);
        const data = await res.json();

        const withExpand = data.map(c => ({
          id: c.customer_id || c.Customer_id || c.user_id,
          ucid: c.ucid,
          name: c.first_name && c.last_name
              ? `${c.first_name} ${c.last_name}`
              : c.name || '',
          email: c.email,
          expanded: false
        }));

        setCustomers(withExpand);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    }

    fetchCustomers();
  }, []);

  const toggleExpand = (id) => {
    setCustomers(prev =>
        prev.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c)
    );
  };

  const handleDelete = async (id) => {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    try {
      // Send POST with JSON body (no URL params)
      const res = await fetch('http://localhost:3000/admin/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ucid: customer.ucid })
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
                <button
                    className="btn btn-primary compact-btn"
                    onClick={() => toggleExpand(customer.id)}
                >
                  {customer.name}
                </button>

                {customer.expanded && (
                    <div className="item-details">
                      <div className="field-block">
                        <label>UCID:</label>
                        <span>{customer.ucid}</span>
                      </div>
                      <div className="field-block">
                        <label>Name:</label>
                        <span>{customer.name}</span>
                      </div>
                      <div className="field-block">
                        <label>Email:</label>
                        <span>{customer.email}</span>
                      </div>
                      <button
                          className="btn btn-secondary small-update-btn"
                          onClick={() => handleDelete(customer.id)}
                      >
                        Delete
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

export default Customers;