import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/order/getAll');
        if (!res.ok) throw new Error(`Error fetching orders: ${res.status}`);
        const data = await res.json();

        const withExpand = data.map(o => ({
          ...o,
          id: o.order_id || o.Order_ID,
          expanded: false
        }));
        setOrders(withExpand);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const toggleExpand = (id) => {
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, expanded: !o.expanded } : o)
    );
  };

  return (
    <div className="App">
      <h1 className="dashboard-title">Orders List</h1>
      <div className="item-list">
        {orders.map(order => (
          <div className="list-item-box" key={order.id}>
            <button className="btn btn-secondary compact-btn" onClick={() => toggleExpand(order.id)}>
              Order #{order.id}
            </button>
            {order.expanded && (
              <div className="item-details">
                <div className="field-block">
                  <label>Order ID:</label>
                  <span>{order.id}</span>
                </div>
                <div className="field-block">
                  <label>Customer:</label>
                  <span>{order.customer || order.Customer || "Unknown"}</span>
                </div>
                <div className="field-block">
                  <label>Total ($):</label>
                  <span>{order.total_price || order.Total_Price || "0.00"}</span>
                </div>
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

export default Orders;
