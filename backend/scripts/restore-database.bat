@echo off
REM Database Restore Script for Windows

echo ========================================
echo   Database Restore Script
echo ========================================
echo.

REM Load environment variables
for /f "tokens=1,2 delims==" %%a in ('type .env ^| findstr /v "^#"') do set %%a=%%b

echo Available backup files:
echo.
dir /b backups\*.sql
echo.

set /p backup_file="Enter backup filename (e.g., teacher_platform_backup_20260608.sql): "

if not exist "backups\%backup_file%" (
    echo.
    echo Error: Backup file not found!
    echo.
    pause
    exit /b 1
)

echo.
echo WARNING: This will overwrite the current database!
echo Database: %DB_NAME%
echo.
set /p confirm="Are you sure? (yes/no): "

if /i not "%confirm%"=="yes" (
    echo.
    echo Restore cancelled.
    echo.
    pause
    exit /b 0
)

echo.
echo Restoring database...
echo.

mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < backups\%backup_file%

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Restore completed successfully!
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo   Restore failed!
    echo ========================================
    echo.
)

pause
