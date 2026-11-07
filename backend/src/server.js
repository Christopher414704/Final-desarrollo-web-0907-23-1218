const express = require('express');
const cors = require('cors');
const session = require('express-session');

const sequelize = require('./config/database');
require('./models');

const authRoutes = require('./routes/auth.routes');

const salasRoutes = require('./routes/salas.routes');

const reservasRoutes = require('./routes/reservas.routes');


require('dotenv').config();

const app = express();

// Permitir JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// SESIONES
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000
    },

    rolling: true
  })
);



// RUTAS DE AUTENTICACIÓN
// IMPORTANTE: deben ir después de app.use(session(...))
app.use('/api/auth', authRoutes);

app.use('/api/salas', salasRoutes);

app.use('/api/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Biblioteca funcionando'
  });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.authenticate();

    console.log('Conexión a SQL Server correcta');

    await sequelize.sync();

    console.log('Tablas sincronizadas correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:');
    console.error(error);
  }
}

iniciarServidor();