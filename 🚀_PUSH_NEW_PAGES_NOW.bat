@echo off
echo ========================================
echo PUSH NEW PAGES TO GITHUB - FINAL FIX
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1/4] Adding all your new pages...
echo.

git add features.html
git add support.html
git add documentation.html
git add api-reference.html
git add help-center.html
git add index.html
git add dashboard/campaigns.html
git add dashboard/create-campaign.html

echo ✅ All new pages staged
echo.

echo [Step 2/4] Checking what will be committed...
git status
echo.

echo [Step 3/4] Committing new pages...
git commit -m "Add new navigation pages: features, support, documentation, API reference, help center, and updated dashboard"
echo.

echo [Step 4/4] Pushing to GitHub...
git push origin master
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo ✅ SUCCESS! NEW PAGES PUSHED!
    echo ========================================
    echo.
    echo Your new pages are now on GitHub!
    echo.
    echo ⏱️ WAIT 5 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test in INCOGNITO MODE:
    echo.
    echo ✅ https://omnimind24.com/features.html
    echo ✅ https://omnimind24.com/support.html
    echo ✅ https://omnimind24.com/documentation.html
    echo ✅ https://omnimind24.com/api-reference.html
    echo ✅ https://omnimind24.com/help-center.html
    echo ✅ https://omnimind24.com/dashboard/campaigns.html
    echo.
    echo 🎉 All your beautiful new pages will be live!
    echo.
) else (
    echo ========================================
    echo ❌ PUSH FAILED
    echo ========================================
    echo.
    echo Copy the error message above and send it.
    echo.
)

pause
