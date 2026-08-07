import React, { useState } from 'react';
import StoryCard from '../components/ui/StoryCard'; // Reusing the card component from Discover
import './Account.css';

// System-level dummy data
const USER_DATA = {
  username: 'unfiltered_node',
  bio: 'Just trying to keep the buffer from overflowing. 99% static, 1% signal.',
  lastActive: '14 minutes ago'
};

const DUMMY_POSTS = {
  authored: [
    { id: 101, username: 'unfiltered_node', title: 'Tactical Empathy', excerpt: 'Sometimes I express a frustration and people instantly jump into fix-it mode... I just wanted to say out loud that something sucks.' },
    { id: 102, username: 'unfiltered_node', title: 'Blueprint Fatigue', excerpt: 'I have about twenty different ideas for things I want to build and zero energy to actually execute any of them.' }
  ],
  liked: [
    { id: 201, username: 'signal_noise', title: 'Muscle Memory', excerpt: 'It’s been four months since the last text, but opening our chat is still pure muscle memory at this point.' },
    { id: 202, username: 'ghost_variable', title: 'Corporate Scripts', excerpt: 'If I have to hear "let\'s circle back" or "synergize" one more time today, I\'m going to lose my mind.' }
  ],
  commented: [
    { id: 301, username: 'buffer_underrun', title: 'Dopamine Deficit', excerpt: 'I literally can’t watch a ten-minute video anymore without opening three other tabs or picking up my phone.' }
  ]
};

export default function Account() {
  const [activeTab, setActiveTab] = useState('authored');

  // select the dataset based on the active tab
  const currentFeed = DUMMY_POSTS[activeTab];

  return (
    <main className="account-page">
      
      {/* Profile Header Readout */}
      <header className="profile-header">
        <div className="profile-container">
          <div className="profile-readout">
            <h1 className="profile-username">@{USER_DATA.username}</h1>
            <div className="profile-status">
              <span className="status-indicator"></span>
              <span className="status-text">Last active: {USER_DATA.lastActive}</span>
            </div>
          </div>
          <p className="profile-bio">{USER_DATA.bio}</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="profile-tabs-wrapper">
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'authored' ? 'active' : ''}`}
            onClick={() => setActiveTab('authored')}
          >
            Entries
          </button>
          <button 
            className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            Acknowledged
          </button>
          <button 
            className={`tab-btn ${activeTab === 'commented' ? 'active' : ''}`}
            onClick={() => setActiveTab('commented')}
          >
            Responded
          </button>
        </div>
      </nav>

      {/* The Grid Feed */}
      <section className="account-feed">
        <div className="feed-grid">
          {currentFeed.length > 0 ? (
            currentFeed.map(post => (
              <StoryCard 
                key={post.id} 
                username={post.username}
                title={post.title}
                excerpt={post.excerpt} 
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No data found in this directory.</p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}