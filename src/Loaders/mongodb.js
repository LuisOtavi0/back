const mongoose = require("mongoose");

async function startDB(){
    await mongoose.connect('mongodb+srv://luissilva:luis123@cursonode.npajezx.mongodb.net/?retryWrites=true&w=majority&appName=CursoNode')
}

module.exports = startDB