import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginBackground from './Assets/sky.jpg'; 
import './login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'adminPass') {
      navigate('/admin'); // redirect to dashboard
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left" style={{ backgroundImage: `url(${loginBackground})` }}>
        <div className="login-logo-container">
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form">
          <h1 className='logo'>LitByte</h1> 
          <h2>Welcome Back!</h2>
          <p className="welcome-text">Please login to your account.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input 
                type="email" 
                id="username" 
                placeholder="username@gmail.com" 
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="*********" 
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {error && <p style={{ color: '#ff6b6b', marginTop: '1rem' }}>{error}</p>}
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
