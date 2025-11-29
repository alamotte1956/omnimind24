@echo off
echo ========================================
echo CHECK FILES STATUS
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [1] Checking if new page files exist locally...
echo.
if exist "features.html" (echo YES - features.html exists) else (echo NO - features.html MISSING)
if exist "support.html" (echo YES - support.html exists) else (echo NO - support.html MISSING)
if exist "documentation.html" (echo YES - documentation.html exists) else (echo NO - documentation.html MISSING)
if exist "api-reference.html" (echo YES - api-reference.html exists) else (echo NO - api-reference.html MISSING)
if exist "help-center.html" (echo YES - help-center.html exists) else (echo NO - help-center.html MISSING)
echo.

echo [2] Checking git status...
git status
echo.

echo [3] Checking if files are tracked by git...
git ls-files | findstr "features.html"
git ls-files | findstr "support.html"
git ls-files | findstr "documentation.html"
git ls-files | findstr "api-reference.html"
git ls-files | findstr "help-center.html"
echo.

echo [4] Checking last commit...
git log -1 --oneline
echo.

echo ========================================
echo COPY ALL OUTPUT ABOVE
echo ========================================
pause
