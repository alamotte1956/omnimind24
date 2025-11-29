@echo off
echo.
echo ========================================
echo   FORCE GITHUB PAGES REBUILD
echo ========================================
echo.
echo This will force GitHub Pages to completely rebuild your site.
echo.
pause

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo.
echo [1/10] Current directory:
cd
echo.

echo [2/10] Pulling latest...
git pull origin master
echo.

echo [3/10] Creating empty commit to trigger rebuild...
git commit --allow-empty -m "Force rebuild - trigger 1"
git push origin master
echo.

echo [4/10] Second empty commit...
git commit --allow-empty -m "Force rebuild - trigger 2"
git push origin master
echo.

echo [5/10] Third empty commit...
git commit --allow-empty -m "Force rebuild - trigger 3"
git push origin master
echo.

echo [6/10] Touching .nojekyll to force change...
echo. > .nojekyll
git add .nojekyll
git commit -m "Update .nojekyll to force rebuild"
git push origin master
echo.

echo [7/10] Updating CNAME to force change...
echo omnimind24.com > CNAME
git add CNAME
git commit -m "Update CNAME to force rebuild"
git push origin master
echo.

echo [8/10] Creating rebuild trigger file...
echo Rebuild triggered at %date% %time% > REBUILD_TRIGGER.txt
git add REBUILD_TRIGGER.txt
git commit -m "Rebuild trigger - %date% %time%"
git push origin master
echo.

echo [9/10] Final empty commit...
git commit --allow-empty -m "Final rebuild trigger - %date% %time%"
git push origin master
echo.

echo [10/10] Opening GitHub Pages settings...
start https://github.com/alamotte1956/omnimind24/settings/pages
echo.

echo ========================================
echo   ✅ REBUILD TRIGGERS SENT!
echo ========================================
echo.
echo I've sent MULTIPLE triggers to force GitHub Pages to rebuild.
echo.
echo GitHub Pages settings is now open in your browser.
echo.
echo IN THE BROWSER, DO THIS:
echo 1. Scroll down to "Custom domain"
echo 2. Click "Remove" (removes omnimind24.com)
echo 3. Wait 5 seconds
echo 4. Type "omnimind24.com" back in
echo 5. Click "Save"
echo 6. Check "Enforce HTTPS" box
echo 7. Wait 5-10 minutes
echo.
echo This FORCES GitHub Pages to completely rebuild everything!
echo.
echo AFTER 10 MINUTES:
echo 1. Open Incognito/Private browsing
echo 2. Test: https://omnimind24.com/pricing.html
echo 3. Should show NEW pricing with 4 tiers
echo.
echo If STILL old, run this file again or tell me!
echo.
pause
