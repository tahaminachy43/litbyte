import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
    const navigate = useNavigate();
    
    const handleLogout = () => {

        navigate('/'); // Redirects to the homepage
    };
  return (
    <div className="App"> {/* centers everything like in the original */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📚</div>
            <h2 className="card-title">Categories</h2>
            <div className="selection-buttons">
              <button className="btn btn-primary">Manage</button>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-icon">📖</div>
            <h2 className="card-title">Books</h2>
            <div className="selection-buttons">
              <button className="btn btn-primary">Manage</button>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h2 className="card-title">Customers</h2>
            <div className="selection-buttons">
              <button className="btn btn-secondary">Manage</button>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-icon">🛒</div>
            <h2 className="card-title">Orders</h2>
            <div className="selection-buttons">
              <button className="btn btn-secondary">Manage</button>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn btn-secondary" onClick={handleLogout}>Logout
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
