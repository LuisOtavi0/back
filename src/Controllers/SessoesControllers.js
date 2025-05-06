const SessoesModel = require("../Models/SessoesModel");

class SessoesController {
    async create(req, res) {
        try {
            const sessoes = await SessoesModel.create(req.body);

            return res.status(200).json(sessoes);
        } catch (error) {
            res.status(500).json({message: "Problema!", error: error.message});
        }
    }

    async read(req, res) {
        try {
            const sessoes = await SessoesModel.find().populate('id_usuario', '-senha');

            return res.status(200).json(sessoes);
        } catch (error) {
            res.status(500).json({message: "Problema!", error: error.message});
        }
    }

    update(req, res) {

    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await SessoesModel.findByIdAndDelete(id);
    
            return res.status(200).json({ "mensagem": "Sessão deletadas com sucesso!"});
        } catch (error) {
            res.status(500).json({message: "Problema!", error: error.message});
        }
    }
}

module.exports = new SessoesController();