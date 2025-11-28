// ========================================
// OMNI-MIND Dashboard - Core Configuration
// ========================================

// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://omnimind-production.up.railway.app',
    ENDPOINTS: {
        // Auth
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        
        // Campaigns
        CAMPAIGNS: '/api/campaigns',
        CAMPAIGN_BY_ID: (id) => `/api/campaigns/${id}`,
        PROCESS_CAMPAIGN: (id) => `/api/campaigns/${id}/process`,
        CAMPAIGN_RESULTS: (id) => `/api/campaigns/${id}/results`,
        
        // Products & Pricing
        PRODUCTS: '/api/products',
        PRODUCT_BY_ID: (id) => `/api/products/${id}`,
        
        // Payments
        PAYMENT_CREATE_INTENT: '/api/payments/create-intent',
        PAYMENT_CONFIRM: '/api/payments/confirm',
        TRANSACTIONS: '/api/transactions',
        TRANSACTION_BY_ID: (id) => `/api/transactions/${id}`,
        
        // Coupons
        COUPON_VALIDATE: '/api/coupons/validate',
        
        // Admin
        ADMIN_STATS: '/api/admin/stats',
        ADMIN_PRODUCTS: '/api/admin/products',
        ADMIN_PRODUCT_PRICE: (id) => `/api/admin/products/${id}/price`,
        ADMIN_PRODUCT_STATUS: (id) => `/api/admin/products/${id}/status`,
        ADMIN_PRODUCTS_BULK: '/api/admin/products/bulk-update',
        ADMIN_COUPONS: '/api/admin/coupons',
        ADMIN_COUPON_BY_ID: (id) => `/api/admin/coupons/${id}`,
        
        // Affiliates
        AFFILIATE_APPLY: '/api/affiliates/apply',
        AFFILIATE_DASHBOARD: '/api/affiliates/dashboard',
        AFFILIATE_COMMISSIONS: '/api/affiliates/commissions',
        AFFILIATE_PAYOUTS: '/api/affiliates/payouts',
        AFFILIATE_TRACK_CLICK: '/api/affiliates/track-click',
        AFFILIATE_MATERIALS: (type) => `/api/affiliates/materials/${type}`
    }
};

// Token Management
const TOKEN_KEY = 'omni_mind_token';
const USER_KEY = 'omni_mind_user';

class TokenManager {
    static setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    static getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    static removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    static getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    static removeUser() {
        localStorage.removeItem(USER_KEY);
    }

    static logout() {
        this.removeToken();
        this.removeUser();
        window.location.href = 'login.html';
    }
}

// API Request Handler
class ApiClient {
    static async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const token = TokenManager.getToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        // Add authorization header if token exists
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Log request for debugging
        console.log('API Request:', {
            method: config.method || 'GET',
            url: url,
            hasToken: !!token,
            body: options.body ? JSON.parse(options.body) : null
        });

        try {
            const response = await fetch(url, config);
            
            console.log('API Response:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });
            
            // Handle 401 Unauthorized
            if (response.status === 401) {
                TokenManager.logout();
                throw new Error('Session expired. Please login again.');
            }

            // Try to parse JSON response
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
            }

            if (!response.ok) {
                console.error('API Error Response:', data);
                // Backend returns 'error' field, not 'message'
                const errorMessage = data.error || data.message || `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }

            // Backend includes 'success' field - we don't need it in frontend
            return data;
        } catch (error) {
            console.error('API Request Error:', {
                message: error.message,
                url: url,
                method: config.method || 'GET'
            });
            throw error;
        }
    }

    static async get(endpoint) {
        return this.request(endpoint, {
            method: 'GET'
        });
    }

    static async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    static async put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    static async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}

// Auth Guard - Protect pages that require authentication
function requireAuth() {
    if (!TokenManager.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Redirect if already authenticated
function redirectIfAuthenticated() {
    if (TokenManager.isAuthenticated()) {
        window.location.href = 'index.html';
        return true;
    }
    return false;
}

// Display user info in header
function displayUserInfo() {
    const user = TokenManager.getUser();
    if (user) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }
    }
}

// Logout functionality
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                TokenManager.logout();
            }
        });
    }
}

// Error Display Helper
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Success Display Helper
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
}

// Loading State Helper
function setLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        
        if (isLoading) {
            button.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline';
        } else {
            button.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
        }
    }
}

// Format Date Helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Format Campaign Type
function formatCampaignType(type) {
    const types = {
        'product-launch': 'Product Launch',
        'brand-awareness': 'Brand Awareness',
        'lead-generation': 'Lead Generation',
        'event-promotion': 'Event Promotion',
        'content-marketing': 'Content Marketing',
        'social-media': 'Social Media',
        'other': 'Other'
    };
    return types[type] || type;
}

// Get Status Badge HTML
function getStatusBadge(status) {
    const statusClass = status.toLowerCase();
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return `<span class="status-badge ${statusClass}">${statusText}</span>`;
}

// Truncate Text
function truncateText(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Campaign AI Tools Icons
function getAiToolsIcons(tools) {
    if (!tools || !Array.isArray(tools)) return '';
    
    const icons = {
        'chatgpt': '🤖',
        'claude': '🧠',
        'gemini': '✨',
        'dalle': '🎨',
        'elevenlabs': '🎙️'
    };
    
    return tools.map(tool => icons[tool] || '📎').join(' ');
}

// Initialize common functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    // Display user info if on dashboard pages
    displayUserInfo();
    
    // Initialize logout button
    initLogout();
});

// Export for use in other scripts
window.API_CONFIG = API_CONFIG;
window.TokenManager = TokenManager;
window.ApiClient = ApiClient;
window.requireAuth = requireAuth;
window.redirectIfAuthenticated = redirectIfAuthenticated;
window.showError = showError;
window.showSuccess = showSuccess;
window.setLoadingState = setLoadingState;
window.formatDate = formatDate;
window.formatCampaignType = formatCampaignType;
window.getStatusBadge = getStatusBadge;
window.truncateText = truncateText;
window.getAiToolsIcons = getAiToolsIcons;
