import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ clearUser }) {
  const [currentUser, setCurrentUser] = useState(null); // State to track current user
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Check if user is logged in based on token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assume the token is valid, you can also validate it here if needed
      setCurrentUser({ token }); // You can store more user data if needed
    } else {
      setCurrentUser(null);
    }
  }, [location]); // Re-run effect on route change

  // Hide navbar on 'login' and 'register' pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  function handleLogout() {
    clearUser();
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login');
  }

  return (
    <nav className="navbar fw-bold colorr text-whitee navbar-expand-lg">
      <div className="container-fluid text-whitee">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-whitee active edit me-2" aria-current="page" to="/home">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-whitee active edit me-2" aria-current="page" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <span onClick={handleLogout} className="cursor-pointer text-whitee edit nav-link active me-2" aria-current="page">
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active text-whitee edit me-2" aria-current="page" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-whitee" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
