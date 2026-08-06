import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="plethora-navbar">
      
      {/* Left Column: Navigation Links */}
      <div className="nav-group nav-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/share" className="nav-link">Share</Link>
        <Link to="/discover" className="nav-link">Discover</Link>
      </div>

      {/* Center Column: Logo */}
      <div className="nav-group nav-center">
        <Link to="/" className="brand-logo">
          <img src={Logo} alt="Plethora Logo" className="brand-image" />
        </Link>
      </div>

      {/* Right Column: Account */}
      <div className="nav-group nav-right">
        <Link to="/account" className="nav-link">Account</Link>
      </div>

    </nav>
  );
}