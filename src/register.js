// register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupBackground from './Assets/sky.jpg';
import './register.css';

export default function Register() {
  const [ucid, setUcid] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!agreeTerms) {
      setMessage('You must agree to the Terms and Conditions');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ucid,
          first_name: firstName,
          last_name: lastName,
          email,
          password
        })
      });
      const text = await res.text();

      if (!res.ok) {
        setMessage(`Error: ${text}`);
      } else {
        setMessage(`Success: ${text}`);
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-form">
            
            <h2>Create Account</h2>
            <p className="welcome-text">Join us to get started!</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ucid">UCID</label>
                <input
                    type="text"
                    id="ucid"
                    value={ucid}
                    onChange={e => setUcid(e.target.value)}
                    className="form-input"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="form-input"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="form-input"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-input"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-input"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="form-input"
                    required
                />
              </div>

              <div className="form-options">
                <div className="terms-agreement">
                  <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                  />
                  <label htmlFor="terms">I agree to the Terms and Conditions</label>
                </div>
              </div>

              <button type="submit" className="signup-button">Sign Up</button>
            </form>

            {message && <p className="message">{message}</p>}

            <p className="login-link">
              Already have an account? <Link to="/login" className="login-link-text">Login</Link>
            </p>
          </div>
        </div>

        <div className="signup-right" style={{ backgroundImage: `url(${signupBackground})` }}>
          <div className="signup-logo-container">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 className="logo">LitByte</h1>
            </Link>
          </div>
        </div>
      </div>
  );
}
