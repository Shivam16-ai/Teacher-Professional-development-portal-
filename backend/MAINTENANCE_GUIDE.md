# Maintenance & Operations Guide

Complete guide for maintaining and operating the Teacher Platform backend.

---

## 📋 Daily Operations

### Starting the Server

**Development:**
```cmd
cd backend
npm run dev
```

**Production:**
```cmd
npm start
```
or with PM2:
```cmd
pm2 start dist/server.js --name teacher-backend
```

### Checking Server Health

**Browser:**
```
http://localhost:3000/health
```

**Command Line:**
```cmd
curl http://localhost:3000/health
```

### Viewing Logs

**Development:**
- Check terminal console

**Production (PM2):**
```cmd
pm2 logs teacher-backend
pm2 logs teacher-backend --lines 100
```

---

## 🗄️ Database Operations

### Database Backup

**Automated Script:**
```cmd
cd backend
scripts\backup-database.bat
```

**Manual Command:**
```cmd
mysqldump -h localhost -u root -p teacher_platform > backup.sql
```

**Backup Schedule Recommendation:**
- Daily backups (automated via cron/task scheduler)
- Keep last 7 days of backups
- Weekly full backups (keep for 1 month)
- Monthly backups (keep for 1 year)

### Database Restore

**Using Script:**
```cmd
cd backend
scripts\restore-database.bat
```

**Manual Command:**
```cmd
mysql -h localhost -u root -p teacher_platform < backup.sql
```

### Database Reset (Development Only!)

**Warning:** This drops all data and recreates tables with seed data.

```cmd
cd backend
scripts\reset-database.bat
```

or
```cmd
npm run reset
```

### View Database Size

```sql
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'teacher_platform'
GROUP BY table_schema;
```

---

## 🔍 Monitoring & Diagnostics

### Check Environment Configuration

```cmd
cd backend
node scripts/check-env.bat
```

### Monitor Database Connections

```sql
-- Show active connections
SHOW PROCESSLIST;

-- Show connection pool status
SHOW STATUS LIKE 'Threads%';
```

### Check Table Sizes

```sql
SELECT 
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)',
    table_rows AS 'Rows'
FROM information_schema.TABLES
WHERE table_schema = 'teacher_platform'
ORDER BY (data_length + index_length) DESC;
```

### Find Slow Queries

Enable slow query log in MySQL:
```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;  -- Log queries taking > 2 seconds
```

View slow query log:
```cmd
mysql -e "SELECT * FROM mysql.slow_log\G"
```

---

## 🔒 Security Maintenance

### Update JWT Secret (Production)

Generate new secret:
```cmd
node scripts/generate-jwt-secret.js
```

Update .env:
```env
JWT_SECRET=new-generated-secret
```

**Note:** This will invalidate all existing tokens. Users must re-login.

### Rotate Database Password

1. Create new database user:
```sql
CREATE USER 'teacher_new'@'localhost' IDENTIFIED BY 'new-password';
GRANT ALL PRIVILEGES ON teacher_platform.* TO 'teacher_new'@'localhost';
FLUSH PRIVILEGES;
```

2. Update .env:
```env
DB_USER=teacher_new
DB_PASSWORD=new-password
```

3. Restart server

4. Remove old user (after verifying):
```sql
DROP USER 'teacher_old'@'localhost';
```

### Check for Vulnerable Dependencies

```cmd
npm audit
npm audit fix
```

### Update Dependencies

```cmd
# Check outdated packages
npm outdated

# Update all to latest
npm update

# Update specific package
npm install package-name@latest
```

---

## 📊 Performance Optimization

### Database Indexing

Check missing indexes:
```sql
-- Find tables without indexes
SELECT 
    t.table_name,
    t.table_rows
FROM information_schema.tables t
LEFT JOIN information_schema.statistics s ON t.table_name = s.table_name
WHERE t.table_schema = 'teacher_platform'
AND s.index_name IS NULL
AND t.table_rows > 1000;
```

Add indexes to frequently queried columns:
```sql
-- Example: Add index to email column
CREATE INDEX idx_users_email ON users(email);

-- Example: Composite index for course queries
CREATE INDEX idx_courses_category_level ON courses(category, level);
```

### Analyze Query Performance

```sql
-- Enable profiling
SET profiling = 1;

-- Run your query
SELECT * FROM users WHERE email = 'test@example.com';

-- View profile
SHOW PROFILES;

-- Detailed profile
SHOW PROFILE FOR QUERY 1;
```

### Optimize Tables

```sql
-- Analyze tables for optimization
ANALYZE TABLE users, courses, course_enrollments;

-- Optimize tables
OPTIMIZE TABLE users, courses, course_enrollments;
```

### Connection Pool Tuning

Edit `src/config/database.ts`:
```typescript
const dbConfig = {
  // Increase pool size for high traffic
  connectionLimit: 20,  // Default: 10
  
  // Queue more requests
  queueLimit: 10,       // Default: 0
  
  // Enable keep-alive
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};
```

---

## 📈 Scaling Operations

### Vertical Scaling (Increase Resources)

1. **Increase Server Resources:**
   - More RAM
   - More CPU cores
   - Faster SSD storage

2. **Increase Database Resources:**
   - Larger instance size
   - More storage
   - Provisioned IOPS

### Horizontal Scaling (Add Servers)

1. **Setup Load Balancer:**
   - Nginx/HAProxy
   - AWS ALB
   - Cloudflare Load Balancing

2. **Run Multiple Backend Instances:**
```cmd
pm2 start dist/server.js -i 4  # 4 instances
```

3. **Database Read Replicas:**
   - Master for writes
   - Replicas for reads

---

