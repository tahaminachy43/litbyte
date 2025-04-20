import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([
    { id: 1, name: "Jane Doe", email: "jane@example.com", phone: "123-456-7890", expanded: false },
    { id: 2, name: "John Smith", email: "john@example.com", phone: "987-654-3210", expanded: false },
  ]);

  const toggleExpand = (id) => {
    setCustomers(prev =>
      prev.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c)
    );
  };

  const handleChange = (id, field, value) => {
    setCustomers(prev =>
      prev.map(c => c.id === id ? { ...c, [field]: value } : c)
    );
  };

  const handleUpdate = (id) => {
    const customer = customers.find(c => c.id === id);
    console.log("Updated customer:", customer);
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">Customers List</h1>
      <div className="item-list">
        {customers.map(customer => (
          <div className="list-item-box" key={customer.id}>
            <button className="btn btn-secondary compact-btn" onClick={() => toggleExpand(customer.id)}>
              {customer.name}
            </button>
            {customer.expanded && (
              <div className="item-details">
                <div><label>Name:</label><br /><input className="compact-input" value={customer.name} onChange={(e) => handleChange(customer.id, 'name', e.target.value)} /></div>
                <div><label>Email:</label><br /><input className="compact-input" value={customer.email} onChange={(e) => handleChange(customer.id, 'email', e.target.value)} /></div>
                <div><label>Phone:</label><br /><input className="compact-input" value={customer.phone} onChange={(e) => handleChange(customer.id, 'phone', e.target.value)} /></div>
                <button className="btn btn-secondary small-update-btn" onClick={() => handleUpdate(customer.id)}>Delete</button>
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
