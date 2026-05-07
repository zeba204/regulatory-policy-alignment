# Regulatory Policy Alignment Platform

## Overview

Regulatory Policy Alignment Platform is a full-stack web application developed using Spring Boot and React for managing organizational policy records, compliance tracking, analytics, and secure document handling.

The application provides secure JWT-based authentication, policy management, analytics dashboards, CSV export functionality, audit logging, file upload support, and Dockerized deployment integration.

---

# Student Details

* **Name:** Zeba Farhat
* **USN:** 3NA22CS094
* **Role:** Java Developer 2
* **Domain:** Full Stack Java Developer Intern
* **Project Tool Number:** DAA

---

# Tech Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Security
* JWT Authentication
* PostgreSQL
* Redis Cache
* Flyway Migration
* Spring AOP
* Swagger / OpenAPI
* Docker

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Recharts

## Development Tools

* IntelliJ IDEA
* VS Code
* Postman
* Docker Desktop
* Git & GitHub
* pgAdmin

---

# Features

## Authentication

* User Registration
* User Login
* JWT-based Authorization
* Protected APIs

## Policy Management

* Create Policy
* Update Policy
* Delete Policy
* Search Policies
* Pagination Support
* Filter by Status
* Date Range Filtering

## Analytics

* Policy Statistics Dashboard
* Charts using Recharts
* Category-wise Analytics
* Status-based Analytics

## File Upload

* Upload PDF, PNG, JPG, and TXT files
* File Validation
* Local File Storage

## Export

* Export Policy Data to CSV

## Audit Logging

* Audit Logs using Spring AOP
* Tracks Create, Update, and Delete Operations

## Additional Features

* Swagger API Documentation
* Dockerized Setup
* Redis Caching
* Email Notification Support

---

# Security Features

* JWT-based Authentication and Authorization
* Spring Security Integration
* Protected REST API Endpoints
* BCrypt Password Encryption
* Backend Request Validation
* Secure File Upload Validation
* Token-based API Access Control

---

# Project Structure

```bash id="jlwm99"
backend/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 ├── config/
 └── exception/

frontend/
 ├── src/
 ├── pages/
 ├── components/
 ├── services/
 └── context/
```

---

# Backend Setup

## Prerequisites

* Java 17
* Maven
* PostgreSQL
* Redis

## Run Backend

```bash id="jlwm100"
./mvnw spring-boot:run
```

Backend runs on:

```text id="jlwm101"
http://localhost:8080
```

---

# Frontend Setup

## Install Dependencies

```bash id="jlwm102"
npm install
```

## Run Frontend

```bash id="jlwm103"
npm run dev
```

Frontend runs on:

```text id="jlwm104"
http://localhost:5173
```

---

# Docker Setup

## Run All Services

```bash id="jlwm105"
docker compose up --build
```

## Docker Services

* Spring Boot Backend
* PostgreSQL
* Redis
* MailHog

---

# Swagger API Documentation

Open Swagger UI:

```text id="jlwm106"
http://localhost:8080/swagger-ui/index.html
```

---

# Sample APIs

## Authentication APIs

```http id="jlwm107"
POST /api/auth/register
POST /api/auth/login
```

## Policy APIs

```http id="jlwm108"
GET    /api/policy-records
POST   /api/policy-records
PUT    /api/policy-records/{id}
DELETE /api/policy-records/{id}
```

## Search API

```http id="jlwm109"
GET /api/policy-records/search
```

## Export API

```http id="jlwm110"
GET /api/policy-records/export
```

## Upload API

```http id="jlwm111"
POST /api/policy-records/{id}/upload
```

---

# Current Project Status

* Backend Completed
* Frontend Completed
* JWT Authentication Integrated
* Analytics Dashboard Implemented
* Upload Feature Implemented
* Docker Setup Configured
* Swagger Documentation Configured
* Audit Logging Implemented
* Frontend-Backend Integration Stabilized

---

# Final Demo Features

* JWT-based Authentication and Authorization
* Policy CRUD Management
* Advanced Search and Filtering
* CSV Export Functionality
* File Upload with Validation
* Analytics Dashboard
* Redis Caching Integration
* Flyway Database Migrations
* Swagger/OpenAPI Documentation
* Dockerized Backend Deployment
* Responsive React Frontend

---

# Demo Flow

1. User Authentication (JWT Login/Register)
2. Dashboard Analytics Overview
3. Policy Management
4. Search and Filter Operations
5. File Upload Validation
6. CSV Export Functionality
7. Swagger API Verification
8. Dockerized Backend Verification

---

# Screenshots

## Login Page

   Login-1.png
   
## Dashboard

   dashboard-1.png

## Policy Management

   Policy-list.png

## Swagger API

   Swagger.png

## Docker Containers
   docker.png

---

# Challenges Faced

* Frontend-backend Integration
* Docker Networking Configuration
* JWT Authentication Stabilization
* Database Migration Consistency
* API Endpoint Synchronization

---

# Learnings

* REST API Integration
* Dockerized Deployment
* Secure Authentication Handling
* Full-stack Debugging and Testing
* Backend Deployment Stabilization

---

# Conclusion

The Regulatory Policy Alignment Platform successfully demonstrates secure full-stack application development with modern backend architecture, responsive frontend integration, Dockerized deployment, secure authentication, and scalable policy management workflows.

The project provides a stable and demo-ready solution for regulatory policy management and analytics workflows.

---

# Author

**Zeba Farhat**
