// ========================================
// OMNI-MIND Dashboard - Authentication
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    redirectIfAuthenticated();

    // Initialize login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Initialize forgot password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
});

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validation
    if (!email || !password) {
        showError('loginError', 'Please fill in all fields');
        return;
    }

    // Set loading state
    setLoadingState('loginBtn', true);

    try {
        // Call login API
        const response = await ApiClient.post(API_CONFIG.ENDPOINTS.LOGIN, {
            email,
            password
        });

        // Store token and user data
        TokenManager.setToken(response.token);
        TokenManager.setUser(response.user);

        // Show success message
        showSuccess('loginSuccess', 'Login successful! Redirecting...');

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        showError('loginError', error.message || 'Login failed. Please check your credentials.');
        setLoadingState('loginBtn', false);
    }
}

// Handle Registration
async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showError('registerError', 'Please fill in all fields');
        return;
    }

    if (password.length < 6) {
        showError('registerError', 'Password must be at least 6 characters');
        return;
    }

    if (password !== confirmPassword) {
        showError('registerError', 'Passwords do not match');
        return;
    }

    // Set loading state
    setLoadingState('registerBtn', true);

    try {
        // Call register API
        const response = await ApiClient.post(API_CONFIG.ENDPOINTS.REGISTER, {
            name,
            email,
            password
        });

        // Show success message (don't auto-login, redirect to login page instead)
        showSuccess('registerSuccess', 'Registration successful! Please login with your credentials.');

        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } catch (error) {
        console.error('Registration error:', error);
        showError('registerError', error.message || 'Registration failed. Please try again.');
        setLoadingState('registerBtn', false);
    }
}

// Handle Forgot Password
async function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Validation
    if (!email) {
        showError('forgotError', 'Please enter your email address');
        return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('forgotError', 'Please enter a valid email address');
        return;
    }

    // Set loading state
    setLoadingState('forgotBtn', true);

    try {
        // Call forgot password API
        // Note: You'll need to add this endpoint to your backend
        const response = await ApiClient.post('/api/auth/forgot-password', {
            email
        });

        // Show success message
        showSuccess('forgotSuccess', 'Password reset instructions have been sent to your email!');

        // Clear form
        document.getElementById('email').value = '';

        // Redirect to login after delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);

    } catch (error) {
        console.error('Forgot password error:', error);
        
        // Show friendly error message
        if (error.message.includes('not found') || error.message.includes('404')) {
            showError('forgotError', 'If an account exists with this email, you will receive reset instructions.');
        } else {
            showError('forgotError', error.message || 'Unable to process request. Please try again.');
        }
        
        setLoadingState('forgotBtn', false);
    }
}
