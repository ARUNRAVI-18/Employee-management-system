import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, UserX, Clock, UserPlus, Building, ArrowRight } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import employeeService from '../services/employeeService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getDashboardStats();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
      setError('Failed to connect to Django API backend. Ensure the backend server is running on http://127.0.0.1:8000.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Calculating real-time database statistics..." />;

  if (error) {
    return (
      <div className="page-container animate-fade-in">
        <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '0.75rem' }}>Backend Offline or Connection Error</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            {error}
          </p>
          <button className="btn btn-primary" onClick={fetchDashboardStats}>
            Retry API Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Executive HR Dashboard</h1>
          <p>Real-time analytics and workforce management overview</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/employees/add')}>
          <UserPlus size={18} /> Quick Add Employee
        </button>
      </div>

      {/* Dynamic Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <DashboardCard
          title="Total Employees"
          value={stats?.total_employees}
          icon={Users}
          color="indigo"
          subtitle="All registered records"
        />
        <DashboardCard
          title="Active Employees"
          value={stats?.active_employees}
          icon={UserCheck}
          color="emerald"
          subtitle="Currently working staff"
        />
        <DashboardCard
          title="Inactive Employees"
          value={stats?.inactive_employees}
          icon={UserX}
          color="rose"
          subtitle="Offboarded / inactive"
        />
        <DashboardCard
          title="Employees on Leave"
          value={stats?.on_leave_employees}
          icon={Clock}
          color="amber"
          subtitle="Temporary leave status"
        />
      </div>

      {/* Main Grid: Department Distribution & Recent Joiners */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        
        {/* Department Distribution Progress Bars */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building size={18} style={{ color: 'var(--accent-primary)' }} /> Workforce by Department
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {stats?.department_distribution?.length || 0} Depts
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats?.department_distribution && stats.department_distribution.length > 0 ? (
              stats.department_distribution.map((dept) => {
                const total = stats.total_employees || 1;
                const percentage = Math.round((dept.count / total) * 100);

                return (
                  <div key={dept.department}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 500, color: '#f8fafc' }}>{dept.department}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{dept.count} ({percentage}%)</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                        borderRadius: '4px',
                        transition: 'width 0.8s ease-out'
                      }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
                No department data available.
              </p>
            )}
          </div>
        </div>

        {/* Recent Employees List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} style={{ color: 'var(--accent-secondary)' }} /> Recent Joiners
            </h3>
            <button 
              onClick={() => navigate('/employees')} 
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats?.recent_employees && stats.recent_employees.length > 0 ? (
              stats.recent_employees.map((emp) => (
                <div 
                  key={emp.id}
                  onClick={() => navigate(`/employees/${emp.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>
                      {emp.first_name ? emp.first_name.charAt(0) : 'E'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}>
                        {emp.first_name} {emp.last_name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {emp.designation} • {emp.department}
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={emp.status} />
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
                No recent employees added.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
