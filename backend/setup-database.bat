@echo off
echo ========================================
echo  Teacher Platform Database Setup
echo ========================================
echo.

echo This script will:
echo 1. Run database migrations
echo 2. Seed sample data
echo.
echo Make sure MySQL is running and .env is configured!
echo.
pause

echo.
echo [1/2] Running migrations...
call npm run migrate

if %errorlevel% neq 0 (
    echo.
    echo Migration failed! Check your database connection.
    pause
    exit /b 1
)

echo.
echo [2/2] Seeding database...
call npm run seed

if %errorlevel% neq 0 (
    echo.
    echo Seeding failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Database setup completed successfully!
echo ========================================
echo.
echo Test credentials:
echo - Email: john.teacher@example.com
echo - Password: password123
echo.
pause
