import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '65vh',
      textAlign: 'center'
    }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '3rem 2rem' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem'
        }}>
          <AlertCircle size={36} />
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#f8fafc' }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Oops! The page or resource you are looking for does not exist or has been relocated.
        </p>

        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <Home size={16} /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
