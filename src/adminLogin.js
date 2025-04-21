import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginBackground from './Assets/sky.jpg';
import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const text = await res.text();

            if (!res.ok) {
                setMessage(`Error: ${text}`);
            } else {
                setMessage(`Success: ${text}`);
                // On successful login, redirect
                setTimeout(() => navigate('/admin'), 1500);
            }
        } catch (err) {
            setMessage('Network error');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left" style={{ backgroundImage: `url(${loginBackground})` }}>
                <div className="login-logo-container">
                    {/* Clickable logo */}
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1>LitByte</h1>
                    </Link>
                </div>
            </div>
            <div className="login-right">
                <div className="login-form">
                    {/* Clickable logo in the form section */}
                    <Link to="/" className="logo-link">
                        <h1 className="logo">LitByte</h1>
                    </Link>

                    <h2>Admin Login</h2>
                    <p className="welcome-text">Please login to your account.</p>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    )
}