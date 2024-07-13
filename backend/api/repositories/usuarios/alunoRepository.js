const UsuariosRepository = require('./usuariosRepository');
const path = require('path');

class AlunoRepository extends UsuariosRepository {
    constructor() {
        super(path.join(__dirname, '../../../db/alunos.json'));
    }
}

module.exports = AlunoRepository;
