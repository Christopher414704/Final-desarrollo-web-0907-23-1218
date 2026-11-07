const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const { Usuario, Sala } = require('./models');

async function crearDatosIniciales() {
  try {
    await sequelize.authenticate();

    console.log('Conectado a SQL Server');

    await sequelize.sync();

    // Crear contraseña cifrada
    const passwordCifrado = await bcrypt.hash('123456', 10);

    // Crear usuario de prueba si todavía no existe
    const [usuario, usuarioCreado] = await Usuario.findOrCreate({
      where: {
        email: 'usuario@biblioteca.com'
      },
      defaults: {
        nombre: 'Usuario Biblioteca',
        password: passwordCifrado
      }
    });

    if (usuarioCreado) {
      console.log('Usuario creado correctamente');
    } else {
      console.log('El usuario ya existía');
    }

    // Crear salas iniciales
    const salas = [
      {
        nombre: 'Sala de Estudio 1',
        capacidad: 6
      },
      {
        nombre: 'Sala de Estudio 2',
        capacidad: 4
      },
      {
        nombre: 'Sala Multimedia',
        capacidad: 10
      },
      {
        nombre: 'Sala de Reuniones',
        capacidad: 8
      }
    ];

    for (const sala of salas) {
      await Sala.findOrCreate({
        where: {
          nombre: sala.nombre
        },
        defaults: {
          capacidad: sala.capacidad
        }
      });
    }

    console.log('Salas creadas correctamente');

    console.log('');
    console.log('-----------------------------------');
    console.log('Usuario de prueba');
    console.log('Email: usuario@biblioteca.com');
    console.log('Contraseña: 123456');
    console.log('-----------------------------------');

    await sequelize.close();

  } catch (error) {
    console.error('Error creando datos iniciales:');
    console.error(error);
  }
}

crearDatosIniciales();