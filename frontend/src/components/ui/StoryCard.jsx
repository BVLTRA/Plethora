import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 
import "../../pages/Discover.css";
import "./StoryCard.css";

export default function StoryCard({ id, username, title, excerpt, initialIsLiked, isDraft }) {
  const { user } = useAuth(); // Identify who is clicking
  const [isLiked, setIsLiked] = useState(initialIsLiked || false); // Short-term memory for button
  const navigate = useNavigate();

  const handleLike = async () => {
    if (!user) {
      window.alert("You must be connected to acknowledge a signal.");
      return;
    }

    // Instantly toggle visual state so it feels fast
    setIsLiked(!isLiked);

    try {
      if (!isLiked) {
        // Send the Like to the database
        const response = await fetch('http://localhost/plethora_api/likes.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, entryId: id })
        });
        
        // If the database rejects it, revert the heart back to gray
        if (!response.ok) setIsLiked(false);
      } else {
        // Send the Un-Like to the database
        const response = await fetch('http://localhost/plethora_api/likes.php', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, entryId: id })
        });
        
        if (!response.ok) setIsLiked(true);
      }
    } catch (error) {
      console.error("Signal failure:", error);
      setIsLiked(!isLiked); // Revert on network error
    }
  };

  return (
    <article className="story-card">
      <header className="card-header">
        <Link 
          to={`/profile/${username}`} 
          style={{ textDecoration: 'none' }} /* Prevents default blue underline */
        >
          <span className="card-username">@{username}</span>
        </Link>
      </header>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-excerpt">{excerpt}</p>
      </div>

      <footer className="card-footer">
        
        {/* Hide interaction buttons on drafts, since nobody can like a draft anyway */}
        {!isDraft && (
          <div className="card-actions">
            <button 
              className={`icon-btn-disc like-btn ${isLiked ? 'liked' : ''}`} 
              onClick={handleLike}
              aria-label="Like"
            >
              <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            
            <button className="icon-btn-disc comment-btn" onClick={() => navigate(`/reply/${id}`)} aria-label="Comment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
          </div>
        )}

        <Link to={isDraft ? `/edit/${id}` : `/story/${id}`} className="read-more-btn">
          {isDraft ? 'Continue Writing' : 'Read More'}
        </Link>
        
      </footer>
    </article>
  );
}