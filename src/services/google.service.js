console.log('🔥🔥🔥 GOOGLE/GEMINI SERVICE V4.0 LOADING - WITH STRING HELPER 🔥🔥🔥');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../config/logger');
const { prepareContent, truncateForLog } = require('../utils/stringHelper');

class GeminiService {
  constructor() {
    this.genAI = null;
    
    if (!process.env.GOOGLE_API_KEY) {
      logger.warn('Google AI API key not configured');
      // Don't return - keep the instance with methods but null client
    } else {
      this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    }
  }

  async generateContent(promptOrPayload, options = {}) {
    if (!this.genAI) {
      throw new Error('Google AI not configured - please set GOOGLE_API_KEY');
    }
    
    try {
      const startTime = Date.now();
      
      // Ensure prompt is ALWAYS a string
      const prompt = prepareContent(promptOrPayload, 'GeminiService');
      
      logger.debug(`[GeminiService] Generating content with prompt: ${truncateForLog(prompt)}`);
      
      const model = this.genAI.getGenerativeModel({
        model: options.model || 'gemini-1.5-pro'
      });

      const result = await model.generateContent(prompt);  // ALWAYS a string now
      const response = await result.response;
      const text = response.text();

      const endTime = Date.now();

      return {
        content: text,
        model: options.model || 'gemini-1.5-pro',
        generationTime: (endTime - startTime) / 1000
      };
    } catch (error) {
      logger.error('[GeminiService] Gemini error:', error);
      throw new Error(`Gemini generation failed: ${error.message}`);
    }
  }

  // Multi-modal analysis (Gemini's strength)
  async analyzeMultiModal(textOrPayload, imageUrls = []) {
    // Ensure text content is a string
    const text = prepareContent(textOrPayload, 'GeminiService.analyzeMultiModal');
    
    logger.debug(`[GeminiService] Analyzing multi-modal content: ${truncateForLog(text)}`);
    
    const prompt = `Analyze the following campaign elements and provide comprehensive insights:

Text Content: ${text}
${imageUrls.length > 0 ? `Images Referenced: ${imageUrls.join(', ')}` : ''}

Provide analysis on:
1. Content Quality Assessment
   - Clarity and coherence
   - Message effectiveness
   - Tone appropriateness

2. Visual-Text Alignment (if images provided)
   - How well visuals support the message
   - Brand consistency
   - Visual appeal

3. Audience Appeal
   - Target audience fit
   - Emotional resonance
   - Call-to-action effectiveness

4. Improvement Suggestions
   - Content enhancements
   - Visual recommendations
   - Overall optimization tips

5. Competitive Positioning
   - Unique elements
   - Market fit
   - Differentiation opportunities`;

    return await this.generateContent(prompt);
  }

  // Generate multi-format content
  async generateMultiFormat(campaignOrPayload) {
    // Extract campaign data and ensure strings
    const campaignName = prepareContent(
      campaignOrPayload.name || campaignOrPayload.campaign_name || 'Campaign',
      'GeminiService.generateMultiFormat.name'
    );
    const campaignType = prepareContent(
      campaignOrPayload.type || campaignOrPayload.campaign_type || 'marketing',
      'GeminiService.generateMultiFormat.type'
    );
    const goal = prepareContent(
      campaignOrPayload.goal || '',
      'GeminiService.generateMultiFormat.goal'
    );
    const targetAudience = prepareContent(
      campaignOrPayload.target_audience || 'General audience',
      'GeminiService.generateMultiFormat.target_audience'
    );
    const brief = prepareContent(
      campaignOrPayload.brief || campaignOrPayload.description || '',
      'GeminiService.generateMultiFormat.brief'
    );
    const brandVoice = prepareContent(
      campaignOrPayload.brand_voice || 'professional',
      'GeminiService.generateMultiFormat.brand_voice'
    );
    
    logger.debug(`[GeminiService] Generating multi-format content for: ${truncateForLog(campaignName)}`);
    
    const prompt = `Create multi-format content for this campaign:

Campaign: ${campaignName}
Type: ${campaignType}
Goal: ${goal}
Target Audience: ${targetAudience}
Brief: ${brief}
Brand Voice: ${brandVoice}

Generate the following formats:

1. EMAIL NEWSLETTER
   - Subject line (50 chars)
   - Preview text (100 chars)
   - HTML email body (300-400 words)
   - 2-3 CTA buttons
   - Footer template

2. LANDING PAGE COPY
   - Hero headline (10 words max)
   - Sub-headline (20 words max)
   - Opening paragraph (50 words)
   - 3 benefit sections with headlines
   - Testimonial placeholder
   - CTA section
   - FAQ section (5 questions)

3. VIDEO SCRIPT (2 minutes)
   - Hook (0-10 seconds)
   - Problem statement (10-30 seconds)
   - Solution introduction (30-60 seconds)
   - Benefits breakdown (60-90 seconds)
   - Social proof (90-105 seconds)
   - Call-to-action (105-120 seconds)
   - Include timing markers

4. PODCAST OUTLINE (30 minutes)
   - Episode title and description
   - Opening hook (2 mins)
   - Main topics (3-4 topics, 5-7 mins each)
   - Guest questions (if applicable)
   - Closing thoughts (3 mins)
   - CTAs and mentions

5. INFOGRAPHIC CONTENT STRUCTURE
   - Main title
   - 5-7 key data points or statistics
   - Section headers
   - Visual element suggestions
   - Color scheme recommendations
   - Bottom CTA

Format each section clearly with headers. Make content cohesive across all formats.`;

    return await this.generateContent(prompt, {
      maxTokens: 6000
    });
  }

