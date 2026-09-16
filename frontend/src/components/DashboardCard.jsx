import React from 'react';

const DashboardCard = ({ title, value, icon: Icon, color = 'indigo', subtitle }) => {
  const colorMap = {
    indigo: {
      bg: 'rgba(99, 102, 241, 0.12)',
      text: '#818cf8',
      border: 'rgba(99, 102, 241, 0.25)',
    },
    emerald: {
      bg: 'rgba(16, 185, 129, 0.12)',
      text: '#34d399',
      border: 'rgba(16, 185, 129, 0.25)',
    },
    rose: {
      bg: 'rgba(239, 68, 68, 0.12)',
      text: '#f87171',
      border: 'rgba(239, 68, 68, 0.25)',
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.12)',
      text: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.25)',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="card animate-fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.25rem' }}>
          {title}
        </p>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
          {value !== undefined && value !== null ? value : 0}
        </h2>
        {subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '0.35rem' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: scheme.bg,
        color: scheme.text,
        border: `1px solid ${scheme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 15px ${scheme.bg}`
      }}>
        {Icon && <Icon size={26} />}
      </div>
    </div>
  );
};

export default DashboardCard;
