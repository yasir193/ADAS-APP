import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const location = useLocation(); // Get the current route

  // Hide the footer on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="mailto:contact@yourdomain.com">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
