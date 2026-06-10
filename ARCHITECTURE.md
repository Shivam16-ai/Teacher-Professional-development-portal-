# System Architecture

## 🏗️ Full Stack Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                   (React + TypeScript + Vite)                    │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Pages   │  │Components│  │  Utils   │  │  Styles  │       │
│  │          │  │          │  │          │  │          │       │
│  │ Login    │  │ Button   │  │  api.ts  │  │ style.css│       │
│  │ Courses  │  │ Card     │  │ auth.ts  │  │          │       │
│  │ Jobs     │  │ Input    │  │          │  │          │       │
│  │ Dashboard│  │ Layout   │  │          │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                   │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS Requests
                         │ (axios with JWT tokens)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
│                (Node.js + Express + TypeScript)                  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Middleware Stack                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│  │  │  CORS    │ │  Helmet  │ │   Rate   │ │   Body   │  │   │
│  │  │          │ │ Security │ │ Limiting │ │  Parser  │  │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│  │                                                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │   JWT    │ │   Input  │ │  Error   │               │   │
│  │  │   Auth   │ │Validation│ │ Handler  │               │   │
│  │  └──────────┘ └──────────┘ └──────────┘               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      API Routes                          │   │
│  │                                                          │   │
│  │  /api/auth          - Authentication & User Management  │   │
│  │  /api/courses       - Course Management                 │   │
│  │  /api/jobs          - Job Portal                        │   │
│  │  /api/quizzes       - Quiz System                       │   │
│  │  /api/notifications - Notification System               │   │
│  │  /api/timetable     - Calendar Management               │   │
│  │  /api/analytics     - Analytics Dashboard               │   │
│  │  /api/chat          - Messaging System                  │   │
│  │  /api/leaderboard   - Gamification                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         │ SQL Queries
                         │ (mysql2 with connection pool)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                             │
│                      (MySQL 8.0+)                                │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │   users    │  │  courses   │  │    jobs    │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  quizzes   │  │notifications│ │  timetable │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │    chat    │  │ leaderboard│  │  analytics │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                   │
│              (15 tables with relationships)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

```
1. USER ACTION
   │
   ├─► Click "Login" button
   │
   ▼
2. FRONTEND (React Component)
   │
   ├─► Collect email & password
   ├─► Call authAPI.login({ email, password })
   │
   ▼
3. API CLIENT (utils/api.ts)
   │
   ├─► axios.post('/api/auth/login', data)
   ├─► Add headers, handle errors
   │
   ▼
4. NETWORK LAYER
   │
   ├─► HTTP POST to http://localhost:3000/api/auth/login
   │
   ▼
5. BACKEND MIDDLEWARE
   │
   ├─► CORS check
   ├─► Rate limiting
   ├─► Body parsing
   ├─► Input validation
   │
   ▼
6. ROUTE HANDLER (auth.routes.ts)
   │
   ├─► Extract email & password
   ├─► Query database for user
   ├─► Verify password with bcrypt
   ├─► Generate JWT token
   │
   ▼
7. DATABASE (MySQL)
   │
   ├─► SELECT * FROM users WHERE email = ?
   ├─► Return user record
   │
   ▼
8. RESPONSE
   │
   ├─► { token: "eyJ...", user: {...} }
   │
   ▼
9. FRONTEND RECEIVES
   │
   ├─► Save token to localStorage
   ├─► Update UI state
   ├─► Redirect to dashboard
   │
   ▼
10. USER SEES
    │
    └─► Dashboard page with user data
```

---

## 🗄️ Database Schema

