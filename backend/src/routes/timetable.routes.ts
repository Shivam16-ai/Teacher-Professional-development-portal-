import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get user's timetable entries
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let sql = 'SELECT * FROM timetable_entries WHERE user_id = ?';
    const params: any[] = [req.user?.id];

    if (startDate && endDate) {
      sql += ' AND start_time BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    sql += ' ORDER BY start_time ASC';

    const entries = await query<any[]>(sql, params);
    res.json({ entries });
  } catch (error) {
    console.error('Fetch timetable error:', error);
    res.status(500).json({ error: 'Failed to fetch timetable' });
  }
});

// Create timetable entry
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, description, startTime, endTime, location, eventType, color, isAllDay, reminderMinutes } = req.body;

    const result = await query<any>(
      `INSERT INTO timetable_entries (user_id, title, description, start_time, end_time, location, event_type, color, is_all_day, reminder_minutes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user?.id, title, description, startTime, endTime, location, eventType, color, isAllDay, reminderMinutes]
    );

    res.status(201).json({ 
      message: 'Entry created successfully',
      entryId: result.insertId
    });
  } catch (error) {
    console.error('Create entry error:', error);
    res.status(500).json({ error: 'Failed to create entry' });
  }
});

// Update timetable entry
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, description, startTime, endTime, location, eventType, color, isAllDay, reminderMinutes } = req.body;

    await query(
      `UPDATE timetable_entries 
       SET title = ?, description = ?, start_time = ?, end_time = ?, location = ?, event_type = ?, color = ?, is_all_day = ?, reminder_minutes = ?
       WHERE id = ? AND user_id = ?`,
      [title, description, startTime, endTime, location, eventType, color, isAllDay, reminderMinutes, req.params.id, req.user?.id]
    );

    res.json({ message: 'Entry updated successfully' });
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({ error: 'Failed to update entry' });
  }
});

// Delete timetable entry
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await query(
      'DELETE FROM timetable_entries WHERE id = ? AND user_id = ?',
      [req.params.id, req.user?.id]
    );

    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

export default router;
