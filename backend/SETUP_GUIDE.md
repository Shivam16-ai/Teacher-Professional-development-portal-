# Complete Setup Guide - Teacher Platform Backend

## Step-by-Step Setup Instructions

### Step 1: Install MySQL

#### Windows:
1. Download MySQL from: https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set root password during installation
4. Complete the installation wizard

### Step 2: Install DBeaver Community

1. Download from: https://dbeaver.io/download/
2. Install DBeaver
3. Launch DBeaver

### Step 3: Create Database Connection in DBeaver

1. Click "New Database Connection" (plug icon)
2. Select "MySQL"
3. Click "Next"
4. Enter connection details:
   - **Server Host**: localhost
   - **Port**: 3306
   - **Database**: (leave empty for now)
   - **Username**: root
   - **Password**: (your MySQL root password)
5. Click "Test Connection"
6. If successful, click "Finish"

### Step 4: Create Database

1. In DBeaver, open SQL Editor (Ctrl+])
2. Execute:
   ```sql
   CREATE DATABASE teacher_platform 
   CHARACTER SET utf8mb4 
   COLLATE utf8mb4_unicode_ci;
   ```
3. Right-click on connection → Refresh
4. You should see "teacher_platform" database

### Step 5: Setup Backend

1. Open terminal in backend folder:
   ```cmd
   cd c:\fedfproject\Teacher\backend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Create .env file:
   ```cmd
   copy .env.example .env
   ```

4. Edit .env file with Notepad:
   ```env
   PORT=3000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
   DB_NAME=teacher_platform
   
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRE=7d
   
   CORS_ORIGIN=http://localhost:5173
   ```

5. Run database migration:
   ```cmd
   npm run migrate
   ```
   
   ✅ You should see: "Database migration completed successfully!"

6. Seed the database with sample data:
   ```cmd
   npm run seed
   ```
   
   ✅ You should see test credentials printed

### Step 6: Verify Database in DBeaver

1. In DBeaver, expand "teacher_platform" database
2. Expand "Tables" - you should see:
   - users
   - courses
   - course_enrollments
   - jobs
   - job_applications
   - quizzes
   - quiz_questions
   - quiz_attempts
   - chat_messages
   - notifications
   - timetable_entries
   - leaderboard
   - reports
   - resumes
   - interview_sessions

3. Right-click on "users" → View Data
4. You should see 3 users (John, Jane, Admin)

### Step 7: Start Backend Server

```cmd
npm run dev
```

✅ You should see:
```
╔═══════════════════════════════════════════════╗
║   Teacher Platform Backend Server Started   ║
╚═══════════════════════════════════════════════╝

🚀 Server running on http://localhost:3000
📊 Environment: development
💾 Database: Connected to teacher_platform
```

### Step 8: Test API Endpoints

#### Test 1: Health Check
Open browser: http://localhost:3000/health

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

#### Test 2: Get Courses
Open browser: http://localhost:3000/api/courses

Expected: JSON array of courses

#### Test 3: Login (using Postman or curl)

**Using PowerShell:**
```powershell
$body = @{
    email = "john.teacher@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
```

Expected response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### Step 9: Update Frontend Configuration

1. Navigate to frontend root:
   ```cmd
   cd c:\fedfproject\Teacher
   ```

2. Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. Update `src/utils/api.ts` to use the API URL:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
   ```

### Step 10: Start Frontend

```cmd
npm run dev
```

Open browser: http://localhost:5173

### Step 11: Test Complete Flow

1. **Register a new account**:
   - Go to Register page
   - Fill in details
   - Submit

2. **Login**:
   - Use registered credentials
   - Should redirect to dashboard

3. **Browse Courses**:
   - Navigate to Courses
   - See seeded courses
   - Enroll in a course

4. **Check Database**:
   - In DBeaver, query:
   ```sql
   SELECT * FROM course_enrollments ORDER BY enrolled_at DESC LIMIT 5;
   ```
   - Should see your enrollment

## Common Issues & Solutions

### Issue 1: "Error: connect ECONNREFUSED"
**Cause**: MySQL not running or wrong credentials

**Solution**:
- Open Services (Windows + R → services.msc)
- Find "MySQL80" service
- Start if stopped
- Verify .env credentials

### Issue 2: "ER_ACCESS_DENIED_ERROR"
**Cause**: Wrong MySQL password

**Solution**:
- Reset MySQL root password
- Update .env file

### Issue 3: "Port 3000 already in use"
**Cause**: Another process using port 3000

**Solution**:
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

Or change PORT in .env

### Issue 4: "Cannot find module"
**Cause**: Dependencies not installed

**Solution**:
```cmd
cd backend
npm install
```

### Issue 5: Frontend can't connect to backend
**Cause**: CORS or wrong API URL

**Solution**:
- Verify CORS_ORIGIN in backend .env
- Verify VITE_API_URL in frontend .env
- Restart both servers

## Useful DBeaver Queries

### View all users with points
```sql
SELECT id, email, first_name, last_name, points, level 
FROM users 
ORDER BY points DESC;
```

### View course enrollments
```sql
SELECT 
    u.first_name, 
    u.last_name, 
    c.title as course, 
    ce.progress, 
    ce.status
FROM course_enrollments ce
JOIN users u ON ce.user_id = u.id
JOIN courses c ON ce.course_id = c.id
ORDER BY ce.enrolled_at DESC;
```

### View quiz performance
```sql
SELECT 
    u.first_name,
    u.last_name,
    q.title,
    qa.score,
    qa.completed_at
FROM quiz_attempts qa
JOIN users u ON qa.user_id = u.id
JOIN quizzes q ON qa.quiz_id = q.id
WHERE qa.status = 'completed'
ORDER BY qa.score DESC;
```

### View job applications
```sql
SELECT 
    u.first_name,
    u.last_name,
    j.title as job,
    j.company,
    ja.status,
    ja.applied_at
FROM job_applications ja
JOIN users u ON ja.user_id = u.id
JOIN jobs j ON ja.job_id = j.id
ORDER BY ja.applied_at DESC;
```

## Next Steps

1. ✅ Backend running on port 3000
2. ✅ Frontend running on port 5173
3. ✅ Database connected and populated
4. ✅ Test login and registration
5. 📱 Start building additional features
6. 🎨 Customize the platform
7. 🚀 Deploy to production

## Production Deployment Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Update CORS_ORIGIN to production domain
- [ ] Use environment-specific database
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Implement rate limiting per user
- [ ] Add API documentation (Swagger)
- [ ] Set up CI/CD pipeline

## Support

If you encounter any issues not covered here:
1. Check backend logs in terminal
2. Check DBeaver connection status
3. Verify all environment variables
4. Check firewall settings
5. Review error messages carefully

Happy coding! 🚀