```
users (Central Table)
├── id (PK)
├── email
├── password (hashed)
├── first_name
├── last_name
├── role
├── points
└── level

courses
├── id (PK)
├── title
├── category
├── level
├── instructor
└── is_published

course_enrollments (Join Table)
├── id (PK)
├── user_id (FK → users.id)
├── course_id (FK → courses.id)
├── progress
└── status

jobs
├── id (PK)
├── title
├── company
├── location
└── job_type

job_applications (Join Table)
├── id (PK)
├── user_id (FK → users.id)
├── job_id (FK → jobs.id)
├── status
└── cover_letter

quizzes
├── id (PK)
├── course_id (FK → courses.id)
├── title
└── passing_score

quiz_questions
├── id (PK)
├── quiz_id (FK → quizzes.id)
├── question
├── options (JSON)
└── correct_answer

quiz_attempts
├── id (PK)
├── user_id (FK → users.id)
├── quiz_id (FK → quizzes.id)
├── score
└── answers (JSON)

notifications
├── id (PK)
├── user_id (FK → users.id)
├── title
├── message
└── is_read

timetable_entries
├── id (PK)
├── user_id (FK → users.id)
├── title
├── start_time
└── end_time

chat_messages
├── id (PK)
├── sender_id (FK → users.id)
├── receiver_id (FK → users.id)
├── message
└── is_read

leaderboard
├── id (PK)
├── user_id (FK → users.id)
├── category
├── score
└── rank
```

---

## 🔐 Authentication Flow

```
REGISTRATION
┌──────────┐
│  Client  │
│          │
│ Email    │──┐
│ Password │  │ 1. POST /api/auth/register
│ Name     │  │    { email, password, firstName, lastName }
└──────────┘  │
              │
              ▼
        ┌──────────┐
        │  Server  │
        │          │
        │ Validate │ 2. Check if email exists
        │  Input   │ 3. Hash password (bcrypt)
        │          │ 4. Insert into database
        │ Generate │ 5. Create JWT token
        │   JWT    │
        └──────────┘
              │
              │ 6. Response: { token, user }
              ▼
        ┌──────────┐
        │  Client  │
        │          │
        │ Save     │ 7. localStorage.setItem('token', token)
        │ Token    │ 8. localStorage.setItem('user', user)
        │          │ 9. Redirect to dashboard
        └──────────┘

LOGIN
┌──────────┐
│  Client  │
│          │
│ Email    │──┐
│ Password │  │ 1. POST /api/auth/login
└──────────┘  │    { email, password }
              │
              ▼
        ┌──────────┐
        │  Server  │
        │          │
        │ Find     │ 2. SELECT * FROM users WHERE email = ?
        │ User     │ 3. Compare password with bcrypt
        │          │ 4. Generate JWT token
        │ Verify   │ 5. Update last_login
        └──────────┘
              │
              │ 6. Response: { token, user }
              ▼
        ┌──────────┐
        │  Client  │
        │          │
        │ Save     │ 7. Save token & user data
        │ Token    │ 8. Redirect to dashboard
        └──────────┘

AUTHENTICATED REQUEST
┌──────────┐
│  Client  │──┐ 1. GET /api/courses/my/enrollments
│          │  │    Headers: { Authorization: 'Bearer TOKEN' }
└──────────┘  │
              │
              ▼
        ┌──────────┐
        │Middleware│
        │          │ 2. Extract token from header
        │   JWT    │ 3. Verify token signature
        │  Verify  │ 4. Decode user info (id, email, role)
        │          │ 5. Attach user to request object
        └──────────┘
              │
              │ 6. Continue to route handler
              ▼
        ┌──────────┐
        │  Route   │
        │ Handler  │ 7. Access req.user.id
        │          │ 8. Query database with user_id
        │ Return   │ 9. Return user-specific data
        │  Data    │
        └──────────┘
```

---

## 📦 Technology Stack

### Frontend
- **React** 18.2.0 - UI Framework
- **TypeScript** 5.2.2 - Type Safety
- **Vite** 5.0.8 - Build Tool
- **React Router** 6.20.0 - Navigation
- **Axios** 1.6.2 - HTTP Client
- **FontAwesome** - Icons

### Backend
- **Node.js** 18+ - Runtime
- **Express** 4.18 - Web Framework
- **TypeScript** 5.3 - Type Safety
- **MySQL2** 3.6 - Database Driver
- **bcryptjs** 2.4 - Password Hashing
- **jsonwebtoken** 9.0 - JWT Authentication
- **express-validator** 7.0 - Input Validation
- **cors** 2.8 - Cross-Origin Requests
- **helmet** 7.1 - Security Headers
- **express-rate-limit** 7.1 - Rate Limiting

### Database
- **MySQL** 8.0+ - Relational Database
- **DBeaver** - Database Management

