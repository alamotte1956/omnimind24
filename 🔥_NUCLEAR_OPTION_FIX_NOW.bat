@echo off
echo.
echo ========================================
echo   NUCLEAR OPTION - FORCE EVERYTHING
echo ========================================
echo.
echo This will FORCE all files to upload and rebuild!
echo.
pause

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo.
echo [STEP 1] Checking current directory...
cd
echo.

echo [STEP 2] Checking git status...
git status
echo.

echo [STEP 3] Pulling latest from GitHub...
git pull origin master
echo.

echo [STEP 4] Adding EVERYTHING...
git add -A
git add --force .
echo.

echo [STEP 5] Creating commit...
git commit -m "FORCE UPDATE: All new beautiful pages, updated pricing, updated dashboard"
echo.

echo [STEP 6] Force pushing to GitHub...
git push origin master --force
echo.

echo [STEP 7] Creating empty commit to trigger rebuild...
git commit --allow-empty -m "Force GitHub Pages rebuild - all new pages"
git push origin master
echo.

echo [STEP 8] Another empty commit...
git commit --allow-empty -m "Rebuild trigger 2"
git push origin master
echo.

echo ========================================
echo   ✅ FORCE UPLOAD COMPLETE!
echo ========================================
echo.
echo Now WAIT 5 MINUTES for GitHub Pages to rebuild.
echo.
echo Then do this:
echo 1. Close ALL browser windows
echo 2. Open new browser window
echo 3. Press Ctrl + Shift + Delete
echo 4. Clear "Cached images and files"
echo 5. Close browser again
echo 6. Open browser and test pages
echo.
echo TEST THESE URLS (should all show NEW versions):
echo   https://omnimind24.com/
echo   https://omnimind24.com/pricing.html
echo   https://omnimind24.com/features.html
echo   https://omnimind24.com/dashboard/campaigns.html
echo.
echo If STILL showing old pages after this:
echo The problem is your browser cache or ISP cache.
echo Try a different browser or incognito mode.
echo.
pause
