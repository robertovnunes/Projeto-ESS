const mongoose = require('mongoose');

const recursoSchema =  new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    partimonio: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Recurso', recursoSchema);