### Development Tools
- **tsx** - TypeScript Execution
- **nodemon** - Auto Restart
- **ESLint** - Code Linting
- **Prettier** - Code Formatting

---

## 🔄 Data Flow Examples

### Example 1: Course Enrollment
```
User clicks "Enroll" button
    ↓
React Component calls coursesAPI.enroll(courseId)
    ↓
API client sends POST /api/courses/:id/enroll with JWT
    ↓
Auth middleware verifies JWT token
    ↓
Route handler extracts user_id from token
    ↓
Check if already enrolled: SELECT * FROM course_enrollments WHERE user_id = ? AND course_id = ?
    ↓
If not enrolled: INSERT INTO course_enrollments (user_id, course_id)
    ↓
Update course stats: UPDATE courses SET total_enrollments = total_enrollments + 1
    ↓
Return success response
    ↓
Frontend updates UI: Show "Enrolled" status
```

### Example 2: Quiz Submission
```
User completes quiz and clicks "Submit"
    ↓
Frontend collects all answers: { questionId: answer, ... }
    ↓
Call quizzesAPI.submit(quizId, { attemptId, answers })
    ↓
Backend receives POST /api/quizzes/:id/submit
    ↓
Query questions: SELECT * FROM quiz_questions WHERE quiz_id = ?
    ↓
Calculate score by comparing user answers with correct_answer
    ↓
Update attempt: UPDATE quiz_attempts SET score = ?, correct_answers = ?, status = 'completed'
    ↓
Award points: UPDATE users SET points = points + ?
    ↓
Create notification: INSERT INTO notifications (user_id, message)
    ↓
Return { score, correctAnswers, totalQuestions, pointsEarned }
    ↓
Frontend shows results modal
```

---

## 🔒 Security Architecture

```
┌─────────────────────────────────────────┐
│         Request Security Layers          │
└─────────────────────────────────────────┘

Layer 1: Rate Limiting
    ├─ Limit: 100 requests per 15 minutes
    └─ Protection: Prevent abuse/DoS

Layer 2: CORS
    ├─ Allowed Origins: localhost:5173
    └─ Protection: Prevent unauthorized domains

Layer 3: Helmet
    ├─ Security Headers
    └─ Protection: XSS, clickjacking, etc.

Layer 4: Input Validation
    ├─ Express-validator
    └─ Protection: Invalid data, injection

Layer 5: JWT Authentication
    ├─ Token verification
    └─ Protection: Unauthorized access

Layer 6: SQL Parameterization
    ├─ Prepared statements
    └─ Protection: SQL injection

Layer 7: Password Hashing
    ├─ bcrypt with 10 rounds
    └─ Protection: Password leaks
```

---

## 📊 Performance Considerations

### Connection Pooling
```
┌─────────────┐
│  Frontend   │
│ (1000 users)│
└──────┬──────┘
       │ HTTP Requests
       ▼
┌─────────────┐
│   Backend   │
│  (Express)  │
└──────┬──────┘
       │ SQL Queries
       ▼
┌─────────────┐
│ Connection  │
│    Pool     │ ← Reuse connections
│  (10 conns) │ ← Limit: 10
└──────┬──────┘ ← Queue if all busy
       │
       ▼
┌─────────────┐
│   MySQL     │
└─────────────┘
```

### Caching Strategy (Future)
- JWT tokens cached in localStorage
- API responses can be cached with React Query
- Database query results can be cached with Redis

---

## 🚀 Deployment Architecture (Future)

```
┌──────────────────────────────────────────┐
│          Production Stack                 │
└──────────────────────────────────────────┘

Frontend (Vercel/Netlify)
    ├─ CDN for static assets
    ├─ HTTPS enabled
    └─ Environment variables configured

Backend (Heroku/Railway/DigitalOcean)
    ├─ HTTPS enabled
    ├─ Environment variables set
    ├─ Process monitoring
    └─ Auto-restart on crash

Database (AWS RDS/PlanetScale)
    ├─ Managed MySQL service
    ├─ Automated backups
    ├─ Scalable storage
    └─ High availability
```

---

This architecture provides a solid foundation for a scalable, secure, and maintainable full-stack application! 🎉
