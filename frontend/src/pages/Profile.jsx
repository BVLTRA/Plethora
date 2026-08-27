import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/ui/StoryCard'; 
import ResponseCard from '../components/ui/ResponseCard';
import AlertModal from '../components/ui/AlertModal';
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
  const { username } = useParams(); 
  const { user } = useAuth(); 
  const navigate = useNavigate(); 
  
  const [activeTab, setActiveTab] = useState('authored');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom Alert Modal State
  const [modal, setModal] = useState({ isOpen: false, message: '', isConfirm: false, onConfirm: null, onCloseAction: null });

  const showAlert = (msg, onCloseAction = null) => {
    setModal({ isOpen: true, message: msg, isConfirm: false, onConfirm: null, onCloseAction });
  };
  
  const showConfirm = (msg, action) => {
    setModal({ isOpen: true, message: msg, isConfirm: true, onConfirm: action, onCloseAction: null });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const url = user 
          ? `http://localhost/plethora_api/profile.php?username=${username}&visitorId=${user.id}` 
          : `http://localhost/plethora_api/profile.php?username=${username}`;

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

  const wipeProfile = (targetId) => {

    showConfirm(
      "ADMIN WARNING: Are you sure you want to completely erase this user and all their signals? This cannot be undone.",
      async () => {
        try {
          const response = await fetch(`http://localhost/plethora_api/users.php?id=${targetId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keepEntries: false }) 
          });

          if (response.ok) {
            showAlert("Node terminated.", () => navigate('/discover'));
          } else {
            showAlert("Failed to terminate node.");
          }
        } catch (error) {
          console.error("Termination error:", error);
          showAlert("The grid is currently unresponsive.");
        }
      }
    );
  };

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
      title: `Response to @${res.op_username}`, 
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
            
            {/* Admin Terminate Button */}
            {user?.role === 'admin' && (
              <button 
                onClick={() => wipeProfile(profileData.profile.id)}
                className="btn-action" 
                style={{ borderColor: '#dc2626', color: '#dc2626', marginLeft: '1rem' }}
              >
                Terminate Node
              </button>
            )}

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
              activeTab === 'commented' ? (
                <ResponseCard 
                  key={post.id} 
                  id={post.id} 
                  username={post.username} 
                  title={post.title} 
                  excerpt={post.excerpt} 
                />
              ) : (
                <StoryCard 
                  key={post.id} 
                  id={post.id}
                  username={post.username}
                  title={post.title}
                  excerpt={post.excerpt} 
                  initialIsLiked={post.initialIsLiked}
                />
              )
            ))
          ) : (
            <div className="empty-state"><p>No data found in this directory.</p></div>
          )}
        </div>
      </section>

      {/* --- GLOBAL ALERT MODAL INSTANCE --- */}
      <AlertModal 
        isOpen={modal.isOpen} 
        message={modal.message} 
        isConfirm={modal.isConfirm}
        onConfirm={modal.onConfirm}
        onClose={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.onCloseAction) modal.onCloseAction();
        }} 
      />
    </main>
  );
}