function verificarAdmin(req, res, next) {
  if (!req.usuario?.isAdmin) {
    return res
      .status(403)
      .json({ message: "Acesso permitido apenas para administradores." });
  }
  next();
}

module.exports = verificarAdmin;
