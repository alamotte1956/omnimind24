require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./src/config/database');
const logger = require('./src/config/logger');
const errorHandler = require('./src/middleware/errorHandler');

console.log('SERVER.JS LOADING - V4.0.6 WITH ENV-TEST');
console.log('Load time: ' + new Date().toISOString());

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(req.method + ' ' + req.path + ' - IP: ' + req.ip);
  next();
});

// Health check endpoint handler
const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    message: 'OMNI-MIND API is running - V4.0.6',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '4.0.6',
    uptime: process.uptime()
  });
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OMNI-MIND API Root - V4.0.6',
    version: '4.0.6',
    endpoints: ['/health', '/api/health', '/api/auth', '/api/campaigns', '/api/env-test'],
    server: 'Railway',
    timestamp: new Date().toISOString()
  });
});

// Health check routes
app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

// API Routes - Only loading existing routes
console.log('Loading API routes...');

try {
  app.use('/api/auth', require('./src/routes/auth'));
  console.log('Auth routes loaded successfully');
} catch (error) {
  console.error('Failed to load auth routes:', error.message);
}

try {
  app.use('/api/campaigns', require('./src/routes/campaigns'));
  console.log('Campaigns routes loaded successfully');
} catch (error) {
  console.error('Failed to load campaigns routes:', error.message);
}

try {
  app.use('/api', require('./src/routes/env-test'));
  console.log('Environment test route loaded successfully');
} catch (error) {
  console.error('Failed to load env-test route:', error.message);
}

console.log('All available routes loaded');

// 404 handler - Must come after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method,
    version: '4.0.6'
  });
});

// Global error handler
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server function
async function startServer() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    logger.info('Database connected successfully');
    
    console.log('Syncing database models...');
    await sequelize.sync({ alter: true });
    logger.info('Database models synced');
    
    app.listen(PORT, () => {
      console.log('===========================================');
      console.log('OMNI-MIND API Server Started - V4.0.6');
      console.log('Port: ' + PORT);
      console.log('Environment: ' + (process.env.NODE_ENV || 'production'));
      console.log('Time: ' + new Date().toISOString());
      console.log('===========================================');
      logger.info('OMNI-MIND API Server listening on port ' + PORT);
    });
  } catch (error) {
    logger.error('Failed to start server: ' + error.message);
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

// Graceful shutdown handlers
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

// Unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at: ' + promise + ' reason: ' + reason);
  console.error('Unhandled Rejection:', reason);
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception: ' + error.message);
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
