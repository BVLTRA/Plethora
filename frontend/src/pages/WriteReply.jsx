import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Share.css';

export default function WriteReply() {
  const { id } = useParams(); // Entry ID user is replying to
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login'); 
  }, [user, navigate]);

  const submitReply = async () => {
    if (!content.trim()) {
      window.alert("You cannot broadcast empty static.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          entryId: id, 
          content: content.trim()
        })
      });

      if (response.ok) {
        // Drop back to the story they were just reading
        navigate(`/story/${id}`);
      } else {
        const data = await response.json();
        window.alert(`Transmission failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      window.alert("The grid is currently unresponsive.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null; 

  return (
    <main className="share-page">
      <div className="share-container">
        
        <header className="share-header">
          <h1 className="share-title">Send a response</h1>
          <h2 className="share-username">
            "<span className="username-text">@{user.username}</span>"
          </h2>
        </header>

        <div className="editor-wrapper">
          {/* No title input needed for replies, so me added padding-top to the textarea to balance it */}
          <textarea 
            className="story-editor"
            placeholder="Type out your response..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck="false"
            style={{ paddingTop: '3rem' }} 
          />
        </div>

        <div className="action-bar">
          <button 
            className="icon-btn delete-btn" 
            onClick={() => navigate(`/story/${id}`)}
            disabled={isSubmitting}
            aria-label="Cancel reply"
            title="Cancel reply"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
          </button>

          <div className="primary-actions">
            <button className="btn-outline" onClick={() => navigate(`/story/${id}`)} disabled={isSubmitting}>
              Cancel
            </button>
            <button className="btn-solid" onClick={submitReply} disabled={isSubmitting}>
              {isSubmitting ? 'Transmitting...' : 'Send Reply'}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}