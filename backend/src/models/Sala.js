const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sala = sequelize.define(
  'Sala',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'salas',
    timestamps: false
  }
);

module.exports = Sala;