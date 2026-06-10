import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { jobType, experienceLevel, location, search } = req.query;
    
    let sql = 'SELECT * FROM jobs WHERE is_active = TRUE';
    const params: any[] = [];

    if (jobType) {
      sql += ' AND job_type = ?';
      params.push(jobType);
    }

    if (experienceLevel) {
      sql += ' AND experience_level = ?';
      params.push(experienceLevel);
    }

    if (location) {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR company LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const jobs = await query<any[]>(sql, params);
    res.json({ jobs });
  } catch (error) {
    console.error('Fetch jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const jobs = await query<any[]>(
      'SELECT * FROM jobs WHERE id = ? AND is_active = TRUE',
      [req.params.id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Increment views
    await query('UPDATE jobs SET views = views + 1 WHERE id = ?', [req.params.id]);

    res.json({ job: jobs[0] });
  } catch (error) {
    console.error('Fetch job error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Apply for job
router.post('/:id/apply', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { coverLetter, resumeUrl } = req.body;
    const jobId = req.params.id;
    const userId = req.user?.id;

    // Check if already applied
    const existing = await query<any[]>(
      'SELECT id FROM job_applications WHERE user_id = ? AND job_id = ?',
      [userId, jobId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    // Create application
    await query(
      'INSERT INTO job_applications (user_id, job_id, cover_letter, resume_url) VALUES (?, ?, ?, ?)',
      [userId, jobId, coverLetter, resumeUrl]
    );

    // Update job application count
    await query(
      'UPDATE jobs SET applications_count = applications_count + 1 WHERE id = ?',
      [jobId]
    );

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get user's applications
router.get('/my/applications', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const applications = await query<any[]>(
      `SELECT ja.*, j.title, j.company, j.location, j.job_type
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       WHERE ja.user_id = ?
       ORDER BY ja.applied_at DESC`,
      [req.user?.id]
    );

    res.json({ applications });
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

export default router;
