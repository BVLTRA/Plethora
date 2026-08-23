import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/ui/StoryCard'; 
import './Account.css';

    { id: 201, username: 'signal_noise', title: 'Muscle Memory', excerpt: 'It’s been four months since the last text, but opening our chat is still pure muscle memory at this point.' },
    { id: 202, username: 'ghost_variable', title: 'Corporate Scripts', excerpt: 'If I have to hear "let\'s circle back" or "synergize" one more time today, I\'m going to lose my mind.' }
  ],
  commented: [
    { id: 301, username: 'buffer_underrun', title: 'Dopamine Deficit', excerpt: 'I literally can’t watch a ten-minute video anymore without opening three other tabs or picking up my phone.' }
  ]
};
export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('authored');
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Security: Send unauthenticated traffic back to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAccountData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/account/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
        } else {
          console.error("Failed to fetch account data");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [user, navigate]);

  const handleSignOut = () => {
    logout(); // Sever the Context and wipe local storage
    navigate('/'); // Route back to the main grid
  };

  if (isLoading || !accountData) {
    return (
      <main className="account-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#596f62', fontFamily: 'Courier New' }}>Syncing with grid...</div>
      </main>
    );
  }

  // Format the raw SQL arrays to match StoryCard props
  const feeds = {
    authored: accountData.entries.map(entry => ({
      id: entry.id,
      username: accountData.profile.username,
      title: entry.title,
      excerpt: entry.content
    })),
    liked: accountData.likes.map(like => ({
      id: like.id,
      username: 'unknown_node', // for now, since i don't have the username of the liked entry's author
      title: like.title,
      excerpt: like.content
    })),
    commented: accountData.responses.map(res => ({
      id: res.id,
      username: accountData.profile.username,
      title: `Response to Entry #${res.entry_id}`,
      excerpt: res.content
    }))
  };

  const currentFeed = feeds[activeTab] || [];

  return (
    <main className="account-page">
      
      {/* Profile Header Readout */}
      <header className="profile-header">
        <div className="profile-container">
          <div className="profile-readout">
            <h1 className="profile-username">@{accountData.profile.username}</h1>
            <div className="profile-status">
              <span className="status-indicator"></span>
              <span className="status-text">Status: Connected</span>
            </div>
          </div>
          
          <p className="profile-bio">"Just trying to keep the buffer from overflowing. 99% static, 1% signal."</p>

          <button onClick={handleSignOut} className="btn-disconnect">
            Disconnect Node
          </button>
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

      {/* Grid Feed */}
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