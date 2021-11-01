const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'master', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;