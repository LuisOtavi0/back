const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");


const create = validateRequest({
    body: z.object({
        nome: z.string({required_error: "É obrigatório um nome!"}),
        email: z.string({required_error: "É obrigatório um email!"})
        .email("Email inválido."),
        senha: z.string({required_error: "É obrigatório uma senha!"}),
        cargo: z.string({required_error: "É obrigatório um cargo!"}),
        status: z.string({required_error: "É obrigatório um status!"}),
    }),
});

const destroy = validateRequest({
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O ID não é válido."),
    }),
});

const update = validateRequest({
    body: z.object({
        nome: z.string().optional(),
        email: z.string()
        .email("Email inválido.").optional(),
        senha: z.string().optional(),
        cargo: z.string().optional(),
        status: z.string().optional(),
    }),
    params: z.object({
        id: z.custom(mongoose.isValidObjectId, "O ID não é válido."),
    }),

});

module.exports = {
    create,
    destroy,
    update,
};