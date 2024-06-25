const reservaModel = require('./reservaModel');

class reservaManutencao extends reservaModel{
    constructor(data_reserva, data_devolucao, equipamento, usuario, descricao) {
        super(data_reserva, data_devolucao, equipamento, usuario);
        this.descricao = descricao;
        this.tecnico = '';
    }
}

module.exports = reservaManutencao;