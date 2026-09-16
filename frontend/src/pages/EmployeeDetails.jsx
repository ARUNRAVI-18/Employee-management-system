import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit3, Trash2, Mail, Phone, MapPin, 
  Calendar, DollarSign, Briefcase, User, Building, Clock
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';
import employeeService from '../services/employeeService';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState({ type: 'success', message: '' });

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployee(id);
      setEmployee(data);
    } catch (err) {
      console.error('Error loading employee profile:', err);
      setNotification({
        type: 'error',
        message: 'Employee record not found.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await employeeService.deleteEmployee(id);
      setNotification({
        type: 'success',
        message: `Employee record for "${employee.first_name} ${employee.last_name}" deleted.`
      });
      setTimeout(() => {
        navigate('/employees');
      }, 1000);
    } catch (err) {
      console.error('Failed to delete employee:', err);
      setNotification({
        type: 'error',
        message: 'Failed to delete employee. Server error.'
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading employee profile..." />;

  if (!employee) {
    return (
      <div className="page-container">
        <div className="card empty-state">
          <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Employee Profile Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/employees')}>
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: 'success', message: '' })}
      />

      <ConfirmDialog
        isOpen={showDeleteModal}
        title="Delete Employee"
        message={`Are you sure you want to delete profile for ${employee.first_name} ${employee.last_name} (${employee.employee_id})?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
        isDeleting={isDeleting}
      />

      {/* Top Header & Quick Actions */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Employee Profile</h1>
          <p>Detailed view of employee credentials, role, and contact history</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/employees')}>
            <ArrowLeft size={16} /> Back
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(`/employees/edit/${id}`)}>
            <Edit3 size={16} /> Edit Profile
          </button>
          <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {employee.profile_image_url ? (
            <img
              src={employee.profile_image_url}
              alt={employee.full_name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-primary)',
                boxShadow: 'var(--shadow-glow)'
              }}
            />
          ) : (
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '2.5rem',
              border: '3px solid var(--border-focus)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              {employee.first_name ? employee.first_name.charAt(0) : 'E'}
            </div>
          )}

          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#f8fafc', margin: 0 }}>
                {employee.first_name} {employee.last_name}
              </h2>
              <StatusBadge status={employee.status} />
            </div>

            <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
              {employee.designation} • {employee.department}
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <div>
                ID: <span style={{ fontFamily: 'monospace', color: 'var(--accent-primary)', fontWeight: 700 }}>{employee.employee_id}</span>
              </div>
              <div>Type: <span style={{ color: '#f8fafc', fontWeight: 500 }}>{employee.employment_type}</span></div>
              <div>Joined: <span style={{ color: '#f8fafc', fontWeight: 500 }}>{employee.joining_date}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Personal & Contact Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} /> Personal & Contact Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>{employee.email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Phone size={18} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone Number</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>{employee.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User size={18} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gender & Date of Birth</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>
                  {employee.gender || 'Not specified'} {employee.date_of_birth ? `(${employee.date_of_birth})` : ''}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MapPin size={18} style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Residential Address</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>
                  {employee.address || 'No address provided'}
                  {employee.city ? `, ${employee.city}` : ''}
                  {employee.state ? `, ${employee.state}` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job & Compensation Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={18} /> Job & Financial Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Building size={18} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Department & Role</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>
                  {employee.department} — {employee.designation}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DollarSign size={18} style={{ color: '#34d399' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Annual Base Salary</div>
                <div style={{ color: '#34d399', fontWeight: 700, fontSize: '1.1rem' }}>
                  ${parseFloat(employee.salary).toLocaleString()} / year
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={18} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Joining Date</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>{employee.joining_date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={18} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Record Audit Metadata</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Created: {employee.created_at?.split('T')[0] || 'N/A'} | Updated: {employee.updated_at?.split('T')[0] || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDetails;
