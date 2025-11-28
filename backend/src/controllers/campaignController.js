const { Campaign, Asset, User } = require('../models');
const orchestratorService = require('../services/orchestrator.service');
const logger = require('../config/logger');

// Use the shared queue from worker
const campaignQueue = require('../workers/campaign.worker');

class CampaignController {
  // Create new campaign
  async create(req, res) {
    try {
      const {
        name,
        type,
        target_audience,
        goal,
        brief,
        brand_voice,
        key_messages,
        competitors,
        ai_tools
      } = req.body;

      // Validation
      if (!name || !type || !brief) {
        return res.status(400).json({
          success: false,
          error: 'Name, type, and brief are required'
        });
      }

      const campaignData = {
        user_id: req.userId,
        name,
        type,
        target_audience: target_audience || null,
        goal: goal || null,
        brief,
        brand_voice: brand_voice || 'professional',
        key_messages: key_messages || null,
        competitors: competitors || null,
        ai_tools: ai_tools || ['chatgpt', 'dalle', 'elevenlabs'],
        status: 'draft'
      };

      const campaign = await Campaign.create(campaignData);

      // Update user's campaign count
      await User.increment('campaigns_count', { where: { id: req.userId } });

      logger.info(`Campaign created: ${campaign.id} by user: ${req.userId}`);

      res.status(201).json({
        success: true,
        message: 'Campaign created successfully',
        campaign: campaign
      });
    } catch (error) {
      logger.error('Campaign creation error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create campaign'
      });
    }
  }

  // Start campaign processing
  async process(req, res) {
    try {
      const { id } = req.params;
      
      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found'
        });
      }

      // Check ownership
      if (campaign.user_id !== req.userId) {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized access'
        });
      }

      // Check if already processing
      if (campaign.status === 'processing') {
        return res.status(400).json({
          success: false,
          error: 'Campaign is already being processed'
        });
      }

      // Update status
      await campaign.update({ status: 'processing', error_message: null });

      // Add to processing queue
      const job = await campaignQueue.add({
        campaignId: campaign.id,
        selectedTools: campaign.ai_tools || ['chatgpt', 'dalle', 'elevenlabs']
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      });

      logger.info(`Campaign processing started: ${campaign.id}, Job ID: ${job.id}`);

      res.json({
        success: true,
        message: 'Campaign processing started',
        jobId: job.id,
        status: 'processing'
      });
    } catch (error) {
      logger.error('Campaign processing error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to start processing'
      });
    }
  }

  // Get campaign status and results
  async getResults(req, res) {
    try {
      const { id } = req.params;
      
      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found'
        });
      }

      // Check ownership
      if (campaign.user_id !== req.userId) {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized access'
        });
      }

      // Get all assets
      const results = await orchestratorService.getCampaignResults(campaign.id);

      res.json({
        success: true,
        campaign: campaign,
        results: results,
        status: campaign.status,
        assetsCount: campaign.assets_count
      });
    } catch (error) {
      logger.error('Get results error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get results'
      });
    }
  }

  // Get all campaigns for user
  async getUserCampaigns(req, res) {
    try {
      const { status, limit = 50, offset = 0 } = req.query;

      const where = { user_id: req.userId };
      if (status) {
        where.status = status;
      }

      const campaigns = await Campaign.findAll({
        where: where,
        order: [['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      const total = await Campaign.count({ where: { user_id: req.userId } });

      res.json({
        success: true,
        campaigns: campaigns,
        total: total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (error) {
      logger.error('Get campaigns error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get campaigns'
      });
    }
  }

  // Get single campaign
  async getCampaign(req, res) {
    try {
      const { id } = req.params;
      
      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found'
        });
      }

      // Check ownership
      if (campaign.user_id !== req.userId) {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized access'
        });
      }

      res.json({
        success: true,
        campaign: campaign
      });
    } catch (error) {
      logger.error('Get campaign error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get campaign'
      });
    }
  }

  // Update campaign
  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found'
        });
      }

      // Check ownership
      if (campaign.user_id !== req.userId) {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized access'
        });
      }

      // Don't allow updating status directly
      delete updates.status;
      delete updates.user_id;
      delete updates.assets_count;

      await campaign.update(updates);

      logger.info(`Campaign updated: ${campaign.id}`);

      res.json({
        success: true,
        message: 'Campaign updated successfully',
        campaign: campaign
      });
    } catch (error) {
      logger.error('Update campaign error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update campaign'
      });
    }
  }

  // Delete campaign
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const campaign = await Campaign.findByPk(id);
      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found'
        });
      }

      // Check ownership
      if (campaign.user_id !== req.userId) {
        return res.status(403).json({
          success: false,
          error: 'Unauthorized access'
        });
      }

      await campaign.destroy();

      // Decrement user's campaign count
      await User.decrement('campaigns_count', { where: { id: req.userId } });

      logger.info(`Campaign deleted: ${id}`);

      res.json({
        success: true,
        message: 'Campaign deleted successfully'
      });
    } catch (error) {
      logger.error('Delete campaign error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete campaign'
      });
    }
  }
}

module.exports = new CampaignController();
