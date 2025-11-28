const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  plan: {
    type: DataTypes.STRING,
    defaultValue: 'free',
    validate: {
      isIn: [['free', 'starter', 'professional', 'enterprise']]
    }
  },
  subscription_status: {
    type: DataTypes.STRING,
    defaultValue: 'inactive',
    validate: {
      isIn: [['active', 'inactive', 'cancelled', 'trial']]
    }
  },
  stripe_customer_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stripe_subscription_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  campaigns_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  last_login_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true
});

module.exports = User;
