const jwt = require("jsonwebtoken");
const UsuarioModel = require("../Models/UsuarioModel");

async function verificarJwt(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader)
    return res
      .status(403)
      .json({ message: "Header de autorização não encontrado." });

  const [bearer, token] = authHeader.split(" ");

  if (!/^Bearer$/.test(bearer))
    return res
      .status(403)
      .json({ message: "Header de autorização mal formatado." });

  if (!token) return res.status(403).json({ message: "Token não encontrado." });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "JWT token inválido." });

    const { usuario } = decoded || {};

    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Token sem informações de usuário." });
    }

    try {
      const usuarioCompleto = await UsuarioModel.findById(usuario._id);

      if (!usuarioCompleto)
        return res.status(401).json({ message: "Usuário não encontrado." });

      req.usuarioId = usuario._id;
      req.usuario = usuarioCompleto;

      next();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário." });
    }
  });
}

module.exports = verificarJwt;
