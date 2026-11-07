function verificarSesion(req, res, next) {
  if (!req.session.usuarioId) {
    return res.status(401).json({
      mensaje: 'Sesión no válida o expirada'
    });
  }

  next();
}

module.exports = verificarSesion;