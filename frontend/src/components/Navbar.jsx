import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (location.pathname === '/login' || location.pathname === '/terms' || location.pathname === '/privacy' || location.pathname === '/complete-account') {
    return null;
  }

  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMenu = () => setIsMobileOpen(false);

  return (
    <nav className="plethora-navbar">
      
      {/* Hamburger Toggle */}
      <button className="mobile-toggle" onClick={toggleMenu}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {isMobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Center Column: Logo */}
      <div className="nav-center">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <img src={Logo} alt="Plethora Logo" className="brand-image" />
        </Link>
      </div>

      <div className={`nav-links-wrapper ${isMobileOpen ? 'mobile-active' : ''}`}>
        
        {/* Left Links */}
        <div className="nav-group nav-left">
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/share" className="nav-link" onClick={closeMenu}>Share</NavLink>
          <NavLink to="/discover" className="nav-link" onClick={closeMenu}>Discover</NavLink>
        </div>

        {/* Right Links */}
        <div className="nav-group nav-right">
          {user ? (
            <NavLink to="/account" className="nav-link" onClick={closeMenu}>Account</NavLink>
          ) : (
            <NavLink to="/login" className="nav-link" onClick={closeMenu}>Sign In</NavLink>
          )}
        </div>
        
      </div>
    </nav>
  );
}