@echo off
echo ========================================
echo OMNIMIND24 - PULL THEN PUSH
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1/4] Checking current status...
git status
echo.

echo [Step 2/4] Pulling latest changes from GitHub...
echo This will merge remote changes with your local changes...
git pull origin master
echo.

if %errorlevel% neq 0 (
    echo.
    echo ⚠️ MERGE CONFLICT DETECTED!
    echo.
    echo You need to resolve conflicts manually.
    echo Look for files with ^<^<^<^<^<^<^< HEAD markers
    echo.
    echo After resolving conflicts:
    echo 1. git add .
    echo 2. git commit -m "Merge and resolve conflicts"
    echo 3. git push origin master
    echo.
    pause
    exit /b 1
)

echo [Step 3/4] Adding all your changes...
git add .
echo.

echo [Step 4/4] Committing changes...
git commit -m "Add new navigation pages: features, support, docs, API reference, help center"
echo.

echo [Step 5/5] Pushing to GitHub...
git push origin master
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo ✅ SUCCESS! PUSH COMPLETE!
    echo ========================================
    echo.
    echo Your changes are now on GitHub!
    echo.
    echo ⏱️ WAIT 5 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test these pages in INCOGNITO MODE:
    echo.
    echo ✅ https://omnimind24.com/features.html
    echo ✅ https://omnimind24.com/support.html
    echo ✅ https://omnimind24.com/documentation.html
    echo ✅ https://omnimind24.com/api-reference.html
    echo ✅ https://omnimind24.com/help-center.html
    echo ✅ https://omnimind24.com/dashboard/campaigns.html
    echo.
    echo 🎉 All your new pages should be live!
    echo.
) else (
    echo ========================================
    echo ❌ PUSH FAILED
    echo ========================================
    echo.
    echo Copy the error message above and send it to me.
    echo.
)

pause
