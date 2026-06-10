import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get leaderboard
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { category = 'courses_completed', period = 'all-time', limit = 10 } = req.query;

    const leaderboard = await query<any[]>(
      `SELECT l.*, u.first_name, u.last_name, u.avatar, u.specialization
       FROM leaderboard l
       JOIN users u ON l.user_id = u.id
       WHERE l.category = ? AND l.period = ?
       ORDER BY l.score DESC, l.updated_at ASC
       LIMIT ?`,
      [category, period, Number(limit)]
    );

    // Assign ranks
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    console.error('Fetch leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user's rank
router.get('/my-rank', authenticateToken, async (req: any, res) => {
  try {
    const { category = 'courses_completed', period = 'all-time' } = req.query;

    const userRank = await query<any[]>(
      `SELECT 
        (SELECT COUNT(*) + 1 FROM leaderboard 
         WHERE category = ? AND period = ? AND score > l.score) as rank,
        l.score,
        l.achievements,
        l.badges
       FROM leaderboard l
       WHERE l.user_id = ? AND l.category = ? AND l.period = ?`,
      [category, period, req.user?.id, category, period]
    );

    if (userRank.length === 0) {
      return res.json({ rank: null, score: 0 });
    }

    res.json(userRank[0]);
  } catch (error) {
    console.error('Fetch user rank error:', error);
    res.status(500).json({ error: 'Failed to fetch rank' });
  }
});

export default router;
