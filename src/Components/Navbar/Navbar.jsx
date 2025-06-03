import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import {
  FaHome,
  FaCar,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar({ clearUser }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setCurrentUser(token ? { token } : null);
  }, [location]);

  // Hide navbar on auth pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/#/login" ||
    location.pathname === "/#/register" ||
    location.pathname === "/"
  ) {
    return null;
  }

  function handleLogout() {
    clearUser();
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      {/* Desktop/Large Screen Navbar (Sidebar) */}
      <nav className="desktop-sidebar">
        <div className="sidebar-icons-container">
          <Link
            to="/home"
            className={`sidebar-icon ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            <FaHome className="icon" />
            <span className="icon-label">Home</span>
          </Link>

          <Link
            to="/control"
            className={`sidebar-icon ${
              location.pathname === "/control" ? "active" : ""
            }`}
          >
            <FaCar className="icon" />
            <span className="icon-label">Control</span>
          </Link>

          {currentUser && (
            <>
              <Link
                to="/profile"
                className={`sidebar-icon ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <FaUser className="icon" />
                <span className="icon-label">Profile</span>
              </Link>

              <div onClick={handleLogout} className="sidebar-icon logout">
                <FaSignOutAlt className="icon" />
                <span className="icon-label">Logout</span>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile/Small Screen Navbar (Bottom Bar) */}
      <nav className="mobile-navbar">
        <div className="mobile-icons-container">
          <Link
            to="/home"
            className={`mobile-icon ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            <FaHome className="icon" />
            <span className="icon-label">Home</span>
          </Link>

          <Link
            to="/control"
            className={`mobile-icon ${
              location.pathname === "/control" ? "active" : ""
            }`}
          >
            <FaCar className="icon" />
            <span className="icon-label">Control</span>
          </Link>

          {currentUser && (
            <>
              <Link
                to="/profile"
                className={`mobile-icon ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <FaUser className="icon" />
                <span className="icon-label">Profile</span>
              </Link>

              <div onClick={handleLogout} className="mobile-icon logout">
                <FaSignOutAlt className="icon" />
                <span className="icon-label">Logout</span>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}