const {z} = require("zod");
const {validateRequest, validateRequestBody} = require("zod-express-middleware");

const login = validateRequest({
    body: z.object({
        email: z.string({required_error: "É obrigatório um email!"})
        .email("Email inválido."),
        senha: z.string({required_error: "É obrigatório uma senha!"}),
    }),
});

module.exports = {
    login,
};