const BaseModel = require('./baseModel');

class Reserva extends BaseModel {
    constructor(dataInicio, responsavel, funcao, depto, equipamentoID) {
        super(dataInicio, responsavel, equipamentoID);
        this.funcao = funcao;
        this.depto = depto;
        this.dataDevolucao = '';
    }
}

module.exports = Reserva;