import React from 'react';
import { Link } from 'react-router-dom';
import loginBackground from './Assets/sky.jpg'; 
import './login.css'; 

function Login() {
  return (
    <div className="login-container">
      <div className="login-left" style={{ backgroundImage: `url(${loginBackground})` }}>
        <div className="login-logo-container">
          <h1>LitByte</h1>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form">
          <h1 className='logo'>LitByte</h1> 
          <h2>Welcome Back!</h2>
          <p className="welcome-text">Please login to your account.</p>
          
          <form>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input 
                type="email" 
                id="username" 
                placeholder="username@gmail.com" 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="*********" 
                className="form-input"
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>
            
            <button type="submit" className="login-button">Login</button>
          </form>
          
          <p className="signup-link">
            New User? <Link to="/register" className="signup-link-text">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;