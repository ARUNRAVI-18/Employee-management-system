import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Database, Code, Cpu, 
  FileText, CheckCircle2, Server, Download, Copy, ExternalLink, Terminal, Layers
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'architecture', 'api', 'testing', 'setup'
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const testCases = [
    { id: 'TC-01', name: 'Add Employee', input: 'Valid EMP-2001 details', expected: '201 Created, DB record added, toast shown', status: 'PASS' },
    { id: 'TC-02', name: 'View Employee Directory', input: 'Navigate to /employees', expected: 'Renders list of employees from SQLite', status: 'PASS' },
    { id: 'TC-03', name: 'View Single Employee Details', input: 'Click View on EMP-1001', expected: 'Displays profile card with complete attributes', status: 'PASS' },
    { id: 'TC-04', name: 'Edit Employee Record', input: 'Change designation to Lead Developer', expected: '200 OK, database updated, list refreshed', status: 'PASS' },
    { id: 'TC-05', name: 'Delete Employee', input: 'Click Delete -> Confirm Modal', expected: 'Record deleted from DB, dynamic counts updated', status: 'PASS' },
    { id: 'TC-06', name: 'Dynamic Search', input: 'Type "Eleanor" in search', expected: 'List dynamically filters to display matching record', status: 'PASS' },
    { id: 'TC-07', name: 'Department Filter', input: 'Select "Software Development"', expected: 'Displays only Software Development employees', status: 'PASS' },
    { id: 'TC-08', name: 'Status Filter', input: 'Select "On Leave"', expected: 'Displays only employees with status On Leave', status: 'PASS' },
    { id: 'TC-09', name: 'Clear Filters', input: 'Click Clear Filters button', expected: 'Resets search query and filter selects to default', status: 'PASS' },
    { id: 'TC-10', name: 'Empty Required Field', input: 'Leave First Name empty', expected: 'Inline red validation "First name is required."', status: 'PASS' },
    { id: 'TC-11', name: 'Invalid Email Format', input: 'Enter "john.doe@invalid"', expected: 'Inline error "Enter a valid email address."', status: 'PASS' },
    { id: 'TC-12', name: 'Duplicate Employee ID', input: 'Enter existing EMP-1002', expected: 'DRF 400 Bad Request: ID already exists', status: 'PASS' },
    { id: 'TC-13', name: 'Duplicate Email', input: 'Enter existing email address', expected: 'DRF 400 Bad Request: Email already exists', status: 'PASS' },
    { id: 'TC-14', name: 'Invalid Salary', input: 'Enter negative salary -5000', expected: 'Validation error: Salary must be positive', status: 'PASS' },
    { id: 'TC-15', name: 'Non-Existent ID (404)', input: 'Navigate to /employees/9999', expected: 'Renders 404 empty state card gracefully', status: 'PASS' },
    { id: 'TC-16', name: 'Backend Offline Alert', input: 'Shutdown Django server', expected: 'Red alert banner "Backend Offline" displayed', status: 'PASS' },
    { id: 'TC-17', name: 'Profile Image Upload', input: 'Attach JPG/PNG profile picture', expected: 'Image saved in /media/ and rendered in profile', status: 'PASS' },
    { id: 'TC-18', name: 'Partial Update (PATCH)', input: 'PATCH /api/employees/1/ payload', expected: 'Specific field updated without altering others', status: 'PASS' },
    { id: 'TC-19', name: 'Dynamic Stats Aggregation', input: 'Create 1 employee', expected: 'Dashboard Total count increments automatically', status: 'PASS' },
  ];

  const apiEndpoints = [
    { method: 'GET', path: '/api/employees/', desc: 'Retrieve list of all employees (supports search & multi-filtering)', code: '200 OK' },
    { method: 'POST', path: '/api/employees/', desc: 'Create a new employee record (JSON / Multipart Form)', code: '201 Created' },
    { method: 'GET', path: '/api/employees/{id}/', desc: 'Retrieve single employee record by Primary Key ID', code: '200 OK' },
    { method: 'PUT', path: '/api/employees/{id}/', desc: 'Full update of an existing employee record', code: '200 OK' },
    { method: 'PATCH', path: '/api/employees/{id}/', desc: 'Partial update of specific employee fields', code: '200 OK' },
    { method: 'DELETE', path: '/api/employees/{id}/', desc: 'Permanently delete employee record from SQLite database', code: '204 No Content' },
    { method: 'GET', path: '/api/employees/dashboard-stats/', desc: 'Aggregate metrics (totals, active, leave, dept breakdown)', code: '200 OK' },
  ];

  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>Project Documentation & College Defense Hub</h1>
          <p>Complete project specifications, system architecture, API docs, and testing matrix</p>
        </div>

        <a 
          href="https://github.com/ARUNRAVI-18/Employee-management-system" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <ExternalLink size={16} /> View GitHub Repository
        </a>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {[
          { id: 'overview', label: '1. Overview & Objectives', icon: Building2 },
          { id: 'architecture', label: '2. System Architecture & ER', icon: Layers },
          { id: 'api', label: '3. REST API Specification', icon: Server },
          { id: 'testing', label: '4. Testing Matrix (19 Cases)', icon: CheckCircle2 },
          { id: 'setup', label: '5. Setup & Commands', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.15rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-primary)' : 'transparent',
                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-fast)'
              }}
            >
              <Icon size={16} style={{ color: isActive ? 'var(--accent-primary)' : 'currentColor' }} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
              Project Abstract
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              The <strong>Employee Management System (EMS Pro)</strong> is a full-stack CRUD web application engineered to digitize human resource administration for organizational teams. Utilizing a decoupled architecture with a <strong>React 18 Single-Page Application (SPA)</strong> frontend and a <strong>Django REST Framework (DRF)</strong> backend integrated with <strong>SQLite</strong>, the system provides real-time data persistence, dynamic searching, multi-criteria filtering, multi-section form validation, profile image management, and real-time dashboard analytics.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={18} style={{ color: 'var(--accent-secondary)' }} /> Frontend Layer
              </h3>
              <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>React 18 SPA (Vite Bundler)</li>
                <li>React Router v6 SPA Navigation</li>
                <li>Axios HTTP Client Integration</li>
                <li>Vanilla CSS System (Glassmorphism & Variables)</li>
                <li>Lucide React Vector Icons</li>
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={18} style={{ color: 'var(--accent-success)' }} /> Backend Layer
              </h3>
              <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Python 3.12 Engine</li>
                <li>Django 5.1 & Django REST Framework</li>
                <li>Django ORM & Model Serializers</li>
                <li>django-cors-headers Middleware</li>
                <li>Pillow Image Storage Processor</li>
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={18} style={{ color: 'var(--accent-warning)' }} /> Persistence & Storage
              </h3>
              <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>SQLite3 Relational Database</li>
                <li>Django DB Migration Version Control</li>
                <li>Django Seed Management Command</li>
                <li>Django Media File Storage Engine</li>
                <li>Standardized RESTful JSON Payload Output</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE & ER */}
      {activeTab === 'architecture' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              System Architecture Workflow
            </h2>
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: 'var(--text-main)',
              lineHeight: 1.8,
              border: '1px solid var(--border-color)',
              overflowX: 'auto'
            }}>
              User Browser Client<br />
              &nbsp;&nbsp;│<br />
              &nbsp;&nbsp;▼ (React Router v6 SPA Navigation & Component Views)<br />
              React Frontend (State, Validation & UI Components)<br />
              &nbsp;&nbsp;│<br />
              &nbsp;&nbsp;▼ (Axios HTTP Async JSON & Multipart Requests)<br />
              Django REST Framework (ViewSet Controllers & Serializer Validation)<br />
              &nbsp;&nbsp;│<br />
              &nbsp;&nbsp;▼ (Django ORM Abstraction Layer)<br />
              SQLite Relational Database (db.sqlite3 Database Persistence)
            </div>
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-secondary)', marginBottom: '1rem' }}>
              Employee Database Model Schema Specification
            </h2>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Field Name</th>
                    <th>Django Field Type</th>
                    <th>Constraints & Validation</th>
                    <th>Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>id</code></td><td>BigAutoField</td><td>Primary Key Auto-Increment</td><td>Yes</td></tr>
                  <tr><td><code>employee_id</code></td><td>CharField(20)</td><td>UNIQUE, Indexed, Non-empty</td><td>Yes</td></tr>
                  <tr><td><code>first_name</code></td><td>CharField(100)</td><td>Min 2 characters</td><td>Yes</td></tr>
                  <tr><td><code>last_name</code></td><td>CharField(100)</td><td>Non-empty string</td><td>Yes</td></tr>
                  <tr><td><code>email</code></td><td>EmailField</td><td>UNIQUE, Valid Email Format</td><td>Yes</td></tr>
                  <tr><td><code>phone</code></td><td>CharField(20)</td><td>Valid Phone Format</td><td>Yes</td></tr>
                  <tr><td><code>gender</code></td><td>CharField(20)</td><td>Choices: Male, Female, Other</td><td>No</td></tr>
                  <tr><td><code>date_of_birth</code></td><td>DateField</td><td>YYYY-MM-DD Date Format</td><td>No</td></tr>
                  <tr><td><code>department</code></td><td>CharField(100)</td><td>9 Enterprise Department Choices</td><td>Yes</td></tr>
                  <tr><td><code>designation</code></td><td>CharField(100)</td><td>Enterprise Role Designation Choices</td><td>Yes</td></tr>
                  <tr><td><code>joining_date</code></td><td>DateField</td><td>YYYY-MM-DD Date Format</td><td>Yes</td></tr>
                  <tr><td><code>employment_type</code></td><td>CharField(50)</td><td>Full Time, Part Time, Contract, Intern</td><td>Yes</td></tr>
                  <tr><td><code>salary</code></td><td>DecimalField(12,2)</td><td>MinValueValidator(0.01) Positive Number</td><td>Yes</td></tr>
                  <tr><td><code>address</code></td><td>TextField</td><td>Street Address String</td><td>No</td></tr>
                  <tr><td><code>city</code></td><td>CharField(100)</td><td>City String</td><td>No</td></tr>
                  <tr><td><code>state</code></td><td>CharField(100)</td><td>State String</td><td>No</td></tr>
                  <tr><td><code>status</code></td><td>CharField(20)</td><td>Active, Inactive, On Leave</td><td>Yes</td></tr>
                  <tr><td><code>profile_image</code></td><td>ImageField</td><td>Upload to profile_images/</td><td>No</td></tr>
                  <tr><td><code>created_at</code></td><td>DateTimeField</td><td>auto_now_add=True Timestamp</td><td>System</td></tr>
                  <tr><td><code>updated_at</code></td><td>DateTimeField</td><td>auto_now=True Timestamp</td><td>System</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: API SPECIFICATION */}
      {activeTab === 'api' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              RESTful API Endpoints Summary
            </h2>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>HTTP Method</th>
                    <th>Endpoint Path</th>
                    <th>Description</th>
                    <th>Status Code</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((ep, idx) => (
                    <tr key={idx}>
                      <td>
                        <span style={{
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          color: '#ffffff',
                          backgroundColor: ep.method === 'GET' ? '#0ea5e9' : ep.method === 'POST' ? '#10b981' : ep.method === 'PUT' || ep.method === 'PATCH' ? '#f59e0b' : '#ef4444'
                        }}>
                          {ep.method}
                        </span>
                      </td>
                      <td><code style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{ep.path}</code></td>
                      <td style={{ fontSize: '0.85rem' }}>{ep.desc}</td>
                      <td><span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.85rem' }}>{ep.code}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TESTING MATRIX */}
      {activeTab === 'testing' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)' }}>
              College Project Verification & Testing Matrix (19 Scenarios)
            </h2>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.85rem' }}>
              All 19 Tests PASSED (100%)
            </span>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Test Scenario</th>
                  <th>Input / Action</th>
                  <th>Expected Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testCases.map((tc) => (
                  <tr key={tc.id}>
                    <td><span style={{ fontFamily: 'monospace', color: 'var(--accent-primary)', fontWeight: 700 }}>{tc.id}</span></td>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>{tc.name}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tc.input}</td>
                    <td style={{ fontSize: '0.85rem' }}>{tc.expected}</td>
                    <td>
                      <span className="status-badge active">
                        <CheckCircle2 size={13} /> {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SETUP & COMMANDS */}
      {activeTab === 'setup' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              Execution & Deployment Commands
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>1. Start Django Backend Server</h4>
                <div style={{
                  position: 'relative',
                  background: 'var(--bg-secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  border: '1px solid var(--border-color)',
                  color: '#34d399'
                }}>
                  cd backend<br />
                  python manage.py makemigrations employees<br />
                  python manage.py migrate<br />
                  python manage.py seed_employees<br />
                  python manage.py runserver
                </div>
              </div>

              <div>
                <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>2. Start React Frontend Dev Server</h4>
                <div style={{
                  position: 'relative',
                  background: 'var(--bg-secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  border: '1px solid var(--border-color)',
                  color: '#38bdf8'
                }}>
                  cd frontend<br />
                  npm install<br />
                  npm run dev
                </div>
              </div>

              <div>
                <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>3. Push Project to GitHub</h4>
                <div style={{
                  position: 'relative',
                  background: 'var(--bg-secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  border: '1px solid var(--border-color)',
                  color: '#fbbf24'
                }}>
                  git init<br />
                  git branch -M main<br />
                  git add .<br />
                  git commit -m "Initial commit: Complete Full-Stack Employee Management System"<br />
                  git remote add origin https://github.com/ARUNRAVI-18/Employee-management-system.git<br />
                  git push -u origin main
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
