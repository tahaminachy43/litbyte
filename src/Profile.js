import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaCreditCard,
  FaPlus,
  FaSignOutAlt,
  FaSearch,
  FaShoppingCart,
  FaTrash
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });


  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/student/profile?email=${email}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        localStorage.setItem('ucid', data.ucid);

        setUser(data);

        const coursesRes = await fetch(
            `http://localhost:3000/student/profile/getCourse?ucid=${data.ucid}`
        );
        if (!coursesRes.ok) throw new Error(`Status ${coursesRes.status}`);
        const coursesData = await coursesRes.json();
        setCourses(
            coursesData.map((c, idx) => ({ id: idx, title: c, code: c }))
        );
      } catch (err) {
        console.error('Error loading profile or courses:', err);
      }
    })();
  }, [navigate]);

  const handleAddCourse = async () => {
    if (!user) return;
    const courseId = prompt('Enter Course ID to add:');
    if (!courseId) return;
    try {
      const res = await fetch(
          'http://localhost:3000/student/profile/course',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ucid: user.ucid, course_id: courseId })
          }
      );
      if (res.ok) {
        setCourses(prev => [
          ...prev,
          { id: Date.now(), title: courseId, code: courseId }
        ]);
      } else {
        const text = await res.text();
        alert(`Failed to add course: ${text}`);
      }
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Network error');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    try {
      const res = await fetch(
          'http://localhost:3000/student/profile/deleteCourse',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ucid: user.ucid, course_id: course.code })
          }
      );
      const text = await res.text();
      if (res.ok) {
        setCourses(prev => prev.filter(c => c.id !== courseId));
      } else {
        alert(`Failed to delete course: ${text}`);
      }
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Network error');
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert('Payment information saved successfully!');
    setShowPaymentForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login');
  };

  if (!user) {
    return <div className="profile-page-container"><p>Loading profile...</p></div>;
  }

  return (
      <div className="profile-page-container">
        <nav className="navbar">
          <div className="nav-left">
            <div className="logo-container"><h1 className="logo">LitByte</h1></div>
          </div>
          <div className="nav-center">
            <ul className="nav-links">
              <li><Link to="/customer">Home</Link></li>
              <li><Link to="/recommendations">Recommendations</Link></li>
              <li className="active"><Link to="/profile">Profile</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <button className="search-button"><FaSearch className="search-icon" /></button>
            </div>
            <button className="cart-button"><FaShoppingCart className="cart-icon" /></button>
          </div>
        </nav>

        <div className="profile-container">
          <header className="profile-header">
            <h1>My Profile</h1>
            <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
          </header>

          <section className="user-info-section">
            <div className="user-avatar"><FaUser size={80} /></div>
            <div className="user-details">
              <h2>{user.first_name} {user.last_name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>UCID:</strong> {user.ucid}</p>
            </div>
          </section>

          <section className="courses-section">
            <div className="section-header">
              <h2>My Courses</h2>
              <button className="add-course-btn" onClick={handleAddCourse}><FaPlus /> Add Course</button>
            </div>
            <div className="courses-list">
              {courses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-card-header">
                      <h3>{course.title}</h3>
                      <button className="delete-course-btn" onClick={() => handleDeleteCourse(course.id)}><FaTrash /></button>
                    </div>
                    <p>{course.code}</p>
                  </div>
              ))}
            </div>
          </section>

          <section className="payment-section">
            <div className="section-header">
              <h2>Payment Information</h2>
              <button className="payment-toggle-btn" onClick={() => setShowPaymentForm(!showPaymentForm)}><FaCreditCard /> {showPaymentForm ? 'Hide' : 'Edit'} Payment</button>
            </div>
            {showPaymentForm && (
                <form className="payment-form" onSubmit={handlePaymentSubmit}>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input name="expiry" value={paymentInfo.expiry} onChange={handlePaymentChange} required />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} required />
                    </div>
                  </div>
                  <button type="submit" className="save-payment-btn">Save Payment Information</button>
                </form>
            )}
          </section>
        </div>
      </div>
  );
}
