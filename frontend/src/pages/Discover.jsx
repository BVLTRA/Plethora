import React, { useState, useEffect } from 'react';
import StoryCard from '../components/ui/StoryCard';
import { WovenLightHero } from '../components/ui/woven-light-hero'; 
import './Discover.css';

export default function Discover() {
  // Memory for live database feed
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch feed from backend as soon as page loads
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/discover');
        if (response.ok) {
          const data = await response.json();
          setFeed(data);
        } else {
          console.error("Failed to sync with the grid.");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <main className="discover-page">
      
      {/* Hero: Image and fade to black funk only */}
      {/* Note: Try to remember what you meant by "funk" */}
      <section className="discover-hero">
        <div className="hero-content">
          <div className="hero-text-block">
            <h2 className="hero-subtitle">Plethora Diary</h2>
            <h1 className="hero-title">Help, Share & Connect.</h1>
          </div>
        </div>
      </section>

      {/* "Void" section: Solid black section for the cards */}
      <section className="discover-feed">
        <div className="feed-grid">
          {isLoading ? (
            <div style={{ color: '#596f62', fontFamily: 'Courier New', gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
              Receiving entiries...
            </div>
          ) : feed.length > 0 ? (
            feed.map(post => (
              <StoryCard 
                key={post.id} 
                username={post.username}
                title={post.title}
                excerpt={post.content} 
              />
            ))
          ) : (
            <div style={{ color: '#596f62', fontFamily: 'Courier New', gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
              The diary is completely silent.
            </div>
          )}
        </div>
      </section>

    </main>
  );
}