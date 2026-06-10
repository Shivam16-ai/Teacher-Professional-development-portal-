import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import coursesRoutes from './routes/courses.routes.js';
import jobsRoutes from './routes/jobs.routes.js';
import notificationsRoutes from './routes/notifications.routes.js';
import timetableRoutes from './routes/timetable.routes.js';
import quizzesRoutes from './routes/quizzes.routes.js';
import leaderboardRoutes from './routes/leaderboard.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import chatRoutes from './routes/chat.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/chat', chatRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('Failed to connect to database. Please check your configuration.');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('');
      console.log('╔═══════════════════════════════════════════════╗');
      console.log('║   Teacher Platform Backend Server Started   ║');
      console.log('╚═══════════════════════════════════════════════╝');
      console.log('');
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database: Connected to ${process.env.DB_NAME}`);
      console.log('');
      console.log('Available endpoints:');
      console.log('  - POST   /api/auth/register');
      console.log('  - POST   /api/auth/login');
      console.log('  - GET    /api/auth/me');
      console.log('  - GET    /api/courses');
      console.log('  - GET    /api/jobs');
      console.log('  - GET    /api/quizzes');
      console.log('  - GET    /api/notifications');
      console.log('  - GET    /api/timetable');
      console.log('  - GET    /api/leaderboard');
      console.log('  - GET    /api/analytics/dashboard');
      console.log('  - GET    /api/chat/messages');
      console.log('');
      console.log('Press Ctrl+C to stop the server');
      console.log('');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  process.exit(0);
});

export default app;
