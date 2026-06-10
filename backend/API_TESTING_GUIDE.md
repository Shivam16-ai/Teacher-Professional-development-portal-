# API Testing Guide

Complete guide for testing the Teacher Platform API endpoints.

## 🛠️ Testing Tools

You can use any of these tools:
- **Postman** (Recommended) - https://www.postman.com/downloads/
- **Thunder Client** (VS Code Extension)
- **curl** (Command line)
- **PowerShell** (Windows built-in)

## 🔑 Getting Authentication Token

### 1. Register a New User

**Endpoint:** `POST http://localhost:3000/api/auth/register`

**Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User",
  "specialization": "Mathematics",
  "experienceYears": 5
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 4,
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "role": "teacher"
  }
}
```

**Save the token** - You'll need it for authenticated requests!

### 2. Login with Existing User

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Body (JSON):**
```json
{
  "email": "john.teacher@example.com",
  "password": "password123"
}
```

---

## 📋 Complete API Test Collection

### Authentication Endpoints

#### 1. Register User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "New",
  "lastName": "User"
}
```

#### 2. Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john.teacher@example.com",
  "password": "password123"
}
```

#### 3. Get Current User Profile
```http
GET http://localhost:3000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4. Update Profile
```http
PUT http://localhost:3000/api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Updated",
  "bio": "Experienced mathematics teacher",
  "specialization": "Advanced Mathematics",
  "experienceYears": 10
}
```

#### 5. Change Password
```http
PUT http://localhost:3000/api/auth/change-password
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

---

### Course Endpoints

#### 1. Get All Courses
```http
GET http://localhost:3000/api/courses
```

#### 2. Get All Courses with Filters
```http
GET http://localhost:3000/api/courses?category=Mathematics&level=intermediate&search=algebra
```

#### 3. Get Single Course
```http
GET http://localhost:3000/api/courses/1
```

#### 4. Enroll in Course
```http
POST http://localhost:3000/api/courses/1/enroll
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 5. Get My Enrollments
```http
GET http://localhost:3000/api/courses/my/enrollments
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 6. Update Course Progress
```http
PUT http://localhost:3000/api/courses/1/progress
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "progress": 50,
  "status": "in_progress"
}
```

---

### Job Endpoints

#### 1. Get All Jobs
```http
GET http://localhost:3000/api/jobs
```

#### 2. Get Jobs with Filters
```http
GET http://localhost:3000/api/jobs?jobType=full-time&experienceLevel=senior&location=Chicago
```

#### 3. Get Single Job
```http
GET http://localhost:3000/api/jobs/1
```

#### 4. Apply for Job
```http
POST http://localhost:3000/api/jobs/1/apply
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "coverLetter": "I am very interested in this position...",
  "resumeUrl": "https://example.com/resume.pdf"
}
```

#### 5. Get My Applications
```http
GET http://localhost:3000/api/jobs/my/applications
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Quiz Endpoints

#### 1. Get All Quizzes
```http
GET http://localhost:3000/api/quizzes
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 2. Get Quizzes by Course
```http
GET http://localhost:3000/api/quizzes?courseId=1
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 3. Get Quiz with Questions
```http
GET http://localhost:3000/api/quizzes/1
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4. Start Quiz Attempt
```http
POST http://localhost:3000/api/quizzes/1/start
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 5. Submit Quiz
```http
POST http://localhost:3000/api/quizzes/1/submit
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "attemptId": 1,
  "answers": {
    "1": "Student-centered learning",
    "2": "Group projects",
    "3": "The gap between what a learner can do independently and with guidance"
  }
}
```

#### 6. Get My Quiz Attempts
```http
GET http://localhost:3000/api/quizzes/my/attempts
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Notification Endpoints

#### 1. Get All Notifications
```http
GET http://localhost:3000/api/notifications
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 2. Get Notifications with Pagination
```http
GET http://localhost:3000/api/notifications?limit=10&offset=0
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 3. Mark Notification as Read
```http
PUT http://localhost:3000/api/notifications/1/read
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4. Mark All Notifications as Read
```http
PUT http://localhost:3000/api/notifications/read/all
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 5. Delete Notification
```http
DELETE http://localhost:3000/api/notifications/1
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Timetable Endpoints

