# Complete Full-Stack Setup Guide

## Teacher Professional Development Platform

A complete full-stack application with React (TypeScript) frontend and Node.js + MySQL backend.

---

## 🎯 What You'll Need

### Required Software

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **MySQL Server** (v8.0 or higher)
   - Download: https://dev.mysql.com/downloads/installer/
   - During installation, set a root password (remember this!)

3. **DBeaver Community** (Database Management Tool)
   - Download: https://dbeaver.io/download/
   - Free and powerful MySQL client

4. **VS Code** (Recommended)
   - Download: https://code.visualstudio.com/

---

## 🚀 Quick Start (5 Steps)

### Step 1: Install Backend Dependencies

```cmd
cd c:\fedfproject\Teacher\backend
npm install
```

### Step 2: Configure Database

1. Open DBeaver
2. Create new MySQL connection (localhost:3306)
3. Create database:
   ```sql
   CREATE DATABASE teacher_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### Step 3: Configure Environment

```cmd
cd c:\fedfproject\Teacher\backend
copy .env.example .env
```

Edit `.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=teacher_platform
JWT_SECRET=change-this-to-random-secret
```

### Step 4: Setup Database

**Option A - Using Scripts (Easy):**
```cmd
cd c:\fedfproject\Teacher\backend
start-backend.bat
```

**Option B - Manual:**
```cmd
npm run migrate
npm run seed
```

### Step 5: Start Both Servers

**Terminal 1 (Backend):**
```cmd
cd c:\fedfproject\Teacher\backend
npm run dev
```
✅ Backend: http://localhost:3000

**Terminal 2 (Frontend):**
```cmd
cd c:\fedfproject\Teacher
npm run dev
```
✅ Frontend: http://localhost:5173

---

## 📁 Project Structure

```
Teacher/
├── backend/                    # Node.js + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts     # MySQL connection
│   │   ├── database/
│   │   │   ├── schema.sql      # Database schema
│   │   │   ├── migrate.ts      # Run migrations
│   │   │   └── seed.ts         # Sample data
│   │   ├── middleware/
│   │   │   ├── auth.ts         # JWT authentication
│   │   │   ├── errorHandler.ts
│   │   │   └── validator.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── courses.routes.ts
│   │   │   ├── jobs.routes.ts
│   │   │   ├── quizzes.routes.ts
│   │   │   ├── notifications.routes.ts
│   │   │   ├── timetable.routes.ts
│   │   │   ├── analytics.routes.ts
│   │   │   ├── chat.routes.ts
│   │   │   └── leaderboard.routes.ts
│   │   └── server.ts           # Main server
│   ├── .env                    # Configuration
│   ├── package.json
│   └── README.md
│
├── src/                        # React Frontend
│   ├── components/
│   ├── pages/
│   ├── utils/
│   │   ├── api.ts              # API client
│   │   └── auth.ts             # Auth utilities
│   └── main.tsx
│
├── .env                        # Frontend config
└── package.json
```

---

## 🔐 Test Credentials

After running `npm run seed`, use these credentials:

| Email | Password | Role |
|-------|----------|------|
| john.teacher@example.com | password123 | Teacher |
| jane.teacher@example.com | password123 | Teacher |
| admin@example.com | password123 | Admin |

---

## 🗄️ Database Tables

The backend creates these tables:

- **users** - User accounts and profiles
- **courses** - Available courses
- **course_enrollments** - User enrollments
- **quizzes** - Quiz definitions
- **quiz_questions** - Questions and answers
- **quiz_attempts** - User quiz attempts
- **jobs** - Job listings
- **job_applications** - User applications
- **interview_sessions** - Interview practice
- **chat_messages** - Chat system
- **notifications** - User notifications
- **timetable_entries** - Calendar events
- **leaderboard** - Gamification scores
- **reports** - Generated reports
- **resumes** - User resumes

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/my/enrollments` - My courses
- `PUT /api/courses/:id/progress` - Update progress

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/apply` - Apply for job
- `GET /api/jobs/my/applications` - My applications

### Quizzes
- `GET /api/quizzes` - List quizzes
- `GET /api/quizzes/:id` - Get quiz with questions
- `POST /api/quizzes/:id/start` - Start quiz attempt
- `POST /api/quizzes/:id/submit` - Submit answers
- `GET /api/quizzes/my/attempts` - My attempts

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read/all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Timetable
- `GET /api/timetable` - Get schedule
- `POST /api/timetable` - Create entry
- `PUT /api/timetable/:id` - Update entry
- `DELETE /api/timetable/:id` - Delete entry

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/courses/progress` - Course progress
- `GET /api/analytics/quizzes/performance` - Quiz performance

