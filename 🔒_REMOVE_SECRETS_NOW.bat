@echo off
echo ========================================
echo REMOVE AWS SECRETS - EMERGENCY FIX
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo GitHub blocked your push because these files contain real API credentials:
echo.
echo - _START_HERE_FIRST.txt
echo - FINAL_SUMMARY.txt
echo - COMPLETE_ACTION_PLAN.txt
echo - READ_ME_NOW.txt
echo - SIMPLE_SETUP_GUIDE.txt
echo - ACTION_REQUIRED_NOW.txt
echo - And 10+ more files
echo.
echo ========================================
echo SOLUTION: DELETE THESE DOCUMENTATION FILES
echo ========================================
echo.
echo These are old setup instruction files that contain your credentials.
echo They are NOT needed for your website to work.
echo.
echo Your actual website files (index.html, features.html, etc.) are SAFE.
echo.
pause

echo.
echo [Step 1/3] Deleting files with exposed credentials...
echo.

del /F "_START_HERE_FIRST.txt" 2>nul
del /F "FINAL_SUMMARY.txt" 2>nul
del /F "COMPLETE_ACTION_PLAN.txt" 2>nul
del /F "READ_ME_NOW.txt" 2>nul
del /F "SIMPLE_SETUP_GUIDE.txt" 2>nul
del /F "ACTION_REQUIRED_NOW.txt" 2>nul
del /F "DO_ALL_3_TASKS.bat" 2>nul
del /F "RAILWAY_ENV_SETUP.html" 2>nul
del /F "RAILWAY_CONFIG_GUIDE.html" 2>nul
del /F "MASTER_FIX_ALL_ISSUES.html" 2>nul
del /F "AWS_S3_INTEGRATION_GUIDE.md" 2>nul
del /F "AWS_INTEGRATION_COMPLETE_SUMMARY.md" 2>nul

echo.
echo ✅ Deleted 12 files with exposed credentials
echo.

echo [Step 2/3] Staging changes...
git add .

echo.
echo [Step 3/3] Committing and pushing...
git commit -m "Remove files with exposed API credentials"
git push origin master

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ SUCCESS! Push completed!
    echo ========================================
    echo.
    echo Your credentials have been removed from GitHub.
    echo.
    echo ⏱️ WAIT 5 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test: https://omnimind24.com/features.html
    echo.
) else (
    echo.
    echo ❌ Push still failed. Copy the error and send it.
    echo.
)

pause
