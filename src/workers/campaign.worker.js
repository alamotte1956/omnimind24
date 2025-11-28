const Queue = require('bull');
const { Campaign } = require('../models');
const orchestratorService = require('../services/orchestrator.service');
const logger = require('../config/logger');

const campaignQueue = new Queue('campaign-processing', process.env.REDIS_URL || 'redis://localhost:6379');

// Process campaigns in background
campaignQueue.process(async (job) => {
  const { campaignId, selectedTools } = job.data;
  
  logger.info(`🚀 Starting job ${job.id} for campaign ${campaignId}`);
  
  try {
    const campaign = await Campaign.findByPk(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const startTime = Date.now();

    // Progress callback
    const progressCallback = (update) => {
      job.progress(update.progress);
      logger.info(`Progress ${update.progress}%: ${update.status}`);
    };

    // Update progress
    job.progress(5);

    // Process with orchestrator
    const results = await orchestratorService.processCampaign(
      campaign,
      selectedTools,
      progressCallback
    );

    const endTime = Date.now();
    const processingTime = Math.round((endTime - startTime) / 1000);

    // Update campaign
    await campaign.update({
      status: 'completed',
      assets_count: results.totalAssets,
      processing_time_seconds: processingTime
    });

    job.progress(100);

    logger.info(`✅ Job ${job.id} completed successfully`);
    logger.info(`📊 Campaign ${campaignId}: ${results.totalAssets} assets in ${processingTime}s`);

    return {
      success: true,
      campaignId: campaignId,
      assetsGenerated: results.totalAssets,
      processingTime: processingTime
    };

  } catch (error) {
    logger.error(`❌ Job ${job.id} failed:`, error);
    
    // Update campaign status to failed
    await Campaign.update(
      {
        status: 'failed',
        error_message: error.message
      },
      { where: { id: campaignId } }
    );

    throw error;
  }
});

// Handle job completion
campaignQueue.on('completed', (job, result) => {
  logger.info(`🎉 Job ${job.id} completed:`, result);
});

// Handle job failure
campaignQueue.on('failed', (job, err) => {
  logger.error(`💥 Job ${job.id} failed:`, err.message);
});

// Handle job progress
campaignQueue.on('progress', (job, progress) => {
  logger.info(`📊 Job ${job.id} progress: ${progress}%`);
});

logger.info('✅ Campaign worker started and listening for jobs');

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing worker gracefully...');
  await campaignQueue.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, closing worker gracefully...');
  await campaignQueue.close();
  process.exit(0);
});

module.exports = campaignQueue;
