import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function CompleteAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Extract the Google data held in memory
  const googleData = location.state?.googleData;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Security Catch: If they try to force their way to this URL without Google data, kick them out
  useEffect(() => {
    if (!googleData) navigate('/login');
  }, [googleData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/plethora_api/google.php?action=signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: googleData.email, 
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        window.alert("Node created. Welcome to the grid.");
        navigate('/discover');
      } else {
        window.alert(`Transmission failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleCancel = () => {
    const proceed = window.confirm(
      "Because we respect your privacy, leaving this process will delete what has been gathered for account creation purposes.\n\nDo you wish to continue?"
    );
    if (proceed) {
      // By navigating away, React destroys the googleData state currently in RAM.
      navigate('/discover');
    }
  };

  const isSubmitDisabled = !username || !password || !isAgeVerified || !isTermsAccepted;

  if (!googleData) return null;

  return (
    <main className="auth-layout">
      <header className="auth-global-header">
        <Link to="/" className="brand-logo">
          {/* Your SVG Logo Here */}
          <span className="brand-text">Plethora</span>
        </Link>
      </header>

      <div className="auth-left">
        <div className="welcome-text-wrapper">
          {/* Dynamically injecting their real name */}
          <h1 className="welcome-title">Welcome, {googleData.name}.</h1>
          <p className="welcome-subtitle" style={{ fontSize: '0.95rem', color: '#9ca3af', marginTop: '1rem' }}>
            (Don't worry, your real name will be permanently deleted and replaced by your username once initialized).
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <header className="auth-header" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', color: '#fff', fontWeight: 400 }}>
              Finalize Account
            </h2>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Create Username</label>
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="unfiltered_node"
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Create Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required 
              />
            </div>

            <div className="auth-agreements" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="age-verify" 
                  checked={isAgeVerified}
                  onChange={(e) => setIsAgeVerified(e.target.checked)}
                />
                <label htmlFor="age-verify">I confirm that I am 13 years of age or older.</label>
              </div>
              
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="terms-verify" 
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms-verify">
                  I agree to the <Link to="/terms" target="_blank" className="terms-link">Terms of Use</Link> and <Link to="/privacy" target="_blank" className="terms-link">Privacy Policy</Link>.
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isSubmitDisabled}>
              Initialize Node
            </button>
          </form>
        </div>

        <div className="guest-link-wrapper">
          <button onClick={handleCancel} className="guest-link">
            Nevermind, continue as guest
          </button>
        </div>
      </div>
    </main>
  );
}