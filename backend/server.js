require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./src/config/database');
const logger = require('./src/config/logger');
const errorHandler = require('./src/middleware/errorHandler');

// ============================================
// V4.0.1 - NUCLEAR DEBUG VERSION
// ============================================
console.log('🔥🔥🔥 SERVER.JS LOADING - V4.0.1 🔥🔥🔥');
console.log(`[LOAD TIME] ${new Date().toISOString()}`);

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoints (both /health and /api/health) - V4.0.1
const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    message: 'OMNI-MIND API by A.I. Help Pros is running - V4.0.1',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '4.0.1',
    uptime: process.uptime()
  });
};

// Root route for testing - V4.0.1
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OMNI-MIND API Root - V4.0.1',
    version: '4.0.1',
    endpoints: ['/health', '/api/health', '/api/campaigns', '/api/auth', '/api/env-test'],
    server: 'Railway',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

// API Routes
console.log('🔍 Loading API routes...');
app.use('/api/auth', require('./src/routes/auth'));
console.log('✅ Auth routes loaded');
app.use('/api/campaigns', require('./src/routes/campaigns'));
console.log('✅ Campaigns routes loaded');
// app.use('/api/contact', require('./src/routes/contact.routes'));
// console.log('✅ Contact routes loaded');
// app.use('/api/services', require('./src/routes/services'));// Disabled - file not found
// console.log('✅ Services routes loaded');
app.use('/api', require('./src/routes/s3-test'));
console.log('✅ S3-test routes loaded');
app.use('/api', require('./src/routes/env-test'));
console.log('✅ ENV-test routes loaded');

// 404 handler - V4.0.1 (MUST BE AFTER ALL ROUTES)
app.use((req, res) => {
  console.log(`❌ 404 HANDLER HIT - V4.0.1: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    version: '4.0.1'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database sync and server start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('✅ Database connection established');

    // Sync database models
    await sequelize.sync({ alter: true });
    logger.info('✅ Database models synced');

    // Start Express server
    app.listen(PORT, () => {
      logger.info('═══════════════════════════════════════════════════');
      logger.info(`🚀 OMNI-MIND API Server Started`);
      logger.info(`📍 Port: ${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Health Check: http://localhost:${PORT}/health`);
      logger.info(`🧪 Env Test: http://localhost:${PORT}/api/env-test`);
      logger.info(`🏢 Powered by: A.I. Help Pros`);
      logger.info('═══════════════════════════════════════════════════');
    });

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

startServer();

module.exports = app;
