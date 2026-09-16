import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Camera, Save, RotateCcw, XCircle, DollarSign } from 'lucide-react';

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

const DESIGNATIONS = [
  'Manager',
  'Team Lead',
  'Senior Developer',
  'Developer',
  'Junior Developer',
  'HR Executive',
  'Accountant',
  'Marketing Executive',
  'Sales Executive',
  'Support Executive',
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

const GENDERS = [
  'Male',
  'Female',
  'Other',
];

const EmployeeForm = ({ initialData, onSubmit, onCancel, isSubmitting = false, isEditMode = false, backendErrors = {} }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: 'Male',
    date_of_birth: '',
    department: '',
    designation: '',
    joining_date: '',
    employment_type: 'Full Time',
    salary: '',
    address: '',
    city: '',
    state: '',
    status: 'Active',
    profile_image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        employee_id: initialData.employee_id || '',
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        gender: initialData.gender || 'Male',
        date_of_birth: initialData.date_of_birth || '',
        department: initialData.department || '',
        designation: initialData.designation || '',
        joining_date: initialData.joining_date || '',
        employment_type: initialData.employment_type || 'Full Time',
        salary: initialData.salary !== undefined ? initialData.salary : '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        status: initialData.status || 'Active',
        profile_image: null,
      });

      if (initialData.profile_image_url) {
        setImagePreview(initialData.profile_image_url);
      }
    }
  }, [initialData]);

  // Combine backend errors if any
  useEffect(() => {
    if (backendErrors && Object.keys(backendErrors).length > 0) {
      const formatted = {};
      Object.keys(backendErrors).forEach((key) => {
        formatted[key] = Array.isArray(backendErrors[key]) ? backendErrors[key][0] : backendErrors[key];
      });
      setErrors((prev) => ({ ...prev, ...formatted }));
    }
  }, [backendErrors]);

  const validateField = (name, value) => {
    let err = '';
    switch (name) {
      case 'first_name':
        if (!value || value.trim() === '') err = 'First name is required.';
        else if (value.trim().length < 2) err = 'First name must be at least 2 characters.';
        break;
      case 'last_name':
        if (!value || value.trim() === '') err = 'Last name is required.';
        break;
      case 'employee_id':
        if (!value || value.trim() === '') err = 'Employee ID is required.';
        break;
      case 'email':
        if (!value || value.trim() === '') err = 'Email address is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = 'Enter a valid email address.';
        break;
      case 'phone':
        if (!value || value.trim() === '') err = 'Phone number is required.';
        break;
      case 'department':
        if (!value) err = 'Please select a department.';
        break;
      case 'designation':
        if (!value) err = 'Please select a designation.';
        break;
      case 'joining_date':
        if (!value) err = 'Joining date is required.';
        break;
      case 'salary':
        if (value === '' || value === null) err = 'Salary is required.';
        else if (isNaN(value) || parseFloat(value) <= 0) err = 'Salary must be a positive number greater than 0.';
        break;
      default:
        break;
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = [
      'first_name',
      'last_name',
      'employee_id',
      'email',
      'phone',
      'department',
      'designation',
      'joining_date',
      'salary'
    ];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build payload / FormData
    const dataPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'profile_image') {
        if (formData.profile_image instanceof File) {
          dataPayload.append('profile_image', formData.profile_image);
        }
      } else if (formData[key] !== null && formData[key] !== undefined) {
        dataPayload.append(key, formData[key]);
      }
    });

    onSubmit(dataPayload);
  };

  const handleReset = () => {
    if (initialData) {
      setFormData({
        employee_id: initialData.employee_id || '',
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        gender: initialData.gender || 'Male',
        date_of_birth: initialData.date_of_birth || '',
        department: initialData.department || '',
        designation: initialData.designation || '',
        joining_date: initialData.joining_date || '',
        employment_type: initialData.employment_type || 'Full Time',
        salary: initialData.salary !== undefined ? initialData.salary : '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        status: initialData.status || 'Active',
        profile_image: null,
      });
      setImagePreview(initialData.profile_image_url || null);
    } else {
      setFormData({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: 'Male',
        date_of_birth: '',
        department: '',
        designation: '',
        joining_date: '',
        employment_type: 'Full Time',
        salary: '',
        address: '',
        city: '',
        state: '',
        status: 'Active',
        profile_image: null,
      });
      setImagePreview(null);
    }
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
          <User size={18} /> 1. Personal Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
              value={formData.first_name}
              onChange={handleChange}
              placeholder="e.g. John"
            />
            {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
              value={formData.last_name}
              onChange={handleChange}
              placeholder="e.g. Doe"
            />
            {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="form-control"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: CONTACT INFORMATION */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)' }}>
          <Mail size={18} /> 2. Contact Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john.doe@company.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="phone"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 123-4567"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
            />
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>

          <div className="form-group">
            <label className="form-label">State / Province</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: JOB INFORMATION */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-success)' }}>
          <Briefcase size={18} /> 3. Job Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">
              Employee ID <span className="required">*</span>
            </label>
            <input
              type="text"
              name="employee_id"
              className={`form-control ${errors.employee_id ? 'is-invalid' : ''}`}
              value={formData.employee_id}
              onChange={handleChange}
              placeholder="e.g. EMP-1011"
              disabled={isEditMode}
            />
            {errors.employee_id && <div className="invalid-feedback">{errors.employee_id}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Department <span className="required">*</span>
            </label>
            <select
              name="department"
              className={`form-select ${errors.department ? 'is-invalid' : ''}`}
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Designation <span className="required">*</span>
            </label>
            <select
              name="designation"
              className={`form-select ${errors.designation ? 'is-invalid' : ''}`}
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              {DESIGNATIONS.map((desig) => (
                <option key={desig} value={desig}>{desig}</option>
              ))}
            </select>
            {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Joining Date <span className="required">*</span>
            </label>
            <input
              type="date"
              name="joining_date"
              className={`form-control ${errors.joining_date ? 'is-invalid' : ''}`}
              value={formData.joining_date}
              onChange={handleChange}
            />
            {errors.joining_date && <div className="invalid-feedback">{errors.joining_date}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select
              name="employment_type"
              className="form-select"
              value={formData.employment_type}
              onChange={handleChange}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Annual Salary ($) <span className="required">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="salary"
              className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 85000"
            />
            {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 4: PROFILE IMAGE */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-warning)' }}>
          <Camera size={18} /> 4. Profile Picture
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            border: '2px dashed var(--border-focus)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={36} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              id="profile_image_input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="profile_image_input" className="btn btn-outline" style={{ cursor: 'pointer' }}>
              <Camera size={16} /> Choose Image
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Supported formats: JPG, PNG, WEBP (Max size: 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* FORM ACTION BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={isSubmitting}>
          <RotateCcw size={16} /> Reset
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          <Save size={16} /> {isSubmitting ? 'Saving Record...' : isEditMode ? 'Update Employee' : 'Save Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
