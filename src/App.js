import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './Assets/Panda Graduation.png';
import studyIllustration from './Assets/BOOKS.jpg';
import './App.css';
import Login from './login';
import Register from './register';
import Customer from "./Customer";
import Recomendations from "./recomendation";
import Courses from "./Courses";
import Cart from "./cart";
import Dashboard from "./Dashboard"; 
import Ebooks from "./Ebooks";
import Books from "./Books";
import Customers from "./Customers";
import Orders from "./Orders";




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/admin" element={<Dashboard />} />
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
                    LitBytes is an online student bookstore designed to address the challenges faced by a
                    campus bookstore owner due to declining in-person sales. The root of the problem lies in shifting
                    student preferences—many now favour the convenience of online shopping, home delivery, and
                    quick turnaround times offered by other e-commerce platforms. Additionally, students often rely
                    on public transit and may not have access to cars, making trips to a physical bookstore less
                    appealing. LitBytes offers a comprehensive solution by providing an online platform for
                    purchasing school-related books in a physical or online form. Students—our primary
                    customers—will have the flexibility to buy physical books with options for in-store pickup or
                    home delivery, purchase e-books for immediate access and rent e-books for immediate use.
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
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/books" element={<Books />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