### Chat
- `GET /api/chat/messages` - Get messages
- `POST /api/chat/messages` - Send message
- `GET /api/chat/conversations` - List conversations
- `DELETE /api/chat/messages/:id` - Delete message

### Leaderboard
- `GET /api/leaderboard` - Get rankings
- `GET /api/leaderboard/my-rank` - My rank

---

## 💻 Frontend Integration

The frontend is already configured to connect to the backend. Import API methods:

```typescript
import { 
  authAPI, 
  coursesAPI, 
  jobsAPI, 
  quizzesAPI,
  notificationsAPI,
  timetableAPI,
  analyticsAPI,
  chatAPI,
  leaderboardAPI 
} from './utils/api';

// Example: Login
const response = await authAPI.login({ email, password });
localStorage.setItem('token', response.data.token);

// Example: Fetch courses
const courses = await coursesAPI.getAll({ category: 'Mathematics' });

// Example: Enroll in course
await coursesAPI.enroll(courseId);
```

See `BACKEND_INTEGRATION_GUIDE.md` for detailed examples.

---

## 🔍 Testing with DBeaver

### View All Users
```sql
SELECT id, email, first_name, last_name, points, level 
FROM users;
```

### View Course Enrollments
```sql
SELECT 
    u.first_name, 
    u.last_name, 
    c.title, 
    ce.progress, 
    ce.status
FROM course_enrollments ce
JOIN users u ON ce.user_id = u.id
JOIN courses c ON ce.course_id = c.id;
```

### View Leaderboard
```sql
SELECT 
    u.first_name,
    u.last_name,
    l.score,
    l.rank
FROM leaderboard l
JOIN users u ON l.user_id = u.id
ORDER BY l.score DESC;
```

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
- Ensure MySQL service is running (Windows Services)
- Check DB_PASSWORD in .env matches MySQL root password
- Verify firewall allows port 3306

### "Port 3000 already in use"
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change PORT in backend/.env

### "CORS Error" in frontend
- Verify backend is running on port 3000
- Check CORS_ORIGIN in backend/.env matches frontend URL
- Restart backend server

### "Module not found"
```cmd
# Backend
cd backend
npm install

# Frontend
cd ..
npm install
```

---

## 📚 Additional Documentation

- **Backend API**: See `backend/README.md`
- **Database Setup**: See `backend/SETUP_GUIDE.md`
- **Integration Guide**: See `BACKEND_INTEGRATION_GUIDE.md`
- **Authentication**: See `AUTHENTICATION.md`

---

## 🔒 Security Features

✅ JWT Authentication
✅ Password hashing (bcrypt)
✅ Input validation
✅ SQL injection prevention
✅ Rate limiting
✅ CORS protection
✅ Helmet security headers

---

## 🎨 Features Implemented

### Core Features
- ✅ User authentication (register/login)
- ✅ Course browsing and enrollment
- ✅ Job search and application
- ✅ Interactive quizzes with scoring
- ✅ Personal timetable/calendar
- ✅ Real-time notifications
- ✅ One-on-one chat messaging
- ✅ Analytics dashboard
- ✅ Leaderboard and gamification
- ✅ Profile management

### Technical Features
- ✅ RESTful API architecture
- ✅ MySQL database with proper relations
- ✅ JWT authentication middleware
- ✅ Input validation
- ✅ Error handling
- ✅ Database migrations
- ✅ Seed data for testing
- ✅ CORS configuration
- ✅ Rate limiting

---

## 🚀 Deployment (Optional)

### Backend Deployment
- Deploy to Heroku, Railway, or DigitalOcean
- Use managed MySQL (AWS RDS, PlanetScale)
- Set environment variables
- Enable HTTPS

### Frontend Deployment
- Deploy to Vercel, Netlify, or GitHub Pages
- Update VITE_API_URL to production backend
- Build: `npm run build`

---

## 📞 Support

For issues:
1. Check error messages in browser console
2. Check backend logs in terminal
3. Verify database connection in DBeaver
4. Review .env configuration
5. Ensure all services are running

---

## 📄 License

ISC License - Free to use and modify

---

## 🎉 Success Checklist

- [ ] MySQL installed and running
- [ ] DBeaver connected to database
- [ ] Backend dependencies installed
- [ ] .env configured correctly
- [ ] Database migrated successfully
- [ ] Sample data seeded
- [ ] Backend running on port 3000
- [ ] Frontend running on port 5173
- [ ] Can login with test credentials
- [ ] Can view courses
- [ ] Can enroll in courses
- [ ] Can view analytics dashboard

**All done? You're ready to develop! 🚀**

---

## 🔄 Daily Development Workflow

1. Start MySQL service (if not automatic)
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd .. && npm run dev`
4. Make changes and test
5. Check DBeaver to verify database changes
6. Commit your code

Happy coding! 🎓
