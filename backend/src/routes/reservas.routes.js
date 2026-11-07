const express = require('express');
const { Op } = require('sequelize');

const { Reserva, Sala } = require('../models');
const verificarSesion = require('../middleware/auth');

const router = express.Router();


// CREAR UNA RESERVA
router.post('/', verificarSesion, async (req, res) => {
  try {
    const {
      salaId,
      fecha,
      horaInicio,
      horaFin
    } = req.body;

    // Validar campos obligatorios
    if (!salaId || !fecha || !horaInicio || !horaFin) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    // Validar que la hora de inicio sea menor a la hora final
    if (horaInicio >= horaFin) {
      return res.status(400).json({
        mensaje: 'La hora de inicio debe ser menor que la hora de fin'
      });
    }

    // Verificar que la sala exista
    const sala = await Sala.findByPk(salaId);

    if (!sala) {
      return res.status(404).json({
        mensaje: 'La sala seleccionada no existe'
      });
    }

    // Buscar si existe una reserva que se cruce con el nuevo horario
    const reservaSolapada = await Reserva.findOne({
      where: {
        salaId,
        fecha,

        horaInicio: {
          [Op.lt]: horaFin
        },

        horaFin: {
          [Op.gt]: horaInicio
        }
      }
    });

    // Si encontramos una reserva, no permitimos crear otra
    if (reservaSolapada) {
      return res.status(409).json({
        mensaje: 'La sala ya está reservada en ese horario'
      });
    }

    // Crear reserva
    const nuevaReserva = await Reserva.create({
      salaId,
      usuarioId: req.session.usuarioId,
      fecha,
      horaInicio,
      horaFin
    });

    return res.status(201).json({
      mensaje: 'Reserva creada correctamente',
      reserva: nuevaReserva
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
});


// LISTAR LAS RESERVAS DEL USUARIO ACTUAL
router.get('/', verificarSesion, async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: {
        usuarioId: req.session.usuarioId
      },

      include: [
        {
          model: Sala,
          attributes: ['id', 'nombre', 'capacidad']
        }
      ],

      order: [
        ['fecha', 'ASC'],
        ['horaInicio', 'ASC']
      ]
    });

    res.json(reservas);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener las reservas'
    });
  }
});

module.exports = router;