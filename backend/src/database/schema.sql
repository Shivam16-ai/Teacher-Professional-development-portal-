-- Teacher Professional Development Platform Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS job_applications;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS interview_sessions;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS timetable_entries;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS resumes;
DROP TABLE IF EXISTS leaderboard;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('teacher', 'admin') DEFAULT 'teacher',
  avatar VARCHAR(255),
  bio TEXT,
  specialization VARCHAR(255),
  experience_years INT DEFAULT 0,
  points INT DEFAULT 0,
  level INT DEFAULT 1,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  INDEX idx_email (email),
  INDEX idx_points (points DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Courses table
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  duration_hours INT,
  instructor VARCHAR(255),
  thumbnail VARCHAR(255),
  content TEXT,
  objectives TEXT,
  requirements TEXT,
  price DECIMAL(10, 2) DEFAULT 0.00,
  rating DECIMAL(3, 2) DEFAULT 0.00,
  total_enrollments INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Course Enrollments table
CREATE TABLE course_enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  status ENUM('enrolled', 'in_progress', 'completed', 'dropped') DEFAULT 'enrolled',
  progress DECIMAL(5, 2) DEFAULT 0.00,
  score DECIMAL(5, 2) DEFAULT 0.00,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  last_accessed TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (user_id, course_id),
  INDEX idx_user_status (user_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quizzes table
CREATE TABLE quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INT DEFAULT 30,
  passing_score DECIMAL(5, 2) DEFAULT 70.00,
  total_questions INT DEFAULT 0,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  INDEX idx_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quiz Questions table
CREATE TABLE quiz_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  question TEXT NOT NULL,
  question_type ENUM('multiple_choice', 'true_false', 'short_answer') DEFAULT 'multiple_choice',
  options JSON,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INT DEFAULT 1,
  order_number INT DEFAULT 0,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_quiz (quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quiz Attempts table
CREATE TABLE quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score DECIMAL(5, 2) DEFAULT 0.00,
  total_questions INT DEFAULT 0,
  correct_answers INT DEFAULT 0,
  time_taken INT,
  answers JSON,
  status ENUM('in_progress', 'completed', 'abandoned') DEFAULT 'in_progress',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_user_quiz (user_id, quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Jobs table
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  job_type ENUM('full-time', 'part-time', 'contract', 'temporary') DEFAULT 'full-time',
  experience_level ENUM('entry', 'mid', 'senior', 'lead') DEFAULT 'mid',
  salary_range VARCHAR(100),
  description TEXT,
  requirements TEXT,
  benefits TEXT,
  application_deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  views INT DEFAULT 0,
  applications_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active),
  INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job Applications table
CREATE TABLE job_applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  resume_url VARCHAR(255),
  cover_letter TEXT,
  status ENUM('pending', 'reviewing', 'shortlisted', 'interview', 'rejected', 'accepted') DEFAULT 'pending',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_application (user_id, job_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Interview Sessions table
CREATE TABLE interview_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  job_application_id INT,
  session_type ENUM('practice', 'real', 'mock') DEFAULT 'practice',
  questions JSON,
  responses JSON,
  score DECIMAL(5, 2),
  feedback TEXT,
  duration_minutes INT,
  status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
  scheduled_at TIMESTAMP NULL,
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_application_id) REFERENCES job_applications(id) ON DELETE SET NULL,
  INDEX idx_user_status (user_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat Messages table
CREATE TABLE chat_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  receiver_id INT,
  message TEXT NOT NULL,
  message_type ENUM('text', 'file', 'system') DEFAULT 'text',
  attachment_url VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_sender (sender_id),
  INDEX idx_receiver (receiver_id),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'success', 'warning', 'error', 'achievement') DEFAULT 'info',
  related_entity VARCHAR(50),
  related_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_read (user_id, is_read),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Timetable Entries table
CREATE TABLE timetable_entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  location VARCHAR(255),
  event_type ENUM('class', 'meeting', 'training', 'personal', 'other') DEFAULT 'class',
  color VARCHAR(7) DEFAULT '#3b82f6',
  recurrence VARCHAR(50),
  is_all_day BOOLEAN DEFAULT FALSE,
  reminder_minutes INT DEFAULT 15,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_date (user_id, start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reports table
CREATE TABLE reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  report_type ENUM('performance', 'progress', 'activity', 'custom') DEFAULT 'performance',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  data JSON,
  period_start DATE,
  period_end DATE,
  status ENUM('draft', 'generated', 'published') DEFAULT 'draft',
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_type (user_id, report_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Resumes table
CREATE TABLE resumes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  template VARCHAR(50) DEFAULT 'modern',
  personal_info JSON,
  education JSON,
  experience JSON,
  skills JSON,
  certifications JSON,
  languages JSON,
  achievements JSON,
  is_default BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT FALSE,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Leaderboard table (for gamification)
CREATE TABLE leaderboard (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  score INT DEFAULT 0,
  rank INT DEFAULT 0,
  achievements JSON,
  badges JSON,
  period VARCHAR(20) DEFAULT 'all-time',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_category_period (user_id, category, period),
  INDEX idx_category_score (category, score DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
