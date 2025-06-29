const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");
const SessoesController = require("./Controllers/SessoesControllers");
const AuthController = require("./Controllers/AuthController");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessoesValidator = require("./Validators/SessoesValidator");
const AuthValidator = require("./Validators/AuthValidator");
const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");
const verificarAdmin = require("./Middlewares/verificarAdmin");

const rotas = Router();

//Usuarios
rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", verificarJwt, verificarAdmin, UsuarioController.read);
rotas.delete(
  "/usuarios/:id",
  verificarJwt,
  verificarUsuario,
  UsuarioValidator.destroy,
  UsuarioController.delete
);
rotas.put(
  "/usuarios/:id",
  verificarJwt,
  verificarUsuario,
  UsuarioValidator.update,
  UsuarioController.update
);

//Sessoes
rotas.post(
  "/sessoes",
  verificarJwt,
  verificarUsuario,
  SessoesValidator.create,
  SessoesController.create
);
rotas.get("/sessoes", verificarJwt, SessoesController.read);
rotas.delete(
  "/sessoes/:id_usuario",
  verificarJwt,
  verificarUsuario,
  SessoesValidator.destroy,
  SessoesController.delete
);

//Auth
rotas.post("/login", AuthValidator.login, AuthController.login);

module.exports = rotas;
