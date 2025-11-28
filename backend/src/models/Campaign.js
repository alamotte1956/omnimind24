const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        'product-launch',
        'brand-awareness',
        'lead-generation',
        'event-promotion',
        'content-marketing',
        'social-media',
        'other'
      ]]
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'draft',
    validate: {
      isIn: [['draft', 'processing', 'completed', 'failed']]
    }
  },
  target_audience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  goal: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  brief: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  brand_voice: {
    type: DataTypes.STRING,
    defaultValue: 'professional',
    validate: {
      isIn: [[
        'professional',
        'friendly',
        'innovative',
        'empathetic',
        'humorous',
        'luxury'
      ]]
    }
  },
  key_messages: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  competitors: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ai_tools: {
    type: DataTypes.JSONB,
    defaultValue: ['chatgpt', 'dalle', 'elevenlabs']
  },
  assets_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  processing_time_seconds: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'campaigns',
  underscored: true,
  timestamps: true
});

module.exports = Campaign;
