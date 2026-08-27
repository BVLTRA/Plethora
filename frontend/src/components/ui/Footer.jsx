import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="plethora-footer">
      <div className="footer-content">
        
        <div className="footer-brand">
            <img src={Logo} alt="Plethora Logo" className="footer-logo" />
          <p>You don't have to bear it alone.</p>
        </div>

        <div className="footer-links">
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