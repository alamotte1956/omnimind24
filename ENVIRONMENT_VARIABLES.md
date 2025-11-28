# 🔐 Environment Variables Configuration
## OMNI-MIND Backend - A.I. Help Pros

This document lists all environment variables needed for deployment.

---

## ✅ Quick Checklist

Copy this checklist and fill in your values:

```bash
# ===== ESSENTIAL CONFIGURATION =====
[ ] NODE_ENV=production
[ ] PORT=3000
[ ] JWT_SECRET=________________________

# ===== DATABASE & CACHE (Auto-configured by Railway) =====
[ ] DATABASE_URL=________________________
[ ] REDIS_URL=________________________

# ===== OPENAI (ChatGPT + DALL-E) =====
[ ] OPENAI_API_KEY=sk-proj-________________________

# ===== ANTHROPIC (Claude) =====
[ ] ANTHROPIC_API_KEY=sk-ant-________________________

# ===== GOOGLE (Gemini) =====
[ ] GOOGLE_API_KEY=AIzaSy________________________

# ===== ELEVENLABS (Voice Generation) =====
[ ] ELEVENLABS_API_KEY=________________________

# ===== AWS S3 (File Storage) =====
[ ] AWS_ACCESS_KEY_ID=AKIA________________________
[ ] AWS_SECRET_ACCESS_KEY=________________________
[ ] AWS_REGION=us-east-1
[ ] AWS_S3_BUCKET=omnimind-assets

# ===== OPTIONAL =====
[ ] FRONTEND_URL=https://________________________
```

---

## 📋 Detailed Variable Descriptions

### 1. Essential Configuration

#### `NODE_ENV`
- **Required:** Yes
- **Value:** `production`
- **Description:** Sets the application environment mode
- **Example:** `NODE_ENV=production`

#### `PORT`
- **Required:** No (Railway sets automatically)
- **Default:** `3000`
- **Description:** Port the server listens on
- **Example:** `PORT=3000`
- **Note:** Railway will override this with their own port

#### `JWT_SECRET`
- **Required:** Yes
- **Security:** 🔴 CRITICAL - Keep secret!
- **Description:** Secret key for JWT token signing
- **Length:** Minimum 32 characters, recommended 64+
- **Example:** `JWT_SECRET=8f4d9c7b2e1a6f3d9c8b7a5e4d3c2b1a0f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4`

**How to generate:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64

# Option 3: Online generator
# Visit: https://randomkeygen.com/ and use "Fort Knox Passwords"
```

---

### 2. Database & Cache (Auto-configured by Railway)

#### `DATABASE_URL`
- **Required:** Yes
- **Auto-configured:** ✅ Railway PostgreSQL addon
- **Format:** `postgresql://user:password@host:port/database`
- **Example:** `DATABASE_URL=postgresql://postgres:pass123@containers-us-west.railway.app:5432/railway`
- **Note:** Added automatically when you provision PostgreSQL

#### `REDIS_URL`
- **Required:** Yes (for background jobs)
- **Auto-configured:** ✅ Railway Redis addon
- **Format:** `redis://user:password@host:port`
- **Example:** `REDIS_URL=redis://default:pass123@containers-us-west.railway.app:6379`
- **Note:** Added automatically when you provision Redis

---

### 3. OpenAI (ChatGPT + DALL-E 3)

#### `OPENAI_API_KEY`
- **Required:** Yes
- **Security:** 🔴 CRITICAL - Keep secret!
- **Format:** Starts with `sk-proj-` or `sk-`
- **Example:** `OPENAI_API_KEY=sk-proj-1234567890abcdefghijklmnopqrstuvwxyz`
- **Used for:**
  - Blog post generation (GPT-4)
  - Social media content (GPT-4)
  - Ad copy creation (GPT-4)
  - Image generation (DALL-E 3)

**How to get:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Name it: "OMNI-MIND Production"
5. Copy the key immediately (shown only once!)
6. Save it securely

