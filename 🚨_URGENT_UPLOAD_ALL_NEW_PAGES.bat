@echo off
echo.
echo ========================================
echo   URGENT: UPLOAD ALL NEW PAGES TO GITHUB
echo ========================================
echo.
echo This will upload ALL the new beautiful pages we created!
echo.
pause

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo.
echo [1/8] Pulling latest from GitHub...
git pull origin master

echo.
echo [2/8] Adding ALL new navigation pages...
git add features.html
git add support.html
git add documentation.html
git add api-reference.html
git add help-center.html

echo.
echo [3/8] Adding updated homepage...
git add index.html

echo.
echo [4/8] Adding updated dashboard pages...
git add dashboard/create-campaign.html
git add dashboard/campaigns.html
git add dashboard/index.html
git add dashboard/profile.html

echo.
echo [5/8] Adding configuration files...
git add CNAME
git add .nojekyll

echo.
echo [6/8] Checking what will be uploaded...
git status

echo.
echo [7/8] Committing all changes...
git commit -m "Upload all new beautiful pages: Features, Support, Documentation, API Reference, Help Center + Updated dashboard"

echo.
echo [8/8] Pushing to GitHub...
git push origin master

echo.
echo ========================================
echo   ✅ UPLOAD COMPLETE!
echo ========================================
echo.
echo Your new beautiful pages are now uploading to GitHub!
echo.
echo WAIT 3-5 MINUTES for GitHub Pages to rebuild, then test:
echo.
echo NEW PAGES (should all work):
echo   https://omnimind24.com/features.html
echo   https://omnimind24.com/support.html
echo   https://omnimind24.com/documentation.html
echo   https://omnimind24.com/api-reference.html
echo   https://omnimind24.com/help-center.html
echo.
echo DASHBOARD PAGES (should show new versions):
echo   https://omnimind24.com/dashboard/index.html
echo   https://omnimind24.com/dashboard/campaigns.html
echo   https://omnimind24.com/dashboard/create-campaign.html
echo.
echo If you still see old pages after 5 minutes:
echo 1. Clear browser cache (Ctrl + Shift + Delete)
echo 2. Hard refresh page (Ctrl + F5)
echo 3. Try again
echo.
pause
