import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import EmployeeForm from '../components/EmployeeForm';
import Notification from '../components/Notification';
import employeeService from '../services/employeeService';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [notification, setNotification] = useState({ type: 'success', message: '' });

  const handleSubmit = async (formDataPayload) => {
    try {
      setIsSubmitting(true);
      setBackendErrors({});
      const created = await employeeService.createEmployee(formDataPayload);
      
      setNotification({
        type: 'success',
        message: `Employee "${created.first_name} ${created.last_name}" (${created.employee_id}) created successfully!`
      });

      // Redirect to list after short toast delay
      setTimeout(() => {
        navigate('/employees');
      }, 1200);

    } catch (err) {
      console.error('Error creating employee:', err);
      if (err.response && err.response.data) {
        setBackendErrors(err.response.data);
        setNotification({
          type: 'error',
          message: 'Please resolve the highlighted validation errors.'
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Failed to connect to backend server. Check API connection.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: 'success', message: '' })}
      />

      <div className="page-header">
        <div className="page-header-info">
          <h1>Add New Employee</h1>
          <p>Register a new employee record into the database</p>
        </div>

        <button className="btn btn-outline" onClick={() => navigate('/employees')}>
          <ArrowLeft size={16} /> Back to Directory
        </button>
      </div>

      <EmployeeForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/employees')}
        isSubmitting={isSubmitting}
        isEditMode={false}
        backendErrors={backendErrors}
      />
    </div>
  );
};

export default AddEmployee;
