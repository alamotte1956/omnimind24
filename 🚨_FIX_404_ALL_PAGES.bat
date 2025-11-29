@echo off
echo.
echo ========================================
echo   FIX 404 ERRORS - FORCE DEPLOYMENT
echo ========================================
echo.
echo This will force push all pages to GitHub
echo.
pause

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo.
echo [1/6] Checking current status...
git status

echo.
echo [2/6] Pulling latest from GitHub...
git pull origin master

echo.
echo [3/6] Adding all new and updated files...
git add features.html
git add support.html
git add documentation.html
git add api-reference.html
git add help-center.html
git add index.html
git add CNAME
git add .nojekyll

echo.
echo [4/6] Committing changes...
git commit -m "Fix 404: Add all navigation pages with proper configuration"

echo.
echo [5/6] Force pushing to GitHub...
git push origin master --force

echo.
echo [6/6] Creating empty commit to trigger rebuild...
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin master

echo.
echo ========================================
echo   ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo GitHub Pages is now rebuilding your site.
echo.
echo WAIT 3-5 MINUTES, then test:
echo   https://omnimind24.com/
echo   https://omnimind24.com/features.html
echo   https://omnimind24.com/support.html
echo   https://omnimind24.com/documentation.html
echo   https://omnimind24.com/api-reference.html
echo   https://omnimind24.com/help-center.html
echo.
echo If still 404:
echo 1. Go to: https://github.com/alamotte1956/omnimind24/settings/pages
echo 2. Verify: Branch = master, Folder = / (root)
echo 3. Check: Custom domain = omnimind24.com
echo 4. Wait another 5 minutes
echo.
pause
