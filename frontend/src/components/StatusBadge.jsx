import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusClass = (statusStr) => {
    if (!statusStr) return 'active';
    const s = statusStr.toLowerCase().replace(' ', '-');
    if (s === 'active') return 'active';
    if (s === 'inactive') return 'inactive';
    if (s === 'on-leave' || s === 'on_leave') return 'on-leave';
    return 'active';
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'currentColor'
      }}></span>
      {status || 'Active'}
    </span>
  );
};

export default StatusBadge;
