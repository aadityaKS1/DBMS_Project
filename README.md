[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/dilV9AFl)


# Punarnirman – Disaster Recovery & Volunteer Management System

A full-stack **Database Management System (DBMS) project** built using:

- React JS and Tailwind CSS (Frontend)  
- Django (Backend API)  
- PostgreSQL (Database)  
- PostgreSQL Queries

---

## Project Overview

**Punarnirman** is a web-based system designed to manage disaster recovery and infrastructure rebuilding operations efficiently.

The system allows:

- Reporting damaged infrastructure
- Registering volunteers with skills
- Managing organizations
- Assigning volunteers to recovery tasks
- Tracking recovery progress

This project demonstrates practical implementation of:
- Relational database design
- SQL queries
- Foreign key constraints
- Multi-table joins
- CRUD operations

---

## Tech Stack

| Layer      | Technology     |
|------------|---------------|
| Frontend   | React JS + Tailwind CSS     |
| Backend    | Django         |
| Database   | PostgreSQL     |
| API        | Django REST    |
| SQL        | PostgreSQL     |

---

## Database Schema

The project uses PostgreSQL with the following interconnected tables:

### organization
- org_id (Primary Key)
- org_name
- contact_person
- contact_email
- contact_phone

### volunteer
- volunteer_id (Primary Key)
- name
- phone
- email (Unique)
- skill
- availability

### damage_report
- id (Primary Key)
- reported_by
- district
- municipality
- infrastructure_type
- volunteers_required
- skills_required
- severity_score
- report_status
- date_reported

### recovery_task
- task_id (Primary Key)
- report_id (Foreign Key → damage_report.id)
- org_id (Foreign Key → organization.org_id)
- volunteer_id (Foreign Key → volunteer.volunteer_id)
- task_status
- start_date
- completion_date

---

## Table Relationships

- One **Damage Report** → Multiple Recovery Tasks
- One **Organization** → Multiple Recovery Tasks
- One **Volunteer** → Multiple Recovery Tasks

Foreign key constraints maintain referential integrity.

---

## API Endpoints

### Damage Reports
- `GET /api/reports/`
- `POST /api/add-report/`

### Volunteers
- `GET /api/volunteers/`
- `POST /api/add-volunteer/`

### Organizations
- `GET /api/organizations/`
- `POST /api/add-organization/`

### Recovery Tasks
- `GET /api/tasks/`
- `POST /api/assign-task/`

---

## Installation & Setup Guide

### Prerequisites

Make sure the following are installed:

- Python (3.10+ recommended)
- Node.js (v18+ recommended)
- PostgreSQL
- pgAdmin

---

## Database Setup (PostgreSQL)

### Step 1: Install PostgreSQL
Download and install PostgreSQL from:
https://www.postgresql.org/download/

Make sure:
- Port is `5432`
- You remember your PostgreSQL password

---

### Step 2: Create Database

Open pgAdmin or PostgreSQL terminal and run:

```sql
CREATE DATABASE punarnirman;
```

---

## Backend Setup (Django + SQL)

### 1. Setup Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Migrations & Admin Setup
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 3. Start the development server:
```bash
python manage.py runserver
```

Backend API will run at: http://127.0.0.1:8000

---

## Frontend Setup (React + Tailwind CSS)

## 1. Installation

Install Node.js if not already installed: [https://nodejs.org/](https://nodejs.org/)

Then, install dependencies:

```bash
cd frontend
npm install
```

## 2. Start Development Server
```bash
npm start
```
The app will run at:
http://localhost:3000