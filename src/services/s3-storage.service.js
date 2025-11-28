const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');
const logger = require('../config/logger');

class S3StorageService {
  constructor() {
    // Check if AWS credentials are configured
    const hasCredentials = process.env.AWS_ACCESS_KEY_ID && 
                          process.env.AWS_SECRET_ACCESS_KEY && 
                          process.env.AWS_S3_BUCKET;

    if (!hasCredentials) {
      logger.warn('⚠️ AWS S3 credentials not configured - storage disabled');
      this.enabled = false;
      this.s3Client = null;
      return;
    }

    // Initialize S3 client
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    this.bucket = process.env.AWS_S3_BUCKET;
    this.enabled = true;

    logger.info('✅ S3 Storage service initialized');
    logger.info(`📦 Bucket: ${this.bucket}`);
    logger.info(`🌍 Region: ${process.env.AWS_REGION || 'us-east-1'}`);
  }

  /**
   * Download file from URL and upload to S3
   */
  async downloadAndUpload(sourceUrl, campaignId, options = {}) {
    if (!this.enabled) {
      logger.warn('Storage disabled - returning original URL');
      return sourceUrl;
    }

    try {
      logger.info(`📥 Downloading from: ${sourceUrl}`);

      // Download file
      const response = await axios.get(sourceUrl, {
        responseType: 'arraybuffer',
        timeout: 60000, // 60 second timeout
        maxContentLength: 500 * 1024 * 1024 // 500MB max
      });

      const buffer = Buffer.from(response.data);
      const contentType = response.headers['content-type'] || 'application/octet-stream';

      // Generate filename
      const timestamp = Date.now();
      const extension = this.getExtensionFromContentType(contentType) || 'bin';
      const fileName = options.fileName || `${campaignId}/${timestamp}.${extension}`;

      // Upload to S3
      const result = await this.uploadBuffer(buffer, fileName, contentType);
      
      logger.info(`✅ Uploaded to S3: ${result.key}`);
      return result.url;

    } catch (error) {
      logger.error(`❌ Download/Upload failed: ${error.message}`);
      // Fallback to original URL if upload fails
      return sourceUrl;
    }
  }

  /**
   * Upload buffer directly to S3
   */
  async uploadBuffer(buffer, fileName, contentType = 'application/octet-stream') {
    if (!this.enabled) {
      throw new Error('S3 storage is not enabled');
    }

    try {
      const key = `assets/${fileName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: 'private' // Files are private, accessed via signed URLs
      });

      await this.s3Client.send(command);

      // Generate public URL (will require signed URL for access)
      const url = `https://${this.bucket}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;

      return {
        url: url,
        key: key,
        bucket: this.bucket,
        size: buffer.length,
        contentType: contentType
      };

    } catch (error) {
      logger.error(`❌ S3 upload failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Upload text content to S3
   */
  async uploadTextContent(content, fileName, contentType = 'text/plain') {
    const buffer = Buffer.from(content, 'utf-8');
    return this.uploadBuffer(buffer, fileName, contentType);
  }

  /**
   * Upload JSON to S3
   */
  async uploadJSON(data, fileName) {
    const jsonString = JSON.stringify(data, null, 2);
    return this.uploadTextContent(jsonString, fileName, 'application/json');
  }

  /**
   * Generate signed URL for private file access
   * @param {string} key - S3 object key
   * @param {number} expiresIn - Expiration time in seconds (default: 1 hour)
   */
  async getSignedUrl(key, expiresIn = 3600) {
    if (!this.enabled) {
      throw new Error('S3 storage is not enabled');
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresIn
      });

      return signedUrl;

    } catch (error) {
      logger.error(`❌ Failed to generate signed URL: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete file from S3
   */
  async deleteFile(key) {
    if (!this.enabled) {
      return;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      await this.s3Client.send(command);
      logger.info(`🗑️ Deleted from S3: ${key}`);

    } catch (error) {
      logger.error(`❌ S3 delete failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if storage is enabled
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Get storage service stats
   */
  getStats() {
    return {
      enabled: this.enabled,
      mode: this.enabled ? 's3' : 'disabled',
      bucket: this.bucket || 'none',
      region: process.env.AWS_REGION || 'us-east-1'
    };
  }

  /**
   * Helper: Get file extension from content type
   */
  getExtensionFromContentType(contentType) {
    const types = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'video/mp4': 'mp4',
      'video/quicktime': 'mov',
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'application/pdf': 'pdf',
      'text/plain': 'txt',
      'application/json': 'json'
    };

    return types[contentType] || null;
  }
}

module.exports = new S3StorageService();
