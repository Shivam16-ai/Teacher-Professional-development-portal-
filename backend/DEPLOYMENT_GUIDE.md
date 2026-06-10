# Production Deployment Guide

Complete guide for deploying the Teacher Platform backend to production.

---

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easiest)
### Option 2: Heroku
### Option 3: DigitalOcean
### Option 4: AWS EC2

---

## 🎯 Option 1: Railway Deployment

Railway provides easy deployment with built-in MySQL database.

### Step 1: Prepare for Deployment

1. **Create Production Build Script**

Add to `package.json`:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "postinstall": "npm run build"
  }
}
```

2. **Create Procfile** (optional)
```
web: node dist/server.js
```

### Step 2: Railway Setup

1. Go to https://railway.app/
2. Sign up/Login with GitHub
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Select your repository
6. Railway will auto-detect Node.js

### Step 3: Add MySQL Database

1. In your Railway project, click "New"
2. Select "Database" → "MySQL"
3. Railway creates a MySQL instance
4. Copy connection details

### Step 4: Set Environment Variables

In Railway project settings, add:

```env
NODE_ENV=production
PORT=3000

# Database (from Railway MySQL)
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=5432
DB_USER=root
DB_PASSWORD=xxxxxxxxxxxxx
DB_NAME=railway

# Security
JWT_SECRET=your-super-secret-production-key-min-32-chars
JWT_EXPIRE=7d

# CORS (your frontend URL)
CORS_ORIGIN=https://your-frontend-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 5: Deploy

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

Railway automatically deploys on push!

### Step 6: Run Migrations

1. In Railway, go to your service
2. Click "Settings" → "Service"
3. Add custom start command:
```bash
npm run migrate && npm run seed && npm start
```

Or manually via Railway CLI:
```bash
railway run npm run migrate
railway run npm run seed
```

### Step 7: Test Deployment

```bash
curl https://your-app.railway.app/health
```

---

## 🎯 Option 2: Heroku Deployment

### Prerequisites
```bash
npm install -g heroku
heroku login
```

### Step 1: Create Heroku App

```bash
cd backend
heroku create your-app-name
```

### Step 2: Add MySQL Database

```bash
# Add ClearDB MySQL addon
heroku addons:create cleardb:ignite

# Get database URL
heroku config:get CLEARDB_DATABASE_URL
```

Parse the URL format:
```
mysql://username:password@host/database?reconnect=true
```

### Step 3: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set DB_HOST=your-host.cleardb.com
heroku config:set DB_USER=your-username
heroku config:set DB_PASSWORD=your-password
heroku config:set DB_NAME=heroku_database
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CORS_ORIGIN=https://your-frontend.vercel.app
```

### Step 4: Create Procfile

```
web: node dist/server.js
release: npm run migrate
```

### Step 5: Deploy

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Step 6: Seed Database (One-time)

```bash
heroku run npm run seed
```

### Step 7: View Logs

```bash
heroku logs --tail
```

---

## 🎯 Option 3: DigitalOcean Droplet

### Step 1: Create Droplet

1. Go to DigitalOcean
2. Create new Droplet
3. Choose: Ubuntu 22.04 LTS
4. Size: $6/month (1GB RAM minimum)
5. Add SSH key

### Step 2: Connect to Droplet

```bash
ssh root@your-droplet-ip
```

### Step 3: Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install MySQL
apt install -y mysql-server

# Secure MySQL
mysql_secure_installation

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx
```

### Step 4: Setup MySQL

```bash
mysql -u root -p

CREATE DATABASE teacher_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'teacherapp'@'localhost' IDENTIFIED BY 'strong-password';
GRANT ALL PRIVILEGES ON teacher_platform.* TO 'teacherapp'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 5: Deploy Application

```bash
# Create app directory
mkdir -p /var/www/teacher-backend
cd /var/www/teacher-backend

# Clone repository (or upload via SCP)
git clone https://github.com/your-repo/teacher-backend.git .

# Install dependencies
npm install

# Create .env file
nano .env
```

Add production config:
```env
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=teacherapp
DB_PASSWORD=strong-password
DB_NAME=teacher_platform
JWT_SECRET=your-production-secret
CORS_ORIGIN=https://your-frontend.com
```

```bash
# Build application
npm run build

# Run migrations
npm run migrate

# Seed database
npm run seed
```

### Step 6: Setup PM2

```bash
# Start application with PM2
pm2 start dist/server.js --name teacher-backend

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Step 7: Configure Nginx

```bash
nano /etc/nginx/sites-available/teacher-backend
```

Add configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomaim.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/teacher-backend /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### Step 8: Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d api.yourdomain.com

# Auto-renewal is setup automatically
```

### Step 9: Setup Firewall

```bash
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

---

## 🎯 Option 4: AWS EC2

### Step 1: Launch EC2 Instance

1. Go to AWS Console
2. Launch EC2 instance
3. Choose: Ubuntu Server 22.04 LTS
4. Instance type: t2.micro (free tier) or t2.small
5. Configure security group:
   - SSH (22) from your IP
   - HTTP (80) from anywhere
   - HTTPS (443) from anywhere
6. Download key pair

