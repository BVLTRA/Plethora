import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const location = useLocation();

  if (location.pathname === '/auth') {
    return null; 
  }

  return (
    <nav className="plethora-navbar">
      
      {/* Left Column: Navigation Links */}
      <div className="nav-group nav-left">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/share" className="nav-link">Share</NavLink>
        <NavLink to="/discover" className="nav-link">Discover</NavLink>

      </div>

      {/* Center Column: Logo */}
      <div className="nav-group nav-center">
        <Link to="/" className="brand-logo">
          <img src={Logo} alt="Plethora Logo" className="brand-image" />
        </Link>
      </div>

      {/* Right Column: Account */}
      <div className="nav-group nav-right">
        <NavLink to="/account" className="nav-link">Account</NavLink>
        <NavLink to="/auth" className="nav-link">Login</NavLink>
      </div>

    </nav>
  );
}