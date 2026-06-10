@echo off
echo ====================================
echo  Teacher Platform Backend Starter
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/3] Installing dependencies...
    call npm install
    echo.
) else (
    echo [1/3] Dependencies already installed
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo [2/3] Creating .env file...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env file with your MySQL credentials!
    echo Press any key to continue after editing .env...
    pause > nul
) else (
    echo [2/3] .env file exists
    echo.
)

echo [3/3] Starting backend server...
echo.
npm run dev
