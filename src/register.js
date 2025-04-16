import React from 'react';
import { Link } from 'react-router-dom';
import signupBackground from './Assets/sky.jpg';
import './register.css';

function Register() {
  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-form">
          <h1 className="logo">LitByte</h1>
          <h2>Create Account</h2>
          <p className="welcome-text">Join us to get started!</p>
          
          <form>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input 
                type="text" 
                id="fullname" 
                placeholder="John Doe" 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="your@email.com" 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="••••••••" 
                className="form-input"
              />
            </div>
            
            <div className="form-options">
              <div className="terms-agreement">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the Terms and Conditions</label>
              </div>
            </div>
            
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          
          <p className="login-link">
            Already have an account? <Link to="/login" className="login-link-text">Login</Link>
          </p>
        </div>
      </div>
      
      <div className="signup-right" style={{ backgroundImage: `url(${signupBackground})` }}>
        <div className="signup-logo-container">
          <h1>LitByte</h1>
        </div>
      </div>
    </div>
  );
}

export default Register;