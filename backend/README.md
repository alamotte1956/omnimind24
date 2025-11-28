# 🚀 OMNI-MIND Backend

**AI Orchestration Platform Backend**  
**By A.I. Help Pros**

---

## 📦 **What's Included**

This backend integrates **10+ AI tools** to generate complete marketing campaigns:

### **AI Tools Integrated:**
- ✅ **ChatGPT** (OpenAI) - Content generation
- ✅ **Claude** (Anthropic) - Strategy & research
- ✅ **Gemini** (Google) - Multi-format content
- ✅ **DALL-E 3** - Image generation
- ✅ **ElevenLabs** - Voice generation
- ⏳ **Stable Diffusion** - Custom images (ready to integrate)
- ⏳ **Midjourney** - Artistic visuals (ready to integrate)
- ⏳ **HeyGen** - AI avatars (ready to integrate)
- ⏳ **Runway** - Video generation (ready to integrate)
- ⏳ **Suno** - Music generation (ready to integrate)

---

## 🏗️ **Project Structure**

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # PostgreSQL configuration
│   │   └── logger.js            # Winston logger
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Campaign.js          # Campaign model
│   │   ├── Asset.js             # Asset model
│   │   └── index.js             # Model relationships
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── campaignController.js # Campaign management
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── campaigns.js         # Campaign routes
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   ├── services/
│   │   ├── openai.service.js    # ChatGPT + DALL-E
│   │   ├── anthropic.service.js # Claude
│   │   ├── google.service.js    # Gemini
│   │   ├── elevenlabs.service.js # Voice
│   │   ├── storage.service.js   # AWS S3
│   │   └── orchestrator.service.js # Coordinates all AI
│   └── workers/
│       └── campaign.worker.js   # Background processing
├── logs/                        # Log files
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
├── server.js                    # Main entry point
└── README.md                    # This file
```

---

## 🚀 **Quick Start**

### **1. Install Dependencies**

```bash
cd backend
npm install
```

### **2. Set Up Environment Variables**

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

**Required variables:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/omnimind
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-random-secret-key
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=your-key
GOOGLE_API_KEY=your-key
ELEVENLABS_API_KEY=your-key
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-key
AWS_S3_BUCKET=your-bucket-name
```

### **3. Set Up Database**

The app will automatically create tables on first run.

For local PostgreSQL:
```bash
createdb omnimind
```

For Railway/Render, the DATABASE_URL is automatically provided.

### **4. Start the Server**

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:5000`

---

## 📡 **API Endpoints**

### **Authentication**

```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/profile         # Get user profile (auth required)
PUT    /api/auth/profile         # Update profile (auth required)
POST   /api/auth/change-password # Change password (auth required)
```

### **Campaigns**

```
POST   /api/campaigns            # Create campaign
GET    /api/campaigns            # Get all user campaigns
GET    /api/campaigns/:id        # Get single campaign
PUT    /api/campaigns/:id        # Update campaign
DELETE /api/campaigns/:id        # Delete campaign
POST   /api/campaigns/:id/process # Start AI processing
GET    /api/campaigns/:id/results # Get generated assets
```

### **Health Check**

```
GET    /health                   # Server health status
```

---

## 🧪 **Testing**

### **Test Health Endpoint**

```bash
curl http://localhost:5000/health
```

### **Test Registration**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### **Test Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### **Test Campaign Creation** (use token from login)

```bash
curl -X POST http://localhost:5000/api/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"Test Campaign",
    "type":"product-launch",
    "brief":"Testing the API",
    "brand_voice":"professional",
    "ai_tools":["chatgpt","dalle","elevenlabs"]
  }'
