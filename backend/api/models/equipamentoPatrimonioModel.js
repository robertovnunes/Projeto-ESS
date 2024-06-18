const shortid = require('shortid');

class equipamento {
    constructor(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio) {
        this.id = '04'+shortid.generate();
        this.nome = nome;
        this.descricao = descricao;
        this.estado_conservacao = estado_conservacao;
        this.data_aquisicao = data_aquisicao;
        this.valor_estimado = valor_estimado;
        this.patrimonio = patrimonio;
        this.reservas = [];
        this.manutencao = [];
    }
}

module.exports = equipamento;