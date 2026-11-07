const Usuario = require('./Usuario');
const Sala = require('./Sala');
const Reserva = require('./Reserva');

// Un usuario puede tener muchas reservas
Usuario.hasMany(Reserva, {
  foreignKey: 'usuarioId'
});

Reserva.belongsTo(Usuario, {
  foreignKey: 'usuarioId'
});

// Una sala puede tener muchas reservas
Sala.hasMany(Reserva, {
  foreignKey: 'salaId'
});

Reserva.belongsTo(Sala, {
  foreignKey: 'salaId'
});

module.exports = {
  Usuario,
  Sala,
  Reserva
};