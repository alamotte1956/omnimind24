// ========================================
// OMNI-MIND Dashboard - Campaigns Management
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!requireAuth()) return;

    // Load campaigns
    loadCampaigns();

    // Set up filter buttons
    initFilters();

    // Set up auto-refresh for processing campaigns
    setInterval(checkAndRefresh, 10000); // Every 10 seconds
});

let allCampaigns = [];
let currentFilter = 'all';

// Initialize Filter Buttons
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply filter
            currentFilter = button.getAttribute('data-filter');
            displayFilteredCampaigns();
        });
    });
}

// Load All Campaigns
async function loadCampaigns() {
    const container = document.getElementById('campaignsList');
    
    try {
        // Fetch campaigns from API
        const response = await ApiClient.get(API_CONFIG.ENDPOINTS.CAMPAIGNS);
        allCampaigns = response.campaigns || [];

        // Display campaigns
        displayFilteredCampaigns();

    } catch (error) {
        console.error('Failed to load campaigns:', error);
        container.innerHTML = `
            <div class="error-message">
                Failed to load campaigns. Please refresh the page.
            </div>
        `;
    }
}

// Display Filtered Campaigns
function displayFilteredCampaigns() {
    const container = document.getElementById('campaignsList');
    
    // Filter campaigns based on current filter
    let filteredCampaigns = allCampaigns;
    if (currentFilter !== 'all') {
        filteredCampaigns = allCampaigns.filter(c => c.status === currentFilter);
    }

    // Sort by creation date (newest first)
    filteredCampaigns.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Display campaigns
    if (filteredCampaigns.length === 0) {
        const emptyMessage = currentFilter === 'all' 
            ? 'No campaigns yet' 
            : `No ${currentFilter} campaigns`;
        
        container.innerHTML = `
            <div class="empty-state">
                <p>${emptyMessage}</p>
                ${currentFilter === 'all' ? '<a href="create-campaign.html" class="btn btn-primary">Create Your First Campaign</a>' : ''}
            </div>
        `;
    } else {
        container.innerHTML = filteredCampaigns.map(campaign => createCampaignCard(campaign)).join('');
        
        // Add event listeners
        filteredCampaigns.forEach(campaign => {
            // View campaign
            const viewBtn = document.getElementById(`view-${campaign.id}`);
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = `campaign-details.html?id=${campaign.id}`;
                });
            }

            // Process campaign
            const processBtn = document.getElementById(`process-${campaign.id}`);
            if (processBtn) {
                processBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    processCampaign(campaign.id);
                });
            }

            // Delete campaign
            const deleteBtn = document.getElementById(`delete-${campaign.id}`);
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteCampaign(campaign.id, campaign.name);
                });
            }

            // Campaign card click
            const card = document.getElementById(`campaign-card-${campaign.id}`);
            if (card) {
                card.addEventListener('click', () => {
                    window.location.href = `campaign-details.html?id=${campaign.id}`;
                });
            }
        });
    }
}

// Create Campaign Card HTML
function createCampaignCard(campaign) {
    const date = formatDate(campaign.created_at);
    const type = formatCampaignType(campaign.type);
    const tools = getAiToolsIcons(campaign.ai_tools);
    const statusBadge = getStatusBadge(campaign.status);
    const description = truncateText(campaign.description, 120);

    // Action buttons based on status
    let actions = '';
    if (campaign.status === 'pending') {
        actions = `
            <button id="process-${campaign.id}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                ▶️ Process
            </button>
        `;
    } else if (campaign.status === 'completed') {
        actions = `
            <button id="view-${campaign.id}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                👁️ View Results
            </button>
        `;
    } else if (campaign.status === 'processing') {
        actions = `
            <span style="color: var(--info); font-size: 0.875rem;">⏳ Processing...</span>
        `;
    }

    return `
        <div class="campaign-item" id="campaign-card-${campaign.id}" style="cursor: pointer;">
            <div class="campaign-info" style="flex: 1;">
                <h4>${campaign.name}</h4>
                <p style="margin: 0.5rem 0;">${description}</p>
                <p style="font-size: 0.875rem; color: var(--gray-500);">
                    ${type} • ${date} ${tools ? '• ' + tools : ''}
                </p>
            </div>
            <div class="campaign-status" style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    ${statusBadge}
                    ${campaign.assets_count > 0 ? `<span style="color: var(--gray-600); font-size: 0.875rem;">${campaign.assets_count} assets</span>` : ''}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    ${actions}
                    <button id="delete-${campaign.id}" class="btn btn-cancel" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Process Campaign
async function processCampaign(campaignId) {
    if (!confirm('Start processing this campaign? This will generate all AI content.')) {
        return;
    }

    try {
        await ApiClient.post(API_CONFIG.ENDPOINTS.PROCESS_CAMPAIGN(campaignId));
        alert('Campaign processing started! It will take a few moments.');
        
        // Reload campaigns
        await loadCampaigns();
    } catch (error) {
        console.error('Failed to process campaign:', error);
        alert('Failed to start processing: ' + (error.message || 'Unknown error'));
    }
}

// Delete Campaign
async function deleteCampaign(campaignId, campaignName) {
    if (!confirm(`Are you sure you want to delete "${campaignName}"? This action cannot be undone.`)) {
        return;
    }

    try {
        await ApiClient.delete(API_CONFIG.ENDPOINTS.CAMPAIGN_BY_ID(campaignId));
        alert('Campaign deleted successfully!');
        
        // Reload campaigns
        await loadCampaigns();
    } catch (error) {
        console.error('Failed to delete campaign:', error);
        alert('Failed to delete campaign: ' + (error.message || 'Unknown error'));
    }
}

// Check and Refresh Processing Campaigns
async function checkAndRefresh() {
    const processingCampaigns = allCampaigns.filter(c => c.status === 'processing');
    
    if (processingCampaigns.length > 0) {
        // Refresh data silently
        await loadCampaigns();
    }
}
