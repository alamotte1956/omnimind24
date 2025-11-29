@echo off
echo ========================================
echo PULL THEN PUSH NEW PAGES
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1/5] Pulling latest changes from GitHub...
git pull origin master
echo.

if %errorlevel% neq 0 (
    echo.
    echo MERGE CONFLICT DETECTED!
    echo.
    echo Keeping YOUR local changes (your new pages)...
    git checkout --ours .
    git add .
    git commit -m "Resolve merge - keep local changes with new pages"
    echo.
)

echo [Step 2/5] Adding your new pages...
git add features.html
git add support.html
git add documentation.html
git add api-reference.html
git add help-center.html
git add index.html
git add dashboard/campaigns.html
git add dashboard/create-campaign.html
echo.

echo [Step 3/5] Checking status...
git status
echo.

echo [Step 4/5] Committing new pages...
git commit -m "Add new navigation pages: features, support, docs, API reference, help center"
echo.

echo [Step 5/5] Pushing to GitHub...
git push origin master
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo SUCCESS! PAGES PUSHED!
    echo ========================================
    echo.
    echo Your new pages are now on GitHub!
    echo.
    echo WAIT 5-10 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test in INCOGNITO MODE:
    echo.
    echo https://omnimind24.com/features.html
    echo https://omnimind24.com/support.html
    echo https://omnimind24.com/documentation.html
    echo https://omnimind24.com/api-reference.html
    echo https://omnimind24.com/help-center.html
    echo https://omnimind24.com/dashboard/campaigns.html
    echo.
    echo All your new pages will be live!
    echo.
) else (
    echo ========================================
    echo PUSH FAILED
    echo ========================================
    echo.
    echo Copy all the output above and send it.
    echo.
)

pause
