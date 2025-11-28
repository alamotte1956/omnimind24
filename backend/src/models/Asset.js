const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  campaign_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'campaigns',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        'strategy',
        'blog',
        'article',
        'social',
        'ad',
        'email',
        'landing-page',
        'video-script',
        'image',
        'audio',
        'video',
        'music'
      ]]
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  file_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  file_size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mime_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  ai_tool: {
    type: DataTypes.STRING,
    allowNull: true
  },
  generation_time_seconds: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  tokens_used: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cost_usd: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true
  }
}, {
  tableName: 'assets',
  underscored: true,
  timestamps: true
});

module.exports = Asset;
