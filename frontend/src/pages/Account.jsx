import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/ui/StoryCard'; 
import ResponseCard from '../components/ui/ResponseCard';
import AlertModal from '../components/ui/AlertModal';
import './Account.css';
import './Auth.css';

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

export default function Account() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('authored');
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Settings Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteStage, setDeleteStage] = useState(0); 
  const [editForm, setEditForm] = useState({ username: '', email: '', quote: '', password: '' });

  // Alert Modal State
  const [modal, setModal] = useState({ isOpen: false, message: '', isConfirm: false, onConfirm: null, onCloseAction: null });

  const showAlert = (msg, onCloseAction = null) => {
    setModal({ isOpen: true, message: msg, isConfirm: false, onConfirm: null, onCloseAction });
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAccountData = async () => {
      try {
        const response = await fetch(`http://localhost/plethora_api/account.php?id=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
          setEditForm({
            username: data.profile.username,
            email: data.profile.email || '',
            quote: data.profile.quote || '',
            password: ''
          });
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
    logout();
    navigate('/'); 
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost/plethora_api/users.php?id=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (response.ok) {
        // Update global Context
        login({ ...user, username: editForm.username, email: editForm.email });
        
        // Dynamically update local profile data so don't have to hard-refresh
        setAccountData(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            username: editForm.username,
            quote: editForm.quote
          }
        }));

        setIsModalOpen(false);
        showAlert("Account info updated successfully.");
      } else {
        const data = await response.json();
        showAlert(data.error);
      }
    } catch (error) {
      console.error(error);
      showAlert("The diary is unresponsive.");
    }
  };

  const fetchAccountData = async () => {
      try {
        const response = await fetch(`http://localhost/plethora_api/account.php?id=${user.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setAccountData(data);
          setEditForm({
            username: data.profile.username,
            email: data.profile.email || '',
            quote: data.profile.quote || '',
            password: ''
          });
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

  if (isLoading || !accountData) return <div className="loading-state">Syncing with diary...</div>;

  const feeds = {
    authored: accountData.entries
      .filter(entry => entry.status === 'published')
      .map(entry => ({
        id: entry.id,
        username: accountData.profile.username,
        title: entry.title,
        excerpt: entry.content,
        initialIsLiked: !!entry.is_liked_by_user
      })),
    
    drafts: accountData.entries
      .filter(entry => entry.status === 'draft')
      .map(entry => ({
        id: entry.id,
        username: accountData.profile.username,
        title: entry.title || 'Untitled Draft',
        excerpt: entry.content,
        initialIsLiked: false
      })),
      
    liked: accountData.likes.map(like => ({
      id: like.id, username: 'unknown_node', title: like.title, excerpt: like.content, initialIsLiked: true
    })),
    
    commented: accountData.responses.map(res => ({
      id: res.id, username: accountData.profile.username, title: `Response to @${res.op_username}`, excerpt: res.content, initialIsLiked: false
    }))
  };

  const currentFeed = feeds[activeTab] || [];

  return (
    <main className="account-page">
      
      {/* --- SETTINGS MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="auth-card" style={{ width: '100%', maxWidth: '450px', margin: '0 1rem', position: 'relative' }}>
            
            {deleteStage === 0 ? (
              <>
                <header className="auth-header" style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', color: '#fff', fontWeight: 400 }}>
                    Account Settings
                  </h2>
                </header>

                <form onSubmit={handleUpdateProfile} className="auth-form">
                  <div className="input-group">
                    <label>Username</label>
                    <input 
                      type="text" 
                      value={editForm.username} 
                      onChange={e => setEditForm({...editForm, username: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={editForm.email} 
                      onChange={e => setEditForm({...editForm, email: e.target.value})} 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Quote</label>
                    <input 
                      type="text" 
                      value={editForm.quote} 
                      onChange={e => setEditForm({...editForm, quote: e.target.value})} 
                      maxLength={250} 
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      value={editForm.password} 
                      onChange={e => setEditForm({...editForm, password: e.target.value})} 
                      placeholder="Leave blank to keep current" 
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                    <button type="button" className="guest-link" onClick={() => setIsModalOpen(false)}>
                      Nevermind, Cancel
                    </button>
                  </div>
                </form>
                
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
                  <button 
                    onClick={() => setDeleteStage(1)} 
                    className="guest-link" 
                    style={{ color: '#dc2626' }}
                  >
                    Initiate Disconnect (Delete Profile)
                  </button>
                </div>
              </>
            ) : (
              <div className="delete-confirmation">
                <header className="auth-header" style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', color: '#dc2626', fontWeight: 400 }}>
                    Warning: Permanent Disconnect
                  </h2>
                </header>
                
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  Do you want to erase your entries from the diary, or leave them behind as an anonymous ghost?
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button 
                    onClick={() => executeDeletion(true)} 
                    className="btn-primary" 
                    style={{ background: 'transparent', border: '1px solid #9ca3af', color: '#9ca3af' }}
                  >
                    Leave entries (Become a Ghost)
                  </button>
                  
                  <button 
                    onClick={() => executeDeletion(false)} 
                    className="btn-primary" 
                    style={{ background: '#dc2626', borderColor: '#dc2626', color: '#fff' }}
                  >
                    Erase everything
                  </button>
                  
                  <button 
                    onClick={() => setDeleteStage(0)} 
                    className="guest-link" 
                    style={{ marginTop: '1rem' }}
                  >
                    Abort Disconnect
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- GLOBAL ALERT MODAL --- */}
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

      <header className="profile-header">
        <div className="profile-container">
          <div className="profile-readout">
            <h1 className="profile-username">@{accountData.profile.username}</h1>
            <div className="profile-status">
              <span className="status-indicator" style={{ backgroundColor: calculateTimeAgo(accountData.profile.last_active) === 'Active right now' ? '#91cc72' : '#596f62', boxShadow: calculateTimeAgo(accountData.profile.last_active) === 'Active right now' ? '0 0 8px rgba(145, 204, 114, 0.5)' : 'none' }}></span>
              <span className="status-text">{calculateTimeAgo(accountData.profile.last_active)}</span>
            </div>
          </div>
          
          <p className="profile-bio">"{accountData.profile.quote}"</p>

          <div className="profile-buttons">
            <button onClick={() => setIsModalOpen(true)} className="btn-action">Edit Profile</button>
            <button onClick={handleSignOut} className="btn-action">Disconnect</button>
          </div>
        </div>
      </header>

      <nav className="profile-tabs-wrapper">
        <div className="profile-tabs">
          <button className={`tab-btn ${activeTab === 'authored' ? 'active' : ''}`} onClick={() => setActiveTab('authored')}>Entries</button>
          <button className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`} onClick={() => setActiveTab('liked')}>Acknowledged</button>
          <button className={`tab-btn ${activeTab === 'commented' ? 'active' : ''}`} onClick={() => setActiveTab('commented')}>Responded</button>
          <button className={`tab-btn ${activeTab === 'drafts' ? 'active' : ''}`} onClick={() => setActiveTab('drafts')}>Drafts</button>
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
                  isDraft={activeTab === 'drafts'} 
                />
              )
            ))
          ) : (
            <div className="empty-state"><p>No data found in this directory.</p></div>
          )}
        </div>
      </section>
    </main>
  );
}