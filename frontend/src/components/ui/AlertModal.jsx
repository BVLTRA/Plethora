import React from 'react';
import '../../pages/Auth.css';

export default function AlertModal({ isOpen, message, isConfirm, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="auth-card" style={{ width: '100%', maxWidth: '400px', margin: '0 1rem', textAlign: 'center' }}>
        <header className="auth-header" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.25rem', color: '#fff', fontWeight: 400 }}>
            {isConfirm ? "Confirmation Required" : "System Alert"}
          </h2>
        </header>

        <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          {message}
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isConfirm ? (
            <>
              <button onClick={() => { onConfirm(); onClose(); }} className="btn-primary" style={{ background: '#9c3a3a', borderColor: '#d8b9b9', color: '#fff' }}>
                Proceed
              </button>
              <button onClick={onClose} className="guest-link">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={onClose} className="btn-primary">
              Understood
            </button>
          )}
        </div>
      </div>
    </div>
  );
}