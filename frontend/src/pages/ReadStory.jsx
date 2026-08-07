import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './ReadStory.css';

export default function ReadStory() {
  const { id } = useParams();
  const [reply, setReply] = useState('');

  const handleClear = () => {
    if (window.confirm("Delete this draft?")) {
      setReply('');
    }
  };

  return (
    <main className="read-page">
      <div className="read-container">
        
        {/* Section 1: The Original Transmission */}
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
        </article>

        {/* Reply Editor (I might do womething about the fade... but i kind like it) */}
        <div className="reply-section">
          <div className="editor-wrapper">
            <textarea 
              className="story-editor"
              placeholder="Add your resonance..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div className="action-bar">
            <button 
              className="icon-btn delete-btn" 
              onClick={handleClear}
              aria-label="Delete draft"
              title="Delete draft"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
              </svg>
            </button>

            <div className="primary-actions">
              <button className="btn-outline">Draft & Return</button>
              <button className="btn-solid">Send Reply</button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}