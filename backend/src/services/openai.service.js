// src/services/openai.service.js
console.log('🔥🔥🔥 OPENAI SERVICE V4.0 LOADING - WITH STRING HELPER 🔥🔥🔥');
const OpenAI = require('openai');
const { prepareContent, truncateForLog } = require('../utils/stringHelper');

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || null;
    this.client = null;

    if (!this.apiKey) {
      console.warn('[OpenAIService] OPENAI_API_KEY missing');
      // Don't return - keep the instance with methods but null client
    } else {
      try {
        this.client = new OpenAI({ apiKey: this.apiKey });
        console.log('[OpenAIService] Client initialized');
      } catch (err) {
        console.error('[OpenAIService] Failed to initialize client:', err.message);
        this.client = null;
      }
    }
  }

  isConfigured() {
    return !!this.apiKey;
  }

  getClient() {
    if (!this.client) {
      throw new Error('OpenAI client not initialized - please set OPENAI_API_KEY');
    }
    return this.client;
  }

  async testConnection() {
    const client = this.getClient();
    const models = await client.models.list();
    return models.data.map(m => m.id).slice(0, 5);
  }

  // BLOG POST GENERATION
  async generateBlogPost(titleOrPayload, brief, brandVoice = 'professional') {
    const client = this.getClient();
    const startTime = Date.now();

    // Handle both string and object inputs
    let title, actualBrief, actualBrandVoice;
    
    if (typeof titleOrPayload === 'object' && titleOrPayload !== null) {
      title = prepareContent(titleOrPayload.title || titleOrPayload.name || titleOrPayload, 'OpenAIService.generateBlogPost.title');
      actualBrief = prepareContent(titleOrPayload.brief || brief || '', 'OpenAIService.generateBlogPost.brief');
      actualBrandVoice = titleOrPayload.brand_voice || brandVoice;
    } else {
      title = prepareContent(titleOrPayload, 'OpenAIService.generateBlogPost.title');
      actualBrief = prepareContent(brief, 'OpenAIService.generateBlogPost.brief');
      actualBrandVoice = brandVoice;
    }

    console.log(`[OpenAIService] Generating blog post with title: ${truncateForLog(title)}`);

    const prompt = `Write a comprehensive blog post about "${title}".

Brief: ${actualBrief}

Brand Voice: ${actualBrandVoice}

Requirements:
- Professional and engaging tone
- SEO-optimized with relevant keywords
- Include introduction, main sections, and conclusion
- 800-1200 words
- Add practical tips and actionable advice

Format the output as a well-structured blog post.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are an expert content writer with a ${actualBrandVoice} brand voice.` },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const endTime = Date.now();

    return {
      content: completion.choices[0].message.content,
      usage: completion.usage,
      generationTime: Math.round((endTime - startTime) / 1000)
    };
  }

  // SOCIAL MEDIA POSTS
  async generateSocialPosts(campaignOrPayload) {
    const client = this.getClient();

    // Extract campaign data and ensure strings
    const campaignType = prepareContent(
      campaignOrPayload.type || campaignOrPayload.campaign_type || 'marketing',
      'OpenAIService.generateSocialPosts.type'
    );
    const campaignName = prepareContent(
      campaignOrPayload.name || campaignOrPayload.campaign_name || 'Campaign',
      'OpenAIService.generateSocialPosts.name'
    );
    const brief = prepareContent(
      campaignOrPayload.brief || campaignOrPayload.description || '',
      'OpenAIService.generateSocialPosts.brief'
    );
    const brandVoice = prepareContent(
      campaignOrPayload.brand_voice || 'professional',
      'OpenAIService.generateSocialPosts.brand_voice'
    );
    const targetAudience = prepareContent(
      campaignOrPayload.target_audience || 'General audience',
      'OpenAIService.generateSocialPosts.target_audience'
    );

    console.log(`[OpenAIService] Generating social posts for campaign: ${truncateForLog(campaignName)}`);

    const prompt = `Create social media posts for a ${campaignType} campaign.

Campaign: ${campaignName}
Brief: ${brief}
Brand Voice: ${brandVoice}
Target Audience: ${targetAudience}

Generate 3 posts for each platform:
- Twitter/X (280 characters max, engaging, use hashtags)
- LinkedIn (Professional, value-driven)
- Instagram (Visual-focused, emoji-friendly)
- Facebook (Conversational, community-oriented)

Return as JSON with this structure:
{
  "twitter": ["post1", "post2", "post3"],
  "linkedin": ["post1", "post2", "post3"],
  "instagram": ["post1", "post2", "post3"],
  "facebook": ["post1", "post2", "post3"]
}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a social media expert. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  }

  // AD COPY GENERATION
  async generateAdCopy(campaignOrPayload) {
    const client = this.getClient();

    // Extract campaign data and ensure strings
    const campaignType = prepareContent(
      campaignOrPayload.type || campaignOrPayload.campaign_type || 'marketing',
      'OpenAIService.generateAdCopy.type'
    );
    const campaignName = prepareContent(
      campaignOrPayload.name || campaignOrPayload.campaign_name || 'Campaign',
      'OpenAIService.generateAdCopy.name'
    );
    const brief = prepareContent(
      campaignOrPayload.brief || campaignOrPayload.description || '',
      'OpenAIService.generateAdCopy.brief'
    );
    const brandVoice = prepareContent(
      campaignOrPayload.brand_voice || 'professional',
      'OpenAIService.generateAdCopy.brand_voice'
    );

    console.log(`[OpenAIService] Generating ad copy for campaign: ${truncateForLog(campaignName)}`);

    const prompt = `Create compelling ad copy for a ${campaignType} campaign.

Campaign: ${campaignName}
Brief: ${brief}
Brand Voice: ${brandVoice}

Generate ad copy for:
- Google Search Ad (headline + 2 descriptions)
- Facebook Ad (attention-grabbing primary text + headline)
- Display Ad (short punchy headline)
- Email Subject Line (compelling and clickable)

Return as JSON with this structure:
{
  "google_search": "headline + description",
  "facebook_ad": "primary text + headline",
  "display_ad": "headline",
  "email_subject": "subject line"
}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert copywriter. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  }

  // IMAGE GENERATION WITH DALL-E
  async generateCampaignImages(campaignOrPayload, count = 3) {
    const client = this.getClient();
    const images = [];

    // Extract campaign data and ensure strings
    const campaignType = prepareContent(
      campaignOrPayload.type || campaignOrPayload.campaign_type || 'marketing',
      'OpenAIService.generateCampaignImages.type'
    );
    const campaignName = prepareContent(
      campaignOrPayload.name || campaignOrPayload.campaign_name || 'Campaign',
      'OpenAIService.generateCampaignImages.name'
    );
    const brief = prepareContent(
      campaignOrPayload.brief || campaignOrPayload.description || '',
      'OpenAIService.generateCampaignImages.brief'
    );

    console.log(`[OpenAIService] Generating ${count} images for campaign: ${truncateForLog(campaignName)}`);

    const basePrompt = `Professional marketing image for ${campaignType} campaign: ${campaignName}. ${brief}`;

    for (let i = 0; i < count; i++) {
      const startTime = Date.now();

      const response = await client.images.generate({
        model: 'dall-e-3',
        prompt: basePrompt,
        size: '1024x1024',
        quality: 'standard',
        n: 1
      });

      const endTime = Date.now();

      images.push({
        url: response.data[0].url,
        prompt: basePrompt,
        revisedPrompt: response.data[0].revised_prompt,
        generationTime: Math.round((endTime - startTime) / 1000)
      });

      // Wait a bit between requests to avoid rate limits
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return images;
  }
}

module.exports = new OpenAIService();

console.log('🔍 OpenAI Service Module Loaded (V4 with String Helper)');
console.log('🔍 Type of module.exports:', typeof module.exports);
console.log('🔍 Has generateBlogPost:', typeof module.exports.generateBlogPost);
