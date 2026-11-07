const express = require('express');

const { Sala } = require('../models');
const verificarSesion = require('../middleware/auth');

const router = express.Router();

// LISTAR SALAS
router.get('/', verificarSesion, async (req, res) => {
  try {
    const salas = await Sala.findAll({
      order: [['id', 'ASC']]
    });

    res.json(salas);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener las salas'
    });
  }
});

module.exports = router;