  // Generate landing page copy
  async generateLandingPage(campaignOrPayload) {
    // Extract campaign data and ensure strings
    const campaignName = prepareContent(
      campaignOrPayload.name || campaignOrPayload.campaign_name || 'Campaign',
      'GeminiService.generateLandingPage.name'
    );
    const goal = prepareContent(
      campaignOrPayload.goal || '',
      'GeminiService.generateLandingPage.goal'
    );
    const targetAudience = prepareContent(
      campaignOrPayload.target_audience || 'General audience',
      'GeminiService.generateLandingPage.target_audience'
    );
    const brief = prepareContent(
      campaignOrPayload.brief || campaignOrPayload.description || '',
      'GeminiService.generateLandingPage.brief'
    );
    const brandVoice = prepareContent(
      campaignOrPayload.brand_voice || 'professional',
      'GeminiService.generateLandingPage.brand_voice'
    );
    
    logger.debug(`[GeminiService] Generating landing page for: ${truncateForLog(campaignName)}`);
    
    const prompt = `Create compelling landing page copy for:

Campaign: ${campaignName}
Goal: ${goal}
Target Audience: ${targetAudience}
Brief: ${brief}
Brand Voice: ${brandVoice}

Landing Page Structure:

1. HERO SECTION
   - Headline (10 words, benefit-focused)
   - Sub-headline (20 words, clarify value)
   - CTA button text
   - Hero image description

2. PROBLEM SECTION
   - Section headline
   - 3-4 pain points (1-2 sentences each)
   - Emotional connection

3. SOLUTION SECTION
   - Section headline
   - How you solve the problem (2-3 paragraphs)
   - Unique approach

4. BENEFITS/FEATURES
   - 3 main benefits with icons
   - Each: Headline + 2-3 sentences
   - Focus on outcomes

5. HOW IT WORKS
   - 3-4 steps
   - Each step: Title + description (2 sentences)

6. SOCIAL PROOF
   - Testimonial section headline
   - 3 testimonial templates with name/company placeholders
   - Trust indicators

7. FAQ SECTION
   - 5-7 questions and answers
   - Address objections
   - Build trust

8. FINAL CTA
   - Compelling headline
   - Supporting text (2-3 sentences)
   - CTA button text
   - Risk reversal statement

Make copy persuasive, benefit-focused, and conversion-optimized.`;

    return await this.generateContent(prompt, {
      maxTokens: 4000
    });
  }

  // Generate video script
  async generateVideoScript(campaignOrPayload, duration = 120) {
    // Extract campaign data and ensure strings
    const campaignName = prepareContent(
      campaignOrPayload.name || campaignOrPayload.campaign_name || 'Campaign',
      'GeminiService.generateVideoScript.name'
    );
    const goal = prepareContent(
      campaignOrPayload.goal || '',
      'GeminiService.generateVideoScript.goal'
    );
    const targetAudience = prepareContent(
      campaignOrPayload.target_audience || 'General audience',
      'GeminiService.generateVideoScript.target_audience'
    );
    const brief = prepareContent(
      campaignOrPayload.brief || campaignOrPayload.description || '',
      'GeminiService.generateVideoScript.brief'
    );
    const brandVoice = prepareContent(
      campaignOrPayload.brand_voice || 'professional',
      'GeminiService.generateVideoScript.brand_voice'
    );
    
    logger.debug(`[GeminiService] Generating video script for: ${truncateForLog(campaignName)}`);
    
    const prompt = `Create a ${duration}-second video script for:

Campaign: ${campaignName}
Goal: ${goal}
Target Audience: ${targetAudience}
Brief: ${brief}
Brand Voice: ${brandVoice}

Video Script Requirements:
- Total duration: ${duration} seconds
- Include timing markers
- Specify visuals and b-roll
- Include music/sound suggestions
- Note any on-screen text

Script Structure:
[0:00-0:10] HOOK
- Attention-grabbing opening
- Visual description
- Opening line/question

[0:10-0:30] PROBLEM
- Relatable pain point
- Emotional connection
- "What if" scenario

[0:30-0:60] SOLUTION
- Introduce your solution
- Key benefits (3 main points)
- Differentiation

[0:60-0:90] PROOF/DEMO
- How it works
- Social proof elements
- Results/testimonials

[0:90-0:${duration}] CTA
- Clear next step
- Urgency/scarcity element
- Contact information
- Final message

For each section provide:
- Voiceover script
- Visual suggestions
- On-screen text
- Music notes

Make it engaging, concise, and action-oriented.`;

    return await this.generateContent(prompt, {
      maxTokens: 3000
    });
  }
}

module.exports = new GeminiService();

console.log('🔍 Gemini Service Module Loaded (V4 with String Helper)');
console.log('🔍 Type of module.exports:', typeof module.exports);
console.log('🔍 Has generateMultiFormat:', typeof module.exports.generateMultiFormat);
