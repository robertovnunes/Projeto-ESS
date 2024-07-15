const BaseModel = require('./baseModel');

class Reserva extends BaseModel {
    constructor(dataReserva, dataInicio, responsavel, equipamentoID, dataInicio) {
        super(dataReserva, dataInicio, responsavel, equipamentoID);
        this.dataFim = new Date();
        this.dataEntrega = new Date();
    }

}

module.exports = Reserva;