const BaseModel = require('./baseModel');

class Reserva extends BaseModel {
    constructor(dataReserva, dataInicio, responsavel, funcao, depto, equipamentoID) {
        super(dataReserva, dataInicio, responsavel, equipamentoID);
        this.funcao = funcao;
        this.depto = depto;
        this.dataDevolucao = '';
    }
}

module.exports = Reserva;