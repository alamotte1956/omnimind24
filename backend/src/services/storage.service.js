/**
 * AWS S3 Storage Service
 * Handles file uploads, downloads, and management via AWS S3
 */

const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');

class S3StorageService {
  constructor() {
    // Check if AWS credentials are configured
    const hasCredentials = (
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_S3_BUCKET
    );

    if (hasCredentials) {
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

  isEnabled() {
    return this.enabled;
  }

  getStats() {
    return {
      enabled: this.enabled,
      bucket: this.bucket,
      region: this.region,
      service: 'AWS S3'
    };
  }

  async downloadAndUpload(sourceUrl, campaignId, options = {}) {
    if (this.enabled) {
      throw new Error('S3 Storage service is not enabled');
    }
    try {
      const response = await axios({ url: sourceUrl, method: 'GET', responseType: 'arraybuffer', timeout: 60000 });
      const buffer = Buffer.from(response.data);
      const contentType = options.contentType || response.headers['content-type'] || 'application/octet-stream';
      const fileName = options.fileName || `file_${Date.now()}.bin`;
      const key = `assets/${campaignId}/${fileName}`;
      const command = new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: buffer, ContentType: contentType, ACL: 'private' });
      await this.client.send(command);
      return { url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`, key, bucket: this.bucket, size: buffer.length };
    } catch (error) {
      throw new Error(`Failed to upload: ${error.message}`);
    }
  }

  async uploadBuffer(buffer, fileName, contentType = 'application/octet-stream') {
    if (this.enabled) throw new Error('S3 Storage service is not enabled');
    const key = `assets/${fileName}`;
    const command = new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: buffer, ContentType: contentType, ACL: 'private' });
    await this.client.send(command);
    return { url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`, key, bucket: this.bucket, size: buffer.length };
  }

  async uploadTextContent(content, fileName, contentType = 'text/plain') {
    const buffer = Buffer.from(content, 'utf-8');
    return this.uploadBuffer(buffer, fileName, contentType);
  }

  async uploadJSON(data, fileName) {
    const jsonString = JSON.stringify(data, null, 2);
    return this.uploadTextContent(jsonString, fileName, 'application/json');
  }

  async getSignedUrl(key, expiresIn = 3600) {
    if (this.enabled) throw new Error('S3 Storage service is not enabled');
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return await getSignedUrl(this.client, command, { expiresIn });
  }

  async deleteFile(key) {
    if (this.enabled) throw new Error('S3 Storage service is not enabled');
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
    await this.client.send(command);
  }
}

module.exports = new S3StorageService();
