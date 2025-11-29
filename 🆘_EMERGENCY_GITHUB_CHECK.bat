@echo off
echo.
echo ========================================
echo   EMERGENCY DIAGNOSTIC - GitHub Status
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo.
echo [STEP 1] Checking if we're in the right directory...
echo Current directory:
cd
echo.

echo [STEP 2] Checking if Git is initialized...
git status
echo.

echo [STEP 3] Checking which files exist locally...
echo.
echo Checking for new pages:
if exist features.html (echo ✅ features.html EXISTS) else (echo ❌ features.html MISSING)
if exist support.html (echo ✅ support.html EXISTS) else (echo ❌ support.html MISSING)
if exist documentation.html (echo ✅ documentation.html EXISTS) else (echo ❌ documentation.html MISSING)
if exist api-reference.html (echo ✅ api-reference.html EXISTS) else (echo ❌ api-reference.html MISSING)
if exist help-center.html (echo ✅ help-center.html EXISTS) else (echo ❌ help-center.html MISSING)
if exist index.html (echo ✅ index.html EXISTS) else (echo ❌ index.html MISSING)
if exist CNAME (echo ✅ CNAME EXISTS) else (echo ❌ CNAME MISSING)
if exist .nojekyll (echo ✅ .nojekyll EXISTS) else (echo ❌ .nojekyll MISSING)

echo.
echo [STEP 4] Checking Git remote...
git remote -v

echo.
echo [STEP 5] Checking what's been committed...
git log --oneline -5

echo.
echo [STEP 6] Checking GitHub repository directly...
echo.
echo Opening GitHub in your browser...
echo Please check if files are there!
start https://github.com/alamotte1956/omnimind24

echo.
echo ========================================
echo   NEXT STEPS BASED ON RESULTS:
echo ========================================
echo.
echo IF FILES ARE MISSING LOCALLY:
echo   The files only exist in the chat, not on your computer.
echo   We need to create them properly.
echo.
echo IF FILES EXIST LOCALLY BUT NOT ON GITHUB:
echo   Run: git add .
echo   Run: git commit -m "Add all pages"
echo   Run: git push origin master
echo.
echo IF FILES ARE ON GITHUB BUT SITE STILL 404:
echo   Go to: https://github.com/alamotte1956/omnimind24/settings/pages
echo   Check settings and wait 5 minutes
echo.
pause
