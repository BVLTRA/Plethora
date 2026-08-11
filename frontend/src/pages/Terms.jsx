import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

export default function Terms() {
  return (
    <main className="terms-page">
      
      {/* Pinned Logo */}
      <header className="terms-header">
        <Link to="/" className="brand-logo">
          <svg className="brand-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 15 5 15 9C15 13 12 16 12 16C12 16 9 13 9 9C9 5 12 2 12 2Z" opacity="0.6"/>
            <path d="M12 16C12 16 16 14 18 10C20 6 20 4 20 4C20 4 17 4 14 6C11 8 12 16 12 16Z" opacity="0.8"/>
            <path d="M12 16C12 16 8 14 6 10C4 6 4 4 4 4C4 4 7 4 10 6C13 8 12 16 12 16Z" opacity="0.8"/>
          </svg>
          <span className="brand-text">Plethora</span>
        </Link>
      </header>

      {/* The Central Reading Column */}
      <div className="terms-content-wrapper">
        <article className="terms-document">
          
          <h1 className="terms-title">Terms of Use</h1>
          <p className="terms-date">Last updated: August 11, 2026</p>

          <div className="terms-body">
            <section>
              <h2>1. The Void's Architecture</h2>
              <p>[Paste your first block of rough terms here...]</p>
            </section>

            <section>
              <h2>2. Data & Anonymity</h2>
              <p>[Paste your second block of rough terms here...]</p>
            </section>
            
            <section>
              <h2>3. Acceptable Signal</h2>
              <p>[Paste your third block of rough terms here...]</p>
            </section>
          </div>

        </article>
      </div>

    </main>
  );
}