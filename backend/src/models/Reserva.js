const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define(
  'Reserva',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false
    },

    horaFin: {
      type: DataTypes.TIME,
      allowNull: false
    }
  },
  {
    tableName: 'reservas',
    timestamps: false
  }
);

module.exports = Reserva;