import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="plethora-footer">
      <div className="footer-content">
        
        {/* Column 1: Brand */}
        <div className="footer-brand">
          <img src={Logo} alt="Plethora Logo" className="footer-logo" />
          <p>You don't have to bear it alone.</p>
        </div>

        {/* Column 2: System Info & Portfolio */}
        <div className="footer-about">
          <h4>System Architecture</h4>
          <p>
            Plethora is built by BVLTRA—a digital development ecosystem focused on brutalist web design, dynamic interfaces, and interactive architectures.
          </p>
          <a href="https://bvltra.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
            BVLTRA Portfolio
          </a>
        </div>

        {/* Column 3: Navigation */}
        <div className="footer-links">
          <h4>Directory</h4>
          <Link to="/">Home</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/share">Share</Link>
          <Link to="/account">Account</Link>
        </div>

      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} BVLTRA. All rights reserved.</p>
      </div>
    </footer>
  );
}