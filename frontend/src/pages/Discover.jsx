import React from 'react';
import StoryCard from '../components/ui/StoryCard';
import './Discover.css';
import { WovenLightHero } from '../components/ui/woven-light-hero';

// Generated dummy data 
const DUMMY_POSTS = [
  {
    id: 1,
    username: 'signal_noise',
    title: 'Muscle Memory',
    excerpt: 'It’s been four months since the last text, but opening our chat is still pure muscle memory at this point. I’ll be sitting at my desk, tab over to my phone without even realizing I’m doing it.'
  },
  {
    id: 2,
    username: 'buffer_underrun',
    title: 'Dopamine Deficit',
    excerpt: 'I literally can’t watch a ten-minute video anymore without opening three other tabs or picking up my phone. My brain expects a fresh hit every four seconds.'
  },
  {
    id: 3,
    username: 'ghost_variable',
    title: 'Corporate Scripts',
    excerpt: 'If I have to hear "let\'s circle back" or "synergize" one more time today, I\'m going to lose my mind. It feels like everyone is performing a script instead of speaking like normal humans.'
  },
  {
    id: 4,
    username: 'null_pointer',
    title: 'Static Friction',
    excerpt: 'There is a very specific type of exhaustion that comes from doing absolutely nothing all day. It’s like a heavy, static friction that builds up in your chest until moving feels impossible.'
  }
];

export default function Discover() {
  return (
    <main className="discover-page">
      
      {/* Hero: Image and fade to black funk only */}
      {/* Note: Try to remember what you ment by "funk" */}
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
          {DUMMY_POSTS.map(post => (
            <StoryCard 
              key={post.id} 
              username={post.username}
              title={post.title}
              excerpt={post.excerpt} 
            />
          ))}
        </div>
      </section>

    </main>
  );
}