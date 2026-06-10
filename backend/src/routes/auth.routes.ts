import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';
import { registerValidation, loginValidation, validate } from '../middleware/validator.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', registerValidation, validate, async (req, res) => {
  try {
    const { email, password, firstName, lastName, specialization, experienceYears } = req.body;

    // Check if user exists
    const existingUser = await query<any[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await query<any>(
      `INSERT INTO users (email, password, first_name, last_name, specialization, experience_years) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, firstName, lastName, specialization || null, experienceYears || 0]
    );

    // Generate token
    const token = jwt.sign(
      { id: result.insertId, email, role: 'teacher' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertId,
        email,
        firstName,
        lastName,
        role: 'teacher'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', loginValidation, validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const users = await query<any[]>(
      'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        avatar: user.avatar,
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const users = await query<any[]>(
      'SELECT id, email, first_name, last_name, role, avatar, bio, specialization, experience_years, points, level, created_at FROM users WHERE id = ?',
      [req.user?.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: users[0].id,
        email: users[0].email,
        firstName: users[0].first_name,
        lastName: users[0].last_name,
        role: users[0].role,
        avatar: users[0].avatar,
        bio: users[0].bio,
        specialization: users[0].specialization,
        experienceYears: users[0].experience_years,
        points: users[0].points,
        level: users[0].level,
        createdAt: users[0].created_at
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { firstName, lastName, bio, specialization, experienceYears, avatar } = req.body;

    await query(
      `UPDATE users SET first_name = ?, last_name = ?, bio = ?, specialization = ?, experience_years = ?, avatar = ? WHERE id = ?`,
      [firstName, lastName, bio, specialization, experienceYears, avatar, req.user?.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get current user
    const users = await query<any[]>(
      'SELECT password FROM users WHERE id = ?',
      [req.user?.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, users[0].password);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user?.id]);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

export default router;
