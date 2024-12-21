const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expenses', {
  description: Sequelize.STRING,
  category : Sequelize.STRING,
  amount: Sequelize.BIGINT,
  userId : Sequelize.INTEGER
});

module.exports = Expense;