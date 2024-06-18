const BaseModel = require('./baseModel');
const shortid = require('shortid');
class reservaEquipamentoModel extends BaseModel{
    constructor(reservaEquipamento){
        super('04'+shortid.generate() || '');
        this.id_equipamento = reservaEquipamento.id_equipamento;
        this.id_utilizador = reservaEquipamento.id_utilizador;
        this.data = reservaEquipamento.data;
        this.hora_inicio = reservaEquipamento.hora_inicio;
        this.hora_fim = reservaEquipamento.hora_fim;
    }
}   
module.exports = reservaEquipamentoModel;