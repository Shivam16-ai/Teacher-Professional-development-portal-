@echo off
REM Database Backup Script for Windows

echo ========================================
echo   Database Backup Script
echo ========================================
echo.

REM Load environment variables
for /f "tokens=1,2 delims==" %%a in ('type .env ^| findstr /v "^#"') do set %%a=%%b

REM Create backups directory if it doesn't exist
if not exist "backups" mkdir backups

REM Generate timestamp for filename
set timestamp=%date:~-4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

REM Set backup filename
set backup_file=backups\teacher_platform_backup_%timestamp%.sql

echo Backing up database: %DB_NAME%
echo.

REM Run mysqldump
mysqldump -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% > %backup_file%

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Backup completed successfully!
    echo ========================================
    echo.
    echo File: %backup_file%
    echo.
) else (
    echo.
    echo ========================================
    echo   Backup failed!
    echo ========================================
    echo.
)

pause
