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

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => { logger.info(req.method + ' ' + req.path + ' - IP: ' + req.ip); next(); });

const healthCheck = (req, res) => { res.json({ status: 'ok', message: 'OMNI-MIND API is running - V4.0.6', timestamp: new Date().toISOString(), environment: process.env.NODE_ENV || 'production', version: '4.0.6', uptime: process.uptime() }); };

app.get('/', (req, res) => { res.json({ success: true, message: 'OMNI-MIND API Root - V4.0.6', version: '4.0.6', endpoints: ['/health', '/api/health', '/api/auth', '/api/campaigns', '/api/env-test'], server: 'Railway', timestamp: new Date().toISOString() }); });

app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

console.log('Loading API routes...');

try { app.use('/api/auth', require('./src/routes/auth')); console.log('Auth routes loaded successfully'); } catch (error) { console.error('Failed to load auth routes:', error.message); }

try { app.use('/api/campaigns', require('./src/routes/campaigns')); console.log('Campaigns routes loaded successfully'); } catch (error) { console.error('Failed to load campaigns routes:', error.message); }

try { app.use('/api', require('./src/routes/env-test')); console.log('Environment test route loaded successfully'); } catch (error) { console.error('Failed to load env-test route:', error.message); }

console.log('All available routes loaded');

app.use((req, res) => { res.status(404).json({ success: false, error: 'Route not found', path: req.path, method: req.method, version: '4.0.6' }); });

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() { try { console.log('Connecting to database...'); await sequelize.authenticate(); logger.info('Database connected successfully'); console.log('Syncing database models...'); await sequelize.sync({ alter: true }); logger.info('Database models synced'); app.listen(PORT, () => { console.log('==========================================='); console.log('OMNI-MIND API Server Started - V4.0.6'); console.log('Port: ' + PORT); console.log('Environment: ' + (process.env.NODE_ENV || 'production')); console.log('Time: ' + new Date().toISOString()); console.log('==========================================='); logger.info('OMNI-MIND API Server listening on port ' + PORT); }); } catch (error) { logger.error('Failed to start server: ' + error.message); console.error('Server startup error:', error); process.exit(1); } }

process.on('SIGTERM', async () => { console.log('SIGTERM received. Shutting down gracefully...'); await sequelize.close(); process.exit(0); });

process.on('SIGINT', async () => { console.log('SIGINT received. Shutting down gracefully...'); await sequelize.close(); process.exit(0); });

process.on('unhandledRejection', (reason, promise) => { logger.error('Unhandled Rejection at: ' + promise + ' reason: ' + reason); console.error('Unhandled Rejection:', reason); });

process.on('uncaughtException', (error) => { logger.error('Uncaught Exception: ' + error.message); console.error('Uncaught Exception:', error); process.exit(1); });

startServer();

module.exports = app;
