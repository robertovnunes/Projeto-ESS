const mongoose = require('mongoose');

const recursoSchema =  new mongoose.Schema({
    patrimonio: {
        type: String,
        trim: true,
        required: false
      },
      numeroSerie: {
        type: String,
        trim: true,
        required: false
      },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    },
    estado_conservacao: {
        type: String,
        required: true
    },
    valor_estimado: {
        type: Number,
        required: true
    },
    historico_manutencao: {
        type: [{'data': Date, 'descricao': String, 'autor': String}],
        required:false
    }
});

module.exports = mongoose.model('recurso', recursoSchema);