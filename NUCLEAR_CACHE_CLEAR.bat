@echo off
echo ========================================
echo NUCLEAR CACHE CLEAR - FORCE NEW FILES
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1] Adding cache-busting timestamp to files...
echo.

REM Add timestamp comment to force new version
echo ^<!-- Cache bust: %date% %time% --^> >> features.html
echo ^<!-- Cache bust: %date% %time% --^> >> support.html
echo ^<!-- Cache bust: %date% %time% --^> >> documentation.html
echo ^<!-- Cache bust: %date% %time% --^> >> api-reference.html
echo ^<!-- Cache bust: %date% %time% --^> >> help-center.html

echo [Step 2] Deleting .nojekyll and recreating...
del .nojekyll
echo. > .nojekyll

echo [Step 3] Committing with force flag...
git add -f .
git commit -m "FORCE CACHE CLEAR - Updated all navigation pages %date% %time%"

echo [Step 4] Force pushing...
git push origin master --force

echo.
echo ========================================
echo CACHE BUST COMPLETE!
echo ========================================
echo.
echo Now do this IMMEDIATELY:
echo.
echo 1. Close ALL browser windows
echo 2. Open NEW Incognito window
echo 3. Go to: https://omnimind24.com/features.html?v=%random%
echo.
echo The ?v=%random% forces browser to ignore cache
echo.
echo WAIT 10 MINUTES then test again
echo.
pause
