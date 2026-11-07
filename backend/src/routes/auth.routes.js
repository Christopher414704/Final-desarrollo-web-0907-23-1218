const express = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../models');
const verificarSesion = require('../middleware/auth');

const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: 'Email y contraseña son obligatorios'
      });
    }

    const usuario = await Usuario.findOne({
      where: {
        email
      }
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
    }

    const passwordValido = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValido) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
    }

    req.session.usuarioId = usuario.id;

    req.session.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
    };

    res.json({
      mensaje: 'Login correcto',
      usuario: req.session.usuario
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});


// CONSULTAR SESIÓN ACTUAL
router.get('/sesion', verificarSesion, (req, res) => {
  res.json({
    usuario: req.session.usuario
  });
});


// LOGOUT
router.post('/logout', verificarSesion, (req, res) => {

  req.session.destroy((error) => {

    if (error) {
      return res.status(500).json({
        mensaje: 'Error al cerrar sesión'
      });
    }

    res.clearCookie('connect.sid');

    res.json({
      mensaje: 'Sesión cerrada correctamente'
    });

  });

});

module.exports = router;