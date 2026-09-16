import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit3, ArrowLeft } from 'lucide-react';
import EmployeeForm from '../components/EmployeeForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';
import employeeService from '../services/employeeService';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [notification, setNotification] = useState({ type: 'success', message: '' });

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployee(id);
      setEmployeeData(data);
    } catch (err) {
      console.error('Error fetching employee for edit:', err);
      setNotification({
        type: 'error',
        message: 'Employee record not found or failed to load.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formDataPayload) => {
    try {
      setIsSubmitting(true);
      setBackendErrors({});
      const updated = await employeeService.updateEmployee(id, formDataPayload);
      
      setNotification({
        type: 'success',
        message: `Employee "${updated.first_name} ${updated.last_name}" (${updated.employee_id}) updated successfully!`
      });

      setTimeout(() => {
        navigate('/employees');
      }, 1200);

    } catch (err) {
      console.error('Error updating employee:', err);
      if (err.response && err.response.data) {
        setBackendErrors(err.response.data);
        setNotification({
          type: 'error',
          message: 'Validation failed. Please fix form errors.'
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Failed to update employee. Please check server.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Fetching employee details for editing..." />;

  if (!employeeData) {
    return (
      <div className="page-container">
        <div className="card empty-state">
          <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Employee Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            The requested employee record with ID #{id} does not exist in the database.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/employees')}>
            Return to Employee List
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

      <div className="page-header">
        <div className="page-header-info">
          <h1>Edit Employee Record</h1>
          <p>Update information for {employeeData.first_name} {employeeData.last_name} ({employeeData.employee_id})</p>
        </div>

        <button className="btn btn-outline" onClick={() => navigate('/employees')}>
          <ArrowLeft size={16} /> Back to Directory
        </button>
      </div>

      <EmployeeForm
        initialData={employeeData}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/employees')}
        isSubmitting={isSubmitting}
        isEditMode={true}
        backendErrors={backendErrors}
      />
    </div>
  );
};

export default EditEmployee;
