const BaseModel = require('./baseModel');

class Reserva extends BaseModel {
    constructor(dataReserva, responsavel, equipamentoID, dataInicio) {
        super(dataReserva, responsavel, equipamentoID);
        this.dataInicio = dataInicio;
        this.entrega = new Date();
        this.prazo = 15;
    }

    _calcularDataFim(dataInicio) {
        const datafim = setDate(dataInicio.getDate() + this.prazo);
        return Date.toLocalString(datafim);
    }

    updateDataFim() {
        this.dataFim = this._calcularDataFim();
    }
}

module.exports = Reserva;