import React from "react";
import { Link } from 'react-router-dom'; 
import "../../pages/Discover.css";
import "./StoryCard.css";

export default function ResponseCard({ id, username, title, excerpt }) {
  return (
    <article className="story-card">
      <header className="card-header">
        <span className="card-username">@{username}</span>
      </header>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-excerpt">{excerpt}</p>
      </div>

      <footer className="card-footer" style={{ justifyContent: 'flex-end' }}>
        <Link to={`/comment/${id}`} className="read-more-btn">
          Read More
        </Link>
      </footer>
    </article>
  );
}