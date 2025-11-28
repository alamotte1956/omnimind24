const express = require('express');
const router = express.Router();

router.get('/env-test', (req, res) => {
  const envStatus = {
    AWS_ACCESS_KEY_ID: !!process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: !!process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET: !!process.env.AWS_S3_BUCKET,
    AWS_REGION: !!process.env.AWS_REGION,
    AWS_S3_BUCKET_value: process.env.AWS_S3_BUCKET || 'NOT SET',
    AWS_REGION_value: process.env.AWS_REGION || 'NOT SET'
  };
  res.json({ success: true, railway: !!process.env.RAILWAY_ENVIRONMENT, envStatus });
});

module.exports = router;
