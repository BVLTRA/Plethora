import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Share.css';

export default function Share() {
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security: Redirect disconnected users
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Unified transmission engine
  const submitEntry = async (status) => {
    if (!content.trim()) {
      window.alert("You cannot broadcast empty static.");
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
        window.alert(`Transmission failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      window.alert("The grid is currently unresponsive.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Delete this draft? (fyi Talya said this is bad bad.. dont forget)")) {
      setTitle('');
      setContent('');
    }
  };

  if (!user) return null; 

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
            placeholder="Name this fragment (optional)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck="false"
          />

          {/* Body Textarea */}
          <textarea 
            className="story-editor"
            placeholder="Type into the void..."
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
    </main>
  );
}