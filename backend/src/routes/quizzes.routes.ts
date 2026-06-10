import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get all quizzes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.query;
    
    let sql = 'SELECT * FROM quizzes WHERE is_active = TRUE';
    const params: any[] = [];

    if (courseId) {
      sql += ' AND course_id = ?';
      params.push(courseId);
    }

    sql += ' ORDER BY created_at DESC';

    const quizzes = await query<any[]>(sql, params);
    res.json({ quizzes });
  } catch (error) {
    console.error('Fetch quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get quiz with questions
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const quizzes = await query<any[]>(
      'SELECT * FROM quizzes WHERE id = ? AND is_active = TRUE',
      [req.params.id]
    );

    if (quizzes.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = await query<any[]>(
      'SELECT id, question, question_type, options, points, order_number FROM quiz_questions WHERE quiz_id = ? ORDER BY order_number',
      [req.params.id]
    );

    res.json({ 
      quiz: quizzes[0],
      questions 
    });
  } catch (error) {
    console.error('Fetch quiz error:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Start quiz attempt
router.post('/:id/start', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.user?.id;

    // Get total questions
    const quizzes = await query<any[]>(
      'SELECT total_questions FROM quizzes WHERE id = ?',
      [quizId]
    );

    if (quizzes.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Create attempt
    const result = await query<any>(
      'INSERT INTO quiz_attempts (user_id, quiz_id, total_questions) VALUES (?, ?, ?)',
      [userId, quizId, quizzes[0].total_questions]
    );

    res.status(201).json({ 
      message: 'Quiz attempt started',
      attemptId: result.insertId
    });
  } catch (error) {
    console.error('Start quiz error:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
});

// Submit quiz attempt
router.post('/:id/submit', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { attemptId, answers } = req.body;
    const quizId = req.params.id;

    // Get questions with correct answers
    const questions = await query<any[]>(
      'SELECT id, correct_answer, points FROM quiz_questions WHERE quiz_id = ?',
      [quizId]
    );

    // Calculate score
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((q) => {
      totalPoints += q.points;
      const userAnswer = answers[q.id];
      if (userAnswer && userAnswer.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()) {
        correctAnswers++;
        earnedPoints += q.points;
      }
    });

    const score = (earnedPoints / totalPoints) * 100;

    // Update attempt
    await query(
      `UPDATE quiz_attempts 
       SET score = ?, correct_answers = ?, answers = ?, status = 'completed', completed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [score, correctAnswers, JSON.stringify(answers), attemptId]
    );

    // Award points to user
    const pointsEarned = Math.floor(score);
    await query(
      'UPDATE users SET points = points + ? WHERE id = ?',
      [pointsEarned, req.user?.id]
    );

    res.json({ 
      message: 'Quiz submitted successfully',
      score,
      correctAnswers,
      totalQuestions: questions.length,
      pointsEarned
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

// Get user's quiz attempts
router.get('/my/attempts', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const attempts = await query<any[]>(
      `SELECT qa.*, q.title, q.duration_minutes, q.passing_score
       FROM quiz_attempts qa
       JOIN quizzes q ON qa.quiz_id = q.id
       WHERE qa.user_id = ?
       ORDER BY qa.started_at DESC`,
      [req.user?.id]
    );

    res.json({ attempts });
  } catch (error) {
    console.error('Fetch attempts error:', error);
    res.status(500).json({ error: 'Failed to fetch attempts' });
  }
});

export default router;
