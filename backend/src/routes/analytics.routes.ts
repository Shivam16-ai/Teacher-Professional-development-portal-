import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get user analytics dashboard
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    // Get enrolled courses count
    const enrolledCourses = await query<any[]>(
      'SELECT COUNT(*) as count FROM course_enrollments WHERE user_id = ?',
      [userId]
    );

    // Get completed courses count
    const completedCourses = await query<any[]>(
      'SELECT COUNT(*) as count FROM course_enrollments WHERE user_id = ? AND status = "completed"',
      [userId]
    );

    // Get quiz attempts stats
    const quizStats = await query<any[]>(
      `SELECT COUNT(*) as total_attempts, AVG(score) as avg_score, MAX(score) as best_score
       FROM quiz_attempts WHERE user_id = ? AND status = "completed"`,
      [userId]
    );

    // Get job applications stats
    const applicationStats = await query<any[]>(
      `SELECT COUNT(*) as total_applications, 
              SUM(CASE WHEN status = 'interview' THEN 1 ELSE 0 END) as interviews,
              SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted
       FROM job_applications WHERE user_id = ?`,
      [userId]
    );

    // Get recent activity
    const recentActivity = await query<any[]>(
      `SELECT 'course' as type, ce.enrolled_at as date, c.title as description
       FROM course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       WHERE ce.user_id = ?
       UNION ALL
       SELECT 'quiz' as type, qa.completed_at as date, q.title as description
       FROM quiz_attempts qa
       JOIN quizzes q ON qa.quiz_id = q.id
       WHERE qa.user_id = ? AND qa.status = 'completed'
       ORDER BY date DESC LIMIT 10`,
      [userId, userId]
    );

    // Get learning progress by category
    const progressByCategory = await query<any[]>(
      `SELECT c.category, 
              COUNT(*) as total,
              SUM(CASE WHEN ce.status = 'completed' THEN 1 ELSE 0 END) as completed,
              AVG(ce.progress) as avg_progress
       FROM course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       WHERE ce.user_id = ?
       GROUP BY c.category`,
      [userId]
    );

    res.json({
      overview: {
        enrolledCourses: enrolledCourses[0].count,
        completedCourses: completedCourses[0].count,
        totalQuizAttempts: quizStats[0].total_attempts || 0,
        avgQuizScore: parseFloat(quizStats[0].avg_score || 0).toFixed(2),
        bestQuizScore: parseFloat(quizStats[0].best_score || 0).toFixed(2),
        totalApplications: applicationStats[0].total_applications || 0,
        interviews: applicationStats[0].interviews || 0,
        acceptedJobs: applicationStats[0].accepted || 0
      },
      recentActivity,
      progressByCategory
    });
  } catch (error) {
    console.error('Fetch analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get course progress analytics
router.get('/courses/progress', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const progressData = await query<any[]>(
      `SELECT c.title, c.category, ce.progress, ce.status, ce.enrolled_at, ce.completed_at
       FROM course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       WHERE ce.user_id = ?
       ORDER BY ce.enrolled_at DESC`,
      [req.user?.id]
    );

    res.json({ progressData });
  } catch (error) {
    console.error('Fetch progress analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch progress analytics' });
  }
});

// Get quiz performance analytics
router.get('/quizzes/performance', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const performanceData = await query<any[]>(
      `SELECT q.title, q.difficulty, qa.score, qa.correct_answers, qa.total_questions, 
              qa.started_at, qa.completed_at,
              TIMESTAMPDIFF(MINUTE, qa.started_at, qa.completed_at) as time_taken
       FROM quiz_attempts qa
       JOIN quizzes q ON qa.quiz_id = q.id
       WHERE qa.user_id = ? AND qa.status = 'completed'
       ORDER BY qa.completed_at DESC`,
      [req.user?.id]
    );

    res.json({ performanceData });
  } catch (error) {
    console.error('Fetch performance analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch performance analytics' });
  }
});

export default router;