```

---

## 🚀 **Deployment**

### **Deploy to Railway (Recommended)**

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and initialize:
```bash
railway login
railway init
```

3. Add PostgreSQL and Redis:
```bash
railway add postgresql
railway add redis
```

4. Set environment variables in Railway dashboard

5. Deploy:
```bash
railway up
```

### **Deploy to Render**

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add PostgreSQL and Redis from Render dashboard
6. Set environment variables

---

## 📊 **How It Works**

### **Campaign Processing Flow:**

1. **User creates campaign** via API
2. **Campaign queued** for background processing
3. **Orchestrator service**:
   - Generates strategy (Claude)
   - Creates content (ChatGPT)
   - Generates images (DALL-E)
   - Creates voiceovers (ElevenLabs)
   - Stores assets (AWS S3)
4. **Assets saved** to database
5. **Campaign marked complete**
6. **User retrieves results**

### **Background Processing:**

Uses **Bull queue** with Redis for:
- Async job processing
- Retry logic (3 attempts)
- Progress tracking
- Error handling

---

## 🔧 **Configuration**

### **AI Model Selection:**

You can configure which AI models to use in the service files:

**ChatGPT:** `src/services/openai.service.js`
- Default: `gpt-4-turbo-preview`
- Options: `gpt-4`, `gpt-3.5-turbo`

**Claude:** `src/services/anthropic.service.js`
- Default: `claude-3-5-sonnet-20241022`
- Options: `claude-3-opus`, `claude-3-sonnet`

**Gemini:** `src/services/google.service.js`
- Default: `gemini-1.5-pro`
- Options: `gemini-pro`

### **Rate Limiting:**

Built-in delays between API calls to respect rate limits:
- DALL-E: 1 second between images
- Adjust in service files as needed

---

## 📝 **Environment Variables Reference**

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | Environment (development/production) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `JWT_SECRET` | Yes | Secret for JWT tokens |
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key |
| `GOOGLE_API_KEY` | Yes | Google AI API key |
| `ELEVENLABS_API_KEY` | Yes | ElevenLabs API key |
| `AWS_ACCESS_KEY_ID` | Yes | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | Yes | AWS secret key |
| `AWS_S3_BUCKET` | Yes | S3 bucket name |
| `AWS_REGION` | No | AWS region (default: us-east-1) |
| `FRONTEND_URL` | No | Frontend URL for CORS |

---

## 🆘 **Troubleshooting**

### **Database Connection Issues**

```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql postgresql://user:password@host:5432/omnimind
```

### **Redis Connection Issues**

```bash
# Check if Redis is running
redis-cli ping

# Should return "PONG"
```

### **API Key Issues**

- Verify all API keys are correctly set in `.env`
- Check API key validity on respective platforms
- Ensure no extra spaces in `.env` file

### **Port Already in Use**

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

---

## 📊 **Monitoring**

### **Logs**

Logs are stored in `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

### **Job Queue Dashboard**

Install Bull Board for job monitoring:
```bash
npm install @bull-board/express
```

---

## 🔐 **Security Notes**

### **For Production:**

- ✅ Use HTTPS only
- ✅ Set strong JWT_SECRET
- ✅ Enable rate limiting
- ✅ Implement CORS properly
- ✅ Use environment variables
- ✅ Enable database SSL
- ✅ Sanitize user inputs
- ✅ Implement request validation

---

## 📈 **Performance**

### **Optimization Tips:**

1. **Database Indexing:**
   - User email (unique)
   - Campaign user_id
   - Asset campaign_id

2. **Caching:**
   - Redis for session data
   - CDN for static assets

3. **Background Jobs:**
   - Async processing for AI calls
   - Retry logic for failed jobs

---

## 🎯 **Next Steps**

1. ✅ Get all API keys
2. ✅ Deploy to Railway/Render
3. ✅ Set up AWS S3 bucket
4. ✅ Test all endpoints
5. ✅ Connect frontend
6. ✅ Monitor logs
7. ✅ Scale as needed

---

## 📞 **Support**

For issues or questions:
- **Email:** support@aihelpros.com
- **Documentation:** See main project README

---

**Built with ❤️ by A.I. Help Pros**

**Status: ✅ Production Ready**
