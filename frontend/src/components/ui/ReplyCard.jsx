import React, { useState } from 'react';
import './ReplyCard.css';

export default function ReplyCard({ username, opUsername, content, timestamp }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
  };

  return (
    <>
      {/* --- COMPACT FEED CARD --- */}
      <article className="reply-card" onClick={() => setIsOpen(true)}>
        <header className="reply-header">
          <span className="reply-username">@{username}</span>
          <span className="reply-date">{formatDate(timestamp)}</span>
        </header>
        {/* CSS line-clamp handles preview truncation */}
        <p className="reply-preview">{content}</p>
      </article>

      {/* --- FULL READING MODAL --- */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          {/* e.stopPropagation() prevents clicking the card from accidentally closing the overlay */}
          <div className="reply-modal" onClick={(e) => e.stopPropagation()}>
            
            <header className="reply-modal-header">
              <div className="reply-meta">
                <span className="reply-username">@{username}</span>
                <span className="reply-context">Replying to @{opUsername}</span>
              </div>
              <span className="reply-date">{formatDate(timestamp)}</span>
            </header>
            
            <div className="reply-modal-body">
              <p>{content}</p>
            </div>
            
            <button className="btn-outline close-reply-btn" onClick={() => setIsOpen(false)}>
              Close Response
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}