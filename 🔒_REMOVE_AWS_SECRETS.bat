@echo off
echo ========================================
echo REMOVE AWS SECRETS FROM GIT
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo This will find and help you remove AWS credentials from your code.
echo.

echo [Step 1] Finding the file with AWS credentials...
echo.
echo GitHub detected AWS credentials in blob: 3ab5578832c558bd711f8e819b78bb3f449dcb33
echo.

REM Find which file contains the secrets
git rev-list --objects --all | findstr 3ab5578832c558bd711f8e819b78bb3f449dcb33

echo.
echo [Step 2] Searching for AWS credentials in your files...
echo.

REM Search for common AWS patterns
findstr /S /I /C:"AWS_ACCESS_KEY_ID" /C:"AKIA" /C:"AWS_SECRET_ACCESS_KEY" *.js *.json *.env *.txt *.md 2>nul

echo.
echo ========================================
echo WHAT YOU NEED TO DO:
echo ========================================
echo.
echo 1. Find files containing AWS credentials above
echo 2. Remove or replace credentials with placeholders
echo 3. Use environment variables instead
echo.
echo Examples to look for:
echo   AWS_ACCESS_KEY_ID = "AKIA..."
echo   AWS_SECRET_ACCESS_KEY = "..."
echo   accessKeyId: "AKIA..."
echo.
echo Replace with:
echo   AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
echo   AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
echo.
pause
