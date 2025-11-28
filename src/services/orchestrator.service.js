const openaiService = require('./openai.service');
const anthropicService = require('./anthropic.service');
const geminiService = require('./google.service');
const elevenlabsService = require('./elevenlabs.service');
const storageService = require('./storage.service');
const { Asset } = require('../models');
const logger = require('../config/logger');

class OrchestratorService {
  constructor() {
    this.services = {
      chatgpt: openaiService,
      claude: anthropicService,
      gemini: geminiService,
      dalle: openaiService,
      elevenlabs: elevenlabsService
    };
  }

  async processCampaign(campaign, selectedTools, progressCallback) {
    const startTime = Date.now();
    logger.info(`🎭 Starting campaign processing: ${campaign.id}`);
    logger.info(`Selected tools: ${selectedTools.join(', ')}`);
    
    const results = {
      strategy: null,
      content: [],
      images: [],
      audio: [],
      videos: [],
      socialMedia: {},
      adCopy: {},
      assets: [],
      totalAssets: 0
    };

    try {
      // STEP 1: Generate Strategy (using Claude for deep analysis)
      if (selectedTools.includes('claude')) {
        logger.info('📊 Step 1: Generating marketing strategy with Claude...');
        progressCallback?.({ step: 'strategy', progress: 10, status: 'Analyzing market and creating strategy...' });
        
        const strategy = await anthropicService.generateStrategy(campaign);
        results.strategy = strategy.content;
        
        await this.saveAsset(campaign.id, 'strategy', strategy.content, {
          tool: 'claude',
          type: 'text',
          generationTime: strategy.generationTime
        });
        
        results.totalAssets++;
        logger.info('✅ Strategy generated successfully');
      }

      // STEP 2: Market Research (Claude)
      if (selectedTools.includes('claude') && campaign.competitors) {
        logger.info('🔍 Step 2: Conducting market research...');
        progressCallback?.({ step: 'research', progress: 20, status: 'Researching market and competitors...' });
        
        const research = await anthropicService.conductResearch(
          campaign.brief,
          campaign.competitors
        );
        
        await this.saveAsset(campaign.id, 'research', research.content, {
          tool: 'claude',
          type: 'text',
          generationTime: research.generationTime
        });
        
        results.totalAssets++;
        logger.info('✅ Market research completed');
      }

      // STEP 3: Blog Post Generation
      if (selectedTools.includes('chatgpt')) {
        logger.info('✍️ Step 3: Generating blog post with ChatGPT...');
        progressCallback?.({ step: 'content', progress: 30, status: 'Creating blog post...' });
        
        const blog = await openaiService.generateBlogPost(
          campaign.name,
          campaign.brief,
          campaign.brand_voice
        );
        
        results.content.push({
          type: 'blog',
          content: blog.content,
          tool: 'chatgpt'
        });
        
        await this.saveAsset(campaign.id, 'blog', blog.content, {
          tool: 'chatgpt',
          tokensUsed: blog.usage.total_tokens,
          generationTime: blog.generationTime
        });
        
        results.totalAssets++;
        logger.info('✅ Blog post generated');
      }

      // STEP 4: Social Media Posts (ChatGPT)
      if (selectedTools.includes('chatgpt')) {
        logger.info('📱 Step 4: Creating social media posts...');
        progressCallback?.({ step: 'social', progress: 45, status: 'Generating social media content...' });
        
        const socialPosts = await openaiService.generateSocialPosts(campaign);
        results.socialMedia = socialPosts;
        
        for (const [platform, posts] of Object.entries(socialPosts)) {
          await this.saveAsset(campaign.id, 'social', JSON.stringify(posts, null, 2), {
            tool: 'chatgpt',
            platform: platform,
            count: posts.length
          });
          results.totalAssets++;
        }
        
        logger.info('✅ Social media posts created');
      }

      // STEP 5: Ad Copy (ChatGPT)
      if (selectedTools.includes('chatgpt')) {
        logger.info('📢 Step 5: Generating ad copy...');
        progressCallback?.({ step: 'ads', progress: 55, status: 'Creating ad copies...' });
        
        const adCopy = await openaiService.generateAdCopy(campaign);
        results.adCopy = adCopy;
        
        for (const [adType, copy] of Object.entries(adCopy)) {
          await this.saveAsset(campaign.id, 'ad', copy, {
            tool: 'chatgpt',
            adType: adType
          });
          results.totalAssets++;
        }
        
        logger.info('✅ Ad copy generated');
      }

      // STEP 6: Multi-Format Content (Gemini)
      if (selectedTools.includes('gemini')) {
        logger.info('📄 Step 6: Creating multi-format content with Gemini...');
        progressCallback?.({ step: 'multiformat', progress: 65, status: 'Generating emails, landing pages, and scripts...' });
        
        const multiFormat = await geminiService.generateMultiFormat(campaign);
        
        await this.saveAsset(campaign.id, 'multiformat', multiFormat.content, {
          tool: 'gemini',
          generationTime: multiFormat.generationTime
        });
        
        results.content.push({
          type: 'multiformat',
          content: multiFormat.content,
          tool: 'gemini'
        });
        
        results.totalAssets++;
        logger.info('✅ Multi-format content created');
      }

      // STEP 7: Image Generation (DALL-E)
      if (selectedTools.includes('dalle')) {
        logger.info('🎨 Step 7: Generating images with DALL-E...');
        progressCallback?.({ step: 'images', progress: 75, status: 'Creating visual assets...' });
        
        const images = await openaiService.generateCampaignImages(campaign, 3);
        
        for (const image of images) {
          // Upload to S3 if storage is enabled
          let storedUrl = image.url;
          try {
            if (storageService.isEnabled()) {
              storedUrl = await storageService.downloadAndUpload(image.url, campaign.id);
            }
          } catch (uploadError) {
            logger.warn('Image upload to S3 failed, using original URL:', uploadError.message);
          }

          results.images.push({
            url: storedUrl,
            tool: 'dalle',
            prompt: image.prompt
          });

          await this.saveAsset(campaign.id, 'image', null, {
            tool: 'dalle',
            fileUrl: storedUrl,
            prompt: image.prompt,
            revisedPrompt: image.revisedPrompt,
            generationTime: image.generationTime
          });
          
          results.totalAssets++;
        }
        
        logger.info(`✅ Generated ${images.length} images`);
      }

      // STEP 8: Voice Generation (ElevenLabs)
      if (selectedTools.includes('elevenlabs') && results.content.length > 0) {
        logger.info('🎙️ Step 8: Generating voiceover with ElevenLabs...');
        progressCallback?.({ step: 'audio', progress: 85, status: 'Creating voiceover...' });
        
        // Use the blog post for voiceover (first 1000 characters)
        const blogContent = results.content.find(c => c.type === 'blog');
        if (blogContent) {
          const script = blogContent.content.substring(0, 1000);
          
          try {
            const audio = await elevenlabsService.generateVoice(script);
            
            // Upload audio to S3
            let audioUrl = null;
            if (storageService.isEnabled()) {
              const uploadResult = await storageService.uploadBuffer(
                audio.audioBuffer,
                `${campaign.id}-voiceover.mp3`,
                'audio/mpeg'
              );
              audioUrl = uploadResult.url;
            }

            results.audio.push({
              url: audioUrl,
              tool: 'elevenlabs',
              type: 'voiceover',
              size: audio.size
            });

            await this.saveAsset(campaign.id, 'audio', null, {
              tool: 'elevenlabs',
              fileUrl: audioUrl,
              fileSize: audio.size,
              mimeType: 'audio/mpeg',
              generationTime: audio.generationTime
            });
            
            results.totalAssets++;
            logger.info('✅ Voiceover generated');
          } catch (audioError) {
            logger.error('Voiceover generation failed:', audioError);
            // Continue processing even if audio fails
          }
        }
      }

      // STEP 9: Finalization
      progressCallback?.({ step: 'finalizing', progress: 95, status: 'Finalizing campaign...' });
      
      const endTime = Date.now();
      const processingTime = Math.round((endTime - startTime) / 1000);
      
      logger.info(`✅ Campaign processing complete!`);
      logger.info(`📊 Total assets generated: ${results.totalAssets}`);
      logger.info(`⏱️ Processing time: ${processingTime}s`);

      progressCallback?.({ step: 'complete', progress: 100, status: 'Campaign completed!' });

      return {
        ...results,
        processingTime: processingTime,
        success: true
      };

    } catch (error) {
      logger.error('❌ Campaign processing failed:', error);
      throw error;
    }
  }

