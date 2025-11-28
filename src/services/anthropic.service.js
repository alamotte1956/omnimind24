console.log('🔥🔥🔥 ANTHROPIC SERVICE V4.0 LOADING - WITH STRING HELPER 🔥🔥🔥');
const Anthropic = require('@anthropic-ai/sdk');
const logger = require('../config/logger');
const { prepareContent, truncateForLog } = require('../utils/stringHelper');

class AnthropicService {
  constructor() {
    this.client = null;
    
    if (!process.env.ANTHROPIC_API_KEY) {
      logger.warn('Anthropic API key not configured');
      // Don't return - keep the instance with methods but null client
    } else {
      this.client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
      });
    }
  }

  async generateContent(promptOrPayload, options = {}) {
    if (!this.client) {
      throw new Error('Anthropic API not configured - please set ANTHROPIC_API_KEY');
    }
    
    try {
      const startTime = Date.now();
      
      // Ensure content is ALWAYS a string
      const content = prepareContent(promptOrPayload, 'AnthropicService');
      
      logger.debug(`[AnthropicService] Generating content with prompt: ${truncateForLog(content)}`);
      
      const message = await this.client.messages.create({
        model: options.model || 'claude-3-5-sonnet-20241022',
        max_tokens: options.maxTokens || 4000,
        messages: [
          {
            role: 'user',
            content: content  // ALWAYS a string now
          }
        ]
      });

      const endTime = Date.now();

      return {
        content: message.content[0].text,
        usage: message.usage,
        model: message.model,
        generationTime: (endTime - startTime) / 1000
      };
    } catch (error) {
      logger.error('[AnthropicService] Claude error:', error);
      throw new Error(`Claude generation failed: ${error.message}`);
    }
  }

  // Generate long-form content (Claude excels at this)
  async generateLongForm(topic, brief, targetLength = 2000) {
    const prompt = `Write a comprehensive, well-researched article of approximately ${targetLength} words about: ${topic}

Brief: ${brief}

Requirements:
- In-depth analysis with multiple perspectives
- Data, statistics, and concrete examples
- Logical structure with clear sections
- Professional, authoritative tone
- Actionable conclusions and takeaways
- Citations where appropriate

Create an engaging, informative piece that provides real value to readers.`;

    return await this.generateContent(prompt, {
      maxTokens: 6000
    });
  }

  // Generate comprehensive marketing strategy
  async generateStrategy(campaign) {
    // Build prompt from campaign object
    const prompt = `As an expert marketing strategist, create a comprehensive campaign strategy for:

Campaign Name: ${campaign.name}
Campaign Type: ${campaign.type}
Goal: ${campaign.goal || 'Not specified'}
Target Audience: ${campaign.target_audience || 'Not specified'}
Brief: ${campaign.brief}
Brand Voice: ${campaign.brand_voice}
Key Messages: ${campaign.key_messages || 'Not specified'}
Competitors: ${campaign.competitors || 'Not specified'}

Provide a detailed strategy covering:

1. EXECUTIVE SUMMARY
   - Campaign overview
   - Key objectives
   - Success metrics

2. MARKET ANALYSIS
   - Target audience deep dive
   - Market trends and insights
   - Competitive landscape analysis
   - Opportunities and threats

3. STRATEGIC POSITIONING
   - Unique value proposition
   - Brand positioning
   - Key differentiators
   - Messaging framework

4. CHANNEL STRATEGY
   - Recommended channels with rationale
   - Channel-specific tactics
   - Content distribution plan
   - Paid vs organic mix

5. CONTENT CALENDAR (30 Days)
   - Week-by-week content plan
   - Content types and topics
   - Publishing schedule
   - Engagement tactics

6. CREATIVE GUIDELINES
   - Visual direction
   - Tone and style
   - Key creative elements
   - Brand consistency notes

7. SUCCESS METRICS & KPIs
   - Primary metrics
   - Secondary metrics
   - Measurement tools
   - Reporting cadence

8. BUDGET ALLOCATION
   - Recommended budget split by channel
   - Expected ROI by channel
   - Cost optimization opportunities

9. RISK MITIGATION
   - Potential challenges
   - Mitigation strategies
   - Contingency plans

10. IMPLEMENTATION ROADMAP
    - Phase 1 (Week 1-2)
    - Phase 2 (Week 3-4)
    - Key milestones
    - Team responsibilities

Provide actionable, specific recommendations that can be implemented immediately.`;

    // prepareContent will ensure this is a string
    return await this.generateContent(prompt, {
      maxTokens: 8000
    });
  }

  // Conduct market research and analysis
  async conductResearch(topic, competitors) {
    const competitorList = Array.isArray(competitors) 
      ? competitors.join(', ') 
      : competitors || 'Not specified';

    const prompt = `Conduct a thorough market research analysis on: ${topic}

Competitors: ${competitorList}

Provide comprehensive analysis covering:

1. MARKET OVERVIEW
   - Market size and growth trends
   - Key market segments
   - Industry dynamics
   - Regulatory environment

2. COMPETITIVE LANDSCAPE
   - Major players and market share
   - Competitive positioning matrix
   - Strengths and weaknesses analysis
   - Competitive advantages and disadvantages

3. TARGET AUDIENCE INSIGHTS
   - Demographics and psychographics
   - Pain points and needs
   - Buying behavior and preferences
   - Decision-making criteria
   - Media consumption habits

4. TREND ANALYSIS
   - Emerging trends
   - Technology disruptions
   - Consumer behavior shifts
   - Future predictions

5. OPPORTUNITIES
   - Market gaps
   - Underserved segments
   - Emerging channels
   - Partnership opportunities

6. THREATS & CHALLENGES
   - Market risks
   - Competitive threats
   - Barriers to entry
   - External factors

7. CONTENT GAPS
   - What competitors are missing
   - Unmet content needs
   - Topic opportunities
   - Format opportunities

8. RECOMMENDED ACTIONS
   - Strategic positioning recommendations
   - Content strategy suggestions
   - Channel recommendations
   - Quick wins and long-term plays

Provide data-driven insights with specific, actionable recommendations.`;

    return await this.generateContent(prompt, {
      maxTokens: 8000
    });
  }

  // Generate email newsletter
  async generateNewsletter(campaign, previousCampaigns = []) {
    const prompt = `Create a compelling email newsletter for:

Campaign: ${campaign.name}
Brief: ${campaign.brief}
Target Audience: ${campaign.target_audience || 'Not specified'}
Brand Voice: ${campaign.brand_voice}

Email Requirements:
- Attention-grabbing subject line (50 characters max)
- Preview text (100 characters)
- Engaging opening paragraph
- 3-4 main content sections
- Clear CTA buttons
- Footer with social links

Structure:
1. Subject Line + Preview Text
2. Email Body (HTML-friendly format)
3. Plain text version

Make it engaging, scannable, and mobile-friendly.`;

    return await this.generateContent(prompt, {
      maxTokens: 3000
    });
  }
}

module.exports = new AnthropicService();

console.log('🔍 Anthropic Service Module Loaded (V4 with String Helper)');
console.log('🔍 Type of module.exports:', typeof module.exports);
console.log('🔍 Has generateStrategy:', typeof module.exports.generateStrategy);
