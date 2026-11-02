#!/usr/bin/env bash

# AI Writing Fingerprint - Unified Launcher Script
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "=========================================================="
echo "  Starting AI Writing Fingerprint Platform"
echo "=========================================================="

# 1. Activate Python virtual environment
if [ -d "$BACKEND_DIR/venv" ]; then
    source "$BACKEND_DIR/venv/bin/activate"
else
    echo "Creating backend virtual environment..."
    python3 -m venv "$BACKEND_DIR/venv"
    source "$BACKEND_DIR/venv/bin/activate"
    pip install -r "$BACKEND_DIR/requirements.txt"
    python -m spacy download en_core_web_sm
fi

# 2. Trap SIGINT and SIGTERM to kill background children on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 3. Start Backend in background
echo "-> Starting FastAPI Backend on http://127.0.0.1:8000..."
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload &
BACKEND_PID=$!

# Wait briefly for backend to initialize
sleep 2

# 4. Start Frontend
echo "-> Starting Vite React Frontend on http://localhost:5173..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=========================================================="
echo "  AI Writing Fingerprint is Running!"
echo "  Frontend URL: http://localhost:5173"
echo "  Backend API:  http://127.0.0.1:8000"
echo "  API Docs:     http://127.0.0.1:8000/docs"
echo "=========================================================="
echo "Press [CTRL + C] in this terminal to stop both servers."

# Wait for background jobs
wait

