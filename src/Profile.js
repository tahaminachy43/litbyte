import React, { useState } from 'react';
import { FaUser, FaCreditCard, FaPlus, FaSignOutAlt, FaSearch, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import './profile.css';

function Profile() {
  const location = useLocation();
  const [user] = useState({
    name: 'Moon Chow',
    email: 'Moon.Chowe@example.com',
    ucid: '30140920'
  });

  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to Computer Science', code: 'CS101' },
    { id: 2, title: 'Data Structures and Algorithms', code: 'CS201' }
  ]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleAddCourse = () => {
    const newCourse = {
      id: Date.now(), // Using timestamp for unique ID
      title: `New Course ${courses.length + 1}`,
      code: `CS${300 + courses.length}`
    };
    setCourses([...courses, newCourse]);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert('Payment information saved successfully!');
    setShowPaymentForm(false);
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  return (
    <div className="profile-page-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <h1 className="logo">LitByte</h1>
          </div>
        </div>
        
        <div className="nav-center">
          <ul className="nav-links">
            <li className={location.pathname === '/customer' ? 'active' : ''}>
              <Link to="/customer">Home</Link>
            </li>
            <li className={location.pathname === '/recommendations' ? 'active' : ''}>
              <Link to="/recommendations">Recommendations</Link>
            </li>
            <li className={location.pathname === '/courses' ? 'active' : ''}>
              <Link to="/courses">Profile</Link>
            </li>
            
            <li className={location.pathname === '/cart' ? 'active' : ''}>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        
        <div className="nav-right">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </div>
          <button className="cart-button">
            <FaShoppingCart className="cart-icon" />
          </button>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="profile-container">
        {/* Header */}
        <header className="profile-header">
          <h1>My Profile</h1>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </header>

        {/* User Info Section */}
        <section className="user-info-section">
          <div className="user-avatar">
            <FaUser size={80} />
          </div>
          <div className="user-details">
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UCID:</strong> {user.ucid}</p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button className="add-course-btn" onClick={handleAddCourse}>
              <FaPlus /> Add Course
            </button>
          </div>
          
          <div className="courses-list">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-card-header">
                  <h3>{course.title}</h3>
                  <button 
                    className="delete-course-btn"
                    onClick={() => handleDeleteCourse(course.id)}
                    aria-label="Delete course"
                  >
                    <FaTrash />
                  </button>
                </div>
                <p>{course.code}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Section */}
        <section className="payment-section">
          <div className="section-header">
            <h2>Payment Information</h2>
            <button 
              className="payment-toggle-btn"
              onClick={() => setShowPaymentForm(!showPaymentForm)}
            >
              <FaCreditCard /> {showPaymentForm ? 'Hide' : 'Edit'} Payment
            </button>
          </div>

          {showPaymentForm && (
            <form className="payment-form" onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="save-payment-btn">
                Save Payment Information
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;