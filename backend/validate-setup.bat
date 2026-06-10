@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  Backend Setup Validation Script
echo ========================================
echo.

set ERRORS=0

REM Check 1: Node.js
echo [1/10] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    X Node.js not found! Please install Node.js
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('node --version') do echo    ✓ Node.js %%i installed
)

REM Check 2: npm
echo [2/10] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    X npm not found!
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('npm --version') do echo    ✓ npm %%i installed
)

REM Check 3: node_modules
echo [3/10] Checking dependencies...
if exist "node_modules\" (
    echo    ✓ node_modules folder exists
) else (
    echo    X node_modules not found! Run: npm install
    set /a ERRORS+=1
)

REM Check 4: .env file
echo [4/10] Checking .env file...
if exist ".env" (
    echo    ✓ .env file exists
) else (
    echo    X .env file not found! Copy from .env.example
    set /a ERRORS+=1
)

REM Check 5: MySQL connection
echo [5/10] Checking MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    ! MySQL CLI not in PATH (may still work)
) else (
    for /f "tokens=*" %%i in ('mysql --version') do echo    ✓ MySQL CLI available
)

REM Check 6: TypeScript
echo [6/10] Checking TypeScript...
if exist "node_modules\.bin\tsc.cmd" (
    echo    ✓ TypeScript installed
) else (
    echo    X TypeScript not found!
    set /a ERRORS+=1
)

REM Check 7: tsx
echo [7/10] Checking tsx...
if exist "node_modules\.bin\tsx.cmd" (
    echo    ✓ tsx installed
) else (
    echo    X tsx not found!
    set /a ERRORS+=1
)

REM Check 8: Source files
echo [8/10] Checking source files...
if exist "src\server.ts" (
    echo    ✓ server.ts exists
) else (
    echo    X server.ts not found!
    set /a ERRORS+=1
)

REM Check 9: Database files
echo [9/10] Checking database files...
if exist "src\database\schema.sql" (
    echo    ✓ schema.sql exists
) else (
    echo    X schema.sql not found!
    set /a ERRORS+=1
)

REM Check 10: Port availability
echo [10/10] Checking port 3000...
netstat -an | findstr ":3000" >nul 2>&1
if %errorlevel% equ 0 (
    echo    ! Port 3000 is already in use
    echo      (This is OK if backend is running)
) else (
    echo    ✓ Port 3000 is available
)

echo.
echo ========================================

if %ERRORS% equ 0 (
    echo  ✓ ALL CHECKS PASSED!
    echo ========================================
    echo.
    echo Your backend is ready to run!
    echo.
    echo Next steps:
    echo 1. Ensure MySQL is running
    echo 2. Configure .env with your MySQL password
    echo 3. Run: npm run migrate
    echo 4. Run: npm run seed
    echo 5. Run: npm run dev
    echo.
) else (
    echo  X %ERRORS% ERROR(S) FOUND!
    echo ========================================
    echo.
    echo Please fix the errors above before continuing.
    echo.
)

pause
