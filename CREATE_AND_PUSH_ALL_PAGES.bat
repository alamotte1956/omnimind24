@echo off
echo ========================================
echo CREATE AND PUSH ALL NAVIGATION PAGES
echo ========================================
echo.

cd "C:\Users\alamo\Downloads\AI Help Pros LLP\omni_clean"

echo [Step 1/6] Creating features.html...
echo ^<!DOCTYPE html^> > features.html
echo ^<html lang="en"^> >> features.html
echo ^<head^> >> features.html
echo     ^<meta charset="UTF-8"^> >> features.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> features.html
echo     ^<title^>Features - OmniMind24^</title^> >> features.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"^> >> features.html
echo     ^<style^> >> features.html
echo         body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; } >> features.html
echo         nav { background: rgba(0,0,0,0.95); padding: 1rem 2rem; border-bottom: 2px solid #FFD700; position: fixed; width: 100%; top: 0; z-index: 1000; } >> features.html
echo         .nav-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; } >> features.html
echo         .logo { font-size: 1.8rem; font-weight: 800; color: #FFD700; text-decoration: none; } >> features.html
echo         .nav-links { display: flex; gap: 2rem; list-style: none; } >> features.html
echo         .nav-links a { color: #fff; text-decoration: none; font-weight: 500; transition: color 0.3s; } >> features.html
echo         .nav-links a:hover { color: #FFD700; } >> features.html
echo         .hero { padding: 150px 2rem 100px; text-align: center; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); } >> features.html
echo         .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; color: #FFD700; } >> features.html
echo         .hero p { font-size: 1.3rem; color: #ccc; max-width: 800px; margin: 0 auto; } >> features.html
echo         .features-grid { max-width: 1400px; margin: 0 auto; padding: 80px 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; } >> features.html
echo         .feature-card { background: #1a1a1a; padding: 2.5rem; border-radius: 12px; border: 2px solid #2a2a2a; transition: all 0.3s; } >> features.html
echo         .feature-card:hover { border-color: #FFD700; transform: translateY(-5px); } >> features.html
echo         .feature-icon { font-size: 3rem; margin-bottom: 1.5rem; color: #FFD700; } >> features.html
echo         .feature-card h3 { font-size: 1.8rem; margin-bottom: 1rem; color: #FFD700; } >> features.html
echo         .feature-card p { color: #ccc; line-height: 1.8; } >> features.html
echo         .cta-section { text-align: center; padding: 80px 2rem; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); } >> features.html
echo         .cta-section h2 { font-size: 2.5rem; margin-bottom: 1.5rem; color: #000; } >> features.html
echo         .cta-button { display: inline-block; padding: 1rem 3rem; background: #000; color: #FFD700; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 1.2rem; transition: all 0.3s; } >> features.html
echo         .cta-button:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(0,0,0,0.3); } >> features.html
echo         footer { background: #000; padding: 3rem 2rem; border-top: 2px solid #FFD700; text-align: center; color: #ccc; } >> features.html
echo     ^</style^> >> features.html
echo ^</head^> >> features.html
echo ^<body^> >> features.html
echo     ^<nav^> >> features.html
echo         ^<div class="nav-container"^> >> features.html
echo             ^<a href="index.html" class="logo"^>OmniMind24^</a^> >> features.html
echo             ^<ul class="nav-links"^> >> features.html
echo                 ^<li^>^<a href="index.html"^>Home^</a^>^</li^> >> features.html
echo                 ^<li^>^<a href="features.html"^>Features^</a^>^</li^> >> features.html
echo                 ^<li^>^<a href="pricing.html"^>Pricing^</a^>^</li^> >> features.html
echo                 ^<li^>^<a href="documentation.html"^>Docs^</a^>^</li^> >> features.html
echo                 ^<li^>^<a href="support.html"^>Support^</a^>^</li^> >> features.html
echo             ^</ul^> >> features.html
echo         ^</div^> >> features.html
echo     ^</nav^> >> features.html
echo     ^<div class="hero"^> >> features.html
echo         ^<h1^>Powerful Features^</h1^> >> features.html
echo         ^<p^>Discover what makes OmniMind24 the most advanced AI-powered marketing platform^</p^> >> features.html
echo     ^</div^> >> features.html
echo     ^<div class="features-grid"^> >> features.html
echo         ^<div class="feature-card"^> >> features.html
echo             ^<div class="feature-icon"^>🎯^</div^> >> features.html
echo             ^<h3^>COSTAR Framework^</h3^> >> features.html
echo             ^<p^>Strategic campaign planning with Context, Objective, Strategy, Tone, Audience, and Results tracking.^</p^> >> features.html
echo         ^</div^> >> features.html
echo         ^<div class="feature-card"^> >> features.html
echo             ^<div class="feature-icon"^>🤖^</div^> >> features.html
echo             ^<h3^>25+ AI Services^</h3^> >> features.html
echo             ^<p^>Access to OpenAI, Anthropic, Google Gemini, ElevenLabs, and more - all in one platform.^</p^> >> features.html
echo         ^</div^> >> features.html
echo         ^<div class="feature-card"^> >> features.html
echo             ^<div class="feature-icon"^>⚡^</div^> >> features.html
echo             ^<h3^>Smart AI Selection^</h3^> >> features.html
echo             ^<p^>Automatically selects the best AI model for your specific content needs.^</p^> >> features.html
echo         ^</div^> >> features.html
echo         ^<div class="feature-card"^> >> features.html
echo             ^<div class="feature-icon"^>📊^</div^> >> features.html
echo             ^<h3^>Real-Time Analytics^</h3^> >> features.html
echo             ^<p^>Track campaign performance with detailed analytics and insights.^</p^> >> features.html
echo         ^</div^> >> features.html
echo         ^<div class="feature-card"^> >> features.html
echo             ^<div class="feature-icon"^>🔒^</div^> >> features.html
echo             ^<h3^>Enterprise Security^</h3^> >> features.html
echo             ^<p^>Bank-level encryption and security for all your content and data.^</p^> >> features.html
echo         ^</div^> >> features.html
echo         ^<div class="feature-card"^> >> features.html
echo             ^<div class="feature-icon"^>☁️^</div^> >> features.html
echo             ^<h3^>Cloud Storage^</h3^> >> features.html
echo             ^<p^>AWS S3 integration for secure, scalable media storage and delivery.^</p^> >> features.html
echo         ^</div^> >> features.html
echo     ^</div^> >> features.html
echo     ^<div class="cta-section"^> >> features.html
echo         ^<h2^>Ready to Get Started?^</h2^> >> features.html
echo         ^<a href="client/register.html" class="cta-button"^>Start Free Trial^</a^> >> features.html
echo     ^</div^> >> features.html
echo     ^<footer^> >> features.html
echo         ^<p^>© 2024 OmniMind24. All rights reserved.^</p^> >> features.html
echo     ^</footer^> >> features.html
echo ^</body^> >> features.html
echo ^</html^> >> features.html
echo Created features.html

echo.
echo [Step 2/6] Creating support.html...
echo ^<!DOCTYPE html^> > support.html
echo ^<html lang="en"^> >> support.html
echo ^<head^> >> support.html
echo     ^<meta charset="UTF-8"^> >> support.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> support.html
echo     ^<title^>Support - OmniMind24^</title^> >> support.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"^> >> support.html
echo     ^<style^> >> support.html
echo         body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; } >> support.html
echo         nav { background: rgba(0,0,0,0.95); padding: 1rem 2rem; border-bottom: 2px solid #FFD700; position: fixed; width: 100%; top: 0; z-index: 1000; } >> support.html
echo         .nav-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; } >> support.html
echo         .logo { font-size: 1.8rem; font-weight: 800; color: #FFD700; text-decoration: none; } >> support.html
echo         .nav-links { display: flex; gap: 2rem; list-style: none; } >> support.html
echo         .nav-links a { color: #fff; text-decoration: none; font-weight: 500; transition: color 0.3s; } >> support.html
echo         .nav-links a:hover { color: #FFD700; } >> support.html
echo         .hero { padding: 150px 2rem 100px; text-align: center; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); } >> support.html
echo         .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; color: #FFD700; } >> support.html
echo         .hero p { font-size: 1.3rem; color: #ccc; max-width: 800px; margin: 0 auto; } >> support.html
echo         .support-grid { max-width: 1400px; margin: 0 auto; padding: 80px 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; } >> support.html
echo         .support-card { background: #1a1a1a; padding: 2.5rem; border-radius: 12px; border: 2px solid #2a2a2a; text-align: center; transition: all 0.3s; } >> support.html
echo         .support-card:hover { border-color: #FFD700; transform: translateY(-5px); } >> support.html
echo         .support-icon { font-size: 3rem; margin-bottom: 1.5rem; color: #FFD700; } >> support.html
echo         .support-card h3 { font-size: 1.8rem; margin-bottom: 1rem; color: #FFD700; } >> support.html
echo         .support-card p { color: #ccc; line-height: 1.8; margin-bottom: 1.5rem; } >> support.html
echo         .support-button { display: inline-block; padding: 0.8rem 2rem; background: #FFD700; color: #000; text-decoration: none; border-radius: 50px; font-weight: 700; transition: all 0.3s; } >> support.html
echo         .support-button:hover { background: #FFA500; transform: scale(1.05); } >> support.html
echo         footer { background: #000; padding: 3rem 2rem; border-top: 2px solid #FFD700; text-align: center; color: #ccc; } >> support.html
echo     ^</style^> >> support.html
echo ^</head^> >> support.html
echo ^<body^> >> support.html
echo     ^<nav^> >> support.html
echo         ^<div class="nav-container"^> >> support.html
echo             ^<a href="index.html" class="logo"^>OmniMind24^</a^> >> support.html
echo             ^<ul class="nav-links"^> >> support.html
echo                 ^<li^>^<a href="index.html"^>Home^</a^>^</li^> >> support.html
echo                 ^<li^>^<a href="features.html"^>Features^</a^>^</li^> >> support.html
echo                 ^<li^>^<a href="pricing.html"^>Pricing^</a^>^</li^> >> support.html
echo                 ^<li^>^<a href="documentation.html"^>Docs^</a^>^</li^> >> support.html
echo                 ^<li^>^<a href="support.html"^>Support^</a^>^</li^> >> support.html
echo             ^</ul^> >> support.html
echo         ^</div^> >> support.html
echo     ^</nav^> >> support.html
echo     ^<div class="hero"^> >> support.html
echo         ^<h1^>We're Here to Help^</h1^> >> support.html
echo         ^<p^>Get the support you need to succeed with OmniMind24^</p^> >> support.html
echo     ^</div^> >> support.html
echo     ^<div class="support-grid"^> >> support.html
echo         ^<div class="support-card"^> >> support.html
echo             ^<div class="support-icon"^>📚^</div^> >> support.html
echo             ^<h3^>Documentation^</h3^> >> support.html
echo             ^<p^>Comprehensive guides and tutorials to help you get started.^</p^> >> support.html
echo             ^<a href="documentation.html" class="support-button"^>View Docs^</a^> >> support.html
echo         ^</div^> >> support.html
echo         ^<div class="support-card"^> >> support.html
echo             ^<div class="support-icon"^>🔧^</div^> >> support.html
echo             ^<h3^>API Reference^</h3^> >> support.html
echo             ^<p^>Complete API documentation for developers and integrations.^</p^> >> support.html
echo             ^<a href="api-reference.html" class="support-button"^>API Docs^</a^> >> support.html
echo         ^</div^> >> support.html
echo         ^<div class="support-card"^> >> support.html
echo             ^<div class="support-icon"^>💬^</div^> >> support.html
echo             ^<h3^>Help Center^</h3^> >> support.html
echo             ^<p^>Find answers to frequently asked questions and troubleshooting tips.^</p^> >> support.html
echo             ^<a href="help-center.html" class="support-button"^>Get Help^</a^> >> support.html
echo         ^</div^> >> support.html
echo         ^<div class="support-card"^> >> support.html
echo             ^<div class="support-icon"^>📧^</div^> >> support.html
echo             ^<h3^>Email Support^</h3^> >> support.html
echo             ^<p^>Contact our support team directly via email.^</p^> >> support.html
echo             ^<a href="mailto:support@omnimind24.com" class="support-button"^>Email Us^</a^> >> support.html
echo         ^</div^> >> support.html
echo     ^</div^> >> support.html
echo     ^<footer^> >> support.html
echo         ^<p^>© 2024 OmniMind24. All rights reserved.^</p^> >> support.html
echo     ^</footer^> >> support.html
echo ^</body^> >> support.html
echo ^</html^> >> support.html
echo Created support.html

echo.
echo [Step 3/6] Creating documentation.html...
echo ^<!DOCTYPE html^> > documentation.html
echo ^<html lang="en"^> >> documentation.html
echo ^<head^> >> documentation.html
echo     ^<meta charset="UTF-8"^> >> documentation.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> documentation.html
echo     ^<title^>Documentation - OmniMind24^</title^> >> documentation.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"^> >> documentation.html
echo     ^<style^> >> documentation.html
echo         body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; } >> documentation.html
echo         nav { background: rgba(0,0,0,0.95); padding: 1rem 2rem; border-bottom: 2px solid #FFD700; position: fixed; width: 100%; top: 0; z-index: 1000; } >> documentation.html
echo         .nav-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; } >> documentation.html
echo         .logo { font-size: 1.8rem; font-weight: 800; color: #FFD700; text-decoration: none; } >> documentation.html
echo         .nav-links { display: flex; gap: 2rem; list-style: none; } >> documentation.html
echo         .nav-links a { color: #fff; text-decoration: none; font-weight: 500; transition: color 0.3s; } >> documentation.html
echo         .nav-links a:hover { color: #FFD700; } >> documentation.html
echo         .content { max-width: 1200px; margin: 120px auto 0; padding: 40px 2rem; } >> documentation.html
echo         .content h1 { font-size: 3rem; margin-bottom: 2rem; color: #FFD700; } >> documentation.html
echo         .content h2 { font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; color: #FFD700; border-bottom: 2px solid #2a2a2a; padding-bottom: 0.5rem; } >> documentation.html
echo         .content p { color: #ccc; line-height: 1.8; margin-bottom: 1.5rem; } >> documentation.html
echo         .content ul { color: #ccc; line-height: 1.8; margin-left: 2rem; } >> documentation.html
echo         footer { background: #000; padding: 3rem 2rem; border-top: 2px solid #FFD700; text-align: center; color: #ccc; margin-top: 4rem; } >> documentation.html
echo     ^</style^> >> documentation.html
echo ^</head^> >> documentation.html
echo ^<body^> >> documentation.html
echo     ^<nav^> >> documentation.html
echo         ^<div class="nav-container"^> >> documentation.html
echo             ^<a href="index.html" class="logo"^>OmniMind24^</a^> >> documentation.html
echo             ^<ul class="nav-links"^> >> documentation.html
echo                 ^<li^>^<a href="index.html"^>Home^</a^>^</li^> >> documentation.html
echo                 ^<li^>^<a href="features.html"^>Features^</a^>^</li^> >> documentation.html
echo                 ^<li^>^<a href="pricing.html"^>Pricing^</a^>^</li^> >> documentation.html
echo                 ^<li^>^<a href="documentation.html"^>Docs^</a^>^</li^> >> documentation.html
echo                 ^<li^>^<a href="support.html"^>Support^</a^>^</li^> >> documentation.html
echo             ^</ul^> >> documentation.html
echo         ^</div^> >> documentation.html
echo     ^</nav^> >> documentation.html
echo     ^<div class="content"^> >> documentation.html
echo         ^<h1^>Documentation^</h1^> >> documentation.html
echo         ^<h2^>Getting Started^</h2^> >> documentation.html
echo         ^<p^>Welcome to OmniMind24! This guide will help you get started with creating and managing AI-powered marketing campaigns.^</p^> >> documentation.html
echo         ^<h2^>Creating Your First Campaign^</h2^> >> documentation.html
echo         ^<p^>Follow these steps to create your first campaign:^</p^> >> documentation.html
echo         ^<ul^> >> documentation.html
echo             ^<li^>Log in to your dashboard^</li^> >> documentation.html
echo             ^<li^>Click "Create Campaign"^</li^> >> documentation.html
echo             ^<li^>Fill in the COSTAR framework details^</li^> >> documentation.html
echo             ^<li^>Select your AI services^</li^> >> documentation.html
echo             ^<li^>Review and launch^</li^> >> documentation.html
echo         ^</ul^> >> documentation.html
echo         ^<h2^>Understanding COSTAR^</h2^> >> documentation.html
echo         ^<p^>COSTAR is our strategic framework for campaign planning:^</p^> >> documentation.html
echo         ^<ul^> >> documentation.html
echo             ^<li^>^<strong^>Context:^</strong^> Define your campaign background^</li^> >> documentation.html
echo             ^<li^>^<strong^>Objective:^</strong^> Set clear goals^</li^> >> documentation.html
echo             ^<li^>^<strong^>Strategy:^</strong^> Plan your approach^</li^> >> documentation.html
echo             ^<li^>^<strong^>Tone:^</strong^> Choose your brand voice^</li^> >> documentation.html
echo             ^<li^>^<strong^>Audience:^</strong^> Define your target market^</li^> >> documentation.html
echo             ^<li^>^<strong^>Results:^</strong^> Track performance metrics^</li^> >> documentation.html
echo         ^</ul^> >> documentation.html
echo         ^<h2^>AI Services^</h2^> >> documentation.html
echo         ^<p^>OmniMind24 integrates with 25+ AI services including OpenAI, Anthropic, Google Gemini, and ElevenLabs.^</p^> >> documentation.html
echo         ^<h2^>Support^</h2^> >> documentation.html
echo         ^<p^>Need help? Visit our ^<a href="support.html" style="color: #FFD700;"^>Support Center^</a^> or check the ^<a href="help-center.html" style="color: #FFD700;"^>Help Center^</a^>.^</p^> >> documentation.html
echo     ^</div^> >> documentation.html
echo     ^<footer^> >> documentation.html
echo         ^<p^>© 2024 OmniMind24. All rights reserved.^</p^> >> documentation.html
echo     ^</footer^> >> documentation.html
echo ^</body^> >> documentation.html
echo ^</html^> >> documentation.html
echo Created documentation.html

echo.
echo [Step 4/6] Creating api-reference.html...
echo ^<!DOCTYPE html^> > api-reference.html
echo ^<html lang="en"^> >> api-reference.html
echo ^<head^> >> api-reference.html
echo     ^<meta charset="UTF-8"^> >> api-reference.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> api-reference.html
echo     ^<title^>API Reference - OmniMind24^</title^> >> api-reference.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"^> >> api-reference.html
echo     ^<style^> >> api-reference.html
echo         body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; } >> api-reference.html
echo         nav { background: rgba(0,0,0,0.95); padding: 1rem 2rem; border-bottom: 2px solid #FFD700; position: fixed; width: 100%; top: 0; z-index: 1000; } >> api-reference.html
echo         .nav-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; } >> api-reference.html
echo         .logo { font-size: 1.8rem; font-weight: 800; color: #FFD700; text-decoration: none; } >> api-reference.html
echo         .nav-links { display: flex; gap: 2rem; list-style: none; } >> api-reference.html
echo         .nav-links a { color: #fff; text-decoration: none; font-weight: 500; transition: color 0.3s; } >> api-reference.html
echo         .nav-links a:hover { color: #FFD700; } >> api-reference.html
echo         .content { max-width: 1200px; margin: 120px auto 0; padding: 40px 2rem; } >> api-reference.html
echo         .content h1 { font-size: 3rem; margin-bottom: 2rem; color: #FFD700; } >> api-reference.html
echo         .content h2 { font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; color: #FFD700; } >> api-reference.html
echo         .endpoint { background: #1a1a1a; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0; border-left: 4px solid #FFD700; } >> api-reference.html
echo         .method { display: inline-block; padding: 0.3rem 0.8rem; background: #FFD700; color: #000; font-weight: 700; border-radius: 4px; margin-right: 1rem; } >> api-reference.html
echo         code { background: #2a2a2a; padding: 0.2rem 0.5rem; border-radius: 4px; color: #FFD700; } >> api-reference.html
echo         pre { background: #1a1a1a; padding: 1.5rem; border-radius: 8px; overflow-x: auto; } >> api-reference.html
echo         footer { background: #000; padding: 3rem 2rem; border-top: 2px solid #FFD700; text-align: center; color: #ccc; margin-top: 4rem; } >> api-reference.html
echo     ^</style^> >> api-reference.html
echo ^</head^> >> api-reference.html
echo ^<body^> >> api-reference.html
echo     ^<nav^> >> api-reference.html
echo         ^<div class="nav-container"^> >> api-reference.html
echo             ^<a href="index.html" class="logo"^>OmniMind24^</a^> >> api-reference.html
echo             ^<ul class="nav-links"^> >> api-reference.html
echo                 ^<li^>^<a href="index.html"^>Home^</a^>^</li^> >> api-reference.html
echo                 ^<li^>^<a href="features.html"^>Features^</a^>^</li^> >> api-reference.html
echo                 ^<li^>^<a href="pricing.html"^>Pricing^</a^>^</li^> >> api-reference.html
echo                 ^<li^>^<a href="documentation.html"^>Docs^</a^>^</li^> >> api-reference.html
echo                 ^<li^>^<a href="support.html"^>Support^</a^>^</li^> >> api-reference.html
echo             ^</ul^> >> api-reference.html
echo         ^</div^> >> api-reference.html
echo     ^</nav^> >> api-reference.html
echo     ^<div class="content"^> >> api-reference.html
echo         ^<h1^>API Reference^</h1^> >> api-reference.html
echo         ^<p^>Complete REST API documentation for OmniMind24 platform.^</p^> >> api-reference.html
echo         ^<h2^>Authentication^</h2^> >> api-reference.html
echo         ^<p^>All API requests require authentication using Bearer tokens:^</p^> >> api-reference.html
echo         ^<pre^>Authorization: Bearer YOUR_API_TOKEN^</pre^> >> api-reference.html
echo         ^<h2^>Campaigns^</h2^> >> api-reference.html
echo         ^<div class="endpoint"^> >> api-reference.html
echo             ^<span class="method"^>GET^</span^> >> api-reference.html
echo             ^<code^>/api/campaigns^</code^> >> api-reference.html
echo             ^<p^>Retrieve all campaigns for the authenticated user.^</p^> >> api-reference.html
echo         ^</div^> >> api-reference.html
echo         ^<div class="endpoint"^> >> api-reference.html
echo             ^<span class="method"^>POST^</span^> >> api-reference.html
echo             ^<code^>/api/campaigns^</code^> >> api-reference.html
echo             ^<p^>Create a new campaign with COSTAR framework data.^</p^> >> api-reference.html
echo         ^</div^> >> api-reference.html
echo         ^<div class="endpoint"^> >> api-reference.html
echo             ^<span class="method"^>GET^</span^> >> api-reference.html
echo             ^<code^>/api/campaigns/:id^</code^> >> api-reference.html
echo             ^<p^>Retrieve a specific campaign by ID.^</p^> >> api-reference.html
echo         ^</div^> >> api-reference.html
echo         ^<h2^>Content Generation^</h2^> >> api-reference.html
echo         ^<div class="endpoint"^> >> api-reference.html
echo             ^<span class="method"^>POST^</span^> >> api-reference.html
echo             ^<code^>/api/generate^</code^> >> api-reference.html
echo             ^<p^>Generate AI-powered content using selected services.^</p^> >> api-reference.html
echo         ^</div^> >> api-reference.html
echo         ^<h2^>Rate Limits^</h2^> >> api-reference.html
echo         ^<p^>API requests are limited based on your plan tier. See ^<a href="pricing.html" style="color: #FFD700;"^>Pricing^</a^> for details.^</p^> >> api-reference.html
echo     ^</div^> >> api-reference.html
echo     ^<footer^> >> api-reference.html
echo         ^<p^>© 2024 OmniMind24. All rights reserved.^</p^> >> api-reference.html
echo     ^</footer^> >> api-reference.html
echo ^</body^> >> api-reference.html
echo ^</html^> >> api-reference.html
echo Created api-reference.html

echo.
echo [Step 5/6] Creating help-center.html...
echo ^<!DOCTYPE html^> > help-center.html
echo ^<html lang="en"^> >> help-center.html
echo ^<head^> >> help-center.html
echo     ^<meta charset="UTF-8"^> >> help-center.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> help-center.html
echo     ^<title^>Help Center - OmniMind24^</title^> >> help-center.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"^> >> help-center.html
echo     ^<style^> >> help-center.html
echo         body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; } >> help-center.html
echo         nav { background: rgba(0,0,0,0.95); padding: 1rem 2rem; border-bottom: 2px solid #FFD700; position: fixed; width: 100%; top: 0; z-index: 1000; } >> help-center.html
echo         .nav-container { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; } >> help-center.html
echo         .logo { font-size: 1.8rem; font-weight: 800; color: #FFD700; text-decoration: none; } >> help-center.html
echo         .nav-links { display: flex; gap: 2rem; list-style: none; } >> help-center.html
echo         .nav-links a { color: #fff; text-decoration: none; font-weight: 500; transition: color 0.3s; } >> help-center.html
echo         .nav-links a:hover { color: #FFD700; } >> help-center.html
echo         .hero { padding: 150px 2rem 50px; text-align: center; background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); } >> help-center.html
echo         .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #FFD700; } >> help-center.html
echo         .faq-container { max-width: 900px; margin: 60px auto; padding: 0 2rem; } >> help-center.html
echo         .faq-item { background: #1a1a1a; padding: 2rem; margin-bottom: 1.5rem; border-radius: 8px; border-left: 4px solid #FFD700; } >> help-center.html
echo         .faq-item h3 { color: #FFD700; margin-bottom: 1rem; font-size: 1.3rem; } >> help-center.html
echo         .faq-item p { color: #ccc; line-height: 1.8; } >> help-center.html
echo         footer { background: #000; padding: 3rem 2rem; border-top: 2px solid #FFD700; text-align: center; color: #ccc; margin-top: 4rem; } >> help-center.html
echo     ^</style^> >> help-center.html
echo ^</head^> >> help-center.html
echo ^<body^> >> help-center.html
echo     ^<nav^> >> help-center.html
echo         ^<div class="nav-container"^> >> help-center.html
echo             ^<a href="index.html" class="logo"^>OmniMind24^</a^> >> help-center.html
echo             ^<ul class="nav-links"^> >> help-center.html
echo                 ^<li^>^<a href="index.html"^>Home^</a^>^</li^> >> help-center.html
echo                 ^<li^>^<a href="features.html"^>Features^</a^>^</li^> >> help-center.html
echo                 ^<li^>^<a href="pricing.html"^>Pricing^</a^>^</li^> >> help-center.html
echo                 ^<li^>^<a href="documentation.html"^>Docs^</a^>^</li^> >> help-center.html
echo                 ^<li^>^<a href="support.html"^>Support^</a^>^</li^> >> help-center.html
echo             ^</ul^> >> help-center.html
echo         ^</div^> >> help-center.html
echo     ^</nav^> >> help-center.html
echo     ^<div class="hero"^> >> help-center.html
echo         ^<h1^>Help Center^</h1^> >> help-center.html
echo     ^</div^> >> help-center.html
echo     ^<div class="faq-container"^> >> help-center.html
echo         ^<div class="faq-item"^> >> help-center.html
echo             ^<h3^>How do I get started with OmniMind24?^</h3^> >> help-center.html
echo             ^<p^>Simply register for an account, choose your plan, and start creating campaigns using our intuitive dashboard.^</p^> >> help-center.html
echo         ^</div^> >> help-center.html
echo         ^<div class="faq-item"^> >> help-center.html
echo             ^<h3^>What AI services are included?^</h3^> >> help-center.html
echo             ^<p^>We integrate with 25+ AI services including OpenAI, Anthropic Claude, Google Gemini, ElevenLabs, and many more.^</p^> >> help-center.html
echo         ^</div^> >> help-center.html
echo         ^<div class="faq-item"^> >> help-center.html
echo             ^<h3^>How does the credit system work?^</h3^> >> help-center.html
echo             ^<p^>Credits are used for AI content generation. Each plan includes a monthly credit allocation. Additional credits can be purchased as needed.^</p^> >> help-center.html
echo         ^</div^> >> help-center.html
echo         ^<div class="faq-item"^> >> help-center.html
echo             ^<h3^>What is the COSTAR framework?^</h3^> >> help-center.html
echo             ^<p^>COSTAR is our strategic campaign planning framework: Context, Objective, Strategy, Tone, Audience, and Results tracking.^</p^> >> help-center.html
echo         ^</div^> >> help-center.html
echo         ^<div class="faq-item"^> >> help-center.html
echo             ^<h3^>Can I cancel my subscription anytime?^</h3^> >> help-center.html
echo             ^<p^>Yes, you can cancel your subscription at any time from your account settings. No long-term commitments required.^</p^> >> help-center.html
echo         ^</div^> >> help-center.html
echo         ^<div class="faq-item"^> >> help-center.html
echo             ^<h3^>How secure is my data?^</h3^> >> help-center.html
echo             ^<p^>We use enterprise-grade encryption and AWS S3 for secure storage. Your data is protected with bank-level security.^</p^> >> help-center.html
echo         ^</div^> >> help-center.html
echo     ^</div^> >> help-center.html
echo     ^<footer^> >> help-center.html
echo         ^<p^>© 2024 OmniMind24. All rights reserved.^</p^> >> help-center.html
echo     ^</footer^> >> help-center.html
echo ^</body^> >> help-center.html
echo ^</html^> >> help-center.html
echo Created help-center.html

echo.
echo [Step 6/6] Pushing to GitHub...
git pull origin master
git add features.html support.html documentation.html api-reference.html help-center.html
git commit -m "Add navigation pages: features, support, docs, API reference, help center"
git push origin master

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! ALL PAGES CREATED AND PUSHED!
    echo ========================================
    echo.
    echo Created and pushed:
    echo - features.html
    echo - support.html
    echo - documentation.html
    echo - api-reference.html
    echo - help-center.html
    echo.
    echo WAIT 5-10 MINUTES for GitHub Pages to rebuild
    echo.
    echo Then test in INCOGNITO MODE:
    echo https://omnimind24.com/features.html
    echo https://omnimind24.com/support.html
    echo https://omnimind24.com/documentation.html
    echo https://omnimind24.com/api-reference.html
    echo https://omnimind24.com/help-center.html
    echo.
    echo All your new pages will be live!
    echo.
) else (
    echo.
    echo ========================================
    echo PUSH FAILED
    echo ========================================
    echo.
    echo Check the error above and let me know what it says.
    echo.
)

pause
