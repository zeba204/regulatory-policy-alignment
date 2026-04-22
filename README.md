# Day 1 &day 2 Progress - Java Developer 1

## 👩‍💻 Work Done Today

Today I worked on setting up the backend for the Regulatory Policy Alignment Tool using Spring Boot. I implemented the core structure and developed REST APIs for managing policy records.

---

## ⚙️ Tasks Completed

### 1. Project Setup
- Created a Spring Boot project using Maven
- Configured application properties for PostgreSQL database connection
- Verified project is running successfully on port 8080

---

### 2. Folder Structure Setup
Created proper layered architecture:

- controller → for handling API requests
- service → for business logic
- repository → for database operations
- entity → for mapping database tables
- config → for security configuration

---

### 3. Entity Layer
- Created `PolicyRecord.java`
- Mapped fields:
  - id
  - policyName
  - description
  - category
  - status
- Used JPA annotations for table creation

---

### 4. Repository Layer
- Created `PolicyRecordRepository.java`
- Extended JpaRepository
- Enabled basic database operations:
  - save()
  - findAll()
  - findById()
  - deleteById()

---

### 5. Service Layer
- Created `PolicyRecordService.java`
- Implemented business logic for:
  - Create policy
  - Retrieve all policies
  - Retrieve policy by ID
  - Update policy
  - Delete policy

---

### 6. Controller Layer
- Created `PolicyRecordController.java`
- Implemented REST APIs:

  - POST `/policy` → Create new policy
  - GET `/policy` → Get all policies
  - GET `/policy/{id}` → Get policy by ID
  - PUT `/policy/{id}` → Update policy
  - DELETE `/policy/{id}` → Delete policy

---

### 7. Security Configuration
- Created `SecurityConfig.java`
- Disabled CSRF for testing
- Allowed all API requests using `permitAll()`

---

### 8. Database Integration
- Connected Spring Boot with PostgreSQL
- Verified that table `policy_record` is created automatically
- Confirmed data is stored in database

---

### 9. API Testing
- Tested all APIs using Postman

Verified:
- POST request successfully saves data
- GET request retrieves all data
- GET by ID returns specific record
- PUT request updates data correctly
- DELETE request removes data

---

## 🧪 Sample API Tested

### POST /policy
```json
{
  "policyName": "Security Policy",
  "description": "Protects system data",
  "category": "IT",
  "status": "Active"
}
```

---

## 🚀 Current Status

✔ Spring Boot backend setup completed  
✔ PostgreSQL database connected successfully  
✔ Layered architecture implemented  
✔ CRUD APIs developed  
✔ All APIs tested using Postman  

---

## 📅 Next Plan

- Implement JWT Authentication
- Add validation annotations (@NotNull, @Size)
- Add exception handling
- Improve security configuration

## Day 3 Progress - Java Developer 1

### Work Done Today

Today I worked on improving the backend logic of the Regulatory Policy Alignment Tool. I completed the service layer properly and added exception handling for API errors.

### Tasks Completed

#### 1. Service Layer Improvement
- Updated `PolicyRecordService.java`
- Implemented proper business logic for:
  - Create policy
  - Get all policies
  - Get policy by ID
  - Update policy
  - Delete policy

#### 2. Full Update Logic
- Improved update API logic
- Updated all fields:
  - policyName
  - description
  - category
  - status

#### 3. Exception Handling
- Created `GlobalExceptionHandler.java`
- Added handling for:
  - Validation errors
  - Runtime exceptions
  - General exceptions

#### 4. API Testing
- Tested APIs in Postman:
  - POST
  - GET all
  - GET by ID
  - PUT
  - DELETE

### Status

✅ Service layer completed  
✅ Update logic improved  
✅ Exception handling added  
✅ CRUD APIs tested successfully  

### Next Plan

- Add validation annotations
- Improve controller responses
- Continue remaining backend tasks step by step

