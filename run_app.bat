@echo off
title This Time — Running

echo.
echo ================================================
echo   Starting This Time...
echo   Keep this window open while using the app.
echo   Press Ctrl+C to stop.
echo ================================================
echo.

cd /d "%~dp0"
start http://localhost:3000
npm run dev

pause
