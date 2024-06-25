const baseModel = require('./baseModel');
const shortid = require('shortid');

class reserva extends baseModel{
    constructor(data_reserva, data_devolucao, equipamento, usuario) {
        super('03'+shortid.generate() || '');
        this.data_reserva = data_reserva;
        this.data_devolucao = data_devolucao;
        this.equipamento = equipamento;
        this.usuario = usuario;
    }
}

module.exports = reserva;