import axios from 'axios';

// Base API URL configuration
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

export const employeeService = {
  // Fetch list of all employees with optional search and filters
  getEmployees: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.department) params.append('department', filters.department);
    if (filters.status) params.append('status', filters.status);
    if (filters.employment_type) params.append('employment_type', filters.employment_type);

    const response = await apiClient.get(`/employees/?${params.toString()}`);
    return response.data;
  },

  // Fetch single employee by ID
  getEmployee: async (id) => {
    const response = await apiClient.get(`/employees/${id}/`);
    return response.data;
  },

  // Create new employee (supports FormData for image upload)
  createEmployee: async (data) => {
    let headers = {};
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
    const response = await apiClient.post('/employees/', data, { headers });
    return response.data;
  },

  // Update existing employee (PUT)
  updateEmployee: async (id, data) => {
    let headers = {};
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
    const response = await apiClient.put(`/employees/${id}/`, data, { headers });
    return response.data;
  },

  // Partial update (PATCH)
  patchEmployee: async (id, data) => {
    let headers = {};
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
    const response = await apiClient.patch(`/employees/${id}/`, data, { headers });
    return response.data;
  },

  // Delete employee record
  deleteEmployee: async (id) => {
    const response = await apiClient.delete(`/employees/${id}/`);
    return response.data;
  },

  // Fetch real-time dynamic dashboard statistics
  getDashboardStats: async () => {
    const response = await apiClient.get('/employees/dashboard-stats/');
    return response.data;
  },
};

export default employeeService;
