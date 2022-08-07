const { Sequelize } = require('sequelize');
const connection = new Sequelize('myblog', 'root', '789456123aA@', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;