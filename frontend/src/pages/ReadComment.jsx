import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import ReplyCard from '../components/ui/ReplyCard';
import './ReadStory.css';

export default function ReadComment() {
  const { id } = useParams(); // COMMENT id
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isLiked, setIsLiked] = useState(false);
  const [ackCount, setAckCount] = useState(0);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const url = user 
          ? `http://localhost/plethora_api/comments.php?id=${id}?visitorId=${user.id}`
          : `http://localhost/plethora_api/comments.php?id=${id}`;

        const response = await fetch(url);
        if (response.ok) {
          const stack = await response.json();
          setData(stack);
          setIsLiked(!!stack.is_liked_by_user);
          setAckCount(stack.likes_count + stack.comments_count);
        }
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStack();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return window.alert("You must be connected to acknowledge a signal.");
    
    setIsLiked(!isLiked);
    setAckCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      // NOTEEEEe: Target parent entry_id, NOT the comment id
      const method = !isLiked ? 'POST' : 'DELETE';
      const response = await fetch('http://localhost/plethora_api/likes.php', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, entryId: data.entry_id })
      });
      if (!response.ok) throw new Error("Database rejected signal.");
    } catch (error) {
      setIsLiked(!isLiked);
      setAckCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading || !data) return <main className="read-page"><div className="read-container" style={{ textAlign: 'center', color: '#596f62', paddingTop: '4rem' }}>Decrypting stack...</div></main>;

  return (
    <main className="read-page">
      <div className="read-container">
        
        {/* --- PARENT ENTRY --- */}
        <article className="original-story">
          <header className="story-header">
            {data.title && <h1 className="story-title">{data.title}</h1>}
            <h2 className="story-username">
              "<Link to={`/profile/${data.op_username}`} style={{ textDecoration: 'none' }}><span className="username-text">@{data.op_username}</span></Link>"
            </h2>
          </header>
          
          <div className="story-content">
            <p style={{ whiteSpace: 'pre-wrap' }}>{data.entry_content}</p>
          </div>

          <hr className="story-divider" />

          <div className="interaction-bar">
            <div className="interaction-buttons">
              <button className={`circular-action-btn like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button className="circular-action-btn comment-btn" onClick={() => navigate(`/reply/${data.entry_id}`)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </button>
            </div>
            <div className="interaction-stats">
              <span className="stat-text">{ackCount} Acknowledgement{ackCount !== 1 ? 's' : ''}</span>
              <span className="stat-dot">•</span>
              <span className="stat-text">{formatDate(data.entry_created_at)}</span>
            </div>
          </div>
        </article>

        {/* --- SPECIFIC RESPONSE --- */}
        <section className="replies-section">
          <h3 className="replies-heading">Response</h3>
          <div className="replies-grid">
            <ReplyCard 
              username={data.comment_username}
              opUsername={data.op_username}
              content={data.comment_content}
              timestamp={data.comment_created_at}
            />
          </div>
        </section>

      </div>
    </main>
  );
}