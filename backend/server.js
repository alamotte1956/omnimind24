require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./src/config/database');
const logger = require('./src/config/logger');
const errorHandler = require('./src/middleware/errorHandler');

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

// Health check endpoints (both /health and /api/health)
const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    message: 'OMNI-MIND API by A.I. Help Pros is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '1.0.7',
    uptime: process.uptime()
  });
};

app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

// API Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/campaigns', require('./src/routes/campaigns'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database sync and server start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('🔍 DEBUG: Starting server initialization...');
    
    // Test database connection
    await sequelize.authenticate();
    logger.info('✅ Database connection established');
    console.log('🔍 DEBUG: Database authenticated successfully');

    // Sync database models - FORCE UPDATE FOR SCHEMA CHANGES
    console.log('🔍 DEBUG: About to sync database models...');
    await sequelize.sync({ alter: true });
    logger.info('✅ Database models synced');
    console.log('🔍 DEBUG: Database models synced successfully');

    // Start background worker - DISABLED (requires Redis)
    // require('./src/workers/campaign.worker');
    // logger.info('✅ Background worker started');
    console.log('🔍 DEBUG: Worker skipped (disabled)');

    // Start Express server
    console.log('🔍 DEBUG: About to start Express server on port', PORT);
    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info('═══════════════════════════════════════════════════');
      logger.info(`🚀 OMNI-MIND API Server Started`);
      logger.info(`📍 Port: ${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Health Check: http://localhost:${PORT}/health`);
      logger.info(`🏢 Powered by: A.I. Help Pros`);
      logger.info('═══════════════════════════════════════════════════');
      console.log('🔍 DEBUG: Express server is now listening!');
    });

    server.on('error', (error) => {
      console.error('🔍 DEBUG: Server error:', error);
      logger.error('Server error:', error);
      process.exit(1);
    });

    console.log('🔍 DEBUG: app.listen() called successfully');

  } catch (error) {
    console.error('🔍 DEBUG: ERROR IN STARTUP:', error);
    console.error('🔍 DEBUG: Error stack:', error.stack);
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

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔍 DEBUG: Unhandled Rejection:', reason);
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🔍 DEBUG: Uncaught Exception:', error);
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();

module.exports = app;

app.use('/api', require('./src/routes/env-test'));  // Environment test endpoint 
