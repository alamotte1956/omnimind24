@echo off
setlocal enabledelayedexpansion
echo ========================================
echo AUTO FIX INDEX.HTML NAVIGATION
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo Creating backup...
copy index.html index.html.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Fixing navigation in index.html...
echo.

REM Use PowerShell to do the replacement
powershell -Command "$content = Get-Content 'index.html' -Raw; $old = '            <div class=\""nav-links\"">.*?<a href=\""features.html\"">Features</a>.*?<a href=\""about-us.html\"">About</a>.*?<a href=\""pricing.html\"">Pricing</a>.*?<a href=\""contact.html\"">Contact</a>.*?<a href=\""dashboard/register.html\"" class=\""btn-primary\"">Get Started</a>.*?</div>'; $new = '            <div class=\""nav-links\"\">`n                <a href=\""features.html\"">Features</a>`n                <a href=\""pricing.html\"">Pricing</a>`n                <a href=\""documentation.html\"">Docs</a>`n                <a href=\""support.html\"">Support</a>`n                <a href=\""help-center.html\"">Help</a>`n                <a href=\""contact.html\"">Contact</a>`n                <a href=\""client/register.html\"" class=\""btn-primary\"">Get Started</a>`n            </div>'; $content = $content -replace $old, $new; $content | Set-Content 'index.html' -NoNewline"

if %errorlevel% neq 0 (
    echo PowerShell method failed, trying simpler approach...
    
    REM Simple line-by-line replacement
    powershell -Command "(Get-Content index.html) | ForEach-Object { $_ -replace '<a href=\""about-us.html\"">About</a>', '' } | Set-Content index.html.temp"
    move /Y index.html.temp index.html
    
    powershell -Command "(Get-Content index.html) | ForEach-Object { $_ -replace '<a href=\""pricing.html\"">Pricing</a>', '<a href=\""pricing.html\"">Pricing</a>`n                <a href=\""documentation.html\"">Docs</a>`n                <a href=\""support.html\"">Support</a>`n                <a href=\""help-center.html\"">Help</a>' } | Set-Content index.html.temp"
    move /Y index.html.temp index.html
    
    powershell -Command "(Get-Content index.html) | ForEach-Object { $_ -replace 'dashboard/register.html', 'client/register.html' } | Set-Content index.html.temp"
    move /Y index.html.temp index.html
)

echo.
echo Navigation fixed!
echo.
echo [Step 2] Adding and committing...
git add index.html
git commit -m "Fix navigation - add Documentation, Support, Help Center links"

echo.
echo [Step 3] Pushing to GitHub...
git push origin master

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! PUSHED TO GITHUB!
    echo ========================================
    echo.
    echo Backup saved as: index.html.backup.*
    echo.
    echo Navigation now includes:
    echo - Features
    echo - Pricing
    echo - Docs
    echo - Support  
    echo - Help
    echo - Contact
    echo.
    echo WAIT 10 MINUTES for rebuild, then test:
    echo https://omnimind24.com/
    echo.
) else (
    echo.
    echo ========================================
    echo PUSH FAILED - RESTORING BACKUP
    echo ========================================
    echo.
    for %%f in (index.html.backup.*) do (
        copy "%%f" index.html
        echo Restored from %%f
        goto :restored
    )
    :restored
    echo.
)

pause
