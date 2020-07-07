const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./first_board')(sequelize, Sequelize);
db.Url = require('./imageUrl')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Url);
db.Url.belongsTo(db.Post);

module.exports = db;