import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './Assets/Panda Graduation.png';
import studyIllustration from './Assets/BOOKS.jpg';
import './App.css';
import Login from './login';
import Register from './register';
import Customer from "./Customer";
import Recomendations from "./recomendation";
import Courses from "./Profile";
import Cart from "./cart";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <header className="App-header">
              <div className="header-top">
                <div className="logo-container">
                  <img src={logo} className="logo" alt="logo" />
                  <h1>LitByte</h1>
                </div>
                
                <div className="auth-buttons">
                  <Link to="/login" className="login-btn">Login</Link>
                  <Link to="/register" className="register-btn">Register</Link>
                </div>
              </div>
              
              <div className="content-container">
                <div className="content-text">
                  <p>
                    Welcome to LitByte
                  </p>
                </div>
                
                <div className="content-image">
                  <img src={studyIllustration} alt="study Illustration" />
                </div>
              </div>
            </header>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/recommendations" element={<Recomendations />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
