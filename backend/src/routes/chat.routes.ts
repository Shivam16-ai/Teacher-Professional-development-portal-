import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get chat messages
router.get('/messages', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { receiverId, limit = 50 } = req.query;
    const userId = req.user?.id;

    const messages = await query<any[]>(
      `SELECT cm.*, 
              u1.first_name as sender_first_name, u1.last_name as sender_last_name, u1.avatar as sender_avatar,
              u2.first_name as receiver_first_name, u2.last_name as receiver_last_name, u2.avatar as receiver_avatar
       FROM chat_messages cm
       LEFT JOIN users u1 ON cm.sender_id = u1.id
       LEFT JOIN users u2 ON cm.receiver_id = u2.id
       WHERE (cm.sender_id = ? AND cm.receiver_id = ?) OR (cm.sender_id = ? AND cm.receiver_id = ?)
       AND cm.is_deleted = FALSE
       ORDER BY cm.created_at DESC
       LIMIT ?`,
      [userId, receiverId, receiverId, userId, Number(limit)]
    );

    // Mark messages as read
    await query(
      'UPDATE chat_messages SET is_read = TRUE WHERE receiver_id = ? AND sender_id = ? AND is_read = FALSE',
      [userId, receiverId]
    );

    res.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/messages', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { receiverId, message, messageType = 'text', attachmentUrl } = req.body;
    const senderId = req.user?.id;

    const result = await query<any>(
      'INSERT INTO chat_messages (sender_id, receiver_id, message, message_type, attachment_url) VALUES (?, ?, ?, ?, ?)',
      [senderId, receiverId, message, messageType, attachmentUrl]
    );

    // Create notification for receiver
    await query(
      'INSERT INTO notifications (user_id, title, message, type, related_entity, related_id) VALUES (?, ?, ?, ?, ?, ?)',
      [receiverId, 'New Message', 'You have received a new message', 'info', 'chat', result.insertId]
    );

    res.status(201).json({ 
      message: 'Message sent successfully',
      messageId: result.insertId
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get conversation list
router.get('/conversations', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const conversations = await query<any[]>(
      `SELECT DISTINCT
              CASE 
                WHEN cm.sender_id = ? THEN cm.receiver_id 
                ELSE cm.sender_id 
              END as user_id,
              u.first_name, u.last_name, u.avatar,
              (SELECT message FROM chat_messages 
               WHERE (sender_id = user_id AND receiver_id = ?) OR (sender_id = ? AND receiver_id = user_id)
               AND is_deleted = FALSE
               ORDER BY created_at DESC LIMIT 1) as last_message,
              (SELECT created_at FROM chat_messages 
               WHERE (sender_id = user_id AND receiver_id = ?) OR (sender_id = ? AND receiver_id = user_id)
               AND is_deleted = FALSE
               ORDER BY created_at DESC LIMIT 1) as last_message_time,
              (SELECT COUNT(*) FROM chat_messages 
               WHERE sender_id = user_id AND receiver_id = ? AND is_read = FALSE AND is_deleted = FALSE) as unread_count
       FROM chat_messages cm
       JOIN users u ON u.id = CASE WHEN cm.sender_id = ? THEN cm.receiver_id ELSE cm.sender_id END
       WHERE (cm.sender_id = ? OR cm.receiver_id = ?) AND cm.is_deleted = FALSE
       ORDER BY last_message_time DESC`,
      [userId, userId, userId, userId, userId, userId, userId, userId, userId]
    );

    res.json({ conversations });
  } catch (error) {
    console.error('Fetch conversations error:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Delete message
router.delete('/messages/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await query(
      'UPDATE chat_messages SET is_deleted = TRUE WHERE id = ? AND sender_id = ?',
      [req.params.id, req.user?.id]
    );

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
