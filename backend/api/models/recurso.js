const mongoose = require('mongoose');

// Função de validação para garantir que apenas um dos campos (patrimonio ou numeroSerie) esteja presente
function xorValidator(value) {
    return (this.patrimonio && !this.sn) || (!this.patrimonio && this.sn);
  }

const recursoSchema =  new mongoose.Schema({
    patrimonio: {
        type: String,
        trim: true,
        validate: {
          validator: xorValidator,
          message: 'Apenas um dos campos patrimonio ou numeroSerie deve ser fornecido, não ambos.'
        }
      },
      numeroSerie: {
        type: String,
        trim: true,
        validate: {
          validator: xorValidator,
          message: 'Apenas um dos campos patrimonio ou numeroSerie deve ser fornecido, não ambos.'
        }
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

module.exports = mongoose.model('Recurso', recursoSchema);