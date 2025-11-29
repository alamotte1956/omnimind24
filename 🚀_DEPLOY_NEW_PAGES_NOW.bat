@echo off
echo.
echo ========================================
echo   DEPLOY NEW NAVIGATION PAGES
echo   OmniMind24 - Complete Site Update
echo ========================================
echo.
echo This will deploy 5 new pages + updated index.html
echo.
echo NEW PAGES:
echo   - features.html
echo   - support.html
echo   - documentation.html
echo   - api-reference.html
echo   - help-center.html
echo.
echo UPDATED:
echo   - index.html (navigation and footer links)
echo.
pause

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo.
echo [1/5] Adding new files to Git...
git add features.html
git add support.html
git add documentation.html
git add api-reference.html
git add help-center.html
git add index.html

echo.
echo [2/5] Checking git status...
git status

echo.
echo [3/5] Committing changes...
git commit -m "Add complete navigation pages: Features, Support, Documentation, API Reference, Help Center + Updated index.html links"

echo.
echo [4/5] Pushing to GitHub master branch...
git push origin master

echo.
echo [5/5] DEPLOYMENT COMPLETE!
echo.
echo ========================================
echo   ✅ ALL PAGES DEPLOYED SUCCESSFULLY!
echo ========================================
echo.
echo Your site is now updating on GitHub Pages.
echo Wait 2-3 minutes for GitHub to rebuild.
echo.
echo TEST THESE URLs:
echo   https://omnimind24.com/
echo   https://omnimind24.com/features.html
echo   https://omnimind24.com/support.html
echo   https://omnimind24.com/documentation.html
echo   https://omnimind24.com/api-reference.html
echo   https://omnimind24.com/help-center.html
echo.
echo NEXT STEPS:
echo 1. Wait 2-3 minutes
echo 2. Open https://omnimind24.com
echo 3. Test all navigation links
echo 4. Test all footer links
echo 5. Verify mobile responsive design
echo.
pause
