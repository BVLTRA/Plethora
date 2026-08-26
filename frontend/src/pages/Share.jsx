import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import AlertModal from '../components/ui/AlertModal';
import './Share.css';
import './Auth.css'; 

export default function Share() {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const [modal, setModal] = useState({ isOpen: false, message: '', isConfirm: false, onConfirm: null });

  const showAlert = (msg) => setModal({ isOpen: true, message: msg, isConfirm: false });
  const showConfirm = (msg, action) => setModal({ isOpen: true, message: msg, isConfirm: true, onConfirm: action });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitEntry = async (status) => {
    if (!content.trim()) {
      showAlert("You cannot upload an empty entry.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          title: title.trim(), 
          content: content.trim(),
          status: status 
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/account');
      } else {
        showAlert(`Transmission failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      showAlert("The diary is currently unresponsive.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
  showConfirm("Delete this draft? (Once it's gone, it's gone.)", () => {
    setTitle('');
    setContent('');
  });
};

  // --- GUEST BLOCK ---
  // If no user is detected, render background and modal, but NOT the editor.
  if (!user) {
    return (
      <main className="share-page">
        <div className="modal-overlay">
          <div className="auth-card" style={{ width: '100%', maxWidth: '450px', margin: '0 1rem', position: 'relative' }}>
            
            <header className="auth-header" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', color: '#fff', fontWeight: 400 }}>
                Hello, stranger.
              </h2>
            </header>

            <div className="auth-form">
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                We would love for you to share your story. However, to maintain the integrity of the diary and protect our community, we require all authors to be connected to a profile.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-primary"
                >
                  Sign In
                </button>
                
                <button 
                  onClick={() => navigate(-1)} 
                  className="guest-link"
                >
                  Nevermind, continue as a guest
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // --- THE AUTHENTICATED EDITOR ---
  return (
    <main className="share-page">
      <div className="share-container">
        
        <header className="share-header">
          <h1 className="share-title">Share your story</h1>
          <h2 className="share-username">
            "<span className="username-text">@{user.username}</span>"
          </h2>
        </header>

        {/* Editor Section */}
        <div className="editor-wrapper">
          {/* Title Input */}
          <input 
            type="text"
            className="story-title"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck="false"
          />

          {/* Body Textarea */}
          <textarea 
            className="story-editor"
            placeholder="Type out what feels right to you..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck="false"
          />
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <button 
            className="icon-btn delete-btn" 
            onClick={handleClear}
            disabled={isSubmitting}
            aria-label="Delete draft"
            title="Delete draft"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
          </button>

          <div className="primary-actions">
            <button 
              className="btn-outline" 
              onClick={() => submitEntry('draft')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button 
              className="btn-solid" 
              onClick={() => submitEntry('published')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

      </div>
      <AlertModal 
  isOpen={modal.isOpen} 
  message={modal.message} 
  isConfirm={modal.isConfirm}
  onConfirm={modal.onConfirm}
  onClose={() => setModal({ ...modal, isOpen: false })} 
/>
    </main>
  );
}