const shortid = require('shortid');

class BaseModel {
    constructor(dataInicio, responsavel = {}, equipamentoID) {
        this.id = '04'+shortid.generate();
        this.dataReserva = new Date();
        this.dataInicio = new Date(dataInicio) || new Date();
        this.responsavel = responsavel || {};
        this.equipamento = equipamentoID || '';
        this.status = 'pendente';
    }
}

module.exports = BaseModel;