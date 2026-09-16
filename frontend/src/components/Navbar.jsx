import React from 'react';
import { Menu, Bell, Search, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 800,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          className="mobile-toggle-btn"
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Menu size={22} />
        </button>

        <div 
          onClick={() => navigate('/employees')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'var(--bg-primary)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}
        >
          <Search size={16} />
          <span>Search employee records...</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(16, 185, 129, 0.12)',
          color: '#10b981',
          fontSize: '0.8rem',
          fontWeight: 600,
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <ShieldCheck size={15} />
          <span>API Connected</span>
        </div>

        <button 
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '50%'
          }}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
