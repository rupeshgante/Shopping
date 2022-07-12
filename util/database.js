const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('e-commerce', 'root', 'Learn@1122', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
