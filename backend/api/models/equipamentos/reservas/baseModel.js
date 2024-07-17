const shortid = require('shortid');

class _responsavel {
    constructor(email, login) {
        this.email = email || '';
        this.login = login || '';
    }
}

class BaseModel {
    constructor(dataReserva, dataInicio, responsavel = {}, equipamentoID) {
        this.id = '04'+shortid.generate();
        this.dataReserva = new Date(dataReserva) || new Date();
        this.dataInicio = new Date(dataInicio) || new Date();
        this.responsavel = new _responsavel(responsavel) || '';
        this.equipamento = equipamentoID || '';
        this.status = 'pendente';
    }
}

module.exports = BaseModel;