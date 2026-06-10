# Teacher Professional Development Platform - Backend API

Complete backend API for the Teacher Professional Development Platform with MySQL database integration.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Course Management**: Browse, enroll, and track progress in professional development courses
- **Job Portal**: Search and apply for teaching positions
- **Quiz System**: Interactive quizzes with scoring and performance tracking
- **Timetable Management**: Schedule and manage daily activities
- **Notifications**: Real-time notification system
- **Live Chat**: One-on-one messaging between users
- **Analytics Dashboard**: Comprehensive learning analytics and insights
- **Leaderboard**: Gamified learning with points and rankings
- **Security**: Helmet, rate limiting, input validation, and secure password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- DBeaver Community (or any MySQL client for database management)

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

#### Using DBeaver:

1. Open DBeaver Community
2. Create a new MySQL connection:
   - Host: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: `your_password`
3. Create a new database:
   ```sql
   CREATE DATABASE teacher_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
copy .env.example .env
```

Edit `.env` with your settings:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=teacher_platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 4. Run Database Migrations

```bash
npm run migrate
```

This will create all necessary tables in your database.

### 5. Seed Database (Optional)

```bash
npm run seed
```

This will populate the database with sample data for testing.

**Test Credentials:**
- Email: `john.teacher@example.com` | Password: `password123`
- Email: `jane.teacher@example.com` | Password: `password123`
- Email: `admin@example.com` | Password: `password123`

## 🎯 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "specialization": "Mathematics",
  "experienceYears": 5
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "teacher@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}
```

### Course Endpoints

#### Get All Courses
```
GET /api/courses?category=Mathematics&level=intermediate&search=algebra
```

#### Get Single Course
```
GET /api/courses/:id
```

#### Enroll in Course
```
POST /api/courses/:id/enroll
Authorization: Bearer {token}
```

#### Get My Enrollments
```
GET /api/courses/my/enrollments
Authorization: Bearer {token}
```

### Job Endpoints

#### Get All Jobs
```
GET /api/jobs?jobType=full-time&location=Chicago
```

#### Apply for Job
```
POST /api/jobs/:id/apply
Authorization: Bearer {token}
Content-Type: application/json

{
  "coverLetter": "I am interested in...",
  "resumeUrl": "https://..."
}
```

### Quiz Endpoints

#### Get All Quizzes
```
GET /api/quizzes?courseId=1
Authorization: Bearer {token}
```

#### Get Quiz with Questions
```
GET /api/quizzes/:id
Authorization: Bearer {token}
```

#### Start Quiz Attempt
```
POST /api/quizzes/:id/start
Authorization: Bearer {token}
```

#### Submit Quiz
```
POST /api/quizzes/:id/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "attemptId": 1,
  "answers": {
    "1": "Answer to question 1",
    "2": "Answer to question 2"
  }
}
```

### Notification Endpoints

#### Get Notifications
```
GET /api/notifications?limit=20&offset=0
Authorization: Bearer {token}
```

#### Mark as Read
```
PUT /api/notifications/:id/read
Authorization: Bearer {token}
```

### Timetable Endpoints

#### Get Timetable
```
GET /api/timetable?startDate=2026-06-01&endDate=2026-06-30
Authorization: Bearer {token}
```

#### Create Entry
```
POST /api/timetable
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Math Class",
  "startTime": "2026-06-08T09:00:00",
  "endTime": "2026-06-08T10:00:00",
  "eventType": "class"
}
```

### Analytics Endpoints

#### Get Dashboard Analytics
```
GET /api/analytics/dashboard
Authorization: Bearer {token}
```

#### Get Course Progress
```
GET /api/analytics/courses/progress
Authorization: Bearer {token}
```

### Chat Endpoints

#### Get Messages
```
GET /api/chat/messages?receiverId=2
Authorization: Bearer {token}
```

#### Send Message
```
POST /api/chat/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "receiverId": 2,
  "message": "Hello!"
}
```

### Leaderboard Endpoints

#### Get Leaderboard
```
GET /api/leaderboard?category=courses_completed&period=all-time&limit=10
Authorization: Bearer {token}
```

## 🗄️ Database Schema

The database includes the following tables:

- **users**: User accounts and profiles
- **courses**: Available courses
- **course_enrollments**: User course enrollments and progress
- **quizzes**: Quiz definitions
- **quiz_questions**: Quiz questions and answers
- **quiz_attempts**: User quiz attempts and scores
- **jobs**: Job listings
- **job_applications**: User job applications
- **interview_sessions**: Interview practice sessions
- **chat_messages**: Chat messages between users
- **notifications**: User notifications
- **timetable_entries**: Calendar events and schedules
- **reports**: Generated reports
- **resumes**: User resumes
- **leaderboard**: Gamification scores and rankings

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: Prevent abuse with request rate limiting
- **Helmet**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **SQL Injection Prevention**: Parameterized queries

## 🧪 Testing with DBeaver

1. Open DBeaver and connect to your database
2. Browse tables to view data
3. Run custom queries:
   ```sql
   -- View all users
   SELECT * FROM users;
   
   -- View course enrollments
   SELECT u.first_name, u.last_name, c.title, ce.status, ce.progress
   FROM course_enrollments ce
   JOIN users u ON ce.user_id = u.id
   JOIN courses c ON ce.course_id = c.id;
   
   -- View leaderboard
   SELECT u.first_name, u.last_name, l.score, l.rank
   FROM leaderboard l
   JOIN users u ON l.user_id = u.id
   ORDER BY l.score DESC;
   ```

## 🐛 Troubleshooting

### Database Connection Issues

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution**: 
- Ensure MySQL is running
- Check DB_HOST, DB_PORT, DB_USER, and DB_PASSWORD in .env
- Verify firewall settings

### Migration Errors

```
Error: Table 'users' already exists
```

**Solution**:
- Drop existing tables or database
- Run migration again

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:
- Change PORT in .env
- Or kill the process using port 3000

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── database/
│   │   ├── schema.sql            # Database schema
│   │   ├── migrate.ts            # Migration script
│   │   └── seed.ts               # Seed data script
│   ├── middleware/
│   │   ├── auth.ts               # Authentication middleware
│   │   ├── errorHandler.ts      # Error handling
│   │   └── validator.ts          # Input validation
│   ├── routes/
│   │   ├── auth.routes.ts        # Authentication routes
│   │   ├── courses.routes.ts     # Course routes
│   │   ├── jobs.routes.ts        # Job routes
│   │   ├── quizzes.routes.ts     # Quiz routes
│   │   ├── notifications.routes.ts
│   │   ├── timetable.routes.ts
│   │   ├── analytics.routes.ts
│   │   ├── chat.routes.ts
│   │   └── leaderboard.routes.ts
│   └── server.ts                 # Main server file
├── .env.example                  # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 💡 Support

For issues or questions, please contact the development team or open an issue in the repository.
