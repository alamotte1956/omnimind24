require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./src/config/database');
const logger = require('./src/config/logger');
const errorHandler = require('./src/middleware/errorHandler');

console.log('🔥🔥🔥 SERVER.JS LOADING - V4.0.2 MINIMAL 🔥🔥🔥');
console.log(`[LOAD TIME] ${new Date().toISOString()}`);

const app = express();

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

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    message: 'OMNI-MIND API by A.I. Help Pros is running - V4.0.2',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '4.0.2',
    uptime: process.uptime()
  });
};

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'OMNI-MIND API Root - V4.0.2 MINIMAL',
    version: '4.0.2',
    endpoints: ['/health', '/api/health', '/api/auth', '/api/campaigns'],<span class="cursor">█</span>