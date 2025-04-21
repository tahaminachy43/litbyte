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
import Dashboard from "./Dashboard"; 
import Ebooks from "./Ebooks";
import Books from "./Books";
import Customers from "./Customers";
import Orders from "./Orders";
import AdminLogin from "./adminLogin";

function HomeWithNavbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} className="logo" alt="logo" />
          <h1>LitByte</h1>
        </div>
        
        <div className="auth-buttons">
          <Link to="./adminLogin" className='register-btn'>Admin Login</Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </nav>

      <div className="home-content">
        <div className="content-container">
          <div className="content-text">
            <h2>Welcome to LitByte</h2>
            <p>Your personalized learning companion</p>
          </div>
          
          <div className="content-image">
            <img src={studyIllustration} alt="study Illustration" />
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeWithNavbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/recommendations" element={<Recomendations />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/books" element={<Books />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;