class equipamento {
    constructor(id, nome, descricao, estado_conservacao, valor_estimado, {patrimonio = '', numero_serie = ''} = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.estado_conservacao = estado_conservacao;
        this.valor_estimado = valor_estimado;
        if(!patrimonio && !numero_serie){
            throw new Error('Equipamento deve possuir um patrimonio ou um numero de serie');
        }
        if(patrimonio) this.patrimonio = patrimonio;
        if(numero_serie) this.numero_serie = numero_serie;
    }
}

module.exports = equipamento;