  async saveAsset(campaignId, type, content, metadata) {
    try {
      // 🔍 EXTENSIVE DEBUGGING
      console.log('==================== SAVE ASSET DEBUG ====================');
      console.log('Type:', type);
      console.log('Content type:', typeof content);
      console.log('Content is array?', Array.isArray(content));
      console.log('Content is object?', content !== null && typeof content === 'object');
      if (content !== null && content !== undefined) {
        const preview = typeof content === 'object' ? JSON.stringify(content).substring(0, 200) : String(content).substring(0, 200);
        console.log('Content preview:', preview);
      }
      console.log('=========================================================');

      // Convert objects/arrays to JSON strings automatically
      let contentString = content;
      
      if (content !== null && content !== undefined) {
        if (typeof content === 'object') {
          console.log('⚠️ Content is an object - auto-stringifying');
          contentString = JSON.stringify(content, null, 2);
        } else if (typeof content !== 'string') {
          console.log('⚠️ Content is not a string - converting to string');
          contentString = String(content);
        }
      }

      console.log('Final content type:', typeof contentString);
      console.log('Final content length:', contentString ? contentString.length : 0);

      const asset = await Asset.create({
        campaign_id: campaignId,
        type: type,
        content: contentString,  // Now always a string or null
        file_url: metadata.fileUrl || null,
        file_size: metadata.fileSize || null,
        mime_type: metadata.mimeType || null,
        metadata: metadata,
        ai_tool: metadata.tool || null,
        generation_time_seconds: metadata.generationTime || null,
        tokens_used: metadata.tokensUsed || null,
        cost_usd: metadata.costUsd || null
      });

      logger.info(`💾 Asset saved: ${type} (${metadata.tool})`);
      return asset;
    } catch (error) {
      console.error('❌ SAVE ASSET ERROR:', error.message);
      console.error('Error name:', error.name);
      console.error('Full error:', error);
      logger.error('Failed to save asset:', error);
      throw error;
    }
  }

  async getCampaignResults(campaignId) {
    try {
      const assets = await Asset.findAll({
        where: { campaign_id: campaignId },
        order: [['created_at', 'ASC']]
      });

      const grouped = {
        strategy: [],
        research: [],
        content: [],
        images: [],
        audio: [],
        videos: [],
        social: [],
        ads: [],
        multiformat: [],
        all: assets
      };

      assets.forEach(asset => {
        switch (asset.type) {
          case 'strategy':
            grouped.strategy.push(asset);
            break;
          case 'research':
            grouped.research.push(asset);
            break;
          case 'blog':
          case 'article':
            grouped.content.push(asset);
            break;
          case 'image':
            grouped.images.push(asset);
            break;
          case 'audio':
            grouped.audio.push(asset);
            break;
          case 'video':
            grouped.videos.push(asset);
            break;
          case 'social':
            grouped.social.push(asset);
            break;
          case 'ad':
            grouped.ads.push(asset);
            break;
          case 'multiformat':
            grouped.multiformat.push(asset);
            break;
        }
      });

      return grouped;
    } catch (error) {
      logger.error('Failed to get campaign results:', error);
      throw error;
    }
  }
}

module.exports = new OrchestratorService();
