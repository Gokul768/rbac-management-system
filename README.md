<div align="center">

# 🚀 RBAC Management System

### Enterprise-Ready Role-Based Access Control (RBAC) Web Application

<p>
A secure and scalable Full Stack RBAC application built using
<strong>Next.js</strong>,
<strong>NestJS</strong>,
<strong>MongoDB</strong>, and
<strong>JWT Authentication</strong>.
</p>

<p>
Designed as a professional Full Stack Developer Interview Assignment to demonstrate modern authentication, authorization, secure API development, dashboard analytics, member management, audit logging, and responsive UI development.
</p>

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

# 📖 Project Overview

RBAC Management System is a modern Full Stack web application that provides secure authentication, role-based authorization, member management, dashboard analytics, and audit logging.

The application follows industry-standard security practices including JWT Access & Refresh Tokens, password hashing using bcrypt, protected APIs, and Role-Based Access Control (RBAC).

It was developed as a Full Stack Developer Interview Assignment to demonstrate clean architecture, scalable backend development, secure REST APIs, responsive frontend development, and modern UI/UX practices.

---

## 🎯 Project Objectives

- Build a secure authentication system
- Implement Role-Based Access Control (RBAC)
- Manage users through CRUD operations
- Provide an Admin Dashboard with statistics
- Demonstrate secure REST API development
- Showcase clean Full Stack architecture
- Follow industry-standard coding practices

---
# ✨ Key Features

## 🔐 Authentication

The application provides a secure authentication system using industry-standard practices.

### Features

- User Registration
- Secure User Login
- JWT Access Token Authentication (15 Minutes)
- JWT Refresh Token Authentication (7 Days)
- Password Hashing using bcrypt
- Protected Routes
- Token Refresh Mechanism
- Logout Support
- Input Validation
- Secure API Authorization

---

## 👥 Role-Based Access Control (RBAC)

The application follows a Role-Based Access Control (RBAC) model where permissions are granted based on user roles.

### Available Roles

| Role | Description |
|------|-------------|
| 👑 Admin | Full access to the entire system |
| 🛡️ Manager | Can manage members except deletion |
| 👤 Member | Read-only access |

---

## 🔑 Permission Matrix

| Feature | 👑 Admin | 🛡️ Manager | 👤 Member |
|----------|:--------:|:----------:|:---------:|
| View Dashboard | ✅ | ✅ | ✅ |
| View Members | ✅ | ✅ | ✅ |
| View Member Details | ✅ | ✅ | ✅ |
| Create Member | ✅ | ✅ | ❌ |
| Edit Member | ✅ | ✅ | ❌ |
| Delete Member | ✅ | ❌ | ❌ |
| View Profile | ✅ | ✅ | ✅ |
| Logout | ✅ | ✅ | ✅ |

---

# 📊 Dashboard Features

The dashboard provides a quick overview of the system.

### Dashboard Statistics

- 👥 Total Users
- 👑 Total Admins
- 🛡️ Total Managers
- 👤 Total Members

### Dashboard Highlights

- Clean Card-Based UI
- Responsive Layout
- Dark Mode Support
- Secure API Integration
- Real-Time Statistics

---

# 👨‍💼 Member Management

The Member Management module provides complete CRUD functionality.

### Features

- ➕ Create Member
- 👀 View Member
- ✏️ Edit Member
- ❌ Delete Member
- 🔍 Search Members
- 📄 Pagination
- 📱 Responsive Data Table
- 🌙 Dark Mode Support

---

# 🛡️ Security Features

Security is implemented using industry best practices.

- JWT Authentication
- JWT Refresh Token
- Password Hashing (bcrypt)
- Protected APIs
- Role-Based Authorization
- Input Validation
- Secure Route Guards
- CORS Configuration
- Request Validation using ValidationPipe

---

# 🎁 Bonus Features

The following bonus features have also been implemented.

| Feature | Status |
|----------|:------:|
| 🌙 Dark Mode | ✅ |
| 📘 Swagger API Documentation | ✅ |
| 📝 Audit Logs | ✅ |
| 🔐 JWT Refresh Token | ✅ |
| 📄 Protected APIs | ✅ |
| 🔍 Search | ✅ |
| 📑 Pagination | ✅ |

---

# ✅ Assignment Completion Checklist

| Requirement | Status |
|-------------|:------:|
| User Registration | ✅ |
| User Login | ✅ |
| JWT Authentication | ✅ |
| JWT Refresh Token | ✅ |
| Password Hashing | ✅ |
| Role-Based Access Control | ✅ |
| Dashboard | ✅ |
| CRUD Operations | ✅ |
| Search | ✅ |
| Pagination | ✅ |
| Protected APIs | ✅ |
| Input Validation | ✅ |
| CORS Configuration | ✅ |
| Swagger Documentation | ✅ |
| Audit Logs | ✅ |
| Dark Mode | ✅ |