**Pricing Info:**
- GPT-4 Turbo: $10 per 1M input tokens, $30 per 1M output tokens
- DALL-E 3: $0.040 per image (1024x1024)
- Free tier: $5 credit for first 3 months

**Rate Limits:**
- Free tier: 3 requests/minute, 200 requests/day
- Paid tier: 10,000 requests/minute

---

### 4. Anthropic (Claude 3.5 Sonnet)

#### `ANTHROPIC_API_KEY`
- **Required:** Yes
- **Security:** 🔴 CRITICAL - Keep secret!
- **Format:** Starts with `sk-ant-`
- **Example:** `ANTHROPIC_API_KEY=sk-ant-api03-1234567890abcdefghijklmnopqrstuvwxyz`
- **Used for:**
  - Marketing strategy generation
  - Market research and analysis
  - Competitive analysis
  - Long-form content (newsletters, whitepapers)

**How to get:**
1. Go to https://console.anthropic.com/settings/keys
2. Sign in or create account
3. Click "Create Key"
4. Name it: "OMNI-MIND Production"
5. Copy the key
6. Save it securely

**Pricing Info:**
- Claude 3.5 Sonnet: $3 per 1M input tokens, $15 per 1M output tokens
- Free tier: $5 credit initially

**Rate Limits:**
- Free tier: 5 requests/minute
- Paid tier: 1,000 requests/minute

---

### 5. Google (Gemini 1.5 Pro)

#### `GOOGLE_API_KEY`
- **Required:** Yes
- **Security:** 🔴 CRITICAL - Keep secret!
- **Format:** Starts with `AIzaSy`
- **Example:** `GOOGLE_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz`
- **Used for:**
  - Multi-format content generation
  - Landing page copy
  - Video scripts with timing
  - Podcast outlines
  - Infographic content

**How to get:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Get API Key"
4. Select existing project or create new one
5. Copy the API key
6. Save it securely

**Alternative method:**
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable "Generative Language API"
4. Create credentials → API Key
5. Restrict key to "Generative Language API" only

**Pricing Info:**
- Gemini 1.5 Pro: $7 per 1M input tokens, $21 per 1M output tokens
- Free tier: 60 requests/minute

**Rate Limits:**
- Free tier: 60 requests/minute
- Paid tier: 360 requests/minute

---

### 6. ElevenLabs (Voice Generation)

#### `ELEVENLABS_API_KEY`
- **Required:** Yes (for voice features)
- **Security:** 🔴 CRITICAL - Keep secret!
- **Format:** 32-character alphanumeric string
- **Example:** `ELEVENLABS_API_KEY=1234567890abcdefghijklmnopqrstuv`
- **Used for:**
  - Video voiceovers
  - Blog post narration
  - Podcast audio
  - Ad voiceovers

**How to get:**
1. Go to https://elevenlabs.io/app/settings/api-keys
2. Sign in or create account
3. Click "Create API Key"
4. Name it: "OMNI-MIND Production"
5. Copy the key
6. Save it securely

**Pricing Info:**
- Free tier: 10,000 characters/month
- Creator: $5/month - 30,000 characters
- Pro: $22/month - 100,000 characters
- Scale: $99/month - 500,000 characters

**Rate Limits:**
- Free tier: 3 concurrent requests
- Paid tier: 10+ concurrent requests

---

### 7. AWS S3 (File Storage)

#### `AWS_ACCESS_KEY_ID`
- **Required:** Yes
- **Security:** 🔴 CRITICAL - Keep secret!
- **Format:** Starts with `AKIA`
- **Example:** `AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE`
- **Description:** AWS IAM user access key for S3

