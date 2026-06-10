@echo off
REM Script to completely reset the database (drop, migrate, seed)

echo ========================================
echo   Database Reset Script
echo ========================================
echo.
echo WARNING: This will:
echo   1. Drop all existing tables
echo   2. Recreate tables (migrate)
echo   3. Insert sample data (seed)
echo.
echo All existing data will be LOST!
echo.

set /p confirm="Are you sure you want to continue? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo.
    echo Reset cancelled.
    echo.
    pause
    exit /b 0
)

echo.
echo [1/3] Running migrations (recreate tables)...
call npm run migrate

if %errorlevel% neq 0 (
    echo.
    echo Migration failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Seeding database with sample data...
call npm run seed

if %errorlevel% neq 0 (
    echo.
    echo Seeding failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Database reset completed!
echo ========================================
echo.
echo You can now login with:
echo   Email: john.teacher@example.com
echo   Password: password123
echo.

pause
