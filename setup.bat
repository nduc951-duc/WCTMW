@echo off
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  Strategy Pattern Demo - Full Stack Setup                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✓ Node.js is installed: %NODE_VERSION%
echo.

REM Setup Backend
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📦 Setting up Backend...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✓ Backend dependencies already installed
)
cd ..
echo.

REM Setup Frontend
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📦 Setting up Frontend...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✓ Frontend dependencies already installed
)
cd ..
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║  ✓ Setup Complete!                                         ║
echo ╠════════════════════════════════════════════════════════════╣
echo ║  To start the application:                                 ║
echo ║                                                            ║
echo ║  1. Backend:                                               ║
echo ║     cd backend && npm run dev                              ║
echo ║     (Runs on http://localhost:3000)                        ║
echo ║                                                            ║
echo ║  2. Frontend (in another terminal):                        ║
echo ║     cd frontend && npm run dev                             ║
echo ║     (Runs on http://localhost:5173)                        ║
echo ║                                                            ║
echo ║  3. Open browser and visit: http://localhost:5173         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
pause
