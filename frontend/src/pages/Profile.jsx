import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/ui/StoryCard'; 
import './Account.css'; 

const calculateTimeAgo = (timestamp) => {
  if (!timestamp) return 'Status unknown';
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Active right now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  return past.toLocaleDateString();
};

export default function Profile() {
  const { username } = useParams(); // Grabs username from URL
  const { user } = useAuth(); // visitor
  
  const [activeTab, setActiveTab] = useState('authored');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // If a logged-in user is visiting, attach their ID so hearts load correctly
        const url = user 
          ? `http://localhost:5000/api/profile/${username}?visitorId=${user.id}` 
          : `http://localhost:5000/api/profile/${username}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else if (response.status === 404) {
          setError("This node does not exist or has been disconnected.");
        } else {
          setError("Failed to sync with the grid.");
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Network error.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username, user]);

  if (isLoading) {
    return (
      <main className="account-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#596f62', fontFamily: 'Courier New' }}>Syncing with grid...</div>
      </main>
    );
  }

  if (error || !profileData) {
    return (
      <main className="account-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#dc2626', fontFamily: 'Courier New' }}>{error}</div>
      </main>
    );
  }

  const feeds = {
    authored: profileData.entries.map(entry => ({
      id: entry.id,
      username: profileData.profile.username,
      title: entry.title,
      excerpt: entry.content,
      initialIsLiked: !!entry.is_liked_by_user 
    })),
    liked: profileData.likes.map(like => ({
      id: like.id,
      username: 'unknown_node', 
      title: like.title,
      excerpt: like.content,
      initialIsLiked: false 
    })),
    commented: profileData.responses.map(res => ({
      id: res.id,
      username: profileData.profile.username,
      title: `Response to Entry #${res.entry_id}`,
      excerpt: res.content,
      initialIsLiked: false
    }))
  };

  const currentFeed = feeds[activeTab] || [];

  return (
    <main className="account-page">
      <header className="profile-header">
        <div className="profile-container">
          <div className="profile-readout">
            <h1 className="profile-username">@{profileData.profile.username}</h1>
            <div className="profile-status">
              <span 
                className="status-indicator" 
                style={{ 
                  backgroundColor: calculateTimeAgo(profileData.profile.last_active) === 'Active right now' ? '#91cc72' : '#596f62',
                  boxShadow: calculateTimeAgo(profileData.profile.last_active) === 'Active right now' ? '0 0 8px rgba(145, 204, 114, 0.5)' : 'none'
                }}
              ></span>
              <span className="status-text">
                {calculateTimeAgo(profileData.profile.last_active)}
              </span>
            </div>
          </div>
          {profileData.profile.quote && (
            <p className="profile-bio">"{profileData.profile.quote}"</p>
          )}
        </div>
      </header>

      <nav className="profile-tabs-wrapper">
        <div className="profile-tabs">
          <button className={`tab-btn ${activeTab === 'authored' ? 'active' : ''}`} onClick={() => setActiveTab('authored')}>
            Entries
          </button>
          <button className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`} onClick={() => setActiveTab('liked')}>
            Acknowledged
          </button>
          <button className={`tab-btn ${activeTab === 'commented' ? 'active' : ''}`} onClick={() => setActiveTab('commented')}>
            Responded
          </button>
        </div>
      </nav>

      <section className="account-feed">
        <div className="feed-grid">
          {currentFeed.length > 0 ? (
            currentFeed.map(post => (
              <StoryCard 
                key={post.id} 
                id={post.id}
                username={post.username}
                title={post.title}
                excerpt={post.excerpt} 
                initialIsLiked={post.initialIsLiked}
              />
            ))
          ) : (
            <div className="empty-state"><p>No data found in this directory.</p></div>
          )}
        </div>
      </section>
    </main>
  );
}