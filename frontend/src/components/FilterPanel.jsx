import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const DEPARTMENTS = [
  'Human Resources',
  'Finance',
  'IT',
  'Software Development',
  'Marketing',
  'Sales',
  'Operations',
  'Customer Support',
  'Administration',
];

const EMPLOYMENT_TYPES = [
  'Full Time',
  'Part Time',
  'Contract',
  'Intern',
];

const STATUSES = [
  'Active',
  'Inactive',
  'On Leave',
];

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const hasActiveFilters = filters.department || filters.status || filters.employment_type || filters.search;

  return (
    <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
          <Filter size={16} style={{ color: 'var(--accent-primary)' }} />
          <span>Filter Employee Records</span>
        </div>

        {hasActiveFilters && (
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={onReset}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            <RotateCcw size={14} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {/* Department Filter */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>
            Department
          </label>
          <select
            className="form-select"
            value={filters.department || ''}
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>
            Status
          </label>
          <select
            className="form-select"
            value={filters.status || ''}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Employment Type Filter */}
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>
            Employment Type
          </label>
          <select
            className="form-select"
            value={filters.employment_type || ''}
            onChange={(e) => onFilterChange('employment_type', e.target.value)}
          >
            <option value="">All Employment Types</option>
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
