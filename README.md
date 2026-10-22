# SkillForge – Online Learning Management Platform

## Overview

SkillForge is a full-stack Online Learning Management System (LMS) designed to connect students and instructors through an interactive and user-friendly learning environment. The platform enables instructors to create and manage courses, students to enroll and learn from courses, and administrators to oversee platform operations.

Built using the MERN architecture with **MySQL** as the database, SkillForge provides secure authentication, role-based access control, course management, and a responsive user experience.

---

## Features

### Student Module

* User Registration and Login
* Browse Available Courses
* Search and Filter Courses
* Enroll in Courses
* Access Course Content
* Track Learning Progress
* View Enrolled Courses
* Update Profile Information

### Instructor Module

* Instructor Registration and Login
* Create New Courses
* Upload Course Content
* Manage Existing Courses
* View Enrolled Students
* Update Course Information
* Track Course Performance

### Admin Module

* Dashboard Overview
* Manage Students
* Manage Instructors
* Manage Courses
* Monitor Platform Activities
* User Management and Access Control

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt.js

### File Storage

* Cloudinary (Optional)

---

## System Architecture

### Student

* Register/Login
* Browse Courses
* Enroll in Courses
* Access Learning Content
* Track Progress

### Instructor

* Create Courses
* Upload Content
* Manage Courses
* View Student Enrollments

### Admin

* Manage Users
* Manage Courses
* Monitor Platform Operations

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd SkillForge
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skillforge
JWT_SECRET=your_secret_key
```

### Run the Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## Key Highlights

* Full-Stack Web Application
* Role-Based Authentication
* Student, Instructor, and Admin Modules
* Course Creation and Management
* Secure REST API Architecture
* Responsive UI with Tailwind CSS
* MySQL Database Integration
* Scalable Learning Platform Design

---

## Future Enhancements

* Video Streaming Support
* Online Assessments and Quizzes
* Course Certificates
* Payment Gateway Integration
* AI-Based Course Recommendations
* Discussion Forums and Community Features

---

## Author

**Shrinath Adhav**

MCA Graduate | Full Stack Developer

**Tech Skills:** React.js, Node.js, Express.js, MySQL, MongoDB, JavaScript, Python, Tailwind CSS
