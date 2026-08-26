import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import './ReadStory.css';

export default function ReadStory() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Short-term memory for interactions
  const [isLiked, setIsLiked] = useState(false);
  const [ackCount, setAckCount] = useState(0);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const url = user 
          ? `http://localhost:5000/api/entries/${id}?visitorId=${user.id}`
          : `http://localhost:5000/api/entries/${id}`;

        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setStory(data);
          setIsLiked(!!data.is_liked_by_user);
          // Acknowledgement = Sum of likes and comments
          setAckCount(data.likes_count + data.comments_count);
        } else {
          setError("This signal could not be found.");
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("The grid is unresponsive.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      window.alert("You must be connected to acknowledge a signal.");
      return;
    }

    // Optimistic UI update: instantly toggle heart and math
    setIsLiked(!isLiked);
    setAckCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      if (!isLiked) {
        const response = await fetch('http://localhost:5000/api/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, entryId: id })
        });
        if (!response.ok) throw new Error("Failed to like");
      } else {
        const response = await fetch('http://localhost:5000/api/likes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, entryId: id })
        });
        if (!response.ok) throw new Error("Failed to unlike");
      }
    } catch (error) {
      console.error("Signal failure:", error);
      // Revert UI on failure
      setIsLiked(!isLiked);
      setAckCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  const handleCommentClick = () => {
    navigate(`/reply/${id}`);
  };

  // Format SQL timestamp 
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <main className="read-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#596f62', fontFamily: 'Courier New' }}>Decrypting signal...</div>
      </main>
    );
  }

  if (error || !story) {
    return (
      <main className="read-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#dc2626', fontFamily: 'Courier New' }}>{error}</div>
      </main>
    );
  }

  return (
    <main className="read-page">
      <div className="read-container">
        
        {/* --- ORIGINAL SIGNAL --- */}
        <article className="original-story">
          <header className="story-header">
            {story.title && <h1 className="story-title">{story.title}</h1>}
            <h2 className="story-username">
              "<Link to={`/profile/${story.username}`} style={{ textDecoration: 'none' }}><span className="username-text">@{story.username}</span></Link>"
            </h2>
          </header>
          
          <div className="story-content">
            <p style={{ whiteSpace: 'pre-wrap' }}>{story.content}</p>
          </div>

          <hr className="story-divider" />

          {/* --- INTERACTION & STATS --- */}
          <div className="interaction-bar">
            
            <div className="interaction-buttons">
              <button 
                className={`circular-action-btn like-btn ${isLiked ? 'liked' : ''}`} 
                onClick={handleLike} 
                aria-label="Like"
              >
                <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              
              <button className="circular-action-btn comment-btn" onClick={handleCommentClick} aria-label="Comment">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </button>
            </div>

            <div className="interaction-stats">
              <span className="stat-text">
                {ackCount} Acknowledgement{ackCount !== 1 ? 's' : ''}
              </span>
              <span className="stat-dot">•</span>
              <span className="stat-text">{formatDate(story.created_at)}</span>
            </div>

          </div>
        </article>

        {/* --- RESPONSES --- */}
        <section className="replies-section">
          <h3 className="replies-heading">Responses</h3>
          
          <div className="replies-grid">
            <div className="empty-replies">
              <p>No replies found yet.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}