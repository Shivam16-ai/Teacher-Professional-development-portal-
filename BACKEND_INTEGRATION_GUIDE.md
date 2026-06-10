# Backend Integration Guide

This guide shows you how to use the backend API in your React frontend components.

## 📦 Setup

The backend API is already configured in `src/utils/api.ts` with ready-to-use API methods.

## 🔑 Authentication

### Login Example

```typescript
import { authAPI } from '../utils/api';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authAPI.login({ email, password });
    
    // Save token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error: any) {
    console.error('Login failed:', error);
    setError(error.response?.data?.error || 'Login failed');
  }
};
```

### Register Example

```typescript
import { authAPI } from '../utils/api';

const handleRegister = async (formData: any) => {
  try {
    const response = await authAPI.register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      specialization: formData.specialization,
      experienceYears: formData.experienceYears
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    navigate('/dashboard');
  } catch (error: any) {
    setError(error.response?.data?.error || 'Registration failed');
  }
};
```

### Get User Profile

```typescript
import { authAPI } from '../utils/api';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Points: {user.points}</p>
      <p>Level: {user.level}</p>
    </div>
  );
};
```

## 📚 Courses

### Fetch All Courses

```typescript
import { coursesAPI } from '../utils/api';
import { useEffect, useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    search: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesAPI.getAll(filters);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters]);

  return (
    <div>
      {/* Filter controls */}
      <input
        type="text"
        placeholder="Search courses..."
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      {/* Course list */}
      <div>
        {courses.map((course: any) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Category: {course.category}</p>
            <p>Level: {course.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Enroll in Course

```typescript
import { coursesAPI } from '../utils/api';

const CourseDetail = ({ courseId }: { courseId: number }) => {
  const handleEnroll = async () => {
    try {
      await coursesAPI.enroll(courseId);
      alert('Successfully enrolled!');
      // Refresh course data or navigate
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert('Already enrolled in this course');
      } else {
        alert('Failed to enroll');
      }
    }
  };

  return (
    <button onClick={handleEnroll}>
      Enroll Now
    </button>
  );
};
```

### Get My Enrollments

```typescript
import { coursesAPI } from '../utils/api';

const MyLearning = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await coursesAPI.getMyEnrollments();
        setEnrollments(response.data.enrollments);
      } catch (error) {
        console.error('Failed to fetch enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      {enrollments.map((enrollment: any) => (
        <div key={enrollment.id}>
          <h3>{enrollment.title}</h3>
          <p>Progress: {enrollment.progress}%</p>
          <p>Status: {enrollment.status}</p>
        </div>
      ))}
    </div>
  );
};
```

### Update Course Progress

```typescript
import { coursesAPI } from '../utils/api';

const updateProgress = async (courseId: number, progress: number) => {
  try {
    await coursesAPI.updateProgress(courseId, {
      progress,
      status: progress >= 100 ? 'completed' : 'in_progress'
    });
  } catch (error) {
    console.error('Failed to update progress:', error);
  }
};
```

## 💼 Jobs

### Fetch All Jobs

```typescript
import { jobsAPI } from '../utils/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    location: '',
    search: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsAPI.getAll(filters);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, [filters]);

  return (
    <div>
      {jobs.map((job: any) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <p>{job.jobType} | {job.experienceLevel}</p>
          <p>{job.salaryRange}</p>
        </div>
      ))}
    </div>
  );
};
```

### Apply for Job

```typescript
import { jobsAPI } from '../utils/api';

const handleApply = async (jobId: number) => {
  try {
    await jobsAPI.apply(jobId, {
      coverLetter: coverLetterText,
      resumeUrl: resumeUrl
    });
    alert('Application submitted successfully!');
  } catch (error: any) {
    if (error.response?.status === 400) {
      alert('You have already applied to this job');
    } else {
      alert('Failed to submit application');
    }
  }
};
```

## 📝 Quizzes

### Fetch Quiz with Questions

```typescript
import { quizzesAPI } from '../utils/api';

const Quiz = ({ quizId }: { quizId: number }) => {
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await quizzesAPI.getById(quizId);
        setQuiz(response.data.quiz);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  return (
    <div>
      <h1>{quiz?.title}</h1>
      <p>{quiz?.description}</p>
      <p>Duration: {quiz?.durationMinutes} minutes</p>
      <p>Passing Score: {quiz?.passingScore}%</p>
      
      {questions.map((q: any, index: number) => (
        <div key={q.id}>
          <h3>Question {index + 1}</h3>
          <p>{q.question}</p>
          {/* Render question options based on type */}
        </div>
      ))}
    </div>
  );
};
```

### Start and Submit Quiz

```typescript
import { quizzesAPI } from '../utils/api';

