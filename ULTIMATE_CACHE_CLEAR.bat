@echo off
echo ========================================
echo ULTIMATE CACHE CLEAR - NUCLEAR OPTION
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1] Adding cache-busting timestamp to ALL pages...
echo.

REM Add unique timestamp to force browsers to fetch new version
set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

echo ^<!-- CACHE BUST: %timestamp% --^> >> features.html
echo ^<!-- CACHE BUST: %timestamp% --^> >> support.html
echo ^<!-- CACHE BUST: %timestamp% --^> >> documentation.html
echo ^<!-- CACHE BUST: %timestamp% --^> >> api-reference.html
echo ^<!-- CACHE BUST: %timestamp% --^> >> help-center.html
echo ^<!-- CACHE BUST: %timestamp% --^> >> index.html
echo ^<!-- CACHE BUST: %timestamp% --^> >> pricing.html

echo [Step 2] Forcing GitHub Pages rebuild...
echo.

git add .
git commit -m "FORCE CACHE CLEAR %timestamp%"
git push origin master --force

echo.
echo [Step 3] Triggering empty commit...
git commit --allow-empty -m "Trigger rebuild %timestamp%"
git push origin master

echo.
echo ========================================
echo CACHE CLEAR COMPLETE!
echo ========================================
echo.
echo NOW DO THIS MANUALLY:
echo.
echo 1. CLOSE ALL BROWSERS COMPLETELY
echo.
echo 2. RESTART YOUR COMPUTER (yes, really)
echo.
echo 3. Open NEW Incognito window
echo.
echo 4. Test with cache buster URLs:
echo    https://omnimind24.com/features.html?v=%timestamp%
echo    https://omnimind24.com/support.html?v=%timestamp%
echo.
echo 5. On PHONE: Clear Safari/Chrome app data
echo    Settings -^> Safari -^> Clear History and Data
echo    OR
echo    Settings -^> Chrome -^> Privacy -^> Clear Browsing Data
echo.
echo 6. Wait 15 MINUTES for CDN cache to expire
echo.
echo The ?v=%timestamp% parameter forces fetch of new files
echo.
pause
