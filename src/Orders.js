import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    { id: 1, number: "#1001", customer: "Jane Doe", total: "$45.00", expanded: false },
    { id: 2, number: "#1002", customer: "John Smith", total: "$30.00", expanded: false },
  ]);

  const toggleExpand = (id) => {
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, expanded: !o.expanded } : o)
    );
  };

  const handleChange = (id, field, value) => {
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, [field]: value } : o)
    );
  };

  const handleUpdate = (id) => {
    const order = orders.find(o => o.id === id);
    console.log("Updated order:", order);
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">Orders List</h1>
      <div className="item-list">
        {orders.map(order => (
          <div className="list-item-box" key={order.id}>
            <button className="btn btn-secondary compact-btn" onClick={() => toggleExpand(order.id)}>
              {order.number}
            </button>
            {order.expanded && (
              <div className="item-details">
                <div><label>Order #:</label><br /><input className="compact-input" value={order.number} onChange={(e) => handleChange(order.id, 'number', e.target.value)} /></div>
                <div><label>Customer:</label><br /><input className="compact-input" value={order.customer} onChange={(e) => handleChange(order.id, 'customer', e.target.value)} /></div>
                <div><label>Total:</label><br /><input className="compact-input" value={order.total} onChange={(e) => handleChange(order.id, 'total', e.target.value)} /></div>
                <button className="btn btn-secondary small-update-btn" onClick={() => handleUpdate(order.id)}>Update</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="btn btn-secondary" onClick={() => navigate('/admin')}>Back</button>
    </div>
  );
}

export default Orders;
