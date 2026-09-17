# Employee Management System (EMS Pro)

A modern, full-stack, responsive Employee Management System built with **React**, **Django REST Framework (DRF)**, and **SQLite**.

![Tech Stack](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?logo=react)
![Backend](https://img.shields.io/badge/Backend-Django%20REST%20Framework-092E20?logo=django)
![Database](https://img.shields.io/badge/Database-SQLite3-003B57?logo=sqlite)

---


## 📌 Project Overview

The **Employee Management System** is a complete enterprise web application designed to streamline HR and administrative workflows. The application provides complete **Create, Read, Update, Delete (CRUD)** capabilities, dynamic multi-attribute search and filtering, real-time aggregate dashboard metrics, profile image management, and full client & server-side validation.

---

## ✨ Features

- 📊 **Dynamic Dashboard**: Dynamic, database-driven summary metric cards (Total, Active, Inactive, On Leave) and department distribution breakdown.
- 👥 **Employee Directory**: Responsive table and grid view with real-time search across Employee ID, Name, Email, and Designation.
- 🔍 **Multi-Filtering**: Instant filtering by Department, Status, and Employment Type with a single-click filter reset.
- 📝 **Comprehensive Registration Form**: 4-section structured registration workflow with real-time field validation.
- 🖼️ **Profile Picture Support**: Upload and serve profile images with default fallback avatars.
- 🛡️ **Full Data Integrity**: Strict backend validation (unique constraints on `employee_id` and `email`, positive salary checks, formatted field checks).
- ⚡ **RESTful API**: Standardized JSON responses with HTTP status codes (200, 201, 400, 404, 500).
- 🧪 **API Test Collection**: Complete Postman collection included for API verification.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System with CSS Variables & Glassmorphism)

### Backend
- **Framework**: Python 3.12 + Django 5.1
- **API Framework**: Django REST Framework (DRF)
- **CORS Management**: `django-cors-headers`
- **Image Processing**: Pillow

### Database
- **Engine**: SQLite3 (Development & Demonstration)

---

## 🏗️ Application Architecture

```
User Browser
    │
    ▼
React Frontend (Vite Single Page Application)
    │
    ▼ Axios HTTP / JSON Requests
Django REST Framework (ViewSet & Action Controllers)
    │
    ▼ Django ORM Queries
SQLite Database (db.sqlite3)
```

### Directory Structure

```
employee-management-system/
├── backend/
│   ├── manage.py
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── employees/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── management/commands/seed_employees.py
│   ├── media/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/employeeService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── README.md
├── DOCUMENTATION.md
├── postman_collection.json
└── .gitignore
```

---

## 🔌 API Endpoints Summary

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/employees/` | Retrieve all employees (supports search & filters) |
| `POST` | `/api/employees/` | Create a new employee record |
| `GET` | `/api/employees/{id}/` | Retrieve single employee details |
| `PUT` | `/api/employees/{id}/` | Full update of an employee record |
| `PATCH` | `/api/employees/{id}/` | Partial update of an employee record |
| `DELETE` | `/api/employees/{id}/` | Delete an employee record |
| `GET` | `/api/employees/dashboard-stats/` | Retrieve dynamic aggregate dashboard statistics |

---

## 🚀 Quick Setup & Installation Guide

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

---

### Step 1: Set Up & Run Django Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations employees
python manage.py migrate

# Seed 10 realistic sample employee records
python manage.py seed_employees

# Start Django development server
python manage.py runserver
```


---

### Step 2: Set Up & Run React Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install Node modules
npm install

# Start Vite development server
npm run dev
```


---

## 🧪 Postman API Testing Procedure

1. Open Postman.
2. Click **Import** -> Select `postman_collection.json`.
3. Execute the pre-configured test scenarios:
   - `1. Create Employee (POST)` -> Returns `201 Created`
   - `2. Get All Employees (GET)` -> Returns `200 OK`
   - `7. Invalid Employee - Negative Salary` -> Returns `400 Bad Request`
   - `8. Duplicate Employee ID` -> Returns `400 Bad Request`

---

## 🔮 Future Enhancements

- 🔑 JWT-based Authentication & Role-Based Access Control (Admin, HR Manager, Employee View-Only).
- 📄 Export Employee Directory to CSV / PDF formats.
- 🗓️ Leave Application & Approval Module.

## live web working link
https://employee-management-system-nine-lemon.vercel.app/