#### 1. Get All Timetable Entries
```http
GET http://localhost:3000/api/timetable
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 2. Get Timetable with Date Range
```http
GET http://localhost:3000/api/timetable?startDate=2026-06-01&endDate=2026-06-30
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 3. Create Timetable Entry
```http
POST http://localhost:3000/api/timetable
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Mathematics Class - Grade 10",
  "description": "Algebra lesson on quadratic equations",
  "startTime": "2026-06-10T09:00:00",
  "endTime": "2026-06-10T10:00:00",
  "location": "Room 101",
  "eventType": "class",
  "color": "#3b82f6",
  "isAllDay": false,
  "reminderMinutes": 15
}
```

#### 4. Update Timetable Entry
```http
PUT http://localhost:3000/api/timetable/1
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Mathematics Class - Grade 10 (Updated)",
  "startTime": "2026-06-10T10:00:00",
  "endTime": "2026-06-10T11:00:00"
}
```

#### 5. Delete Timetable Entry
```http
DELETE http://localhost:3000/api/timetable/1
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Analytics Endpoints

#### 1. Get Dashboard Analytics
```http
GET http://localhost:3000/api/analytics/dashboard
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 2. Get Course Progress Analytics
```http
GET http://localhost:3000/api/analytics/courses/progress
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 3. Get Quiz Performance Analytics
```http
GET http://localhost:3000/api/analytics/quizzes/performance
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Chat Endpoints

#### 1. Get Messages with User
```http
GET http://localhost:3000/api/chat/messages?receiverId=2
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 2. Send Message
```http
POST http://localhost:3000/api/chat/messages
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "receiverId": 2,
  "message": "Hello! How are you doing with the mathematics course?",
  "messageType": "text"
}
```

#### 3. Get Conversations List
```http
GET http://localhost:3000/api/chat/conversations
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 4. Delete Message
```http
DELETE http://localhost:3000/api/chat/messages/1
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Leaderboard Endpoints

#### 1. Get Leaderboard
```http
GET http://localhost:3000/api/leaderboard?category=courses_completed&period=all-time&limit=10
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 2. Get My Rank
```http
GET http://localhost:3000/api/leaderboard/my-rank?category=courses_completed&period=all-time
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🧪 Testing with PowerShell (Windows)

### Login Example
```powershell
$body = @{
    email = "john.teacher@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Body $body -ContentType "application/json"

# Save token
$token = $response.token
Write-Host "Token: $token"
```

### Get Profile Example
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

$profile = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method Get -Headers $headers
$profile.user
```

### Get Courses Example
```powershell
$courses = Invoke-RestMethod -Uri "http://localhost:3000/api/courses" -Method Get
$courses.courses
```

---

## 🧪 Testing with curl (Linux/Mac/Git Bash)

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.teacher@example.com","password":"password123"}'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Enroll in Course
```bash
curl -X POST http://localhost:3000/api/courses/1/enroll \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ✅ Test Scenarios

### Scenario 1: New User Registration and Course Enrollment

1. Register new user
2. Login with credentials
3. Get all courses
4. Enroll in a course
5. Check enrollment status
6. Update course progress

### Scenario 2: Quiz Taking Flow

1. Login
2. Get available quizzes
3. Get quiz with questions
4. Start quiz attempt
5. Submit quiz with answers
6. Check quiz results
7. View quiz attempts history

### Scenario 3: Job Application Flow

1. Login
2. Search for jobs
3. Get job details
4. Apply for job
5. Check application status
6. View all my applications

### Scenario 4: Social Features

1. Login
2. Check notifications
3. Mark notifications as read
4. Get leaderboard
5. Check my rank
6. Send chat message
7. View chat history

---

## 🐛 Common Response Codes

- **200 OK** - Successful GET/PUT request
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## 📝 Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

### Validation Error Response
```json
{
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## 🔍 Debugging Tips

1. **Check Backend Logs** - Look at terminal running backend
2. **Verify Token** - Ensure Authorization header is correct
3. **Check Request Body** - Validate JSON format
4. **Database State** - Use DBeaver to check database
5. **Network Tab** - Use browser DevTools to inspect requests

---

## 📦 Postman Collection Import

Create a file named `Teacher_Platform_API.postman_collection.json`:

```json
{
  "info": {
    "name": "Teacher Platform API",
    "description": "Complete API collection for Teacher Professional Development Platform",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{auth_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000/api"
    },
    {
      "key": "auth_token",
      "value": ""
    }
  ]
}
```

Import this into Postman and start testing!

---

## 🎯 Next Steps

1. Test all authentication endpoints
2. Test course enrollment flow
3. Test quiz taking flow
4. Test job application flow
5. Test analytics endpoints
6. Test chat functionality
7. Verify leaderboard updates

Happy Testing! 🚀
