# Regulatory Policy Alignment Platform

## Overview

Regulatory Policy Alignment Platform is a full-stack web application developed using Spring Boot and React for managing organizational policy records, compliance tracking, analytics, and secure document handling.

The application provides secure JWT-based authentication, policy management, analytics dashboards, CSV export functionality, audit logging, and document upload support.

---

# Tech Stack

## Backend
- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- PostgreSQL
- Redis Cache
- Flyway Migration
- Spring AOP
- Swagger / OpenAPI
- Docker

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Recharts

---

# Features

## Authentication
- User Registration
- User Login
- JWT-based Authorization
- Protected APIs

## Policy Management
- Create Policy
- Update Policy
- Delete Policy
- Search Policies
- Pagination Support
- Filter by Status
- Date Range Filtering

## Analytics
- Policy statistics dashboard
- Charts using Recharts
- Category-wise analytics
- Status-based analytics

## File Upload
- Upload PDF, PNG, JPG, TXT files
- File validation
- Local file storage

## Export
- Export policy data to CSV

## Audit Logging
- Audit logs using Spring AOP
- Tracks Create, Update, Delete operations

## Additional Features
- Swagger API documentation
- Dockerized setup
- Redis caching
- Email notification support

---

# Project Structure

```bash
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
 
 Backend Setup
Prerequisites
Java 17
Maven
PostgreSQL
Redis
Run Backend
./mvnw spring-boot:run

Backend runs on:

http://localhost:8080
Frontend Setup
Install Dependencies
npm install
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
Docker Setup
Run All Services
docker compose up --build

Services:

Spring Boot Backend
PostgreSQL
Redis
MailHog
Swagger API Documentation

Open Swagger UI:

http://localhost:8080/swagger-ui.html
Sample APIs
Authentication
POST /api/auth/register
POST /api/auth/login
Policies
GET /api/policy-records
POST /api/policy-records
PUT /api/policy-records/{id}
DELETE /api/policy-records/{id}
Search
GET /api/policy-records/search
Export
GET /api/policy-records/export
Upload
POST /api/policy-records/{id}/upload
Current Status
Backend completed
Frontend completed
JWT authentication integrated
Analytics dashboard implemented
Upload feature implemented
Docker setup configured
Swagger documentation configured
Audit logging implemented
Author

Zeba Farhat