import React from 'react';
import { Building2, ShieldCheck, Database, Code, Cpu } from 'lucide-react';

const About = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div className="page-header-info">
          <h1>About Employee Management System</h1>
          <p>Full-Stack Enterprise CRUD Web Application Specification</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={20} /> System Overview
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
          The <strong>Employee Management System (EMS Pro)</strong> is a complete full-stack web application designed for organizational human resource administration. It enables secure, real-time CRUD operations, multi-criteria record search and filtering, database synchronization, image file upload management, dynamic statistics aggregation, and client/server-side validation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', color: 'var(--accent-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={18} /> Frontend Stack
          </h3>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>React 18 / Vite</li>
            <li>React Router v6 SPA Routing</li>
            <li>Axios HTTP Client Service Layer</li>
            <li>Vanilla CSS Design Tokens</li>
            <li>Lucide React Icon Library</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.05rem', color: 'var(--accent-success)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} /> Backend Framework
          </h3>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Python 3.12</li>
            <li>Django REST Framework (DRF)</li>
            <li>Django ORM Models</li>
            <li>Django CORS Headers</li>
            <li>Pillow Image Processing</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.05rem', color: 'var(--accent-warning)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={18} /> Database & Storage
          </h3>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>SQLite3 Development Database</li>
            <li>Django DB Migrations</li>
            <li>Django Management Commands (Seed Script)</li>
            <li>Media Upload File Storage</li>
            <li>RESTful JSON Serialization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
