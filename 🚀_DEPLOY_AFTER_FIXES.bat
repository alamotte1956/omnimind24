@echo off
COLOR 0A

REM ═══════════════════════════════════════════════════════════════════════
REM     🚀 OMNIMIND24 - DEPLOY AFTER FIXES
REM ═══════════════════════════════════════════════════════════════════════
REM 
REM This script deploys all fixes to GitHub and Railway
REM Run this AFTER you've manually verified all fixes
REM
REM ═══════════════════════════════════════════════════════════════════════

echo.
echo ═══════════════════════════════════════════════════════════════════════
echo                    🚀 DEPLOY FIXES TO PRODUCTION
echo ═══════════════════════════════════════════════════════════════════════
echo.

REM Check if in correct directory
if not exist "backend\server.js" (
    echo ❌ ERROR: Not in project root directory
    pause
    exit /b 1
)

echo This script will:
echo   1. Stage all changes
echo   2. Create a commit
echo   3. Push to GitHub
echo   4. Trigger Railway deployment
echo.
echo ⚠️  Make sure you've completed all manual fixes first!
echo.
set /p CONFIRM="Ready to deploy? (Y/N): "

if /i not "%CONFIRM%"=="Y" (
    echo.
    echo ❌ Deployment cancelled
    pause
    exit /b 0
)

echo.
echo [1/4] Checking Git status...
git status

echo.
echo [2/4] Staging changes...
git add .

echo.
echo [3/4] Creating commit...
git commit -m "Fix: All navigation and security issues resolved

- Renamed profile-v2.html to profile.html
- Enabled authentication middleware in campaigns.js
- Enabled Helmet security middleware in server.js
- Updated profile campaign reference
- Removed admin link from pricing page
- Fixed footer placeholder links

Fixes critical security vulnerabilities and navigation issues."

if %errorlevel% neq 0 (
    echo.
    echo ⚠️  No changes to commit or commit failed
    echo.
    pause
    exit /b 1
)

echo.
echo [4/4] Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ═══════════════════════════════════════════════════════════════════════
    echo                        ✅ DEPLOYMENT SUCCESSFUL
    echo ═══════════════════════════════════════════════════════════════════════
    echo.
    echo   Your changes have been pushed to GitHub!
    echo   Railway will automatically deploy in 2-3 minutes.
    echo.
    echo   URLs to test:
    echo     Backend:  https://omnimind-production.up.railway.app/health
    echo     Frontend: https://alamotte1956.github.io/omni_clean/
    echo     Dashboard: https://alamotte1956.github.io/omni_clean/dashboard/login.html
    echo.
    echo   Monitor deployment:
    echo     https://railway.app/dashboard
    echo     https://github.com/alamotte1956/omni_clean/actions
    echo.
    echo ═══════════════════════════════════════════════════════════════════════
) else (
    echo.
    echo ❌ Push failed!
    echo    Please check your Git configuration and try again.
    echo.
)

echo.
pause
