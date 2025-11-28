// ========================================
// OMNI-MIND Dashboard - Main Dashboard Page
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!requireAuth()) return;

    // Load dashboard data
    loadDashboardStats();
    loadRecentCampaigns();

    // Set up auto-refresh for processing campaigns
    setInterval(checkAndRefreshProcessing, 10000); // Every 10 seconds
});

let allCampaigns = [];

// Load Dashboard Statistics
async function loadDashboardStats() {
    try {
        // Fetch all campaigns
        const response = await ApiClient.get(API_CONFIG.ENDPOINTS.CAMPAIGNS);
        allCampaigns = response.campaigns || [];

        // Calculate stats
        const total = allCampaigns.length;
        const completed = allCampaigns.filter(c => c.status === 'completed').length;
        const processing = allCampaigns.filter(c => c.status === 'processing').length;
        const drafts = allCampaigns.filter(c => c.status === 'pending').length;

        // Update UI
        updateStatCard('totalCampaigns', total);
        updateStatCard('completedCampaigns', completed);
        updateStatCard('processingCampaigns', processing);
        updateStatCard('draftCampaigns', drafts);

    } catch (error) {
        console.error('Failed to load dashboard stats:', error);
    }
}

// Update Stat Card
function updateStatCard(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        // Animate number change
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue !== value) {
            animateValue(element, currentValue, value, 500);
        }
    }
}

// Animate Number Value
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Load Recent Campaigns
async function loadRecentCampaigns() {
    const container = document.getElementById('recentCampaignsList');
    
    try {
        // Use already fetched campaigns or fetch new ones
        if (allCampaigns.length === 0) {
            const response = await ApiClient.get(API_CONFIG.ENDPOINTS.CAMPAIGNS);
            allCampaigns = response.campaigns || [];
        }

        // Sort by creation date (newest first) and take top 5
        const recentCampaigns = allCampaigns
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);

        // Display campaigns
        if (recentCampaigns.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No campaigns yet</p>
                    <a href="create-campaign.html" class="btn btn-primary">Create Your First Campaign</a>
                </div>
            `;
        } else {
            container.innerHTML = recentCampaigns.map(campaign => createCampaignItem(campaign)).join('');
            
            // Add click handlers
            recentCampaigns.forEach(campaign => {
                const element = document.getElementById(`campaign-${campaign.id}`);
                if (element) {
                    element.addEventListener('click', () => {
                        window.location.href = `campaign-details.html?id=${campaign.id}`;
                    });
                }
            });
        }

    } catch (error) {
        console.error('Failed to load recent campaigns:', error);
        container.innerHTML = `
            <div class="error-message">
                Failed to load campaigns. Please refresh the page.
            </div>
        `;
    }
}

// Create Campaign Item HTML
function createCampaignItem(campaign) {
    const date = formatDate(campaign.created_at);
    const type = formatCampaignType(campaign.type);
    const tools = getAiToolsIcons(campaign.ai_tools);
    const statusBadge = getStatusBadge(campaign.status);

    return `
        <div class="campaign-item" id="campaign-${campaign.id}">
            <div class="campaign-info">
                <h4>${campaign.name}</h4>
                <p>${type} • ${date} ${tools ? '• ' + tools : ''}</p>
            </div>
            <div class="campaign-status">
                ${statusBadge}
                ${campaign.assets_count > 0 ? `<span style="color: var(--gray-600); font-size: 0.875rem;">${campaign.assets_count} assets</span>` : ''}
            </div>
        </div>
    `;
}

// Check and Refresh Processing Campaigns
async function checkAndRefreshProcessing() {
    const processingCampaigns = allCampaigns.filter(c => c.status === 'processing');
    
    if (processingCampaigns.length > 0) {
        // Refresh data
        await loadDashboardStats();
        await loadRecentCampaigns();
    }
}
