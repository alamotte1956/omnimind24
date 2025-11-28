console.log('🔥🔥🔥 ELEVENLABS SERVICE V4.0 LOADING - WITH STRING HELPER 🔥🔥🔥');
const axios = require('axios');
const logger = require('../config/logger');
const { prepareContent, truncateForLog } = require('../utils/stringHelper');

class ElevenLabsService {
  constructor() {
    this.apiKey = null;
    this.baseURL = 'https://api.elevenlabs.io/v1';
    
    if (!process.env.ELEVENLABS_API_KEY) {
      logger.warn('ElevenLabs API key not configured');
      // Don't return - keep the instance with methods but null apiKey
    } else {
      this.apiKey = process.env.ELEVENLABS_API_KEY;
    }
  }

  async generateVoice(textOrPayload, options = {}) {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API not configured - please set ELEVENLABS_API_KEY');
    }
    
    try {
      const startTime = Date.now();
      
      // Ensure text is ALWAYS a string
      const text = prepareContent(textOrPayload, 'ElevenLabsService');
      
      logger.debug(`[ElevenLabsService] Generating voice with text: ${truncateForLog(text)}`);
      
      // Default voice IDs (you can change these)
      const voiceId = options.voiceId || 'EXAVITQu4vr4xnSDxMaL'; // Bella
      
      const response = await axios.post(
        `${this.baseURL}/text-to-speech/${voiceId}`,
        {
          text: text,  // ALWAYS a string now
          model_id: options.model || 'eleven_multilingual_v2',
          voice_settings: {
            stability: options.stability || 0.5,
            similarity_boost: options.similarityBoost || 0.75,
            style: options.style || 0,
            use_speaker_boost: options.useSpeakerBoost || true
          }
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
          },
          responseType: 'arraybuffer'
        }
      );

      const endTime = Date.now();
      const audioBuffer = Buffer.from(response.data);

      return {
        audioBuffer: audioBuffer,
        size: audioBuffer.length,
        generationTime: (endTime - startTime) / 1000
      };
    } catch (error) {
      logger.error('[ElevenLabsService] ElevenLabs error:', error.response?.data || error.message);
      throw new Error(`ElevenLabs generation failed: ${error.message}`);
    }
  }

  // Generate voiceover for video script
  async generateVideoVoiceover(scriptOrPayload, options = {}) {
    logger.info('[ElevenLabsService] Generating video voiceover...');
    
    // Ensure script is a string
    const script = prepareContent(scriptOrPayload, 'ElevenLabsService.generateVideoVoiceover');
    
    logger.debug(`[ElevenLabsService] Video voiceover script: ${truncateForLog(script)}`);
    
    return await this.generateVoice(script, {
      model: 'eleven_monolingual_v1',
      ...options
    });
  }

  // Generate podcast intro/outro
  async generatePodcastAudio(textOrPayload, voiceId, options = {}) {
    logger.info('[ElevenLabsService] Generating podcast audio...');
    
    // Ensure text is a string
    const text = prepareContent(textOrPayload, 'ElevenLabsService.generatePodcastAudio');
    
    logger.debug(`[ElevenLabsService] Podcast audio text: ${truncateForLog(text)}`);
    
    return await this.generateVoice(text, {
      voiceId: voiceId,
      model: 'eleven_multilingual_v2',
      stability: 0.6,
      similarityBoost: 0.8,
      ...options
    });
  }

  // Generate narration for blog post
  async generateBlogNarration(blogContentOrPayload, options = {}) {
    logger.info('[ElevenLabsService] Generating blog narration...');
    
    // Ensure blog content is a string
    const blogContent = prepareContent(blogContentOrPayload, 'ElevenLabsService.generateBlogNarration');
    
    // Limit to first 5000 characters for narration
    const narratableContent = blogContent.substring(0, 5000);
    
    logger.debug(`[ElevenLabsService] Blog narration (${narratableContent.length} chars): ${truncateForLog(narratableContent)}`);
    
    return await this.generateVoice(narratableContent, {
      model: 'eleven_multilingual_v2',
      stability: 0.5,
      ...options
    });
  }

  // Get available voices
  async getVoices() {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API not configured - please set ELEVENLABS_API_KEY');
    }
    
    try {
      const response = await axios.get(`${this.baseURL}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      return response.data.voices;
    } catch (error) {
      logger.error('[ElevenLabsService] Error fetching voices:', error);
      throw new Error(`Failed to fetch voices: ${error.message}`);
    }
  }

  // Get voice details
  async getVoice(voiceId) {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API not configured - please set ELEVENLABS_API_KEY');
    }
    
    try {
      const response = await axios.get(`${this.baseURL}/voices/${voiceId}`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });

      return response.data;
    } catch (error) {
      logger.error('[ElevenLabsService] Error fetching voice details:', error);
      throw new Error(`Failed to fetch voice details: ${error.message}`);
    }
  }

  // Popular voice IDs (ElevenLabs defaults)
  getPopularVoices() {
    return {
      bella: 'EXAVITQu4vr4xnSDxMaL',
      adam: 'pNInz6obpgDQGcFmaJgB',
      rachel: '21m00Tcm4TlvDq8ikWAM',
      antoni: 'ErXwobaYiN019PkySvjV',
      arnold: 'VR6AewLTigWG4xSOukaG',
      josh: 'TxGEqnHWrfWFTfGW9XjX',
      sam: 'yoZ06aMxZJJ28mfd3POQ'
    };
  }
}

module.exports = new ElevenLabsService();

console.log('🔍 ElevenLabs Service Module Loaded (V4 with String Helper)');
console.log('🔍 Type of module.exports:', typeof module.exports);
console.log('🔍 Has generateVoice:', typeof module.exports.generateVoice);