#### `AWS_SECRET_ACCESS_KEY`
- **Required:** Yes
- **Security:** 🔴 CRITICAL - Keep secret!
- **Format:** 40-character alphanumeric string with symbols
- **Example:** `AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
- **Description:** AWS IAM user secret key for S3

#### `AWS_REGION`
- **Required:** Yes
- **Default:** `us-east-1`
- **Example:** `AWS_REGION=us-east-1`
- **Options:**
  - `us-east-1` (N. Virginia) - Recommended
  - `us-west-2` (Oregon)
  - `eu-west-1` (Ireland)
  - `ap-southeast-1` (Singapore)
- **Description:** AWS region where your S3 bucket is located

#### `AWS_S3_BUCKET`
- **Required:** Yes
- **Example:** `AWS_S3_BUCKET=omnimind-assets`
- **Description:** Name of your S3 bucket for storing generated files
- **Naming rules:**
  - 3-63 characters
  - Lowercase letters, numbers, hyphens
  - Must be globally unique

**How to get AWS credentials:**

1. **Create AWS Account**
   - Go to https://aws.amazon.com
   - Sign up for free tier

2. **Create IAM User**
   - Go to IAM Console: https://console.aws.amazon.com/iam
   - Click "Users" → "Add users"
   - Username: `omnimind-s3-user`
   - Access type: ✅ Programmatic access
   - Click "Next: Permissions"

3. **Attach S3 Policy**
   - Click "Attach existing policies directly"
   - Search for and select: `AmazonS3FullAccess`
   - Or create custom policy with only S3 permissions (more secure)
   - Click "Next" → "Create user"

4. **Save Credentials**
   - ⚠️ **IMPORTANT:** Copy both keys immediately!
   - Access Key ID: `AKIA...`
   - Secret Access Key: `wJal...`
   - These are shown only once!
   - Download .csv file as backup

5. **Create S3 Bucket**
   - Go to S3 Console: https://console.aws.amazon.com/s3
   - Click "Create bucket"
   - Bucket name: `omnimind-assets` (or your choice)
   - Region: `us-east-1`
   - Uncheck "Block all public access" (we need public read)
   - ✅ Check "I acknowledge..."
   - Click "Create bucket"

6. **Configure Bucket Policy**
   - Click on your bucket
   - Go to "Permissions" tab
   - Click "Bucket Policy"
   - Add this policy (replace `omnimind-assets`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::omnimind-assets/*"
    }
  ]
}
```

**Pricing Info:**
- Free tier: 5GB storage, 20,000 GET, 2,000 PUT requests/month
- After: $0.023 per GB/month
- Typical cost: $1-5/month

---

### 8. Optional Variables

#### `FRONTEND_URL`
- **Required:** No
- **Default:** `*` (allow all origins)
- **Example:** `FRONTEND_URL=https://app.aihelpspros.com`
- **Description:** Frontend URL for CORS configuration
- **Recommended:** Set to your actual frontend domain in production

---

## 🔒 Security Best Practices

### 1. Never Commit Secrets to Git

**Add to `.gitignore`:**
```bash
.env
.env.local
.env.production
*.pem
*.key
```

### 2. Use Environment Variables Only

❌ **NEVER do this:**
```javascript
const apiKey = 'sk-proj-1234567890abcdef';  // WRONG!
```

✅ **ALWAYS do this:**
```javascript
const apiKey = process.env.OPENAI_API_KEY;  // CORRECT!
```

### 3. Rotate Keys Regularly

- Change JWT_SECRET every 3-6 months
- Rotate API keys if compromised
- Use different keys for dev/staging/production

### 4. Restrict API Keys

- Use IP restrictions where possible
- Set usage limits/budgets
- Monitor API usage for anomalies

### 5. Use Different Keys per Environment

```bash
# Development
OPENAI_API_KEY=sk-proj-dev-key

# Production
OPENAI_API_KEY=sk-proj-prod-key
```

---

## 🧪 Testing Your Configuration

### Test Environment Variables Locally

Create `backend/.env.test`:
```bash
# Copy all your variables here for local testing
NODE_ENV=development
JWT_SECRET=test-secret-key-12345
DATABASE_URL=postgresql://localhost:5432/omnimind_test
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-proj-your-test-key
# ... etc
```

