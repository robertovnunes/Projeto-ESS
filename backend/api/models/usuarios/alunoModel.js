const BaseModel = require('./baseModel');

class AlunoModel extends BaseModel {
    constructor(nome, login, senha) {
        super(nome, login, senha);
    }
}

module.exports = AlunoModel;
