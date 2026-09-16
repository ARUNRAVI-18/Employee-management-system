import React from 'react';
import { Eye, Edit3, Trash2, Calendar, Mail, Phone, Building } from 'lucide-react';
import StatusBadge from './StatusBadge';

const EmployeeTable = ({ employees, onView, onEdit, onDelete }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-state-icon">👥</div>
        <h3 style={{ marginBottom: '0.5rem', color: '#f8fafc' }}>No Employees Found</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          No employee records match your search or filter criteria. Try adjusting your query or clear filters.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Department & Designation</th>
            <th>Employment Type</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              {/* Employee ID */}
              <td>
                <span style={{
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  color: 'var(--accent-primary)',
                  backgroundColor: 'var(--accent-light)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-focus)'
                }}>
                  {emp.employee_id}
                </span>
              </td>

              {/* Name & Avatar */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {emp.profile_image_url ? (
                    <img 
                      src={emp.profile_image_url} 
                      alt={emp.full_name} 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--border-focus)'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-color)'
                    }}>
                      {emp.first_name ? emp.first_name.charAt(0).toUpperCase() : 'E'}
                      {emp.last_name ? emp.last_name.charAt(0).toUpperCase() : ''}
                    </div>
                  )}

                  <div>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>
                      {emp.first_name} {emp.last_name}
                    </div>
                    {emp.gender && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {emp.gender}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Contact */}
              <td>
                <div style={{ fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)' }}>
                    <Mail size={13} style={{ color: 'var(--text-muted)' }} />
                    <span>{emp.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    <Phone size={13} />
                    <span>{emp.phone}</span>
                  </div>
                </div>
              </td>

              {/* Dept & Designation */}
              <td>
                <div style={{ fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building size={13} style={{ color: 'var(--accent-secondary)' }} />
                    <span>{emp.department}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                    {emp.designation}
                  </div>
                </div>
              </td>

              {/* Employment Type */}
              <td>
                <span style={{
                  fontSize: '0.8rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                  border: '1px solid var(--border-color)'
                }}>
                  {emp.employment_type}
                </span>
              </td>

              {/* Joining Date */}
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <Calendar size={13} />
                  <span>{emp.joining_date}</span>
                </div>
              </td>

              {/* Status */}
              <td>
                <StatusBadge status={emp.status} />
              </td>

              {/* Actions */}
              <td style={{ textAlign: 'right' }}>
                <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                  <button
                    className="btn btn-outline btn-icon"
                    onClick={() => onView(emp.id)}
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn btn-secondary btn-icon"
                    onClick={() => onEdit(emp.id)}
                    title="Edit Employee"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="btn btn-danger btn-icon"
                    onClick={() => onDelete(emp)}
                    title="Delete Employee"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
