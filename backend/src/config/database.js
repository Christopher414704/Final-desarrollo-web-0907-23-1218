const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',

    dialectOptions: {
      options: {
        instanceName: process.env.DB_INSTANCE,
        encrypt: false,
        trustServerCertificate: true
      }
    },

    logging: false
  }
);

module.exports = sequelize;