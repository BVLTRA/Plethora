import React from "react";
import { Link } from 'react-router-dom'; 
import "../../pages/Discover.css";
import "./StoryCard.css";

export default function StoryCard({ id, username, title, excerpt }) {
  return (
    <article className="story-card">
      <header className="card-header">
        <span className="card-username">@{username}</span>
      </header>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-excerpt">{excerpt}</p>
      </div>

      <footer className="card-footer">
        <div className="card-actions">
          <button className="icon-btn like-btn" aria-label="Like">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="icon-btn comment-btn" aria-label="Comment">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>
        <Link to={`/story/${id}`} className="read-more-btn">
          Read More
        </Link>
      </footer>
    </article>
  );
}
