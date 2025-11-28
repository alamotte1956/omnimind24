@echo off
echo =======================================
echo Payment System Deployment for Windows
echo =======================================
echo.

echo [1/5] Checking Git status...
git status
echo.

echo [2/5] Adding all payment system files...
git add dashboard/checkout.html
git add dashboard/payment-success.html
git add dashboard/admin-pricing.html
git add dashboard/affiliate-register.html
git add dashboard/affiliate-dashboard.html
git add dashboard/app.js
git add README.md
git add *.html
git add *.md
echo Files added successfully!
echo.

echo [3/5] Committing changes...
git commit -m "Add payment and affiliate system - Windows deployment"
echo.

echo [4/5] Pushing to GitHub...
git push origin main
echo.

echo [5/5] Deployment Complete!
echo.
echo =======================================
echo Your payment system is now live!
echo =======================================
echo.
pause