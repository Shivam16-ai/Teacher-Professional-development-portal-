@echo off
REM Script to check if environment is properly configured

echo ========================================
echo   Environment Configuration Check
echo ========================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo [FAIL] .env file not found!
    echo        Please copy .env.example to .env and configure it.
    echo.
    pause
    exit /b 1
)

echo [OK] .env file exists
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Node.js is not installed!
    echo        Download from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] npm is not installed!
    echo.
    pause
    exit /b 1
)

echo [OK] npm is installed
npm --version
echo.

REM Check if MySQL is accessible
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN] MySQL command not found in PATH
    echo        Make sure MySQL is installed and accessible
    echo.
) else (
    echo [OK] MySQL is accessible
    mysql --version
    echo.
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [WARN] node_modules not found
    echo        Run: npm install
    echo.
) else (
    echo [OK] node_modules exists
    echo.
)

REM Check if TypeScript is compiled
if not exist "dist" (
    echo [WARN] dist folder not found
    echo        Run: npm run build
    echo.
) else (
    echo [OK] TypeScript compiled (dist folder exists)
    echo.
)

echo ========================================
echo   Environment Check Complete
echo ========================================
echo.
echo Next steps:
echo   1. Configure .env with your database credentials
echo   2. Run: npm install
echo   3. Run: npm run migrate
echo   4. Run: npm run seed
echo   5. Run: npm run dev
echo.

pause
