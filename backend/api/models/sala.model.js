const shortID = require('shortid');

class Sala {
    constructor(numero, bloco, capacidade, recursos) {
        this.id = shortID.generate();
        this.nome = (bloco.toUpperCase()+numero);
        this.bloco = bloco;
        this.capacidade = capacidade;
        this.recursos = recursos || [];
        this.reservas = [];
    }
}

module.exports = Sala;