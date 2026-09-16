import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Notification = ({ type = 'success', message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      background: isSuccess ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)',
      color: '#ffffff',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      maxWidth: '400px',
      animation: 'fadeIn 0.3s ease-out',
    }}>
      {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '0.2rem',
          opacity: 0.8
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;
