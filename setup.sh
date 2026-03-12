#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Strategy Pattern Demo - Full Stack Setup                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js is installed: $(node --version)"
echo ""

# Setup Backend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Setting up Backend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✓ Backend dependencies already installed"
fi
cd ..
echo ""

# Setup Frontend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Setting up Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✓ Frontend dependencies already installed"
fi
cd ..
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✓ Setup Complete!                                         ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║  To start the application:                                 ║"
echo "║                                                            ║"
echo "║  1. Backend:                                               ║"
echo "║     cd backend && npm run dev                              ║"
echo "║     (Runs on http://localhost:3000)                        ║"
echo "║                                                            ║"
echo "║  2. Frontend (in another terminal):                        ║"
echo "║     cd frontend && npm run dev                             ║"
echo "║     (Runs on http://localhost:5173)                        ║"
echo "║                                                            ║"
echo "║  3. Open browser and visit: http://localhost:5173         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
