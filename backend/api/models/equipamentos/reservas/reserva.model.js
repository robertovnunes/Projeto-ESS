const BaseModel = require('./baseModel');

class Reserva extends BaseModel {
    constructor(dataReserva, dataInicio, dataFim, responsavel, equipamentoID) {
        super(dataReserva, dataInicio, responsavel, equipamentoID);
        this.dataFim = new Date(dataFim);
    }
}

module.exports = Reserva;