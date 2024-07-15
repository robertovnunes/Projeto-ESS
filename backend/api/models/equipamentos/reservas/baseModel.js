const shortid = require('shortid');

class BaseModel {
    constructor(dataReserva, responsavel, equipamentoID) {
        this.id = '04'+shortid.generate();
        this.dataReserva = dataReserva || new Date();      
        this.dataInicio = new Date();
        this.responsavel = responsavel || '';
        this.equipamento = equipamentoID || '';
    }
}

module.exports = BaseModel;