import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import AlertModal from '../components/ui/AlertModal';
import './Share.css';
import './Auth.css'; 

export default function Share() {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const { id } = useParams(); // Detects if we are in "Edit Mode"

  const [modal, setModal] = useState({ isOpen: false, message: '', isConfirm: false, onConfirm: null });
  const showAlert = (msg) => setModal({ isOpen: true, message: msg, isConfirm: false });
  const showConfirm = (msg, action) => setModal({ isOpen: true, message: msg, isConfirm: true, onConfirm: action });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(!!id); // Only load if there is an ID

  // --- FETCH DRAFT DATA ---
  useEffect(() => {
    if (id && user) {
      const fetchDraft = async () => {
        try {
          const response = await fetch(`http://localhost/plethora_api/story.php?id=${id}&visitorId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            // Verify ownership before loading the text
            if (data.author_id === user.id || user.role === 'admin') {
              setTitle(data.title || '');
              setContent(data.content || '');
            } else {
              showAlert("You do not have clearance to edit this file.");
              navigate('/account');
            }
          }
        } catch (err) {
          console.error(err);
          showAlert("Failed to sync draft.");
        } finally {
          setIsLoadingDraft(false);
        }
      };
      fetchDraft();
    }
  }, [id, user, navigate]);

  const submitEntry = async (status) => {
    if (!content.trim()) {
      showAlert("You cannot upload an empty entry.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = id 
        ? 'http://localhost/plethora_api/update_entry.php' 
        : 'http://localhost/plethora_api/create_entry.php';

      const payload = {
        userId: user.id,
        title: title.trim(), 
        content: content.trim(),
        status: status 
      };
      
      if (id) payload.entryId = id; // Attach the ID so SQL knows what to update

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/account');
      } else {
        showAlert(`Transmission failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      showAlert("The diary is currently unresponsive.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    showConfirm("Permanently delete this signal? (Once it's gone, it's gone.)", async () => {
      if (id) {
        // If exists in the database, startdeletion
        try {
          await fetch('http://localhost/plethora_api/delete_entry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entryId: id, requesterId: user.id })
          });
          navigate('/account');
        } catch (e) {
          console.error(e);
          showAlert("Failed to erase signal.");
        }
      } else {
        setTitle('');
        setContent('');
      }
    });
  };

   // --- GUEST BLOCK ---
  if (!user) {
    return (
      <main className="share-page">
        <div className="modal-overlay">
          <div className="auth-card" style={{ width: '100%', maxWidth: '450px', margin: '0 1rem', position: 'relative' }}>
            
            <header className="auth-header" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', color: '#fff', fontWeight: 400 }}>
                Hello, stranger.
              </h2>
            </header>

            <div className="auth-form">
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                We would love for you to share your story. However, to maintain the integrity of the diary and protect our community, we require all authors to be connected to a profile.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-primary"
                >
                  Sign In
                </button>
                
                <button 
                  onClick={() => navigate(-1)} 
                  className="guest-link"
                >
                  Nevermind, continue as a guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isLoadingDraft) {
    return (
      <main className="share-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#596f62', fontFamily: 'Courier New' }}>Syncing draft...</div>
      </main>
    );
  }

  return (
    <main className="share-page">
      <div className="share-container">
        
        <header className="share-header">
          {/* Dynamically change the title based on mode */}
          <h1 className="share-title">{id ? 'Continue writing' : 'Share your story'}</h1>
          <h2 className="share-username">
            "<span className="username-text">@{user.username}</span>"
          </h2>
        </header>

        <div className="editor-wrapper">
          <input 
            type="text"
            className="story-title"
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck="false"
          />

          <textarea 
            className="story-editor"
            placeholder="Type out what feels right to you..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="action-bar">
          <button className="icon-btn delete-btn" onClick={handleClear} disabled={isSubmitting}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
            </svg>
          </button>

          <div className="primary-actions">
            <button className="btn-outline" onClick={() => submitEntry('draft')} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Draft'}
            </button>
            <button className="btn-solid" onClick={() => submitEntry('published')} disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

      </div>
      <AlertModal 
        isOpen={modal.isOpen} 
        message={modal.message} 
        isConfirm={modal.isConfirm}
        onConfirm={modal.onConfirm}
        onClose={() => setModal({ ...modal, isOpen: false })} 
      />
    </main>
  );
}