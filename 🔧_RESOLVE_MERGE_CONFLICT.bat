@echo off
echo ========================================
echo RESOLVE MERGE CONFLICT - AUTO FIX
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1/3] Checking which files have conflicts...
git status
echo.

echo ========================================
echo CONFLICT RESOLUTION OPTIONS
echo ========================================
echo.
echo OPTION 1: Keep YOUR local changes (recommended)
echo   - Keeps all your new pages (features.html, support.html, etc.)
echo   - Overwrites GitHub's version
echo.
echo OPTION 2: Keep GITHUB's changes
echo   - Discards your local changes
echo   - NOT recommended - you'll lose your new pages!
echo.
echo OPTION 3: Abort merge and start over
echo   - Cancels the merge
echo   - Returns to pre-pull state
echo.
echo ========================================
echo.

set /p choice="Which option? (1/2/3): "

if "%choice%"=="1" goto keep_local
if "%choice%"=="2" goto keep_remote
if "%choice%"=="3" goto abort_merge

echo Invalid choice. Please run again and choose 1, 2, or 3.
pause
exit /b 1

:keep_local
echo.
echo [Choosing OPTION 1] Keeping YOUR local changes...
echo.
git checkout --ours .
git add .
git commit -m "Resolve merge conflicts - keep local changes with new navigation pages"
echo.
echo [Step 2/3] Pushing to GitHub...
git push origin master
echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo ✅ SUCCESS! Merge resolved and pushed!
    echo ========================================
    echo.
    echo Your local changes are now on GitHub!
    echo.
    echo ⏱️ WAIT 5 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test in INCOGNITO MODE:
    echo ✅ https://omnimind24.com/features.html
    echo ✅ https://omnimind24.com/support.html
    echo ✅ https://omnimind24.com/documentation.html
    echo ✅ https://omnimind24.com/api-reference.html
    echo ✅ https://omnimind24.com/help-center.html
    echo.
) else (
    echo ❌ Push failed. Copy the error above and send it.
)
pause
exit /b 0

:keep_remote
echo.
echo [Choosing OPTION 2] Keeping GITHUB's changes...
echo ⚠️ WARNING: This will discard your new pages!
echo.
set /p confirm="Are you SURE? Type YES to confirm: "
if not "%confirm%"=="YES" (
    echo Cancelled. Run the batch file again.
    pause
    exit /b 1
)
git checkout --theirs .
git add .
git commit -m "Resolve merge conflicts - keep remote changes"
git push origin master
echo.
echo ✅ Merge resolved. GitHub's version is now active.
pause
exit /b 0

:abort_merge
echo.
echo [Choosing OPTION 3] Aborting merge...
git merge --abort
echo.
echo ✅ Merge aborted. You're back to pre-pull state.
echo.
echo What to do next:
echo 1. Make sure you have all your new files saved
echo 2. Try pulling again: git pull origin master
echo 3. Or force push: git push origin master --force
echo.
pause
exit /b 0