## 🧹 Cleanup Operations

### Clear Old Notifications

```sql
-- Delete notifications older than 30 days
DELETE FROM notifications 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### Clear Old Chat Messages

```sql
-- Delete messages older than 90 days
DELETE FROM chat_messages 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY)
AND is_deleted = TRUE;
```

### Archive Old Quiz Attempts

```sql
-- Archive attempts older than 1 year
CREATE TABLE quiz_attempts_archive LIKE quiz_attempts;

INSERT INTO quiz_attempts_archive
SELECT * FROM quiz_attempts
WHERE completed_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

DELETE FROM quiz_attempts
WHERE completed_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

### Clear Logs

```cmd
# Development logs
rm -f *.log

# PM2 logs
pm2 flush
```

---

## 🔄 Update Procedures

### Minor Updates (Bug Fixes, Small Features)

```cmd
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Run migrations (if any)
npm run migrate

# 5. Restart server
pm2 reload teacher-backend  # Zero downtime

# or for development
# Ctrl+C to stop, then npm run dev
```

### Major Updates (Schema Changes)

```cmd
# 1. Backup database first!
scripts\backup-database.bat

# 2. Pull code
git pull origin main

# 3. Install dependencies
npm install

# 4. Review migration scripts
cat src/database/schema.sql

# 5. Run migrations
npm run migrate

# 6. Build
npm run build

# 7. Test locally first
npm run dev
# Run tests...

# 8. Deploy to production
pm2 reload teacher-backend
```

---

## 🚨 Troubleshooting Common Issues

### Issue: Database Connection Timeout

**Symptoms:**
```
Error: connect ETIMEDOUT
```

**Solutions:**
1. Check MySQL is running:
```cmd
sc query MySQL80
```

2. Verify credentials in .env

3. Check firewall rules

4. Increase connection timeout:
```typescript
// In database.ts
const dbConfig = {
  connectTimeout: 20000  // 20 seconds
};
```

### Issue: High Memory Usage

**Check memory:**
```cmd
# Windows
tasklist /FI "IMAGENAME eq node.exe"

# Linux
ps aux | grep node
```

**Solutions:**
1. Restart server:
```cmd
pm2 restart teacher-backend
```

2. Increase Node.js memory limit:
```cmd
node --max-old-space-size=4096 dist/server.js
```

3. Check for memory leaks:
```cmd
npm install -g clinic
clinic doctor -- node dist/server.js
```

### Issue: Slow API Responses

**Diagnose:**
1. Check database queries
2. Enable query logging
3. Check network latency
4. Review code for N+1 queries

**Solutions:**
1. Add database indexes
2. Optimize queries
3. Implement caching
4. Use connection pooling

### Issue: JWT Token Errors

**Error:** `Invalid or expired token`

**Solutions:**
1. Check JWT_SECRET is consistent
2. Verify token expiration time
3. Clear browser localStorage
4. Re-login to get new token

---

## 📅 Maintenance Schedule

### Daily
- [ ] Check server health
- [ ] Review error logs
- [ ] Monitor API response times
- [ ] Check disk space

### Weekly
- [ ] Database backup
- [ ] Review slow queries
- [ ] Check for outdated dependencies
- [ ] Review user growth metrics

### Monthly
- [ ] Full database backup
- [ ] Security audit
- [ ] Update dependencies
- [ ] Clean old data
- [ ] Review and optimize queries
- [ ] Check SSL certificate expiry

### Quarterly
- [ ] Major dependency updates
- [ ] Database optimization
- [ ] Security penetration testing
- [ ] Review and update documentation
- [ ] Capacity planning review

---

## 📊 Key Metrics to Monitor

### Application Metrics
- Request rate (requests/second)
- Response time (average, p95, p99)
- Error rate (%)
- Active users

### Database Metrics
- Connection pool usage
- Query execution time
- Table sizes
- Index efficiency
- Slow query count

### System Metrics
- CPU usage (%)
- Memory usage (%)
- Disk usage (%)
- Network I/O

### Business Metrics
- User registrations (daily/weekly)
- Course enrollments
- Quiz completions
- Job applications
- Active users

---

## 🛠️ Useful Commands Reference

```cmd
# Development
npm run dev                     # Start dev server
npm run build                   # Build TypeScript
npm run migrate                 # Run migrations
npm run seed                    # Seed database
npm run reset                   # Reset database

# Database Management
scripts\backup-database.bat     # Backup database
scripts\restore-database.bat    # Restore database
scripts\reset-database.bat      # Reset database

# Utilities
node scripts/generate-jwt-secret.js  # Generate JWT secret
node scripts/check-env.bat           # Check environment

# PM2 (Production)
pm2 start dist/server.js             # Start
pm2 stop teacher-backend             # Stop
pm2 restart teacher-backend          # Restart
pm2 reload teacher-backend           # Zero-downtime restart
pm2 logs teacher-backend             # View logs
pm2 monit                            # Monitor
pm2 delete teacher-backend           # Remove
```

---

## 📞 Emergency Contacts

### Quick Response

**Server Down:**
1. Check PM2: `pm2 status`
2. Check logs: `pm2 logs`
3. Restart: `pm2 restart teacher-backend`

**Database Down:**
1. Check MySQL: `sc query MySQL80`
2. Start MySQL: `sc start MySQL80`
3. Check connections: `mysql -u root -p -e "SHOW PROCESSLIST"`

**High Load:**
1. Check processes: `pm2 monit`
2. Check database: `SHOW PROCESSLIST`
3. Scale if needed: `pm2 scale teacher-backend +2`

---

This maintenance guide should cover all routine and emergency operations! Keep it handy for daily operations. 🚀
