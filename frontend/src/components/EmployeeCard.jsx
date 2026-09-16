import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, Calendar, Building, DollarSign } from 'lucide-react';
import StatusBadge from './StatusBadge';

const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
  return (
    <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {employee.profile_image_url ? (
            <img
              src={employee.profile_image_url}
              alt={employee.full_name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-focus)' }}
            />
          ) : (
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1rem',
              border: '1px solid var(--border-color)'
            }}>
              {employee.first_name ? employee.first_name.charAt(0).toUpperCase() : 'E'}
              {employee.last_name ? employee.last_name.charAt(0).toUpperCase() : ''}
            </div>
          )}

          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', margin: 0 }}>
              {employee.first_name} {employee.last_name}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.1rem 0 0' }}>
              {employee.designation}
            </p>
          </div>
        </div>

        <StatusBadge status={employee.status} />
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>ID:</span>
          <span style={{ fontFamily: 'monospace', color: 'var(--accent-primary)', fontWeight: 600 }}>{employee.employee_id}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Department:</span>
          <span style={{ fontWeight: 500 }}>{employee.department}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Type:</span>
          <span>{employee.employment_type}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Salary:</span>
          <span style={{ color: '#34d399', fontWeight: 600 }}>${parseFloat(employee.salary).toLocaleString()}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => onView(employee.id)}>
          <Eye size={15} /> View
        </button>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => onEdit(employee.id)}>
          <Edit3 size={15} /> Edit
        </button>
        <button className="btn btn-danger btn-icon" onClick={() => onDelete(employee)}>
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
