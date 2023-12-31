// models/index.js

const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/database/DB.sqlite`
});

module.exports = { sequelize };
