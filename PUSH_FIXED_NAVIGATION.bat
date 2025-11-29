@echo off
echo ========================================
echo PUSH FIXED NAVIGATION TO GITHUB
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo Pulling latest...
git pull origin master

echo Adding updated index.html...
git add index.html

echo Committing...
git commit -m "Fix navigation links - add Documentation, Support, Help Center"

echo Pushing...
git push origin master

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! NAVIGATION FIXED!
    echo ========================================
    echo.
    echo Updated navigation now includes:
    echo - Features
    echo - Pricing
    echo - Docs (documentation.html)
    echo - Support (support.html)
    echo - Help (help-center.html)
    echo - Contact
    echo.
    echo WAIT 5-10 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test: https://omnimind24.com/
    echo.
    echo The navigation menu should now have all the new links!
    echo.
) else (
    echo.
    echo ========================================
    echo PUSH FAILED
    echo ========================================
    echo.
    echo Copy the error above and send it to me.
    echo.
)

pause
