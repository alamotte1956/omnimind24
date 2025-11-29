/**
 * AWS S3 Storage Service
 * Handles file uploads, downloads, and management via AWS S3
 */

const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');

class S3StorageService {
  constructor() {
    // Debug logging
    console.log('🔍 S3 Storage Service Constructor - Checking credentials...');
    console.log('AWS_ACCESS_KEY_ID:', !!process.env.AWS_ACCESS_KEY_ID);
    console.log('AWS_SECRET_ACCESS_KEY:', !!process.env.AWS_SECRET_ACCESS_KEY);
    console.log('AWS_S3_BUCKET:', !!process.env.AWS_S3_BUCKET);
    console.log('AWS_S3_BUCKET value:', process.env.AWS_S3_BUCKET ? `"${process.env.AWS_S3_BUCKET}"` : 'UNDEFINED');
    console.log('AWS_REGION:', process.env.AWS_REGION || 'not set');
    
    // Check if AWS credentials are configured
    const hasCredentials = !!(
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_S3_BUCKET
    );

    console.log('hasCredentials result:', hasCredentials);

    if (!hasCredentials) {
      console.warn('⚠️ AWS S3 credentials not configured. Storage service disabled.');
      console.warn('💡 Required env vars: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET, AWS_REGION');
      this.enabled = false;
      this.client = null;
      this.bucket = null;
      this.region = null;
      return;
    }

    // Initialize S3 client
    this.region = process.env.AWS_REGION || 'us-east-1';
    this.bucket = process.env.AWS_S3_BUCKET;
    
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    this.enabled = true;
    
    console.log('✅ S3 Storage service initialized');
    console.log(`📦 Bucket: ${this.bucket}`);
    console.log(`🌍 Region: ${this.region}`);
  }

  /**
   * Check if storage service is enabled
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Get storage statistics
   */
  getStats() {
    return {
      enabled: this.enabled,
      bucket: this.bucket,
      region: this.region,
      service: 'AWS S3'
    };
  }

  /**
   * Download file from URL and upload to S3
   * @param {string} sourceUrl - URL of the file to download
   * @param {string} campaignId - Campaign ID for organizing files
   * @param {object} options - Additional options (fileName, contentType)
   * @returns {Promise<object>} Upload result with S3 URL
   */
  async downloadAndUpload(sourceUrl, campaignId, options = {}) {
    if (!this.enabled) {
      throw new Error('S3 Storage service is not enabled');
    }

    try {
      console.log(`📥 Downloading file from: ${sourceUrl}`);
      
      // Download file
      const response = await axios({
        url: sourceUrl,
        method: 'GET',
        responseType: 'arraybuffer',
        timeout: 60000, // 60 second timeout
        maxContentLength: 500 * 1024 * 1024 // 500MB max
      });

      const buffer = Buffer.from(response.data);
      const contentType = options.contentType || response.headers['content-type'] || 'application/octet-stream';
      
      // Generate filename
      const extension = this.getExtensionFromContentType(contentType);
      const fileName = options.fileName || `file_${Date.now()}${extension}`;
      const key = `assets/${campaignId}/${fileName}`;

      console.log(`📤 Uploading to S3: ${key}`);

      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: 'private' // Files are private by default
      });

      await this.client.send(command);

      console.log(`✅ Upload successful: ${key}`);

      return {
        url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
        key: key,
        bucket: this.bucket,
        size: buffer.length,
        contentType: contentType
      };

    } catch (error) {
      console.error('❌ S3 upload error:', error.message);
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }

  /**
   * Upload buffer directly to S3
   * @param {Buffer} buffer - File buffer
   * @param {string} fileName - Desired filename
   * @param {string} contentType - MIME type
   * @returns {Promise<object>} Upload result
   */
  async uploadBuffer(buffer, fileName, contentType = 'application/octet-stream') {
    if (!this.enabled) {
      throw new Error('S3 Storage service is not enabled');
    }

    try {
      const key = `assets/${fileName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ACL: 'private'
      });

      await this.client.send(command);

      return {
        url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
        key: key,
        bucket: this.bucket,
        size: buffer.length,
        contentType: contentType
      };

    } catch (error) {
      console.error('❌ S3 buffer upload error:', error.message);
      throw new Error(`Failed to upload buffer to S3: ${error.message}`);
    }
  }

  /**
   * Upload text content to S3
   * @param {string} content - Text content
   * @param {string} fileName - Desired filename
   * @param {string} contentType - MIME type
   * @returns {Promise<object>} Upload result
   */
  async uploadTextContent(content, fileName, contentType = 'text/plain') {
    const buffer = Buffer.from(content, 'utf-8');
    return this.uploadBuffer(buffer, fileName, contentType);
  }

  /**
   * Upload JSON data to S3
   * @param {object} data - JSON data
   * @param {string} fileName - Desired filename
   * @returns {Promise<object>} Upload result
   */
  async uploadJSON(data, fileName) {
    const jsonString = JSON.stringify(data, null, 2);
    return this.uploadTextContent(jsonString, fileName, 'application/json');
  }

  /**
   * Get signed URL for private file access
   * @param {string} key - S3 object key
   * @param {number} expiresIn - URL expiration in seconds (default: 1 hour)
   * @returns {Promise<string>} Signed URL
   */
  async getSignedUrl(key, expiresIn = 3600) {
    if (!this.enabled) {
      throw new Error('S3 Storage service is not enabled');
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      const signedUrl = await getSignedUrl(this.client, command, { expiresIn });
      return signedUrl;

    } catch (error) {
      console.error('❌ S3 signed URL error:', error.message);
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }
  }

  /**
   * Delete file from S3
   * @param {string} key - S3 object key
   * @returns {Promise<void>}
   */
  async deleteFile(key) {
    if (!this.enabled) {
      throw new Error('S3 Storage service is not enabled');
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key
      });

      await this.client.send(command);
      console.log(`🗑️ Deleted from S3: ${key}`);

    } catch (error) {
      console.error('❌ S3 delete error:', error.message);
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }

  /**
   * Helper: Get file extension from content type
   * @param {string} contentType - MIME type
   * @returns {string} File extension
   */
  getExtensionFromContentType(contentType) {
    const types = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'video/mp4': '.mp4',
      'video/quicktime': '.mov',
      'audio/mpeg': '.mp3',
      'audio/wav': '.wav',
      'application/pdf': '.pdf',
      'application/json': '.json',
      'text/plain': '.txt',
      'text/html': '.html',
      'text/csv': '.csv'
    };

    return types[contentType] || '';
  }
}

// Export singleton instance
module.exports = new S3StorageService();
