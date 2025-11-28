const User = require('./User');
const Campaign = require('./Campaign');
const Asset = require('./Asset');

// Define relationships
User.hasMany(Campaign, {
  foreignKey: 'user_id',
  as: 'campaigns'
});

Campaign.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Campaign.hasMany(Asset, {
  foreignKey: 'campaign_id',
  as: 'assets'
});

Asset.belongsTo(Campaign, {
  foreignKey: 'campaign_id',
  as: 'campaign'
});

module.exports = {
  User,
  Campaign,
  Asset
};