---
# 🏗️ System Architecture

The application follows a modern Full Stack architecture where the frontend communicates with the backend through secure REST APIs protected by JWT Authentication.

```text
                        ┌──────────────────────┐
                        │      Web Browser     │
                        └──────────┬───────────┘
                                   │
                                   ▼
                    ┌────────────────────────────┐
                    │   Next.js Frontend (React) │
                    │                            │
                    │ • Login / Register         │
                    │ • Dashboard                │
                    │ • Member Management        │
                    │ • Profile                  │
                    │ • Dark Mode                │
                    └──────────┬─────────────────┘
                               │
                      Axios HTTP Requests
                               │
                               ▼
                  ┌───────────────────────────┐
                  │      NestJS Backend       │
                  │                           │
                  │ • Authentication          │
                  │ • Authorization (RBAC)    │
                  │ • JWT Access Token        │
                  │ • JWT Refresh Token       │
                  │ • CRUD APIs               │
                  │ • Swagger                │
                  │ • Audit Logs             │
                  └──────────┬────────────────┘
                             │
                        Mongoose ODM
                             │
                             ▼
                  ┌───────────────────────────┐
                  │        MongoDB            │
                  │                           │
                  │ • Users                  │
                  │ • Members                │
                  │ • Refresh Tokens         │
                  │ • Audit Logs             │
                  └───────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | UI Styling |
| Axios | API Communication |
| Lucide React | Icons |

---

## Backend

| Technology | Purpose |
|------------|---------|
| NestJS | REST API Development |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Passport JWT | Route Protection |
| bcrypt | Password Hashing |
| Swagger | API Documentation |

---

## Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version Control |
| GitHub | Source Code Hosting |
| Postman | API Testing |
| VS Code | Development Environment |

---

# 📂 Project Structure

```text
rbac-management-system
│
├── frontend
│   ├── app
│   │   ├── dashboard
│   │   ├── login
│   │   ├── members
│   │   ├── profile
│   │   └── register
│   │
│   ├── components
│   ├── hooks
│   ├── services
│   ├── types
│   └── utils
│
├── backend
│   ├── src
│   │   ├── auth
│   │   ├── audit
│   │   ├── dashboard
│   │   ├── members
│   │   ├── users
│   │   └── main.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Gokul768/rbac-management-system.git
```

```bash
cd rbac-management-system
```

---

# 📦 Backend Installation

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run start:dev
```

Backend will start at

```
http://localhost:5000
```

---

# 💻 Frontend Installation

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend will start at

```
http://localhost:3000
```

---
# 🔑 Environment Variables

Create the following environment files before running the application.

---

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

JWT_EXPIRES_IN=15m

JWT_REFRESH_EXPIRES_IN=7d
```

---

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# 📚 API Documentation

Swagger API Documentation is available after running the backend.

### Swagger URL

```
http://localhost:5000/api
```

Swagger includes:

- Authentication APIs
- Member APIs
- Request Validation
- Response Schemas
- JWT Authorization Support

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | User login |
| POST | /auth/refresh | Generate new access token |
| POST | /auth/logout | Logout user |
| GET | /auth/profile | Get logged-in user profile |

---

## Member Management

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /members | Get all members |
| GET | /members/:id | Get member by ID |
| POST | /members | Create member |
| PUT | /members/:id | Update member |
| DELETE | /members/:id | Delete member |

---

# 🗄️ Database Collections

MongoDB contains the following collections.

| Collection | Purpose |
|------------|---------|
| Users | Stores registered users |
| Members | Stores member information |
| Refresh Tokens | Stores JWT Refresh Tokens |
| Audit Logs | Stores user activity logs |

---

# 📸 Application Screenshots

> Screenshots can be added here after deployment.

### Login Page

```
/screenshots/login.png
```

### Dashboard

```
/screenshots/dashboard.png
```

### Members Page

```
/screenshots/members.png
```

### Profile Page

```
/screenshots/profile.png
```

### Dark Mode

```
/screenshots/dark-mode.png
```

---

# 🚀 Future Enhancements

Some planned improvements include:

- Email Verification
- Forgot Password
- Profile Picture Upload
- Dashboard Charts & Analytics
- Export Members to Excel/PDF
- Advanced Filters
- Docker Support
- CI/CD Pipeline
- Unit Testing
- Deployment to Cloud

---
# 🔄 Authentication Flow

```text
                    Register
                       │
                       ▼
               User Account Created
                       │
                       ▼
                    Login
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
 Access Token                  Refresh Token
 (15 Minutes)                    (7 Days)
        │                             │
        ▼                             ▼
 Protected APIs            Generate New Access Token
        │
        ▼
 Authorized Request
