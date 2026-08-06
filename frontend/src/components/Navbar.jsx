import React from 'react';
import './Navbar.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="plethora-navbar">
      
      {/* Left Column: Navigation Links */}
      <div className="nav-group nav-left">
        <a href="/" className="nav-link">Home</a>
        <a href="/share" className="nav-link">Share</a>
        <a href="/discover" className="nav-link">Discover</a>
      </div>

      {/* Center Column: Logo */}
      <div className="nav-group nav-center">
        <a href="/" className="brand-logo">
          <img src={Logo} alt="Plethora Logo" className="brand-image" />
        </a>
      </div>

      {/* Right Column: Account */}
      <div className="nav-group nav-right">
        <a href="/account" className="nav-link">Account</a>
      </div>

    </nav>
  );
}