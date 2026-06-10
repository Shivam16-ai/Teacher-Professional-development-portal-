import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, level, search } = req.query;
    
    let sql = 'SELECT * FROM courses WHERE is_published = TRUE';
    const params: any[] = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (level) {
      sql += ' AND level = ?';
      params.push(level);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const courses = await query<any[]>(sql, params);
    res.json({ courses });
  } catch (error) {
    console.error('Fetch courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const courses = await query<any[]>(
      'SELECT * FROM courses WHERE id = ? AND is_published = TRUE',
      [req.params.id]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course: courses[0] });
  } catch (error) {
    console.error('Fetch course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Enroll in course
router.post('/:id/enroll', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user?.id;

    // Check if already enrolled
    const existing = await query<any[]>(
      'SELECT id FROM course_enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Enroll user
    await query(
      'INSERT INTO course_enrollments (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );

    // Update course enrollment count
    await query(
      'UPDATE courses SET total_enrollments = total_enrollments + 1 WHERE id = ?',
      [courseId]
    );

    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});

// Get user's enrolled courses
router.get('/my/enrollments', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const enrollments = await query<any[]>(
      `SELECT ce.*, c.title, c.description, c.category, c.thumbnail, c.duration_hours, c.instructor
       FROM course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       WHERE ce.user_id = ?
       ORDER BY ce.enrolled_at DESC`,
      [req.user?.id]
    );

    res.json({ enrollments });
  } catch (error) {
    console.error('Fetch enrollments error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Update course progress
router.put('/:id/progress', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { progress, status } = req.body;

    await query(
      `UPDATE course_enrollments 
       SET progress = ?, status = ?, last_accessed = CURRENT_TIMESTAMP
       WHERE user_id = ? AND course_id = ?`,
      [progress, status || 'in_progress', req.user?.id, req.params.id]
    );

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;