```

---

# 🛡️ Security Implementation

The application follows modern security standards.

| Security Feature | Implemented |
|------------------|:-----------:|
| Password Hashing (bcrypt) | ✅ |
| JWT Authentication | ✅ |
| Refresh Token Rotation | ✅ |
| Protected APIs | ✅ |
| Role Guards | ✅ |
| Input Validation | ✅ |
| ValidationPipe | ✅ |
| CORS Configuration | ✅ |
| Environment Variables | ✅ |

---

# 📋 Assignment Deliverables

| Deliverable | Status |
|-------------|:------:|
| GitHub Repository | ✅ |
| README Documentation | ✅ |
| Database Schema | ✅ |
| Swagger API Documentation | ✅ |
| Environment Setup Guide | ✅ |
| Sample Environment File | ✅ |

---

# 📈 Project Metrics

| Metric | Value |
|---------|------:|
| Frontend Framework | Next.js |
| Backend Framework | NestJS |
| Database | MongoDB |
| Authentication | JWT |
| User Roles | 3 |
| CRUD Modules | 1 |
| Dashboard Cards | 4 |
| REST APIs | 10+ |
| Dark Mode | Yes |
| Swagger | Yes |
| Audit Logs | Yes |

---

# 🎖️ Project Highlights

- Enterprise-style RBAC Architecture
- Secure Authentication using JWT
- Refresh Token Implementation
- RESTful API Design
- Responsive User Interface
- Dark Mode Support
- Swagger Documentation
- Audit Logging
- Modular Backend Structure
- Clean Component-Based Frontend

# 👨‍💻 Author

## Gokul Kumar M

Full Stack Developer

- 🎓 B.Tech Artificial Intelligence & Data Science
- 💻 Passionate about Full Stack Development
- 🚀 Interested in Next.js, NestJS, React Native, AI & Modern Web Technologies

### Connect with Me

**GitHub**

https://github.com/Gokul768

**LinkedIn**

https://www.linkedin.com/in/gokulkumar-m-8aa977355

---

# 📄 License

This project was developed as a **Full Stack Developer Interview Assignment**.

It is intended for educational and portfolio purposes.

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a Star on GitHub!

**Thank you for visiting this repository.**

Made with ❤️ by **Gokul Kumar M**

</div>
# 📌 Project Highlights

| Feature | Status |
|----------|:------:|
| Authentication | ✅ Complete |
| Authorization (RBAC) | ✅ Complete |
| JWT Access Token | ✅ Complete |
| JWT Refresh Token | ✅ Complete |
| Dashboard | ✅ Complete |
| CRUD Operations | ✅ Complete |
| Search | ✅ Complete |
| Pagination | ✅ Complete |
| Profile Page | ✅ Complete |
| Dark Mode | ✅ Complete |
| Swagger Documentation | ✅ Complete |
| Audit Logs | ✅ Complete |

---

# 🎯 Why This Project?

This project demonstrates modern Full Stack development practices and secure web application architecture.

Key learning outcomes include:

- Designing scalable REST APIs
- Secure JWT Authentication
- Role-Based Authorization
- Clean Architecture
- MongoDB Data Modeling
- Responsive UI Design
- API Documentation using Swagger
- Production-ready project structure

---

# 🏆 Best Practices Followed

- Clean Folder Structure
- Modular Architecture
- Reusable Components
- DTO Validation
- Protected Routes
- Role Guards
- JWT Strategy
- Environment Variables
- TypeScript
- Responsive Design
- Error Handling
- Audit Logging

---

# 📈 Project Statistics

| Category | Count |
|-----------|------:|
| Frontend Pages | 8+ |
| Backend Modules | 5+ |
| Protected APIs | 10+ |
| User Roles | 3 |
| Database Collections | 4 |
| Dashboard Widgets | 4 |
| Authentication APIs | 5 |
| CRUD APIs | 5 |

---

# 💡 Learning Outcomes

During this project, I gained practical experience with:

- Full Stack Development
- Next.js App Router
- NestJS Framework
- MongoDB & Mongoose
- JWT Authentication
- Refresh Token Flow
- Role-Based Access Control
- REST API Design
- Swagger Documentation
- Git & GitHub Workflow
- Modern UI Development

---

# 🤝 Contribution

This project was developed independently as part of a technical interview assignment.

Suggestions and improvements are always welcome.

---

# ⭐ Repository Support

If you found this project useful,

⭐ Star the repository

🍴 Fork the project

📢 Share your feedback

---

<div align="center">

## 🚀 Thank You

Thank you for taking the time to review this project.

I hope it demonstrates my understanding of modern Full Stack Development, secure backend architecture, and clean frontend implementation.

Made with ❤️ by **Gokul Kumar M**

</div>