### Verify Variables Are Loaded

Add this to `backend/server.js` temporarily:
```javascript
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  HAS_JWT_SECRET: !!process.env.JWT_SECRET,
  HAS_DATABASE_URL: !!process.env.DATABASE_URL,
  HAS_REDIS_URL: !!process.env.REDIS_URL,
  HAS_OPENAI_KEY: !!process.env.OPENAI_API_KEY,
  HAS_ANTHROPIC_KEY: !!process.env.ANTHROPIC_API_KEY,
  HAS_GOOGLE_KEY: !!process.env.GOOGLE_API_KEY,
  HAS_ELEVENLABS_KEY: !!process.env.ELEVENLABS_API_KEY,
  HAS_AWS_KEYS: !!process.env.AWS_ACCESS_KEY_ID && !!process.env.AWS_SECRET_ACCESS_KEY
});
```

### Test Each API Key

```bash
# Test OpenAI
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_API_KEY"

# Test Anthropic
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'

# Test ElevenLabs
curl https://api.elevenlabs.io/v1/voices \
  -H "xi-api-key: YOUR_ELEVENLABS_API_KEY"

# Test AWS S3
aws s3 ls s3://omnimind-assets --profile omnimind
```

---

## 📊 Cost Tracking

### Recommended: Set Up Budget Alerts

**OpenAI:**
- Go to https://platform.openai.com/account/billing/limits
- Set monthly budget limit
- Set email alerts at 50%, 75%, 90%

**Anthropic:**
- Go to https://console.anthropic.com/settings/limits
- Set spending limits
- Enable email notifications

**AWS:**
- Go to AWS Billing Console
- Create budget: $10/month
- Set alerts at $5, $8, $10

**Railway:**
- Railway dashboard shows usage
- Set budget alert in settings
- Monitor resource usage weekly

---

## 🚨 Troubleshooting

### Variable Not Found

**Error:** `Error: Environment variable OPENAI_API_KEY is not defined`

**Solutions:**
1. Check variable name spelling (case-sensitive)
2. Verify variable is set in Railway dashboard
3. Restart the service after adding variables
4. Check for typos or extra spaces in value

### Invalid API Key

**Error:** `401 Unauthorized` or `Invalid API key`

**Solutions:**
1. Verify key is copied correctly (no extra spaces)
2. Check key hasn't expired
3. Verify key has correct permissions
4. Test key with curl command
5. Generate new key if necessary

### Database Connection Failed

**Error:** `Unable to connect to database`

**Solutions:**
1. Verify `DATABASE_URL` is set
2. Check PostgreSQL service is running
3. Look for `postgresql://` prefix
4. Restart web service

### Redis Connection Failed

**Error:** `Redis connection error: ECONNREFUSED`

**Solutions:**
1. Verify `REDIS_URL` is set
2. Check Redis service is running
3. Verify worker service has `REDIS_URL` too
4. Restart both web and worker services

---

## ✅ Final Checklist

Before deploying to production, verify:

- [ ] All API keys tested individually
- [ ] JWT_SECRET is strong and unique (64+ characters)
- [ ] Database URL is valid and accessible
- [ ] Redis URL is valid and accessible
- [ ] S3 bucket exists and is accessible
- [ ] S3 bucket policy allows public read
- [ ] All keys are production keys (not test/dev)
- [ ] No secrets committed to Git
- [ ] Budget alerts set up for all APIs
- [ ] FRONTEND_URL set to actual domain (not *)
- [ ] Worker service has all same variables as web service
- [ ] Variables documented in team password manager

---

## 📞 Support

If you need help with environment variables:

1. **Check Railway logs** for specific error messages
2. **Verify variable spelling** (case-sensitive)
3. **Test API keys individually** with curl
4. **Review this document** for correct format
5. **Contact API provider support** for key issues

---

**Built by A.I. Help Pros** 🚀  
Last Updated: 2024-01-15
