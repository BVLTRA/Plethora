import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './ReadStory.css';

export default function ReadStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  // for now
  const handleLike = () => {
    console.log("Acknowledge signal");
  };

  const handleCommentClick = () => {
    // will trigger the reply route later
    console.log("Open reply interface");
  };

  return (
    <main className="read-page">
      <div className="read-container">
        
        {/* --- ORIGINAL ENTRY --- */}
        <article className="original-story">
          <header className="story-header">
            <h1 className="story-title">Muscle Memory</h1>
            <h2 className="story-username">
              "<span className="username-text">@signal_noise</span>"
            </h2>
          </header>
          
          <div className="story-content">
            <p>
              It’s been four months since the last text, but opening our chat is still pure muscle memory at this point. <br /> <br />
              I’ll be sitting at my desk, tab over to my phone without even realizing I’m doing it, and there it is—same dead end, same last-seen timestamp from a lifetime ago.
              I don't even want to reach out anymore. I just want my hands to forget the route.
            </p>
          </div>

          <hr className="story-divider" />

          {/* --- INTERACTION & STATS --- */}
          <div className="interaction-bar">
            
            <div className="interaction-buttons">
              <button className="circular-action-btn like-btn" onClick={handleLike} aria-label="Like">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <span className="stat-text">14 Acknowledgements</span>
              <span className="stat-dot">•</span>
              <span className="stat-text">Oct 24, 2026</span>
            </div>

          </div>
        </article>

        {/* --- RESPONSES --- */}
        <section className="replies-section">
          <h3 className="replies-heading">Responses</h3>
          
          <div className="replies-grid">
            {/* Future comment components will map out here */}
            <div className="empty-replies">
              <p>No signals detected yet.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}