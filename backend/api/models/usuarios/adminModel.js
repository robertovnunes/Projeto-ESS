const BaseModel = require('./baseModel');

class AdminModel extends BaseModel {
    constructor(nome, login, senha) {
        super(nome, login, senha);  // Chama o construtor da classe base
    }
}

module.exports = AdminModel;
