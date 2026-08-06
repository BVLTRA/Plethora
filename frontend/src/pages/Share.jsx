import React, { useState } from 'react';
import './Share.css';

export default function Share() {
  const [content, setContent] = useState('');

  // TEMP STATE HANDLER:
  const handleClear = () => {
    if (window.confirm("Delete this draft?")) {
      setContent('');
    }
  };

  return (
    <main className="share-page">
      <div className="share-container">
        
        {/* Header Section */}
        <header className="share-header">
          <h1 className="share-title">Share your story</h1>
          <h2 className="share-username">
            "<span className="username-text">@unfiltered_node</span>"
          </h2>
        </header>

        {/* Editor Section */}
        <div className="editor-wrapper">
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
            aria-label="Delete draft"
            title="Delete draft"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
          </button>

          <div className="primary-actions">
            <button className="btn-outline">Draft & Return</button>
            <button className="btn-solid">Upload</button>
          </div>
        </div>

      </div>
    </main>
  );
}