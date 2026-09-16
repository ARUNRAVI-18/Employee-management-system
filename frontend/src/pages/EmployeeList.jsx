import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LayoutGrid, List, RefreshCw } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCard from '../components/EmployeeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';
import employeeService from '../services/employeeService';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Search & Filter State
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    employment_type: '',
  });

  // Deletion Modal State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast Notification State
  const [notification, setNotification] = useState({ type: 'success', message: '' });

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployees(filters);
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employee list:', err);
      setNotification({
        type: 'error',
        message: 'Failed to load employees from API. Check backend connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      department: '',
      status: '',
      employment_type: '',
    });
  };

  const handleDeleteTrigger = (employee) => {
    setDeleteTarget(employee);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await employeeService.deleteEmployee(deleteTarget.id);
      setNotification({
        type: 'success',
        message: `Employee "${deleteTarget.first_name} ${deleteTarget.last_name}" (${deleteTarget.employee_id}) deleted successfully!`
      });
      setDeleteTarget(null);
      // Refresh list
      fetchEmployees();
    } catch (err) {
      console.error('Delete employee error:', err);
      setNotification({
        type: 'error',
        message: 'Failed to delete employee. Please try again.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Toast Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: 'success', message: '' })}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Employee Record"
        message={`Are you sure you want to permanently delete record for "${deleteTarget?.first_name} ${deleteTarget?.last_name}" (${deleteTarget?.employee_id})?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />

      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Employee Directory</h1>
          <p>Manage, search, and filter enterprise employee records ({employees.length} shown)</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* View Toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-secondary)',
            padding: '0.2rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'table' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem'
              }}
            >
              <List size={16} /> Table
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem'
              }}
            >
              <LayoutGrid size={16} /> Cards
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => navigate('/employees/add')}>
            <UserPlus size={18} /> Add Employee
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <SearchBar
          value={filters.search}
          onChange={(val) => handleFilterChange('search', val)}
          onClear={() => handleFilterChange('search', '')}
        />
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Content Area */}
      {loading ? (
        <LoadingSpinner message="Fetching employee directory..." />
      ) : viewMode === 'table' ? (
        <EmployeeTable
          employees={employees}
          onView={(id) => navigate(`/employees/${id}`)}
          onEdit={(id) => navigate(`/employees/edit/${id}`)}
          onDelete={handleDeleteTrigger}
        />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem'
        }}>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onView={(id) => navigate(`/employees/${id}`)}
                onEdit={(id) => navigate(`/employees/edit/${id}`)}
                onDelete={handleDeleteTrigger}
              />
            ))
          ) : (
            <div className="card empty-state" style={{ gridColumn: '1 / -1' }}>
              <div className="empty-state-icon">👥</div>
              <h3 style={{ color: '#f8fafc' }}>No Employees Match Filters</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try resetting your filter options.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
