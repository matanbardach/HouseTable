const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './server/db/dev.sqlite' // can be also :memory: for inMemory DB 
});

module.exports = sequelize;