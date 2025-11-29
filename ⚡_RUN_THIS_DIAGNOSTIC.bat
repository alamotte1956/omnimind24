@echo off
echo ========================================
echo OMNIMIND24 - GIT PUSH DIAGNOSTIC
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [1/6] Checking Git Remote...
git remote -v
echo.

echo [2/6] Checking Git Status...
git status
echo.

echo [3/6] Checking Current Branch...
git branch
echo.

echo [4/6] Checking Git User Config...
git config --list | findstr user
echo.

echo [5/6] Checking Repository Info...
git remote show origin
echo.

echo [6/6] Attempting Verbose Push...
echo This will attempt to push and show detailed error info...
git push origin master --verbose 2>&1
echo.

echo ========================================
echo DIAGNOSTIC COMPLETE
echo ========================================
echo.
echo COPY ALL THE OUTPUT ABOVE AND SEND IT
echo.
pause
