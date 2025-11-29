@echo off
echo ========================================
echo FORCE GITHUB PAGES REBUILD
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo This will force GitHub Pages to rebuild by creating an empty commit.
echo.

echo [Step 1/2] Creating empty commit to trigger rebuild...
git commit --allow-empty -m "Force GitHub Pages rebuild"
echo.

echo [Step 2/2] Pushing to trigger rebuild...
git push origin master
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo ✅ REBUILD TRIGGERED!
    echo ========================================
    echo.
    echo GitHub Pages is now rebuilding your site.
    echo.
    echo ⏱️ WAIT 5-10 MINUTES
    echo.
    echo Then test in INCOGNITO MODE:
    echo.
    echo ✅ https://omnimind24.com/features.html
    echo ✅ https://omnimind24.com/support.html
    echo ✅ https://omnimind24.com/documentation.html
    echo ✅ https://omnimind24.com/api-reference.html
    echo ✅ https://omnimind24.com/help-center.html
    echo.
    echo If pages still show 404, they weren't pushed to GitHub.
    echo Check: https://github.com/alamotte1956/omnimind24
    echo.
) else (
    echo ========================================
    echo ❌ FAILED TO TRIGGER REBUILD
    echo ========================================
    echo.
    echo Copy the error above and send it.
    echo.
)

pause
