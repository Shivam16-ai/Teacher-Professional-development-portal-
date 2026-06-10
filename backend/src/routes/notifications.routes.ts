import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get user's notifications
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const notifications = await query<any[]>(
      `SELECT * FROM notifications 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [req.user?.id, Number(limit), Number(offset)]
    );

    // Get unread count
    const unreadCount = await query<any[]>(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
      [req.user?.id]
    );

    res.json({ 
      notifications,
      unreadCount: unreadCount[0].count 
    });
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await query(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [req.params.id, req.user?.id]
    );

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification error:', error);
    res.status(500).json({ error: 'Failed to mark notification' });
  }
});

// Mark all notifications as read
router.put('/read/all', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await query(
      'UPDATE notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
      [req.user?.id]
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications error:', error);
    res.status(500).json({ error: 'Failed to mark notifications' });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await query(
      'DELETE FROM notifications WHERE id = ? AND user_id = ?',
      [req.params.id, req.user?.id]
    );

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

export default router;
