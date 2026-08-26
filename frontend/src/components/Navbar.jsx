import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import Logo from '../assets/logo.png';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  console.log("[Navbar] Current user state is:", user);

  if (location.pathname === '/login' || location.pathname === '/terms' || location.pathname === '/privacy' || location.pathname === '/complete-account') {
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
      <div className="nav-group nav-right">{user ? (
          <NavLink to="/account" className="nav-link">Account</NavLink>
        ) : (
          <NavLink to="/login" className="nav-link">Sign In</NavLink>
        )}
      </div>

    </nav>
  );
}