const QuizTaker = ({ quizId }: { quizId: number }) => {
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const startQuiz = async () => {
    try {
      const response = await quizzesAPI.start(quizId);
      setAttemptId(response.data.attemptId);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  const submitQuiz = async () => {
    if (!attemptId) return;

    try {
      const response = await quizzesAPI.submit(quizId, {
        attemptId,
        answers
      });

      alert(`Quiz completed! Score: ${response.data.score}%`);
      alert(`Points earned: ${response.data.pointsEarned}`);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  return (
    <div>
      {!attemptId ? (
        <button onClick={startQuiz}>Start Quiz</button>
      ) : (
        <>
          {/* Render questions and collect answers */}
          <button onClick={submitQuiz}>Submit Quiz</button>
        </>
      )}
    </div>
  );
};
```

## 🔔 Notifications

### Fetch Notifications

```typescript
import { notificationsAPI } from '../utils/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationsAPI.getAll({ limit: 20, offset: 0 });
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await notificationsAPI.markAsRead(id);
      // Update local state
      setNotifications(notifications.map((n: any) => 
        n.id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <div>
      <h2>Notifications ({unreadCount} unread)</h2>
      {notifications.map((notification: any) => (
        <div 
          key={notification.id}
          style={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}
          onClick={() => !notification.isRead && markAsRead(notification.id)}
        >
          <h4>{notification.title}</h4>
          <p>{notification.message}</p>
          <small>{new Date(notification.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};
```

## 📅 Timetable

### Fetch Timetable Entries

```typescript
import { timetableAPI } from '../utils/api';

const Timetable = () => {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await timetableAPI.getAll({
          startDate: '2026-06-01',
          endDate: '2026-06-30'
        });
        setEntries(response.data.entries);
      } catch (error) {
        console.error('Failed to fetch timetable:', error);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div>
      {entries.map((entry: any) => (
        <div key={entry.id} style={{ borderLeft: `4px solid ${entry.color}` }}>
          <h3>{entry.title}</h3>
          <p>{entry.description}</p>
          <p>
            {new Date(entry.startTime).toLocaleString()} - 
            {new Date(entry.endTime).toLocaleString()}
          </p>
          <p>Type: {entry.eventType}</p>
        </div>
      ))}
    </div>
  );
};
```

### Create Timetable Entry

```typescript
import { timetableAPI } from '../utils/api';

const createEntry = async (data: any) => {
  try {
    await timetableAPI.create({
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      eventType: data.eventType || 'class',
      color: data.color || '#3b82f6',
      isAllDay: data.isAllDay || false,
      reminderMinutes: data.reminderMinutes || 15
    });
    alert('Entry created successfully!');
  } catch (error) {
    console.error('Failed to create entry:', error);
  }
};
```

## 📊 Analytics

### Fetch Dashboard Analytics

```typescript
import { analyticsAPI } from '../utils/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await analyticsAPI.getDashboard();
        setAnalytics(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div>
      <h2>Overview</h2>
      <div>
        <p>Enrolled Courses: {analytics.overview.enrolledCourses}</p>
        <p>Completed Courses: {analytics.overview.completedCourses}</p>
        <p>Total Quiz Attempts: {analytics.overview.totalQuizAttempts}</p>
        <p>Average Quiz Score: {analytics.overview.avgQuizScore}%</p>
        <p>Best Quiz Score: {analytics.overview.bestQuizScore}%</p>
        <p>Job Applications: {analytics.overview.totalApplications}</p>
      </div>

      <h3>Recent Activity</h3>
      {analytics.recentActivity.map((activity: any, index: number) => (
        <div key={index}>
          <p>{activity.type}: {activity.description}</p>
          <small>{new Date(activity.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};
```

## 💬 Chat

### Fetch and Send Messages

```typescript
import { chatAPI } from '../utils/api';

const Chat = ({ receiverId }: { receiverId: number }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await chatAPI.getMessages({ receiverId });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [receiverId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await chatAPI.sendMessage({
        receiverId,
        message: newMessage,
        messageType: 'text'
      });
      
      setNewMessage('');
      // Refresh messages
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg: any) => (
          <div key={msg.id}>
            <strong>{msg.sender_first_name}:</strong> {msg.message}
            <small>{new Date(msg.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
      
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
```

## 🏆 Leaderboard

### Fetch Leaderboard

```typescript
import { leaderboardAPI } from '../utils/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myRank, setMyRank] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboardRes, rankRes] = await Promise.all([
          leaderboardAPI.getLeaderboard({
            category: 'courses_completed',
            period: 'all-time',
            limit: 10
          }),
          leaderboardAPI.getMyRank({
            category: 'courses_completed',
            period: 'all-time'
          })
        ]);

        setLeaderboard(leaderboardRes.data.leaderboard);
        setMyRank(rankRes.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Your Rank: #{myRank?.rank} with {myRank?.score} points</h2>
      
      <h3>Top 10</h3>
      {leaderboard.map((entry: any) => (
        <div key={entry.id}>
          <span>#{entry.rank}</span>
          <span>{entry.first_name} {entry.last_name}</span>
          <span>{entry.score} points</span>
        </div>
      ))}
    </div>
  );
};
```

## 🔧 Error Handling

Always wrap API calls in try-catch blocks:

```typescript
try {
  const response = await coursesAPI.getAll();
  // Handle success
} catch (error: any) {
  if (error.response) {
    // Server responded with error
    console.error('Error:', error.response.data.error);
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

## 🚀 Next Steps

1. Replace mock data in your components with real API calls
2. Add loading states and error handling
3. Implement real-time updates (consider WebSocket for chat)
4. Add data caching with React Query or SWR
5. Implement optimistic UI updates

Happy coding! 🎉
