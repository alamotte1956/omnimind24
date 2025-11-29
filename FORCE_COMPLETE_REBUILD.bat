@echo off
echo ========================================
echo FORCE COMPLETE GITHUB PAGES REBUILD
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo Creating an empty commit to force rebuild...
git commit --allow-empty -m "Force GitHub Pages rebuild - clear cache"
git push origin master

echo.
echo ========================================
echo REBUILD TRIGGERED!
echo ========================================
echo.
echo Now do this:
echo.
echo 1. Go to: https://github.com/alamotte1956/omnimind24/settings/pages
echo 2. Under "Custom domain" click "Remove"
echo 3. Wait 5 seconds
echo 4. Type: omnimind24.com
echo 5. Click "Save"
echo 6. Check "Enforce HTTPS"
echo 7. Click "Save" again
echo.
echo This forces a COMPLETE rebuild from scratch.
echo.
echo WAIT 10 MINUTES then test in Incognito mode.
echo.
pause
