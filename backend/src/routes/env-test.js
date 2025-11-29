const express = require('express');
const router = express.Router();

router.get('/env-test', (req, res) => {
  try {
    const envStatus = {
      AWS_ACCESS_KEY_ID: !!process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: !!process.env.AWS_SECRET_ACCESS_KEY,
      AWS_S3_BUCKET: !!process.env.AWS_S3_BUCKET,
      AWS_REGION: !!process.env.AWS_REGION,
      AWS_ACCESS_KEY_ID_preview: process.env.AWS_ACCESS_KEY_ID 
        ? process.env.AWS_ACCESS_KEY_ID.substring(0, 4) + '...' + process.env.AWS_ACCESS_KEY_ID.slice(-4)
        : 'NOT SET',
      AWS_S3_BUCKET_value: process.env.AWS_S3_BUCKET || 'NOT SET',
      AWS_REGION_value: process.env.AWS_REGION || 'NOT SET',
      RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET'
    };
    
    res.json({
      success: true,
      message: 'Environment variables diagnostic',
      railway: !!process.env.RAILWAY_ENVIRONMENT,
      envStatus,
      totalEnvVars: Object.keys(process.env).length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