### Step 2: Connect to Instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 3: Follow DigitalOcean Steps 3-9

The setup is identical to DigitalOcean from Step 3 onwards.

### Step 4: Setup RDS for MySQL (Optional)

For managed database:

1. Go to AWS RDS
2. Create MySQL database
3. Choose db.t3.micro (free tier eligible)
4. Set master password
5. Configure security group to allow EC2 access
6. Use RDS endpoint in your .env file

---

## 🗄️ Database Management

### Backup Database

**Local Development:**
```bash
mysqldump -u root -p teacher_platform > backup.sql
```

**Production:**
```bash
mysqldump -h your-host -u username -p database_name > backup-$(date +%Y%m%d).sql
```

### Restore Database

```bash
mysql -u username -p database_name < backup.sql
```

### Automated Backups (Cron Job)

```bash
crontab -e
```

Add daily backup at 2 AM:
```cron
0 2 * * * mysqldump -u username -p'password' database_name > /backups/db-$(date +\%Y\%m\%d).sql
```

---

## 🔒 Production Security Checklist

- [ ] Change JWT_SECRET to strong random value (min 32 characters)
- [ ] Use strong database password
- [ ] Enable HTTPS (SSL certificate)
- [ ] Update CORS_ORIGIN to production frontend URL
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Monitor error logs
- [ ] Setup health check monitoring
- [ ] Disable database root access
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable MySQL binary logging
- [ ] Setup fail2ban for SSH protection

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# View logs
pm2 logs teacher-backend

# Monitor processes
pm2 monit

# Check status
pm2 status

# View metrics
pm2 info teacher-backend
```

### Setup Log Rotation

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### External Monitoring Services

- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Error Tracking:** Sentry, Rollbar
- **Performance:** New Relic, DataDog
- **Logs:** Loggly, Papertrail

---

## 🚀 Continuous Deployment

### GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd backend
        npm install
    
    - name: Build
      run: |
        cd backend
        npm run build
    
    - name: Deploy to Railway
      run: |
        npm install -g @railway/cli
        railway up
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 🧪 Production Testing

### Health Check Endpoint

```bash
curl https://your-api.com/health
```

Expected: `{"status":"ok","message":"Server is running"}`

### Test Authentication

```bash
curl -X POST https://your-api.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Load Testing (Optional)

Install Apache Bench:
```bash
apt install apache2-utils
```

Test:
```bash
ab -n 1000 -c 10 https://your-api.com/api/courses
```

---

## 📈 Scaling Considerations

### Vertical Scaling
- Increase droplet/instance size
- Add more RAM and CPU cores

### Horizontal Scaling
- Load balancer (Nginx, AWS ALB)
- Multiple backend instances
- Database read replicas
- Redis caching layer

### Database Optimization
- Add indexes to frequently queried columns
- Enable query caching
- Use connection pooling
- Consider database sharding for large data

---

## 🔄 Update Process

### Zero-Downtime Deployment

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Run migrations
npm run migrate

# Reload PM2 (zero downtime)
pm2 reload teacher-backend
```

### Rollback

```bash
# Revert to previous version
git revert HEAD
npm install
npm run build
pm2 reload teacher-backend
```

---

## 📞 Troubleshooting Production Issues

### Check Logs
```bash
pm2 logs teacher-backend --lines 100
```

### Check Process Status
```bash
pm2 status
pm2 info teacher-backend
```

### Check Database Connection
```bash
mysql -h host -u user -p database_name
```

### Check Nginx Status
```bash
systemctl status nginx
nginx -t
```

### Check Disk Space
```bash
df -h
```

### Check Memory Usage
```bash
free -m
htop
```

---

## 🎯 Post-Deployment Checklist

- [ ] API health check returns 200 OK
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can fetch courses
- [ ] Database migrations ran successfully
- [ ] SSL certificate is active (HTTPS)
- [ ] CORS configured correctly
- [ ] Environment variables set properly
- [ ] PM2 running and set to restart on reboot
- [ ] Nginx reverse proxy working
- [ ] Firewall configured
- [ ] Backups scheduled
- [ ] Monitoring setup
- [ ] Error logging configured
- [ ] Frontend can connect to backend

---

## 💡 Cost Estimation

### Monthly Costs (Approximate)

**Railway (Easiest)**
- Starter Plan: $5/month (includes database)
- Pro Plan: $20/month

**Heroku**
- Dyno: $7/month
- ClearDB MySQL: $10/month
- Total: ~$17/month

**DigitalOcean**
- Droplet (1GB): $6/month
- Managed MySQL: $15/month
- Total: ~$21/month

**AWS**
- EC2 t2.micro: Free tier / $10/month
- RDS db.t3.micro: Free tier / $15/month
- Total: ~$25/month after free tier

---

## 📚 Additional Resources

- Railway Docs: https://docs.railway.app/
- Heroku Docs: https://devcenter.heroku.com/
- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials
- PM2 Documentation: https://pm2.keymetrics.io/docs/
- Nginx Configuration: https://nginx.org/en/docs/

---

**Ready for Production! 🚀**

Choose your deployment platform and follow the steps above. Railway is recommended for beginners due to its simplicity.
