@echo off
echo ========================================
echo EMERGENCY CHECK AND UPLOAD
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [CHECK 1] Do files exist on your computer?
echo.
if exist "features.html" (
    echo YES - features.html found
    dir features.html | find "features.html"
) else (
    echo NO - features.html NOT FOUND
    echo FILES ARE MISSING FROM YOUR COMPUTER!
    echo.
    echo The batch file CREATE_AND_PUSH_ALL_PAGES.bat
    echo was supposed to create them but something failed.
    echo.
    pause
    exit /b 1
)

if exist "support.html" (
    echo YES - support.html found
) else (
    echo NO - support.html NOT FOUND
)

if exist "documentation.html" (
    echo YES - documentation.html found
) else (
    echo NO - documentation.html NOT FOUND
)

if exist "api-reference.html" (
    echo YES - api-reference.html found
) else (
    echo NO - api-reference.html NOT FOUND
)

if exist "help-center.html" (
    echo YES - help-center.html found
) else (
    echo NO - help-center.html NOT FOUND
)

echo.
echo [CHECK 2] What's the git status?
echo.
git status

echo.
echo [CHECK 3] What was last committed?
echo.
git log -1 --oneline

echo.
echo ========================================
echo DIAGNOSIS
echo ========================================
echo.
echo If files exist above, I'll now try to upload them.
echo If files DON'T exist, they were never created.
echo.
pause

if not exist "features.html" (
    echo FILES MISSING! Cannot upload what doesn't exist.
    echo.
    echo You need to either:
    echo 1. Run CREATE_AND_PUSH_ALL_PAGES.bat again
    echo 2. Or I'll create them a different way
    echo.
    pause
    exit /b 1
)

echo.
echo [ACTION] Files exist, uploading to GitHub...
echo.

git add features.html support.html documentation.html api-reference.html help-center.html
git commit -m "Upload all 5 navigation pages - EMERGENCY FIX"
git push origin master

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo UPLOAD SUCCESS!
    echo ========================================
    echo.
    echo Files are now on GitHub!
    echo.
    echo Go verify at: https://github.com/alamotte1956/omnimind24
    echo.
    echo Then WAIT 10 MINUTES and test:
    echo https://omnimind24.com/features.html
    echo.
) else (
    echo.
    echo ========================================
    echo UPLOAD FAILED
    echo ========================================
    echo.
    echo Copy the error message above and send it to me.
    echo.
)

pause
