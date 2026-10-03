
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-icon">🎓</span>
          <span>StudentPortal</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link active">
            Home
          </Link>

          <Link to="/students" className="nav-link">
            Student List
          </Link>

          <Link to="/login" className="nav-link">
            Login
          </Link>

          <Link to="/register" className="nav-btn">
            Register <span>→</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="hero-content">
            
            <h1>
              Student Manager Dashboard
              <br />
            </h1>

  <div className="quick-access-buttons">
    <Link to="/register" className="quick-btn register-btn">
      Register <span>→</span>
    </Link>

    <Link to="/login" className="quick-btn login-btn">
      Login <span>→</span>
    </Link>

    <Link to="/students" className="quick-btn students-btn">
      Student List <span>→</span>
    </Link>
  </div>


           

            
          </div>

        </section>

     

        
      </main>

      
    </div>
  );
}

export default Home;

