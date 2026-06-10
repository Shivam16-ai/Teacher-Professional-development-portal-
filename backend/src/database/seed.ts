import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed Users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await pool.query(`
      INSERT INTO users (email, password, first_name, last_name, role, specialization, experience_years, points, level, bio) VALUES
      ('john.teacher@example.com', ?, 'John', 'Doe', 'teacher', 'Mathematics', 5, 1200, 3, 'Experienced math teacher passionate about innovative teaching methods.'),
      ('jane.teacher@example.com', ?, 'Jane', 'Smith', 'teacher', 'Science', 3, 850, 2, 'Science educator focused on hands-on learning.'),
      ('admin@example.com', ?, 'Admin', 'User', 'admin', 'Administration', 10, 2500, 5, 'Platform administrator.')
    `, [hashedPassword, hashedPassword, hashedPassword]);

    console.log('✅ Users seeded');

    // Seed Courses
    await pool.query(`
      INSERT INTO courses (title, description, category, level, duration_hours, instructor, thumbnail, price, rating) VALUES
      ('Modern Pedagogy Techniques', 'Learn cutting-edge teaching methods for the modern classroom', 'Pedagogy', 'intermediate', 20, 'Dr. Sarah Johnson', '/images/courses/pedagogy.svg', 0.00, 4.5),
      ('Educational Psychology', 'Understanding student psychology and learning behaviors', 'Psychology', 'beginner', 15, 'Prof. Michael Brown', '/images/courses/psychology.svg', 0.00, 4.7),
      ('Advanced Mathematics Teaching', 'Innovative approaches to teaching complex mathematical concepts', 'Mathematics', 'advanced', 25, 'Dr. Emily Chen', '/images/courses/mathematics.svg', 0.00, 4.8),
      ('Digital Teaching Tools', 'Master the latest educational technology and digital platforms', 'Digital Teaching', 'beginner', 12, 'James Wilson', '/images/courses/digital-teaching.svg', 0.00, 4.6),
      ('Inclusive Education Practices', 'Creating inclusive learning environments for all students', 'Inclusive', 'intermediate', 18, 'Dr. Maria Garcia', '/images/courses/inclusive.svg', 0.00, 4.9),
      ('Educational Leadership', 'Developing leadership skills for educational professionals', 'Leadership', 'advanced', 30, 'Dr. Robert Taylor', '/images/courses/leadership.svg', 0.00, 4.4)
    `);

    console.log('✅ Courses seeded');

    // Seed Jobs
    await pool.query(`
      INSERT INTO jobs (title, company, location, job_type, experience_level, salary_range, description, requirements, application_deadline, is_active) VALUES
      ('Senior Mathematics Teacher', 'Springfield High School', 'Springfield, IL', 'full-time', 'senior', '$55,000 - $75,000', 'Seeking an experienced mathematics teacher to join our dynamic team.', 'Masters degree in Mathematics or Education, 5+ years experience', '2026-12-31', TRUE),
      ('Science Department Head', 'Lincoln Academy', 'Chicago, IL', 'full-time', 'lead', '$70,000 - $90,000', 'Lead our science department and mentor junior teachers.', 'PhD preferred, 10+ years experience, leadership skills', '2026-11-30', TRUE),
      ('ESL Teacher', 'International School', 'Remote', 'part-time', 'mid', '$30,000 - $45,000', 'Teach English as a Second Language to international students.', 'TEFL certification, 3+ years experience', '2026-10-15', TRUE),
      ('Special Education Coordinator', 'Riverside School District', 'Boston, MA', 'full-time', 'senior', '$60,000 - $80,000', 'Coordinate special education programs and support staff.', 'Special Education certification, 7+ years experience', '2026-12-15', TRUE)
    `);

    console.log('✅ Jobs seeded');

    // Seed Quizzes
    await pool.query(`
      INSERT INTO quizzes (course_id, title, description, duration_minutes, passing_score, total_questions, difficulty) VALUES
      (1, 'Pedagogy Fundamentals Quiz', 'Test your knowledge of modern teaching methods', 30, 70.00, 10, 'medium'),
      (2, 'Educational Psychology Assessment', 'Assess your understanding of learning psychology', 45, 75.00, 15, 'medium'),
      (3, 'Advanced Math Teaching Quiz', 'Challenge your mathematics teaching expertise', 60, 80.00, 20, 'hard')
    `);

    console.log('✅ Quizzes seeded');

    // Seed Quiz Questions
    await pool.query(`
      INSERT INTO quiz_questions (quiz_id, question, question_type, options, correct_answer, explanation, points) VALUES
      (1, 'What is the primary goal of modern pedagogy?', 'multiple_choice', 
       '["Student-centered learning", "Teacher-centered instruction", "Standardized testing", "Memorization"]', 
       'Student-centered learning', 
       'Modern pedagogy emphasizes student engagement and active learning.', 1),
      (1, 'Which teaching method promotes collaborative learning?', 'multiple_choice', 
       '["Lecture", "Group projects", "Individual study", "Rote learning"]', 
       'Group projects', 
       'Group projects encourage collaboration and peer learning.', 1),
      (2, 'What is the zone of proximal development?', 'multiple_choice', 
       '["The gap between what a learner can do independently and with guidance", "A physical classroom zone", "A testing area", "A discipline method"]', 
       'The gap between what a learner can do independently and with guidance', 
       'This concept was developed by psychologist Lev Vygotsky.', 1)
    `);

    console.log('✅ Quiz questions seeded');

    // Seed Notifications
    await pool.query(`
      INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
      (1, 'Welcome to the Platform!', 'Start your professional development journey today.', 'info', FALSE),
      (1, 'New Course Available', 'Check out the latest course on Digital Teaching Tools.', 'success', FALSE),
      (2, 'Achievement Unlocked', 'You have completed your first course!', 'achievement', TRUE)
    `);

    console.log('✅ Notifications seeded');

    // Seed Timetable Entries
    await pool.query(`
      INSERT INTO timetable_entries (user_id, title, description, start_time, end_time, event_type, color) VALUES
      (1, 'Math Class - Grade 10', 'Algebra lesson on quadratic equations', '2026-06-08 09:00:00', '2026-06-08 10:00:00', 'class', '#3b82f6'),
      (1, 'Teacher Meeting', 'Department meeting to discuss curriculum', '2026-06-08 14:00:00', '2026-06-08 15:00:00', 'meeting', '#f59e0b'),
      (2, 'Science Lab', 'Chemistry experiment with Grade 9', '2026-06-08 11:00:00', '2026-06-08 12:30:00', 'class', '#10b981')
    `);

    console.log('✅ Timetable entries seeded');

    // Seed Leaderboard
    await pool.query(`
      INSERT INTO leaderboard (user_id, category, score, rank, period) VALUES
      (1, 'courses_completed', 5, 1, 'all-time'),
      (2, 'courses_completed', 3, 2, 'all-time'),
      (1, 'quiz_scores', 1200, 1, 'all-time')
    `);

    console.log('✅ Leaderboard seeded');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Teacher: john.teacher@example.com / password123');
    console.log('Teacher: jane.teacher@example.com / password123');
    console.log('Admin: admin@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
