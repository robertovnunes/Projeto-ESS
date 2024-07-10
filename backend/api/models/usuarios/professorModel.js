const BaseModel = require('./baseModel');

class ProfessorModel extends BaseModel {
    constructor(nome, login, senha, siape) {
        super(nome, login, senha);  // Chama o construtor da classe base
        this.siape = siape;
    }
}

module.exports = ProfessorModel;
