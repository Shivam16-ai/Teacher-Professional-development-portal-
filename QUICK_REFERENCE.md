# 🚀 Quick Reference Card

## ⚡ Quick Start Commands

### First Time Setup
```cmd
cd backend
npm install
copy .env.example .env
REM Edit .env with MySQL password
npm run migrate
npm run seed
```

### Start Development
```cmd
REM Terminal 1 - Backend
cd backend
npm run dev

REM Terminal 2 - Frontend
npm run dev
```

---

## 🔑 Test Credentials

```
Email: john.teacher@example.com
Password: password123

Email: admin@example.com
Password: password123
```

---

## 🌐 URLs

- **Backend API:** http://localhost:3000
- **Frontend:** http://localhost:5173
- **Health Check:** http://localhost:3000/health

---

## 📡 Common API Calls

### Login
```typescript
import { authAPI } from './utils/api';

const response = await authAPI.login({ 
  email: 'john.teacher@example.com', 
  password: 'password123' 
});
localStorage.setItem('token', response.data.token);
```

### Get Courses
```typescript
import { coursesAPI } from './utils/api';

const response = await coursesAPI.getAll();
setCourses(response.data.courses);
```

### Enroll in Course
```typescript
await coursesAPI.enroll(courseId);
```

### Get Notifications
```typescript
import { notificationsAPI } from './utils/api';

const response = await notificationsAPI.getAll();
setNotifications(response.data.notifications);
```

---

## 🗄️ Database Quick Queries

### View Users
```sql
SELECT * FROM users;
```

### View Enrollments
```sql
SELECT u.first_name, c.title, ce.progress, ce.status
FROM course_enrollments ce
JOIN users u ON ce.user_id = u.id
JOIN courses c ON ce.course_id = c.id;
```

### View Leaderboard
```sql
SELECT u.first_name, u.last_name, u.points
FROM users u
ORDER BY u.points DESC
LIMIT 10;
```

---

## 📁 Project Structure

```
Teacher/
├── backend/                 Backend API
│   ├── src/
│   │   ├── routes/         API endpoints
│   │   ├── middleware/     Auth & validation
│   │   ├── database/       Schema & migrations
│   │   └── server.ts       Main server
│   └── .env                Configuration
│
└── src/                    Frontend
    ├── pages/              React pages
    ├── components/         React components
    └── utils/
        └── api.ts          API client
```

---

## 🔧 Troubleshooting

### Backend won't start
```cmd
# Check MySQL is running
services.msc

# Check port 3000
netstat -ano | findstr :3000
```

### Can't connect to database
```cmd
# Verify .env credentials
# Check MySQL service is running
# Test in DBeaver
```

### Frontend can't connect
```cmd
# Ensure backend is running
# Check VITE_API_URL in .env
# Restart both servers
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `FULL_STACK_SETUP.md` | Complete setup guide |
| `BACKEND_INTEGRATION_GUIDE.md` | Integration examples |
| `backend/README.md` | API documentation |
| `backend/SETUP_GUIDE.md` | Detailed setup steps |
| `backend/API_TESTING_GUIDE.md` | API testing |

---

## ✅ Quick Checklist

- [ ] MySQL installed and running
- [ ] Backend dependencies installed
- [ ] .env configured
- [ ] Database migrated
- [ ] Sample data seeded
- [ ] Backend server running (port 3000)
- [ ] Frontend server running (port 5173)
- [ ] Can login with test credentials

---

## 🎯 Next Actions

1. **Test Login** - Try logging in with test credentials
2. **Browse Courses** - Navigate to courses page
3. **Check Database** - Open DBeaver and explore tables
4. **Integrate Components** - Start replacing mock data with API calls

---

**Need Help?** Check `BACKEND_COMPLETE.md` for full details!
